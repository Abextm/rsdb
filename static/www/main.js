document.body.addEventListener("click", function (ev) {
	if (ev.target.tagName != "LEGEND" || ev.target.parentElement.tagName != "FIELDSET") {
		return;
	}
	ev.target.parentElement.classList.toggle("fs-hidden");
});
require.config({
	baseUrl: (function () {
		var l = window.location;
		return l.protocol + "//db." + l.host + "/";
	})(),
});
Array.from(document.getElementsByTagName("template")).filter(function (el) {
	return el && el.attributes && el.attributes.require;
}).forEach(function (el) {
	var req = el.attributes.require.value;
	req = req.split(",").map(function (v) {
		if (v.indexOf("/") == -1) return v + "/index";
		return v;
	});
	var failures = -5;
	var err = function (e) {
		failures++;
		if (failures <= 0) {
			var mid = err.requireModules && err.requireModules[0];
			if (mid) {
				require.undef(mid);
			}
			setTimeout(function () {
				require(req, function () { }, err);
			}, 1000);
			console.log("Encountered error", e);
		} else {
			console.error("Too many failures", e);
		}
	}
	var done = function () {
		var args = arguments;
		req.forEach(function (e, i) {
			if (args[i]) {
				if (args[i].Name) {
					window[args[i].Name] = args[i];
				} else {
					window[e] = args[i];
				}
			} else {
				err(e + " is falsey");
			}
		});
		try {
			el.parentElement.insertBefore(document.importNode(el.content, true), el);
		} catch (e) {
			err(e);
		}
	};
	require(req, done, err);
});
var AddGetter = function (o, t) {
	for (var k in o) {
		Object.defineProperty(t.prototype, k, { enumerable: true, configurable: true, get: o[k] });
	}
};
(function () {
	var modEl = function (el) {
		if (el.hasAttribute("nopersist")) return;
		var k = el.id || el.name;
		if (!k.length) return;
		k = "inputpersist" + window.location.pathname + k;
		var v = localStorage[k];
		var value = (el.type && el.type == "checkbox") ? "checked" : "value";
		var event = value == "checked" ? "change" : "input";
		if (v !== undefined) {
			el[value] = JSON.parse(v);
			el.dispatchEvent(new Event(event, {}));
		}
		el.addEventListener(event, function () {
			localStorage[k] = JSON.stringify(el[value]);
		});
	};
	var obs = new MutationObserver(function (muts) {
		muts.forEach(function (mut) {
			Array.from(mut.addedNodes).forEach(function (node) {
				if (node.nodeName == "#text") return;
				if (node.tagName == "INPUT") return modEl(node);
				Array.from(node.getElementsByTagName("input")).forEach(function (el) {
					modEl(el);
				});
			})
		});
	});
	obs.observe(document.body, {
		childList: true,
		subtree: true,
	});
})();