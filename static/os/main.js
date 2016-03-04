document.body.addEventListener("click",function(ev){
  if(ev.target.tagName!="LEGEND"||ev.target.parentElement.tagName!="FIELDSET"){
    return;
  }
  ev.target.parentElement.classList.toggle("fs-hidden");
});
require.config({
	baseUrl:(function(){
		var l=window.location;
		return l.protocol+"//db."+l.host+"/";
	})(),
});
Array.from(document.getElementsByTagName("template")).filter(function(el){
	return el&&el.attributes&&el.attributes.require;
}).forEach(function(el){
	var req=el.attributes.require.value;
	req=req.split(",").map(function(v){
		if(v.indexOf("/")==-1) return v+"/index";
		return v;
	});
	require(req,function(){
		var args=arguments;
		req.forEach(function(e,i){
			if(args[i]){
				if(args[i].Name) {
					window[args[i].Name]=args[i];
				}else{
					window[e]=args[i];
				}
			}else{
				console.error(e,"is falsey");
			}
		});
		try{
			el.parentElement.insertBefore(document.importNode(el.content,true),el);
		}catch(e){
			console.error(e);
		}
	});
});