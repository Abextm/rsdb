module.exports = function(cb){
	//OSBuddy (names.json)
	var names = require("./names.json");
	var fs = require("fs");
	var str=fs.readFileSync(__dirname+"/header.js");
	for(var id in names){
		arr=[
			names[id].Name,
			names[id].Store,
			names[id].Note||0,
		];
		var additional={};
		var added=false;
		for(var v in names[id]){
			if(v!="Store"&&v!="Name"&&v!="Note"){
				added=true;
				additional[v]=names[id][v];
			}
		}
		if(added){
			arr[3]=additional;
		}
		names[id]=arr;
	}
	str+="_store:"+JSON.stringify(names);
	str+="};return ItemList;})();";
	cb({
		data:str,
		interval:0,
	});
};