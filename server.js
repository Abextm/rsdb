var express = require("express");
var config = require("./config.js");
var fs = require("fs");
var load = require("./load");

var app = express();
app.set("trust proxy",config.TrustProxy)
app.use(require("helmet")());

//subdomain routers
var sub={};
var staticMap={
	"":"static/www",
	"os":"static/os",
};
["","www","os","db.os"].map(function(s){
	sub[s]=express.Router();
});

//subdomain muxer
app.use(function(req,res,next){
	var s=[].concat(req.subdomains);
	s.reverse();
	var subs=s.join(".");
	sub[subs](req,res,next);
});

sub["www"].use(function(req,res){
	var host = req.hostname.split(".");
	host=host.slice(1);
	res.redirect(301,"http://"+host.join(".")+req.path);
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
for(var k in staticMap){
	sub[k].use(express.static(__dirname+"/"+staticMap[k]+"/"))
	sub[k].use(serveTMPL.bind(0,__dirname+"/"+staticMap[k]+"/"));
}

sub["os"].use(express.static(__dirname+"/oldschool/calc/"))
sub["os"].use(serveTMPL.bind(0,__dirname+"/oldschool/calc/"));
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
	res.redirect(301,"http://os."+req.hostname+"/"+req.params.name);
});

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