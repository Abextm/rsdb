module.exports={
	require:function(module,cb,errcb){
		if(!Array.isArray(module))module=[module];
		Promise.all(module.map(function(mod){
			return new Promise(function(ok,reject){
				var load=require("./load");
				load("oldschool/db/"+mod.replace("/index",""),
					function(err,exp){
					if(err)return reject(err);
					exp.exports(ok);
				});
			});
		})).then(function(a){
			cb.apply(this,a);
		}).catch(function(err){
			console.error("Error loading",module,err);
			if(err.stack)console.log(err.stack);
			errcb(err);
		});
	},
}