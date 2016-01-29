(function(){
	var ItemList;
	var id2icon = function(id){
		return "http://cdn.rsbuddy.com/items/"+id+".png";
	};
	var Item = function(id){
		var i = ItemList._store[id];
		if(i.length>=4){
			for(var k in i[3]){
				if(["Name","Store","HighAlch","LowAlch","ID","Icon","Note","NoteIcon"].indexOf(k)==-1){
					this[k]=i[3][k];
				}else{
					this["_"+k]=i[3][k];
				}
			}
		}
		this.ID=ID;
	};
	Item.prototype=Object.create(Object.prototype,{
		Name:{get:function(){return this._Name||ItemList._store[this.ID][0];}},
		Store:{get:function(){return this._Store||ItemList._store[this.ID][1];}},
		HighAlch:{get:function(){return this._HighAlch||this.Store*.6;}},
		LowAlch:{get:function(){return this._LowAlch||this.Store*.3;}},
		Icon:{get:function(){return this._Icon||id2icon(this.ID);}},
		Note:{get:function(){return this._Note||ItemList._store[this.ID][2];}},
		NoteIcon:{get:function(){return this._NoteIcon||this.Note?id2icon(this.Note):undefined;}},
	});
	var MkItem = function(i){
		if(!ItemList._store[id])return;
		return new Item(i);
	};
	ItemList={
		Item:MkItem,
		GetID:function(id){
			return MkItem(id);
		},
		GetName:function(name){
			if(!ItemList._namelookup){
				ItemList._namelookup={};
				ItemList.Each(function(i){
					ItemList._namelookup[i.Name]=i.ID;
				})
			}
			return MkItem(ItemList._namelookup[name])
		},
		Get:function(v){
			var id = parseInt(v);
			if(id){
				return ItemList.GetID(id);
			}else{
				return ItemList.GetName(v);
			}
		},
