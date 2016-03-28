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
				this.xtag.child.name=this.id;
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
				this.iid=this.iid||this.innerHTML;
			}
		},
		accessors:{
			iid:{
				attribute:{},
				set:function(v){
					this.Update();
				},
			},
			count:{
				attribute:{},
				set:function(v){
					this.Update();
				},
			},
		},
		methods:{
			Update:function(){
				var Item=ItemList.Get(this.iid,this.count)||ItemList.Get(3247,this.count);
				this.innerHTML=[
"<div>",Item.IconHTML,"</div>",
"<span>",Item.Name,"</span>",
"<table class='popout'>",
	"<tr><th>Count</th><td>",this.count||1,"</td></tr>",
	window.Prices?[
		"<tr><th>Buy</th><td>",Item.Buy,"</td></tr>",
		"<tr><th>Sell</th><td>",Item.Sell,"</td></tr>",
		"<tr><th>Overall</th><td>",Item.Overall,"</td></tr>",
	].join(""):"",
	"<tr><th>HighAlch</th><td>",Item.HighAlch,"</td></tr>",
	"<tr><th>ID</th><td>",Item.ID,"</td></tr>",
,"</table>",
				].join("");
			},
		},
	});

	var bgSizes={
		2:[31,30],
		3:[31,21],
		4:[22,31],
		5:[22,31],
		6:[31,31],
		7:[21,30],
		8:[29,29],
		9:[20,30],
		10:[26,30],
		11:[27,29],
		12:[32,24],
		13:[32,29],
		14:[22,31],
		15:[32,24],
		16:[18,29],
		17:[33,23],
		18:[27,28],
		19:[20,29],
	};
	var nlook={//X YL W (h=9)
		1:[0,0,5],
		2:[5,0,7],
		3:[12,0,6],
		4:[18,0,6],
		5:[24,0,6],
		6:[30,0,7],
		7:[37,0,6],
		8:[43,0,7],
		9:[50,0,7],
		0:[57,0,7],
		M:[0,1,8],
		K:[8,1,7],
		"%":[15,1,7],
		"-":[22,1,5],
		"+":[27,1,7],
		"/":[37,1,5],
		"*":[39,1,7],
		"=":[46,0,6],
		"^":[52,1,5],
		"(":[57,1,4],
		")":[60,1,4],
	};
	xtag.register("rsdb-icon",{
		content:"<span></span><div></div>",
		accessors:{
			iid:{
				attribute:{},
				set:function(v){
					this.Update();
				},
			},
			count:{
				attribute:{},
				set:function(v){
					this.Update();
				},
			},
		},
		methods:{
			Update:function(){
				var Item=ItemList.Get(this.iid,this.count)||ItemList.Get(3247,this.count);
				var D=Item.IconData;//X Y W H S
				var bg=D[4]>1?D[4]:0;
				var iconEl=this;
				if(bg){
					iconEl=this.children[1];
					this.style.backgroundImage="url('/ico/bg"+bg+".png')";
					this.style.width=bgSizes[D[4]][0]+"px";
					this.style.height=bgSizes[D[4]][1]+"px";
					this.style.marginLeft=(36-bgSizes[D[4]][0])/2+"px";
					this.style.marginTop=(32-bgSizes[D[4]][1])/2+"px";
				}else{
					this.style.marginLeft=(36-D[2])/2+"px";
					this.style.marginTop=(32-D[3])/2+"px";
				}
				iconEl.style.backgroundImage="url('/ico/"+D[4]+".png')";
				iconEl.style.backgroundPosition=(-D[0])+"px "+(-D[1])+"px";
				iconEl.style.width=D[2]+"px";
				iconEl.style.height=D[3]+"px";
				if(Item.Count>1){
					var v=Item.Count;
					var l=0;
					while(v>99999){v/=1000;l++}
					v=(~~v)+["","K","M"][l]
					var x=["","filter:hue-rotate(60deg) brightness(10);","filter:hue-rotate(90deg) brightness(.8);"][l]
					this.children[0].innerHTML=v.split("").map(function(c){
						if(c==" ")return " ";
						var d=nlook[c];
						if(!d)return c;
						return "<div style=\"display:inline-block;background-image:url('/numbers.png');height:10px;width:"+d[2]+"px;background-position:-"+d[0]+"px -"+(d[1]*10)+"px;isolation:isolate;"+x+"\"></div>"
					}).join("");
				}
			}
		},
	});

	xtag.register("rsdb-title",{
		lifecycle:{
			created:function(){
				document.title=this.innerText+" - RSDB Oldschool";
			},
		},
	});

	var sxl=[[0,26],[26,26],[52,25]];
	var syl=[[0,25],[25,23],[48,23],[71,23],[94,23],[117,24],[141,25],[166,25]];
	var snli="attack hitpoints mining strength agility smithing defence herblore fishing ranged thieving cooking prayer crafting firemaking magic fletching woodcutting runecrafting slayer farming construction hunter combat".split(" ");
	var snl={};
	snli.forEach(function(name,i){
		snl[name]=i;
	})
	xtag.register("rsdb-skill",{
		lifecycle:{
			created:function(){
				this.skill=this.innerHTML||"Attack";
				this.innerHTML="";
			},
		},
		accessors:{
			skill:{
				attribute:{},
				set:function(v){
					this.title=v;
					var i=snl[v.toLowerCase()];
					if(i===undefined){
						console.log(v,"is not a valid skill");
						i=0;
					}
					var x=i%3;
					var y=~~(i/3);
					this.style.backgroundImage="url('/skills.png')";
					this.style.backgroundPosition=-sxl[x][0]+"px -"+syl[y][0]+"px";
					this.style.width=sxl[x][1]+"px";
					this.style.height=syl[y][1]+"px";
				},
			},
		},
	})


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
				tr.children[cid].getElementsByTagName("RSDB-SORT")[0].mode=mode;
			},
			update:function(v){
				if(v===undefined)v=this.mode;
				if(v<1&&this.last==v)return;
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
						if(!ee){
							sort="";
						}else if(ee.children&&ee.children[0]&&ee.children[0].tagName=="RSDB-NUM"){
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
					do{
						var ab=!a.s||a.s.length<1;
						var bb=!b.s||b.s.length<1;
						if(ab){
							if(bb)return 0;
							return 1;
						}
						if(bb)return -1;
					}while(0);
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