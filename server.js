var express = require("express");
var config = require("./config.js");
var fs = require("fs");
var load = require("./load");

var app = express();
app.set("trust proxy",config.TrustProxy)
app.use(require("helmet")());

//subdomain routers
var sub={};
["","www","os","db.os"].map(function(s){
	sub[s]=express.Router();
});

//subdomain muxer
app.use(function(req,res,next){
	var s=[].concat(req.subdomains);
	s.reverse();
	var subs=s.join(".");
	if(subs=="db.os"){
		res.set({
			"Access-Control-Allow-Origin":"http://"+req.hostname.replace("db.",""),
			"Access-Control-Max-Age":"86400",
			"Access-Control-Allow-Headers":"*",
			"Access-Control-Allow-Methods":"*",
		});
	}
	if(req.method=="OPTIONS") return res.send();
		sub[subs]&&sub[subs](req,res,next);
});

sub["www"].use(function(req,res){
	var host = req.hostname.split(".");
	host=host.slice(1);
	var path = req.path;
	if(path[path.length-1]=="/")path=path.slice(0,-1);
	res.redirect(301,"http://"+host.join(".")+path);
});

//static serving
var tmpl=fs.readFileSync(__dirname+"/static/tmpl.html").toString().split("<<< - CONTENT - >>>");
var serveTMPL=function(v,req,res,next){
	var path=req.path;
	if(path[path.length-1]=="/"){
		path+="index";
	}
	fs.readFile(v+path+".tmpl",function(err,data){
		if(err)return next();
		res.send(tmpl[0]+data.toString()+tmpl[1]);
	});
}

var serves=[
	["","static/www"],
	["os","static/os"],
	["os","oldschool/calc"],
	["os","static/www"]
]

serves.forEach(function(v){
	sub[v[0]].use(express.static(__dirname+"/"+v[1]+"/",{
		maxAge:1000*60*5,
		lastModified:true,
	}));
	sub[v[0]].use(serveTMPL.bind(0,__dirname+"/"+v[1]+"/"));
});


sub["db.os"].get("/:name/:res",function(req,res,next){
	load("oldschool/db/"+req.params.name,function(err,mod){
		if(err){
			res.status(500);
			console.log(err,mod);
			res.send(err);
			return 
		}
		var route=mod.routes[req.params.res];
		if(route){
			route(req,res,next);
		}else{
			next();
		}
	})
});

//Openshift
app.get("/status",function(req,res){
	res.status(200).end();
});

sub[""].get("/:name(?:os([^\/]*))",function(req,res,next){
	var url="http://os."+req.hostname+"/"+req.params.name;
	res.send('<html><head><meta http-equiv="refresh" content="1; url='+url+'"></head><body><a href="'+url+'">Here!</a></body></html>');
	//res.redirect(301,url);
});

sub[""].get("/",function(req,res,next){
	var url="http://os."+req.hostname+"/";
	res.send('<html><head><meta http-equiv="refresh" content="1; url='+url+'"></head><body><a href="'+url+'">Here!</a></body></html>');
})

//Error handlers
app.use(function(req,res){//404
	res.status(404);
	if(req.xhr){
		res.send({error:"File not found"});
	}else{
		res.sendFile(__dirname+"/static/404.html");
	}
});
app.use(function(err,req,res,next){//5xx
	console.log(err.stack);
	res.status(500);
	if(req.xhr){
		res.send({error:err});
	}else{
		res.sendFile(__dirname+"/static/5xx.html");
	}
});

app.listen(config.Port,config.IP,function(){
	console.log("Started");
});