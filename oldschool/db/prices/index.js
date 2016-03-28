//Load deps
var waiter=require("waiter");
var fs = require("fs");
var cloudscraper=require("cloudscraper");
var zlib=require("zlib");
var msgpack=require("msgpack-lite");

var geData={};
var nextupdate;
var wait = waiter({
	Cache:5*60,
	ETag:0,
	SendOldDuringUpdate:true,
	Revalidate:function(){
		return Date.now()-nextupdate>0;
	},
},function(done){
	nextupdate=Date.now()+(1000*60*5);
	var doErr=function(err){
		console.log(err);
		var out=JSON.stringify(err);
		str="define(function(){var d={"+out+"};"+str;
		done(str);//return 
		return;
	}
	fs.readFile(__dirname+"/header.js",function(err,str){
		if(err) return doErr({err:err,from:"fs"});
		cloudscraper.request({
			method:"GET",
			url:"https://rsbuddy.com/exchange/summary.messagepack.gz",
			encoding:null,
		},function(err,res,body){
			if(err)return doErr({err:err,from:"cs"});
			zlib.gunzip(body,function(err,mpack){
				if(err) return doErr({err:err,from:"gun"});
				summary=msgpack.decode(mpack);
				//id nome buy sell overall members store
				var out=summary.map(function(v){
					return {
						ID:v[0],
						Name:v[1],
						Buy:v[2],
						Sell:v[3],
						Overall:v[4],
						Members:v[5],
					};
				}).map(function(v){
					var pps = [v.Buy,v.Sell,v.Overall].filter(function(v){return v;}).length;
					if(pps==0){
						v.Overall=geData[v.ID]||0;
					}else if(pps!=3){
						v.Buy=v.Buy||"";
						v.Sell=v.Sell||"";
						v.Overall=v.Overall||"";
					}
					return v;
				}).map(function(e){
					return e.ID+":["+[//overall buy sell members
						e.Overall,
						e.Buy,
						e.Sell,
						e.Members?1:0,
					].join(",")+"]";
				}).join(",");
				str="define(['itemlist/index'],function(ItemList){var d={"+out+"};"+str;
				done(str);//return 
				return;
			});
		});
	});
});

module.exports = {
	files:["index.js","header.js"],//reload module if any of these change
	routes:{ 
		"index.js":function(req,res,next){
			wait.Call(req,res);
		},
	},
};
