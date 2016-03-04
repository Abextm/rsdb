//define(function(){ (in the index.js)
	//var d = {...};
	var T=function(id){
		this.ID=id;
	};
	T.prototype=Object.create(Object.prototype,{});
	var AddGetter=function(o){
		for (var k in o) {
			Object.defineProperty(T.prototype,k,{enumerable:true,configurable:true,get:o[k]});
		}
	};
	var GetName=function(v){
		if(n[v]!==undefined)return new T(n[v]);
		console.warn("Cannot get item by name",v);
	};
	var GetID=function(v){
		if(d[v]!==undefined)return new T(v);
		console.warn("Cannot get item by id",v);
	}
	AddGetter({//noted noteid (name members price)
		Name:function(){return (d[this.ID][2]!==null)?d[this.ID][2]:this.Note.Name;},
		Members:function(){return (d[this.ID][3]!==null)?d[this.ID][3]:this.Note.Members;},
		Store:function(){return (d[this.ID][4]!==null)?d[this.ID][4]:this.Note.Store;},
		HighAlch:function(){return ~~(this.Store*.6);},
		LowAlch:function(){return ~~(this.Store*.3);},
		Icon:function(){return "http://cdn.rsbuddy.com/items/"+this.ID+".png";},
		NoteID:function(){return d[this.ID][1];},
		Note:function(){return GetID(this.NoteID);},
		NoteIcon:function(){return this.Note&&this.Note.Icon;},
		IsNote:function(){return d[this.ID][0];},
	})
	var n={};
	var i=new T(0);
	for(var k in d){
		i.ID=k;
		if(!i.IsNote&&!n[i.Name]){
			n[i.Name]=i.ID;
		}
	}
	var each=function(cb){
		for(var k in d){
			cb(new T(d[k]),k);
		}
	}
	return {
		Name:"ItemList",
		Get:function(v){return d[v]?GetID(v):GetName(v);},
		GetName:GetName,
		GetID:GetID,
		Type:T,
		Each:each,forEach:each,
		Func:function(){return Object.keys(d).map(function(v){return new T(v);})},
		Data:function(){return d;},
		AddGetter:AddGetter,
	};
});