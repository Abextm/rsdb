var e = process.env;
if(e.OPENSHIFT_APP_NAME){
	module.exports = {
		IP:e.OPENSHIFT_NODEJS_IP,
		Port:e.OPENSHIFT_NODEJS_PORT,
		StatusIP:e.OPENSHIFT_INTERNAL_IP,
		StatusPort:29650,
		Temp:e.OPENSHIFT_TMP_DIR+"/db",
	};
} else {
	module.exports = {
		IP:"0.0.0.0",
		Port:80,
		StatusIP:"127.0.0.1",
		StatusPort:29650,
		Temp:__dirname+"/tmpdb",
	};
}