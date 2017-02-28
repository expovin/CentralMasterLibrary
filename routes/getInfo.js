var options = require('../options');
var https = require('https');

module.export = function getInfos (options, onResult){

	 console.log("rest::getJSON");

	 var req = https.get(options, function(res) {
		   console.log("Got response: " + res.statusCode);

		    res.on('data', function (chunk) {
	        	console.log("Sono in data");
	              str += chunk;
	        });

	        res.on('end', function () {
	        	console.log("Sono in end");

	             onResult(res.statusCode, str);
		   
			});

		   
	    })

}
