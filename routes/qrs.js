var express = require('express');
var https = require('https');
var options_template = require('../options');
var fs = require('fs');

var options = {};


var router = express.Router();

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};


/* GET users listing. */
router.get('/*', function(req, res, next) {
  //res.send('respond with a resource');
     var pathTemplate = '/qrs/[TYPE]?xrfkey=abcdefghijklmnop';

     options.hostname = options_template.hostname.replaceAll('[SERVAR-NAME]',req.headers.server_name);
     options.port = options_template.port.replaceAll('[PORT]',req.headers.port);
     options.path = pathTemplate.replaceAll("[TYPE]",req.params[0]);
     options.method = options_template.method;
     options.headers = options_template.headers;

     var str='';

     try {
	     options.key = fs.readFileSync("./cer/"+req.headers.server_name+"/client_key.pem");
	     options.cert = fs.readFileSync("./cer/"+req.headers.server_name+"/client.pem");
	     options.ca = fs.readFileSync("./cer/"+req.headers.server_name+"/root.pem");  

		 var Inreq = https.get(options, function(Inres) {

			    Inres.on('data', function (chunk) {
		              str += chunk;
		        });

		        Inres.on('end', function () {
		        	res.status(200);
		            res.json(JSON.parse(str));
				}); 
		    });

			Inreq.on('error', function(error){
			    res.status(503);
			    res.json(error);
			});


     } catch (err) {
     	res.status(401);
     	res.json(err);
     } 
})

;




module.exports = router;
