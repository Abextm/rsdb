//define(["itemlist/index"],function(ItemList){var d={...};
	ItemList.AddGetter({//overall buy sell members
		Overall:function(){return d[this.ID][0]||0;},
		Buy:function(){return d[this.ID][1]||0;},
		Sell:function(){return d[this.ID][2]||0;},
		Members:function(){return d[this.ID][3]?true:false;},
	});
	return {
		loaded:true,
	};
});