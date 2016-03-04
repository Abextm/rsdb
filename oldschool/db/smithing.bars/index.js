//Load deps
var db = require("db");
var waiter=require("waiter");
var fs = require("fs");

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
var bars={
	Bronze:{
		Ores:["Copper","Tin"],
		Coal:0,
		LevelReq:1,
		Exp:6.2,
		ItemRun:[2,2],
		BFCoal:0,
	},
	Blurite:{
		Ores:["Blurite"],
		Coal:0,
		LevelReq:8,
		Exp:8,
	},
	Iron:{
		Ores:["Iron"],
		Coal:0,
		LevelReq:15,
		Exp:12.5,
		ItemRun:[1,1],
		BFCoal:0,
	},
	Elemental:{
		Name:"Elemental metal",
		Ores:["Elemental"],
		Coal:4,
		LevelReq:20,
		Exp:7.5,
	},
	Silver:{
		Ores:["Silver"],
		Coal:0,
		LevelReq:20,
		Exp:13.7,
		ItemRun:[1,1],
		BFCoal:0,
	},
	Steel:{
		Ores:["Iron"],
		Coal:2,
		LevelReq:30,
		Exp:17.5,
		ItemRun:[2,1],
		BFCoal:1,
	},
	Gold:{
		Ores:["Gold"],
		Coal:0,
		LevelReq:40,
		Exp:22.5,//Handle goldsmith manually
		ItemRun:[1,1],
		BFCoal:0,
	},
	Lovakite:{
		Ores:["Lovakite"],
		Coal:2,
		LevelReq:45,
		Exp:20,
	},
	Mithril:{
		Ores:["Mithril"],
		Coal:4,
		LevelReq:50,
		Exp:30,
		ItemRun:[3,1.5],
		BFCoal:2,
	},
	Adamantite:{
		Ores:["Adamantite"],
		Coal:6,
		LevelReq:70,
		Exp:37.5,
		ItemRun:[4,2],
		BFCoal:3,
	},
	Runite:{
		Ores:["Runite"],
		Coal:8,
		LevelReq:85,
		Exp:50,
		ItemRun:[5,2.5],
		BFCoal:4,
	},
};
		fs.readFile(__dirname+"/header.js",function(err,str){
			str="define(['itemlist/index'],function(ItemList){var d={"+Object.keys(bars).map(function(k){
				//[ore id] level exp coal? (ItemRun BFCoal)?
				var bar=bars[k];
				out=[
					"["+bar.Ores.map(function(v){return ItemList.GetName(v+" ore").ID;}).join()+"]",
					bar.LevelReq,
					bar.Exp,
				];
				if(bar.Coal)out.push(bar.Coal);
				if(bar.BFCoal!==undefined){
					if(!bar.Coal)out.push("");//empty coal spacer
					out.push("["+bar.ItemRun.join()+"]");
					out.push(bar.BFCoal);
				}
				return ItemList.GetName(bar.Name?bar.Name:(k+" bar")).ID+":["+out.join()+"]";
			}).join(",")+"};"+str;
			done(str);
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
	exports:wait.exports,//allow us to be requried by other server modules
};