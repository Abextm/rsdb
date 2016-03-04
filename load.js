var path=require("path");
var fs=require("fs");
var reqMod=require("module");
var extend=require("extend");
var path=require("path");
var vm=require("vm");

function makeRequireFunction() {
  const Module = this.constructor;
  const self = this;
  function rr(path) {
    try {
      exports.requireDepth += 1;
      return self.require(path);
    } finally {
      exports.requireDepth -= 1;
    }
  }
  rr.resolve = function(request) {
    return Module._resolveFilename(request, self);
  };
  rr.main = process.mainModule;
  // Enable support to add extra extension types.
  rr.extensions = Module._extensions;
  rr.cache = Module._cache;
  return rr;
}

var ex = function(name,cb){
	name=name.toLowerCase()
	var c = ex.cache[name];
	if(!c){
		return Load(name,cb);
	}
	if(c.lastCheck>(Date.now()-1000)){
		return cb(undefined,c);
	}
	var now = c.lastCheck;
	Promise.all(c.files.map(function(file){
		return new Promise(function(returnOK,returnErr){
			var fi = path.join(__dirname,name,file);
			fs.stat(fi,function(err,stats){
				if(err){
					console.log(err);
					return returnErr(err);
				}
				if(stats.isFile()&&stats.mtime&&stats.mtime.getTime()<=now) return returnOK();
				returnErr();
			})
		});
	})).then(function(){
		try{
			cb(undefined,c);
		}catch(e){}
	}).catch(function(v){
		Load(name,cb);
	});
};
ex.cache={};
ex.subMods={
	"waiter":require("./waiter"),
	"db":require("./db"),
};

function Load(name,cb){
	var fi = path.join(__dirname,name,"index.js");
	fs.readFile(fi,function(err,data){
		if(err) return cb(err);
		var sandbox={
			module:new reqMod(name,module.parent),
			__filename:fi,
			__dirname:path.join(__dirname,name),
		};
		sandbox.module.filename=fi;
		sandbox.module.paths=reqMod._nodeModulePaths(path.dirname(fi));
		var subreq=makeRequireFunction.call(sandbox.module);
		sandbox.require=function(id){
			var m=ex.subMods[id];
			if(m)return m;
			return subreq(id);
		};
		sandbox.exports=sandbox.module.exports;
		vm.runInNewContext(data.toString(),extend(sandbox,global),{
			filename:fi,
			lineOffset:0,
		});
		var exp = sandbox.module.exports;
		if(!exp.files||exp.files.length==0) cb("Missing exports.files in module "+name);
		if(!exp.routes||exp.routes.length==0) cb("Missing exports.routes in module "+name);
		exp.mtimes={};
		var now=Date.now();
		exp.files.forEach(function(rfilename){
			exp.mtimes[rfilename]=now;
		})
		exp.lastCheck=Date.now();
		ex.cache[name]=exp;
		cb(undefined,exp,true);
	});
}

module.exports=ex;