//define(["itemlist/index"],function(ItemList){var d={...};
	ItemList.AddGetter({//overall buy sell members
		Overall:function(){var _=d[this.ID];return (_?_[0]||_[1]||_[2]||0:1)*this.Count},
		Buy:function(){var _=d[this.ID];return (_?_[1]||_[0]||_[2]||0:1)*this.Count},
		Sell:function(){var _=d[this.ID];return (_?_[2]||_[0]||_[1]||0:1)*this.Count},
		Members:function(){return d[this.ID]?(d[this.ID][3]?true:false):undefined;},
	});
	return {
		Name:"Prices",
		Loaded:true,
	};
});