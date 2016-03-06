(function(){
	var f={attribute:{property:'child'}}
	var a=function(attr){
		return {
			get:function(){return this.xtag.child[attr];},
			set:function(v){this.xtag.child[attr]=v;},
		};
	}

	xtag.register("rsdb-opt",{
		lifecycle:{
			created:function(){
				this.innerHTML='<label><input type="checkbox">'+this.innerHTML+'</label>'
				this.xtag.child=this.querySelector("input");
				var that=this;
				this.xtag.child.addEventListener("change",function(){
					if(that.change)eval(that.change);
				})
			},
		},
		accessors:{
			checked:f,
			disabled:f,
			form:f,
			name:f,
			size:f,
			tabindex:f,
			value:a("checked"),
			change:{attribute:{}},
		},
	});

	xtag.register("rsdb-item",{
		lifecycle:{
			created:function(){
				this.item=this.item||this.innerHTML;
			}
		},
		accessors:{
			item:{
				attribute:{},
				set:function(v){
					if(v){
						var Item=ItemList.Get(v)||ItemList.Get(3247);
						this.title=Item.ID;
						this.innerHTML=[
"<div><img src=\"",Item.Icon,"\"></div>",
"<span>",Item.Name,"</span>"
						].join("");
					}
				},
			},
		},
	});

	xtag.register("rsdb-title",{
		lifecycle:{
			created:function(){
				document.title=this.innerText+" - RSDB Oldschool";
			},
		},
	});

	numrepeatregex=/(.+?)\1+/
	xtag.register("rsdb-num",{
		lifecycle:{
			created:function(){
				this.value=this.innerHTML;
			},
		},
		accessors:{
			value:{
				attribute:{},
				set:function(v){
					if(v){
						this.title=v;
						var dot=v.indexOf(".");
						var trailer="";
						var forward=v;
						var precision;
						if(this.precision){
							precision=parseInt(this.precision);
							if(isNaN(precision))precision=undefined;
							if(precision)precision+=1;//include the .
						}
						if(dot!=-1){
							var dec=v.substr(dot+1);
							var nr=numrepeatregex.exec(dec)
							if(nr&&!precision){
								if(nr[1]!="0"){
									trailer=v.substr(dot,nr.index+1)+"<span class='repeating'>"+nr[1]+"</span>";
								}
							}else{
								trailer=v.substr(dot);
							}
							while(trailer.length<precision){
								trailer=trailer+"0";
							}
							if(precision)trailer=trailer.substr(0,precision);
							forward=v.substr(0,dot);
						}else if(precision){
							trailer=".0";
						}
						while(trailer.length<precision){
							trailer=trailer+"0";
						}
						var sign="";
						if(forward[0]=="-"||forward[0]=="+"){
							sign=forward[0];
							forward=forward.substr(1);
						}
						if(forward.length==0&&sign.length){
							forward="0";
						}
						if(!precision){
							if(forward.length>4){
								trailer="";
							}
							var i=0;
							while(forward.length>4){
								i++;
								forward=forward.slice(0,-3);
							}
							forward+=[""," K"," M"," B"," T"," Q"][i]
						}
						this.innerHTML=sign+forward+trailer;
					}
				},
			},
			precision:{
				attribute:{},
				set:function(){
					this.value=this.value;
				}
			}
		},
	});

	var coll = new Intl.Collator("en-us-u-co-phonebk-kn-true",{sensitivity:"accent",numeric:true});
	xtag.register("rsdb-sort",{
		lifecycle:{
			created:function(){
				this.addEventListener("click",function(){
					this.mode=(this.mode+1)%3
				});
			},
			finalized:function(){
				this.scs(this.setCurrentSort);
				this.mode=this.mode||-1;
			},
		},
		accessors:{
			mode:{
				attribute:{},
				set:function(v){
					this.update(v);
				},
			},
			currentSort:{
				get:function(){
					var tr=this.parentElement;
					while(tr.tagName!="TR"){
						tr=tr.parentElement;
					}
					for(var i=0;i<tr.children.length;i++){
						var e=tr.children[i].getElementsByTagName("RSDB-SORT");
						if(e[0]){
							e=e[0];
							if(e.mode&&e.mode!=="0"){
								return [i,e.mode].join(";");
							}
						}
					}
					return "0;0";
				},
			},
			setCurrentSort:{
				set:function(v){
					this.scs(v);
				},
			},
		},
		methods:{
			scs:function(v){
				if(!v)return;
				var a=v.split(";");
				var cid=parseInt(a[0]);
				var mode=a[1];
				if(mode==0)return;
				var tr=this.parentElement;
				while(tr.tagName!="TR"){
					tr=tr.parentElement;
				}
				console.log(tr,cid,tr.children[cid])
				tr.children[cid].getElementsByTagName("RSDB-SORT")[0].mode=mode;
				console.log(tr.children[cid].getElementsByTagName("RSDB-SORT")[0].mode);
			},
			update:function(v){
				if(this.last==v)return;
				this.last=v;
				if(v==-1){
					return this.mode=this.last=0;
				}
				var rev=v==2?-1:1;
				var tr=this.parentElement;
				var p=this;
				while(tr.tagName!="TR"){
					p=tr;
					tr=tr.parentElement;
				}
				var cid=-1;
				while(p){
					cid++;
					p=p.previousSibling;
				}
				Array.from(tr.children).forEach(function(e,i){
					if(i!=cid){
						Array.from(e.getElementsByTagName("rsdb-sort")).forEach(function(e){
							e.mode=-1;
						});
					}
				});
				var tbody=tr.parentElement;
				Array.from(tbody.children).filter(function(e){
					return e.tagName=="TR"&&e.children&&e.children[0]&&e.children[0].tagName!="TH";
				}).map(function(e,i){
					if(e.dataset.defaultsort===undefined)e.dataset.defaultsort=i;
					var sort;
					if(v==0){
						sort=e.dataset.defaultsort;
					}else{
						var ee=e.children[cid];
						if(ee.children&&ee.children[0]&&ee.children[0].tagName=="RSDB-NUM"){
							sort=ee.children[0].value;
						}else{
							sort=ee.innerText;
						}
					}
					return {
						el:e,
						s:sort,
					};
				}).sort(function(a,b){
					var aa=parseInt(a.s);
					var v;
					if(!isNaN(aa)){
						var bb=parseInt(b.s);
						if(!isNaN(bb)){
							v=bb-aa;
						}
					}
					v=v||coll.compare(a.s,b.s);
					return v*rev;
				}).forEach(function(v){
					tbody.removeChild(v.el);
					tbody.appendChild(v.el);
				});
			}
		},
	});
})();
function replaceSortedTable(old,newhtml){
	var template = document.createElement('template');
  template.innerHTML=newhtml;
  var newNode=document.importNode(template.content, true);
  var oldsort=old.getElementsByTagName("RSDB-SORT")[0];
  if(oldsort) newNode.children[0].getElementsByTagName("RSDB-SORT")[0].setCurrentSort=oldsort.currentSort;
	old.parentElement.replaceChild(newNode,old);
}