var express = require("express");
var config = require("./config.js");
var fs = require("fs");
var httpProxy = require("http-proxy");

var app = express();
app.use(require("helmet")());

var proxy = httpProxy.createProxyServer({
	target:"http://"+config.StatusIP+":"+config.StatusPort,
	xfwd:true,
});

require("rimraf").sync(config.Temp);
fs.mkdirSync(config.Temp);

//subdomain routers
var sub={};
var staticMap={
	"www":"static/www",
	"os":"static/os",
	"calc.os":"oldschool/calc",
	"db.os":config.Temp,
};
["","status","www","os","db.os","calc.os"].map(function(s){
	sub[s]=express.Router();
});

//subdomain muxer
app.use(function(req,res,next){
	var s=[].concat(req.subdomains);
	s.reverse();
	var subs=s.join(".");
	sub[subs](req,res,next);
});

sub[""].use(function(req,res){
	res.redirect(302,"http://www."+req.hostname+req.path);
});
sub.status.use(function(req,res){
	return proxy.web(req,res);
});

//static serving
for(var k in staticMap){
	sub[k].use(express.static(__dirname+"/"+staticMap[k]+"/"));
}

//Openshift
app.get("/status",function(req,res){
	res.status(200).end();
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