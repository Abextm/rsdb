var fs = require("fs");
if (process.argv.length<=3){
	return console.error("Usage [input dir] [output.js] [uglify]");
}

var path = require("path");

var mod = require(path.resolve(process.argv[2],"generate.js"));
mod(function(info){
	if(process.argv[4]){
		var uglify = require("uglify-js");
		var toplevel=uglify.parse(info.data,{
			filename:"out.js",
			toplevel:null,
		});
		toplevel.figure_out_scope();
		var comp = toplevel.transform(uglify.Compressor({
			sequences:true,
			dead_code:false,
			keep_fnames:true,
		}));
		comp.compute_char_frequency();
		comp.mangle_names();
		fs.writeFile(process.argv[3],comp.print_to_string({}),function(){});
	}else{
		fs.writeFile(process.argv[3],info.data,function(){});
	}
	console.log(JSON.stringify({
		interval:info.interval,
	}));
});