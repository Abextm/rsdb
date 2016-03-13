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
			fs.readFile(__dirname+"/data.json",function(err,dstr){
				var d = JSON.parse(dstr);
				for (var dn in d){
					var diary=d[dn];
					["Easy","Medium","Hard","Elite"].forEach(function(difn){
						var dif=diary[difn];
						dif.Tasks.forEach(function(e){
							e.Items.forEach(function(item,i){
								e.Items[i]=ItemList.Get(item).Serial;
							});
						});
						dif.RewardItem=ItemList.Get(dif.RewardItem).Serial;
					});
				}
				str="define(['itemlist/index'],function(ItemList){var D="+JSON.stringify(d)+";"+str
				done(str);
			});
		});
	});
});

module.exports = {
	files:["index.js","client.js","data.json"],//reload module if any of these change
	routes:{ 
		"index.js":function(req,res,next){
			wait.Call(req,res);
		},
	},
	exports:wait.exports,//allow us to be requried by other server modules
};