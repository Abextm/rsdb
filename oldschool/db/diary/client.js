//define(["itemlist"],function(ItemList){var D={...}
	D.List=Object.keys(D);
	D.List.forEach(function(c){
		["Easy","Medium","Hard","Elite"].forEach(function(n){
			c[n]
		});
	});
	D.Difficulties=["Easy","Medium","Hard","Elite"];
	D.Name="Diary";
	return D;
});