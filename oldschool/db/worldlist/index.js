//Load deps
var waiter=require("waiter");
var fs = require("fs");
var cloudscraper=require("cloudscraper");

var geData={};
var nextupdate;
var wait = waiter({
	Cache:5*60,
	ETag:0,
	SendOldDuringUpdate:true,
	Revalidate:function(){
		return Date.now()-nextupdate>0;
	},
},function(done){
	nextupdate=Date.now()+(1000*60*5);
	var str="";
	var doErr=function(err){
		console.log(err);
		var out=JSON.stringify(err);
		str="define(function(){var d={"+out+"};"+str;
		done(str);//return 
		return;
	}
	fs.readFile(__dirname+"/header.js",function(err,str){
		if(err) return doErr({err:err,from:"fs"});
		cloudscraper.request({
			method:"GET",
			url:"http://www.runescape.com/g=oldscape/slr.ws?order=LPWM",
			encoding:null,
		},function(err,res,body){
			if(err)return doErr({err:err,from:"cs"});
			var buf=new Buffer(body);
			var d=[];
			var i=2;
			var len=buf.readUInt16BE(i);i+=2;
			i+=2;
			for(;;){
				var World={};
				World.Number=buf.readUInt16BE(i);i+=2;
				World.Flags=buf.readUInt32BE(i);i+=4;
				for(var end=i;;end++){
					if(buf.readInt8(end)==0)break;
				}
				World.Name=buf.toString('utf8',i,end);
				i=end+1;
				for(var end=i;;end++){
					if(buf.readInt8(end)==0)break;
				}
				World.Description=buf.toString('utf8',i,end);
				i=end+1;
				World.Location=buf.readUInt8(i);i+=1;
				World.Players=buf.readUInt16BE(i);i+=2;

				var a =[World.Description=="-"?"":JSON.stringify(World.Description),World.Location?World.Location:"",World.Players,World.Flags?World.Flags:""];
				d.push((World.Number-300)+":["+a.join(",")+"]");
				if(i>len)break;
			}
			done("define(function(){var d={"+d.join(",")+"};"+str);
		});
	});
});
module.exports = {
	files:["index.js","header.js"],//reload module if any of these change
	routes:{ 
		"index.js":function(req,res,next){
			wait.Call(req,res);
		},
		"flags.png":function(req,res,next){
			res.sendFile(__dirname+"/flags.png");
		}
	},
};