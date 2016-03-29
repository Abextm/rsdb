//define(['itemlist/index'],function(ItemList){var d={...};
var NecroSpell=function(id){
	this.ID=id;
};
AddGetter({//Name Level MageXP PrayerXP [runes]
	Name:function(){return "Reanimate "+d[this.ID][0]},
	Head:function(){return ItemList.Get(this.ID)},
	Level:function(){return d[this.ID][1]},
	MagicExp:function(){return d[this.ID][2]},
	PrayerExp:function(){return d[this.ID][3]},
	Runes:function(){return d[this.ID][4].map(function(r){return ItemList.Get(r)})},
},NecroSpell);
var Get=function(n){
	return d[n]&&new NecroSpell(n);
};
return{
	Name:"Necromancy",
	Get:Get,
	Spells:Object.keys(d).map(function(n){return Get(n);}),
	Type:NecroSpell,
};
});
