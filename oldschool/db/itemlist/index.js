//Load dependancies
var waiter=require("waiter");
var fs = require("fs");
var names = require("./names.json");
var coords = require("./coords.json");
//create waiter
var wait = waiter({
	Cache:30*60,//Cache for 30 mins
	ETag:0,//just send argument 0 (optimize caching)
	EvalExports:true,//Accessable to node modules
	Revalidate:function(){return false;},//never revalidate (the entire module will reload on any change)
},function(done){
	fs.readFile(__dirname+"/header.js",function(err,str){ // read the header
		var out=names.map(function(item,ii){
			//We manually write the js object so we can just skip instead of using null, saving data
			//noted noteid (name members price)
			item.name=item.name.replace(" (noted)","");
			var o=item.noted?-1:1;
			var note=(names[ii+o]&&names[ii+o].noted!=item.noted&&names[ii+o].name==item.name)?names[ii+o].id:""
			var icon;
			{
				var d=coords[item.id];
				if(d.Item){
					icon=d.Item;
				}else{
					icon="["+([
						d.X||0,d.Y||0,d.W||0,d.H||0,d.Sheet||0
					].join())+"]";
				}
			}
			var payload = [
				~~item.noted,
				note?note:"",
				icon,
			];
			if(!item.noted||!note){
				payload.push(
					'"'+item.name+'"',
					~~item.members,
					item.store_price);
			}
			if(item.no_name_lookup){
				if(item.noted&&note){
					payload.push("","","");
				}
				payload.push(1);
			}
			return item.id+":["+payload.join(",")+"]";
		}).join(",");
		str="define(function(){var d={"+out+"};"+str;
		done(str);//return 
	});
});

module.exports = {
	files:["index.js","names.json","header.js","coords.json"],//reload module if any of these change
	routes:{ // db.os.rsdb.tk/itemlist/index.js
		"index.js":function(req,res,next){
			wait.Call(req,res); //just let the waiter handle this
		},
	},
	exports:wait.exports,//allow us to be requried by other server modules
};