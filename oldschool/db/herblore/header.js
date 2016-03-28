//define(["itemlist/index"],function(ItemList){var p={...};var h={...};
var PotRec=function(id){
	this.ID=id;
};
AddGetter({//Level Exp Primary Secondarys[],
	Level:function(){var _=p[this.ID];return _?_[0]:undefined;},
	Exp:function(){var _=p[this.ID];return _?_[1]:undefined;},
	Primary:function(){var _=p[this.ID];return _?ItemList.GetID(_[2]):undefined;},
	Secondarys:function(){var _=p[this.ID];return _?((_[3]||[]).map(ItemList.GetID)):undefined;},
},PotRec);
AddGetter({// Exp Lvl CleanID UnfID
	PotionRecipe:function(){if(p[this.ID])return new PotRec(this.ID);},
	CleanExp:function(){if(h[this.ID])return h[this.ID][0]},
	CleanLevel:function(){if(h[this.ID])return h[this.ID][1]},
	CleanHerb:function(){if(h[this.ID])return ItemList.GetID(h[this.ID][2])},
	GrimyHerb:function(){if(glook[this.ID])return ItemList.GetID(glook[this.ID])},
	UnfPot:function(){return ItemList.GetID(h[this.ID]?h[this.ID][3]:ulook[this.ID],1,1)},
	Herb:function(){if(uhlook[this.ID])return ItemList.GetID(uhlook[this.ID])},
},ItemList.Type);
var it=ItemList.Get(0);
var glook={};//c>g
var ulook={};//c>u
var uhlook={};//u>c
Object.keys(h).forEach(function(gid){
	it.ID=gid;
	var cid=it.CleanHerb.ID;
	var uid=it.UnfPot.ID;
	glook[cid]=gid;
	ulook[cid]=uid;
	uhlook[uid]=cid;
	return cid;
});
return{
	Name:"Herblore",
	CleanHerbs:Object.keys(glook),
	Unfinished:Object.keys(uhlook),
	GrimyHerbs:Object.keys(h),
	Potions:Object.keys(p),
	Type:PotRec,
};
});
