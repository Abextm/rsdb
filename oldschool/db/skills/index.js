//Load deps
var db = require("db");
var waiter=require("waiter");
var fs = require("fs");
var cloudscraper=require("cloudscraper");

var wait = waiter({
	Cache:30*60,
	ETag:0,
	EvalExports:true,
	Revalidate:function(){
		return false;
		//return db.IsDifferent("ItemList",delta);
	},
},function(done){
	db.require(["itemlist"],function(ItemList){
		fs.readFile(__dirname+"/client.js",function(err,str){
			done(str);
		});
	});
});

module.exports = {
	files:["index.js","client.js"],//reload module if any of these change
	routes:{ 
		"index.js":function(req,res,next){
			wait.Call(req,res);
		},
		"hiscore":function(req,res,next){
			var url="http://services.runescape.com/m=hiscore_oldschool/index_lite.ws?player="+req.query.p;
	    cloudscraper.request({method:"GET",url:url},function(err,r,data){
	    	res.status(r.statusCode);
	      if(err){
	        res.status(400);
	        console.log(err,url);
	        res.send(err);
	        return
	      }
	      res.send(data)
	    });
		}
	},
	exports:wait.exports,//allow us to be requried by other server modules
};