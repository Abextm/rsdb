//define(function(){var d={...};
	var World=function(id){
		this.ID=id;
	};
	World.prototype=Object.create(Object.prototype,{});
	var Flags={
		Members:1,
		NormalPvP:3,
		HighRiskPvP:11,
		BountyHunter:6,
		Deadman:30,
		DeadmanSeasonal:31,
		SkillTotal:8,
		LastManStanding:15,
	};
	var FlagMask=Object.keys(Flags).map(i=>Flags[i]).reduce((acc,b)=>acc|(1<<b-1),0);
	var skmatch = /([0-9]+) skill total/;
	AddGetter({//World.Description=="-"?"":JSON.stringify(World.Description),World.Location,World.Players,World.Flags
		Number:function(){return this.ID+300;},
		Host:function(){return "oldschool"+this.ID+".runescape.com";},
		Description:function(){return d[this.ID][0]||"-"},
		LocationCode:function(){return d[this.ID][1]||0},
		Location:function(){return {0:"United States",1:"United Kingdom",7:"Germany"}[this.LocationCode]||this.LocationCode},
		LocationCC:function(){return {0:"us",1:"gb",7:"de"}[this.LocationCode]||"?"},
		LocationHTML:function(){return "<span class='flag flag-"+this.LocationCC+"' title='"+this.Location+"'></span>"},
		Players:function(){return d[this.ID][2]},
		Flags:function(){return d[this.ID][3]},
		MinimumLevel:function(){return this.SkillTotal?parseInt(skmatch.exec(this.Description)[1]):0;},
		ExtraFlags:function(){return this.Flags&~FlagMask},
	},World);
	Object.keys(Flags).forEach(function(k){
		var i=Flags[k]-1;
		Flags[k]=function(){return (this.Flags>>i)&1}
	});
	AddGetter(Flags,World);
	var style=document.createElement("style");
	style.innerText=".flag{display:inline-block;width:16px;height:11px;background:url("+require.toUrl("./worldlist/flags.png")+") no-repeat}.flag.flag-de{background-position:-16px 0}.flag.flag-gb{background-position:0 -11px}.flag.flag-us {background-position: -16px -11px}";
	document.head.appendChild(style);
	return {
		Name:"WorldList",
		Worlds:Object.keys(d),
		Get:function(id){
			id=parseInt(id);
			if(d[id])return new World(id);
			if(d[id-300])return new World(id-300);
		},
	};
})