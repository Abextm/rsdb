//define(["itemlist/index"],function(ItemList){var d={...};
	ItemList.AddGetter({//[ore id] level exp coal? (ItemRun BFCoal)?
		Ores:function(){return d[this.ID][0];},
		BarLevel:function(){return d[this.ID][1];},
		BarExp:function(){return d[this.ID][2];},
		Coal:function(){return d[this.ID][3]||0;},
		ItemRun:function(){return d[this.ID][4];},
		BFCoal:function(){return d[this.ID][5];},
	});
	var ret=Object.keys(d).map(function(k){
		return ItemList.GetID(k);
	});
	if(this.window){
		if(!window.Smithing)window.Smithing={};
		window.Smithing.Bars=ret;
	}
	return ret;
});