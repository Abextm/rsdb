var e = process.env;
if(e.OPENSHIFT_APP_NAME){
	module.exports = {
		IP:e.OPENSHIFT_NODEJS_IP,
		Port:e.OPENSHIFT_NODEJS_PORT,
		TrustProxy:true,
	};
} else {
	module.exports = {
		IP:"0.0.0.0",
		Port:80,
		TrustProxy:false,
	};
}