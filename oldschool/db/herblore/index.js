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
var Herbs={
	"Guam leaf":{
		Exp:2.5,
		Level:3,
		Unf:"Guam potion (unf)",
	},
	"Rogue's purse":{
		Exp:2.5,
		Level:3,
		Unf:4840,
	},
	Marrentill:{
		Exp:3.8,
		Level:5
	},
	Tarromin:{
		Exp:5,
		Level:11
	},
	Harralander:{
		Exp:6.3,
		Level:20
	},
	"Ranarr weed":{
		Exp:7.5,
		Level:25,
		Unf:"Ranarr potion (unf)",	
	},
	Toadflax:{
		Exp:8,
		Level:30
	},
	"Irit leaf":{
		Exp:8.8,
		Level:40,
		Unf:"Irit potion (unf)"
	},
	Avantoe:{
		Exp:10,
		Level:48
	},
	Kwuarm:{
		Exp:11.3,
		Level:54
	},
	Snapdragon:{
		Exp:11.8,
		Level:59
	},
	Cadantine:{
		Exp:12.5,
		Level:65
	},
	Lantadyme:{
		Exp:13.1,
		Level:67
	},
	"Dwarf weed":{
		Exp:13.8,
		Level:70
	},
	Torstol:{
		Exp:15,
		Level:75
	},
};
var Pots={
	"Attack potion":{
		Level:3,
		Exp:25,
		Primary:"Guam potion (unf)",
		Secondarys:["Eye of newt"],
	},
	"Antipoison":{
		Level:5,
		Exp:37.5,
		Primary:"Marrentill potion (unf)",
		Secondarys:["Unicorn horn dust"],
	},
	"Relicym's balm":{
		Level:8,
		Exp:40,
		Primary:4840,
		Secondarys:["Snake weed"],
	},
	"Strength potion":{
		Level:12,
		Exp:50,
		Primary:"Tarromin potion (unf)",
		Secondarys:["Limpwurt root"],
	},
	"Serum 207":{
		Level:15,
		Exp:50,
		Primary:"Tarromin potion (unf)",
		Secondarys:["Ashes"],
	},
	"Guthix rest":{
		Level:18,
		Exp:59.5,
		Primary:"Empty cup",
		Secondarys:[["Guam leaf",2],"Marrentill","Harralander"],
	},
	"Guam tar":{
		Level:19,
		Exp:30,
		Primary:"Guam leaf",
		Secondarys:[["Swamp tar",15]],
	},
	"Restore potion":{
		Level:22,
		Exp:62.5,
		Primary:"Harralander potion (unf)",
		Secondarys:["Red spiders' eggs"],
	},
	"Guthix balance":{
		Level:22,
		Exp:62.5,
		Primary:"Harralander potion (unf)",
		Secondarys:["Red spiders' eggs", "Garlic", "Silver dust"],
	},
	"Blamish oil":{
		Level:25,
		Exp:80,
		Primary:"Harralander potion (unf)",
		Secondarys:["Blamish snail slime"],
	},
	"Energy potion":{
		Level:26,
		Exp:67.5,
		Primary:"Harralander potion (unf)",
		Secondarys:["Chocolate dust"],
	},
	"Defence potion":{
		Level:30,
		Exp:75,
		Primary:"Ranarr potion (unf)",
		Secondarys:["White berries"],
	},
	"Marrentill tar":{
		Level:31,
		Exp:42.5,
		Primary:"Marrentill",
		Secondarys:[["Swamp tar",15]],
		Container:"",
	},
	"Agility potion":{
		Level:34,
		Exp:80,
		Primary:"Toadflax potion (unf)",
		Secondarys:["Toad's legs"],
	},
	"Combat potion":{
		Level:36,
		Exp:84,
		Primary:"Harralander potion (unf)",
		Secondarys:["Goat horn dust"],
	},
	"Prayer potion":{
		Level:38,
		Exp:87.5,
		Primary:"Ranarr potion (unf)",
		Secondarys:["Snape grass"],
	},
	"Tarromin tar":{
		Level:39,
		Exp:55,
		Primary:"Tarromin",
		Secondarys:[["Swamp tar",15]],
		Container:""
	},
	"Harralander tar":{
		Level:44,
		Exp:72.5,
		Primary:"Harralander",
		Secondarys:[["Swamp tar",15]],
		Container:""
	},
	"Super attack":{
		Level:45,
		Exp:100,
		Primary:"Irit potion (unf)",
		Secondarys:["Eye of newt"],
	},
	"Superantipoison":{
		Level:48,
		Exp:106.3,
		Primary:"Irit potion (unf)",
		Secondarys:["Unicorn horn dust"],
	},
	"Fishing potion":{
		Level:50,
		Exp:112.5,
		Primary:"Avantoe potion (unf)",
		Secondarys:["Snape grass"],
	},
	"Super energy":{
		Level:52,
		Exp:117.5,
		Primary:"Avantoe potion (unf)",
		Secondarys:["Mort myre fungus"],
	},
	"Shrink-me-quick":{
		Level:52,
		Exp:6,
		Primary:"Tarromin potion (unf)",
		Secondarys:["Shrunk ogleroot"],
	},
	"Hunter potion":{
		Level:53,
		Exp:120,
		Primary:"Avantoe potion (unf)",
		Secondarys:["Kebbit teeth dust"],
	},
	"Super strength":{
		Level:55,
		Exp:125,
		Primary:"Kwuarm potion (unf)",
		Secondarys:["Limpwurt root"],
	},
	"Magic essence":{
		Level:57,
		Exp:130,
		Primary:"Vial of water",
		Secondarys:["Star flower","Gorak claw powder"],
	},
	"Weapon poison":{
		Level:60,
		Exp:137.5,
		Primary:"Kwuarm potion (unf)",
		Secondarys:["Blue dragon scale"],
	},
	"Super restore":{
		Level:63,
		Exp:142.5,
		Primary:"Snapdragon potion (unf)",
		Secondarys:["Red spiders' eggs"],
	},
	"Sanfew serum":{
		Level:65,
		Exp:160,
		Primary:"Snapdragon potion (unf)",
		Secondarys:["Red spiders' eggs", "Unicorn horn dust", "Snake weed", "Nail beast nails"],
	},
	"Super defence":{
		Level:66,
		Exp:150,
		Primary:"Cadantine potion (unf)",
		Secondarys:["White berries"],
	},
	"Antidote+":{
		Level:68,
		Exp:155,
		Primary:"Toadflax potion (unf)",
		Secondarys:["Yew roots"]
	},
	"Antifire potion":{
		Level:69,
		Exp:157.5,
		Primary:"Lantadyme potion (unf)",
		Secondarys:["Blue dragon scale"],
	},
	"Ranging potion":{
		Level:72,
		Exp:162.5,
		Primary:"Dwarf weed potion (unf)",
		Secondarys:["Wine of zamorak"]
	},
	"Weapon poison(+)":{
		Level:73,
		Exp:165,
		Primary:"Coconut milk",
		Secondarys:["Red spiders' eggs","Cactus spine"],
	},
	"Magic potion":{
		Level:76,
		Exp:172.5,
		Primary:"Lantadyme potion (unf)",
		Secondarys:["Potato cactus"],
	},
	"Stamina potion(1)":{
		Level:77,
		Exp:25.5,
		Primary:"Super energy(1)",
		Secondarys:["Amylase crystal"],
	},
	"Stamina potion(2)":{
		Level:77,
		Exp:25.5*2,
		Primary:"Super energy(2)",
		Secondarys:[["Amylase crystal",2]],
	},
	"Stamina potion(3)":{
		Level:77,
		Exp:25.5*3,
		Primary:"Super energy(3)",
		Secondarys:[["Amylase crystal",3]],
	},
	"Stamina potion(4)":{
		Level:77,
		Exp:25.5*4,
		Primary:"Super energy(4)",
		Secondarys:[["Amylase crystal",4]],
	},
	"Zamorak brew":{
		Level:78,
		Exp:175,
		Primary:"Torstol potion (unf)",
		Secondarys:["Jangerberries"],
	},
	"Antidote++":{
		Level:79,
		Exp:177.5,
		Primary:"Coconut milk",
		Secondarys:["Magic roots","Irit leaf"],
	},
	"Saradomin brew":{
		Level:81,
		Exp:180,
		Primary:"Toadflax potion (unf)",
		Secondarys:["Crushed nest"],
	},
	"Weapon poison(++)":{
		Level:82,
		Exp:190,
		Primary:"Cave nightshade",
		Secondarys:["Poison ivy berries"],
		Container:"Coconut milk",
	},
	"Extended antifire":{
		Level:84,
		Exp:110,
		Primary:"Antifire potion(3)",
		Secondarys:["Lava scale shard"],
	},
	"Anti-venom(1)":{
		Level:87,
		Exp:30*1,
		Primary:"Antidote++(1)",
		Secondarys:[["Zulrah's scales",5]],
	},
	"Anti-venom(2)":{
		Level:87,
		Exp:30*2,
		Primary:"Antidote++(2)",
		Secondarys:[["Zulrah's scales",10]],
	},
	"Anti-venom(3)":{
		Level:87,
		Exp:30*3,
		Primary:"Antidote++(3)",
		Secondarys:[["Zulrah's scales",15]],
	},
	"Anti-venom(4)":{
		Level:87,
		Exp:30*4,
		Primary:"Antidote++(4)",
		Secondarys:[["Zulrah's scales",20]],
	},
	"Super combat potion":{
		Level:90,
		Exp:150,
		Primary:"Torstol",
		Secondarys:["Super attack(4)", "Super strength(4)", "Super defence(4)"],
	},
	"Anti-venom+":{
		Level:94,
		Exp:125,
		Container:"Anti-venom",
		Primary:"Torstol",
		Secondarys:[],
	},
};
		fs.readFile(__dirname+"/header.js",function(err,str){
			str="define(['itemlist/index'],function(ItemList){var h={"+Object.keys(Herbs).map(function(k){
				// Exp Lvl CleanID UnfID
				var Herb=Herbs[k];
				out=ItemList.GetName(Herb.Grimy||("Grimy "+k.toLowerCase())).ID+":["+([
					Herb.Exp,
					Herb.Level,
					ItemList.Get(k).ID,
					ItemList.Get(Herb.Unf||(k+" potion (unf)")).ID,
				].join(","))+"]";
				return out;
			}).join(",")+"};var p={"+Object.keys(Pots).map(function(k){
				//Level Exp Primary Secondarys[]
				var Pot=Pots[k];
				var d=[
					Pot.Level,
					Pot.Exp,
					ItemList.Get(Pot.Primary).ID,
					"["+Pot.Secondarys.map(function(ing){
						var item=ItemList.Get(ing);
						if(item.Count>1) return "["+item.ID+","+item.Count+"]";
						return item.ID;
					}).join(",")+"]",
				];
				var out=(ItemList.GetName(k,1,1)||ItemList.GetName(k+" (3)",1,1)||(ItemList.GetName(k+"(3)"))).ID+":["+d.join(",")+"]";
				return out;
			})+"};"+str;
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