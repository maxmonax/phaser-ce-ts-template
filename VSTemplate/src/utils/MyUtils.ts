namespace MyUtils {
	var query_values: any = null;

	function readQueryValues() {
		// This function is anonymous, is executed immediately and
		// the return value is assigned to QueryString!
		var vals: any = {};
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			// If first entry with this name
			if (typeof vals[pair[0]] === "undefined") {
				vals[pair[0]] = decodeURIComponent(pair[1]);
				// If second entry with this name
			} else if (typeof vals[pair[0]] === "string") {
				var arr = [vals[pair[0]], decodeURIComponent(pair[1])];
				vals[pair[0]] = arr;
				// If third or later entry with this name
			} else {
				vals[pair[0]].push(decodeURIComponent(pair[1]));
			}
		}
		query_values = vals;
	}

	export function getQueryValue(aValName: string): any {
		if (query_values == null) readQueryValues();
		return query_values[aValName];
	}


}