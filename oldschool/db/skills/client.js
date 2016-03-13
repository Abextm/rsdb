define(function(){
	var Skills="Overall Attack Defence Strength Hitpoints Ranged Prayer Magic Cooking Woodcutting Fletching Fishing Firemaking Crafting Smithing Mining Herblore Agility Thieving Slayer Farming Runecrafting Hunter Construction".split(" ");
	var Combat = function(s){
		var Base = 0.25*(s.Defence.Level + s.Hitpoints.Level + Math.floor(s.Prayer.Level/2));
    var Melee = 0.325*(s.Attack.Level + s.Strength.Level);
    var Range = 0.325*(Math.floor(s.Ranged.Level/2) + s.Ranged.Level);
    var Mage = 0.325*(Math.floor(s.Magic.Level/2) + s.Magic.Level)
    return {
			Level:Base+Math.max(Melee,Range,Mage),
			Base:Base,
			Melee:Melee,
			Range:Range,
			Mage:Mage,
			XP:["Defence","Hitpoints","Prayer","Attack","Ranged","Magic","Strength"].reduce(function(acc,name){
				return acc+s[name].XP;
			},0),
		};
	};
	return {
		Combat:Combat,
		Lookup:function(name,cb){
			return (new Promise(function(ok,err){
				var req=new XMLHttpRequest();
				var l=window.location;
				req.onerror=err
				req.onload=function(){
					if(req.status==404)return err("Cannot find user!");
					if(req.status!=200)return err(req.status);
					var Out={}
					var lines = req.response.split("\n");
					lines.forEach(function(e,i){
						var s = e.split(",");
						Out[Skills[i]]={
							Rank:parseInt(s[0]),
							Level:parseInt(s[1]),
							XP:parseInt(s[2]),
						};
					});
					Out.Clue={
						Rank:parseInt(lines[Skills.length][0]),
						Count:parseInt(lines[Skills.length][1]),
					};
					Out.Combat=Combat(Out);
					ok(Out);
				};
				req.open("GET",l.protocol+"//db."+l.host+"/skills/hiscore?p="+name);
				req.send();
			})).then(function(v){
				if(cb)cb(undefined,v)
			},function(err){
				if(cb)cb(err)
			});
		},
	Skills:Skills,
	Name:"Skills",
	}
});