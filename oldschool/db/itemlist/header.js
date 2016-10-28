//define(function(){ (in the index.js)
	//var d = {...};
	var Item=function(id,count){
		this.ID=id;
		this.Count=count||1;
	};
	Item.prototype=Object.create(Object.prototype,{});
	var GetName=function(v,count,s){
		if(Array.isArray(v)){
			count=v[1];
			v=v[0];
		}
		if(n[v]!==undefined)return new Item(n[v],count);
		if(!s)console.warn("Cannot get item by name",v);
	};
	var GetID=function(v,count,s){
		if(Array.isArray(v)){
			count=v[1];
			v=v[0];
		}
		if(d[v]!==undefined)return new Item(v,count);
		if(!s)console.warn("Cannot get item by id",v);
	}
	var Get=function(v,c,s){
		if(Array.isArray(v)){
			c=v[1];
			v=v[0];
		}
		return d[v]?GetID(v,c,s):GetName(v,c,s);
	}
	AddGetter({//noted noteid icon (name members price (wierd))
		Name:function(){return (d[this.ID][3]!==undefined)?d[this.ID][3]:this.Note.Name;},
		Members:function(){return (d[this.ID][4]!==undefined)?d[this.ID][4]:this.Note.Members;},
		OStore:function(){return (d[this.ID][5]!==undefined)?d[this.ID][5]:this.Note.Store;},
		Store:function(){return this.OStore*this.Count;},
		HighAlch:function(){return (~~(this.OStore*.6))*this.Count;},
		LowAlch:function(){return (~~(this.OStore*.4))*this.Count;},
		NoteID:function(){return d[this.ID][1];},
		Note:function(){return GetID(this.NoteID);},
		IsNote:function(){return d[this.ID][0];},
		Valid:function(){return d[this.ID]!==undefined},
		HTML:function(){return "<rsdb-item iid='"+this.ID+"' count='"+this.Count+"'></rsdb-item>"},
		Serial:function(){return this.Count>1?[this.ID,this.Count]:this.ID},
		IconData:function(){var _=d[this.ID][2];return Array.isArray(_)?_:d[_][2]},
		IconHTML:function(){return "<rsdb-icon iid='"+this.ID+"' count='"+this.Count+"'></rsdb-icon>"}
	},Item);
	var n={};
	var i=new Item(0);
	for(var k in d){
		i.ID=k;
		if(!i.IsNote&&!n[i.Name]&&!d[i.ID][6]){
			n[i.Name]=i.ID;
		}
	}
	var each=function(cb){
		for(var k in d){
			cb(new Item(d[k]),k);
		}
	}
	return {
		Name:"ItemList",
		Get:Get,
		GetName:GetName,
		GetID:GetID,
		Type:Item,
		Each:each,forEach:each,
		Func:function(){return Object.keys(d).map(function(v){return new Item(v);})},
		Data:function(){return d;},
	};
});