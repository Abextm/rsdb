/**
Waiter returns a function that will call its callback with the arguments of your workers callback,
so multiple requests don't call of multiple of the same async. Also servers cachecontrol and etag.
Ex:
var waiter = Waiter({
	Cache:60,//60 second max age
	ETag:0,//res.send(arguments[0]) and use arg 0 for etag
	Revalidate:function(){return false;},//never change the content
},function(cb){
	someAsyncOperation(function(err,data){
		if(err){cb(err);}
		cb(data);
	});
});

module.exports={
	routes:{
		'index.js':function(req,res,next){
			waiter.call(req,res);
		},
	},
	files:['index.js'],
}

Waiter(options, work)
**/
var db=require("./db.js")
var vm=require("vm");
var crypto = require("crypto");
var extend=require("extend");

//Construct
var Waiter = function(opts, process){
	if(!(this instanceof Waiter)){
		return new Waiter(opts, process);
	}
	this.completed=false;
	this.opts=opts||{};
	this.process=process;
	this.tocall=[];
	this.exports=this._exports.bind(this);
	this.exports.lastUpdate=-1;
	var that=this;
	if(this.opts.EvalExports){
		this.exportWaiter=new Waiter({
			Revalidate:function(){return that.Revalidate();},
			noAutoStart:true,
		},function(done){
			that.Call(function(){
				var src=arguments[that.opts.ETag||0];
				var sandbox={
					require:db.require,
					define:function(r,cb){
						if(!cb){
							cb=r;
							r=[];
						}
						db.require(r,function(){
							done(cb.apply(that,arguments));
						});
					},
				};
				sandbox.require=function(id){
					var m=ex.subMods[id];
					if(m)return m;
					return subreq(id);
				};
				sandbox.AddGetter=function(o,t){
					for (var k in o) {
						Object.defineProperty(t.prototype,k,{enumerable:true,configurable:true,get:o[k]});
					}
				};
				vm.runInNewContext(src,extend(sandbox,global),{
					filename:"",
					lineOffset:0,
				});
			});
		});
	}else{
		this.exportWaiter=this;
	}
	if(!this.opts.noAutoStart)setTimeout(function(){that.Update();},1);
};

Waiter.prototype.defer = function(req,res,cb){
	this.tocall[this.tocall.length]=this._call.bind(this,req,res,cb);
};

Waiter.prototype.Revalidate = function(){
	return this.opts.Revalidate&&this.opts.Revalidate();
}

//defer or call
Waiter.prototype.Call = function(req,res,cb){
	//fix args
	if(typeof req == "function"){
		cb=req;
		req=undefined;
	};
	if((req&&!res)||(!req&&res)){
		throw "InvalidArgs (req!~=res)";
	}

	if(this.completed){//call now
		this._call(req,res,cb);
	}else{//defer
		this.defer(req,res,cb);
	}
};

Waiter.prototype.Update=function(){
	this.updating=true;
	var that=this;
	this.process(function(){
		that.completed=true;
		that.updating=false;
		that.args=arguments;
		that.exports.lastUpdate=Date.now();
		if(that.opts.ETag!==undefined){
			var h = crypto.createHash('sha256');
			h.update(that.args[that.opts.ETag]);
			that.ETag=h.digest('base64');
		}
		that.tocall.forEach(function(f){
			try{
				f();
			}catch(e){
				console.error(e);
			}
		});
		if(that.opts.EvalExports)that.exportWaiter.Update();
	});
};

//update + etag + cb
Waiter.prototype._call = function(req,res,cb){
	if(!this.updating&&this.Revalidate()){//must revalidate; defer
		if(!this.opts.SendOldDuringUpdate){
			this.defer(req,res,cb)
			this.Update();
			return;
		}else{
			this.Update();
		}
	}
	if(req&&this.opts.Cache){
		res.set('Cache-Control','max-age='+this.opts.Cache);
		res.set('Content-Type',this.opts.ContentType||"text/javascript");
		if(this.ETag!==undefined){
			res.set("ETag",this.ETag);
			rtag=req.get("If-None-Match");
			if(this.ETag===rtag){
				res.status(304).send();
			}else if(!this.opts.DontSentWithETag){
				res.send(this.args[this.opts.ETag])
			}
		}
	}
	if(cb)cb.apply(this,this.args);
};

Waiter.prototype._exports = function(cb){
	this.exportWaiter.Call(cb);
};
module.exports = Waiter;