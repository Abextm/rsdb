//Load deps
var db = require("db");
var waiter=require("waiter");
var fs = require("fs");

var wait = waiter({
	Cache:30*60,
	ETag:0,
	EvalExports:true,
	Revalidate:function(){
		return false;
	},
},function(done){
	db.require(["itemlist"],function(ItemList){
var Spells={
	"Goblin": {
		"Head": "Ensouled goblin head",
		"Level": 3,
		"MagicExp": 6,
		"PrayerExp": 130,
		"Runes": [
			["Nature rune", 1],
			["Body rune", 2]
		]
	},
	"Monkey": {
		"Head": "Ensouled monkey head",
		"Level": 7,
		"MagicExp": 14,
		"PrayerExp": 182,
		"Runes": [
			["Nature rune", 1],
			["Body rune", 3]
		]
	},
	"Imp": {
		"Head": "Ensouled imp head",
		"Level": 12,
		"MagicExp": 24,
		"PrayerExp": 286,
		"Runes": [
			["Nature rune", 2],
			["Body rune", 3]
		]
	},
	"Minotaur": {
		"Head": "Ensouled minotaur head",
		"Level": 16,
		"MagicExp": 32,
		"PrayerExp": 364,
		"Runes": [
			["Nature rune", 2],
			["Body rune", 4]
		]
	},
	"Scorpion": {
		"Head": "Ensouled scorpion head",
		"Level": 19,
		"MagicExp": 38,
		"PrayerExp": 454,
		"Runes": [
			["Soul rune", 1],
			["Nature rune", 1]
		]
	},
	"Bear": {
		"Head": "Ensouled bear head",
		"Level": 21,
		"MagicExp": 42,
		"PrayerExp": 480,
		"Runes": [
			["Soul rune", 1],
			["Nature rune", 1],
			["Body rune", 1]
		]
	},
	"Unicorn": {
		"Head": "Ensouled unicorn head",
		"Level": 22,
		"MagicExp": 44,
		"PrayerExp": 494,
		"Runes": [
			["Soul rune", 1],
			["Nature rune", 1],
			["Body rune", 2]
		]
	},
	"Dog": {
		"Head": "Ensouled dog head",
		"Level": 26,
		"MagicExp": 52,
		"PrayerExp": 520,
		"Runes": [
			["Soul rune", 1],
			["Nature rune", 2],
			["Body rune", 2]
		]
	},
	"Chaos Druid": {
		"Head": "Ensouled chaos druid head",
		"Level": 30,
		"MagicExp": 60,
		"PrayerExp": 584,
		"Runes": [
			["Soul rune", 1],
			["Nature rune", 2],
			["Body rune", 3]
		]
	},
	"Giant": {
		"Head": "Ensouled giant head",
		"Level": 37,
		"MagicExp": 74,
		"PrayerExp": 650,
		"Runes": [
			["Soul rune", 1],
			["Nature rune", 2],
			["Body rune", 4]
		]
	},
	"Ogre": {
		"Head": "Ensouled ogre head",
		"Level": 40,
		"MagicExp": 80,
		"PrayerExp": 716,
		"Runes": [
			["Soul rune", 1],
			["Nature rune", 3],
			["Body rune", 4]
		]
	},
	"Elf": {
		"Head": "Ensouled elf head",
		"Level": 43,
		"MagicExp": 86,
		"PrayerExp": 754,
		"Runes": [
			["Soul rune", 2],
			["Nature rune", 2],
			["Body rune", 2]
		]
	},
	"Troll": {
		"Head": "Ensouled troll head",
		"Level": 46,
		"MagicExp": 92,
		"PrayerExp": 780,
		"Runes": [
			["Soul rune", 2],
			["Nature rune", 2],
			["Body rune", 3]
		]
	},
	"Horror": {
		"Head": "Ensouled horror head",
		"Level": 52,
		"MagicExp": 104,
		"PrayerExp": 832,
		"Runes": [
			["Soul rune", 2],
			["Nature rune", 2],
			["Body rune", 4]
		]
	},
	"Kalphite": {
		"Head": "Ensouled kalphite head",
		"Level": 57,
		"MagicExp": 114,
		"PrayerExp": 884,
		"Runes": [
			["Soul rune", 2],
			["Nature rune", 3],
			["Body rune", 4]
		]
	},
	"Dagannoth": {
		"Head": "Ensouled dagannoth head",
		"Level": 62,
		"MagicExp": 124,
		"PrayerExp": 936,
		"Runes": [
			["Soul rune", 3],
			["Nature rune", 3],
			["Body rune", 4]
		]
	},
	"Bloodveld": {
		"Head": "Ensouled bloodveld head",
		"Level": 65,
		"MagicExp": 130,
		"PrayerExp": 1040,
		"Runes": [
			["Soul rune", 2],
			["Blood rune", 1],
			["Nature rune", 2]
		]
	},
	"TzHaar": {
		"Head": "Ensouled tzhaar head",
		"Level": 69,
		"MagicExp": 138,
		"PrayerExp": 1104,
		"Runes": [
			["Soul rune", 2],
			["Blood rune", 1],
			["Nature rune", 3]
		]
	},
	"Demon": {
		"Head": "Ensouled demon head",
		"Level": 72,
		"MagicExp": 144,
		"PrayerExp": 1170,
		"Runes": [
			["Soul rune", 2],
			["Blood rune", 1],
			["Nature rune", 4]
		]
	},
	"Aviansie": {
		"Head": "Ensouled aviansie head",
		"Level": 78,
		"MagicExp": 156,
		"PrayerExp": 1234,
		"Runes": [
			["Soul rune", 3],
			["Blood rune", 1],
			["Nature rune", 4]
		]
	},
	"Abyssal Creature": {
		"Head": "Ensouled abyssal head",
		"Level": 85,
		"MagicExp": 170,
		"PrayerExp": 1300,
		"Runes": [
			["Soul rune", 4],
			["Blood rune", 1],
			["Nature rune", 4]
		]
	},
	"Dragon": {
		"Head": "Ensouled dragon head",
		"Level": 93,
		"MagicExp": 186,
		"PrayerExp": 1560,
		"Runes": [
			["Soul rune", 4],
			["Blood rune", 2],
			["Nature rune", 4]
		]
	}
};
		fs.readFile(__dirname+"/header.js",function(err,str){
			str="define(['itemlist/index'],function(ItemList){var d={"+Object.keys(Spells).map(function(k){
				var Spell=Spells[k];
				//Name Level MageXP PrayerXP [runes]
				out=(parseInt(ItemList.GetName(Spell.Head).ID)+1)+":["+([
					'"'+k+'"',
					Spell.Level,
					Spell.MagicExp,
					Spell.PrayerExp,
					"["+Spell.Runes.map(function(i){
						return JSON.stringify(ItemList.Get(i).Serial);
					}).join(",")+"]",
				].join(","))+"]";
				return out;
			}).join(",")+"};"+str;
			done(str);
		});
	});
});

module.exports = {
	files:["index.js","header.js"],//reload module if any of these change
	routes:{ 
		"index.js":function(req,res,next){
			wait.Call(req,res);
		},
	},
	exports:wait.exports,//allow us to be requried by other server modules
};