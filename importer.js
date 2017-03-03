//var path = require('path');
var favicon = require('serve-favicon');
var fs = require('fs');
var https = require('https');
var http = require('http');
var program = require('commander');
var querystring = require('querystring');


function range(val) {
  return val.split('..').map(Number);
}
 
function list(val) {
  return val.split(',');
}
 
function collect(val, memo) {
  memo.push(val);
  return memo;
}
 
function increaseVerbosity(v, total) {
  return total + 1;
}

 
program
  .version('1.0.0')
  .usage('[options] <file ...>')

  .option('-H, --hostname <hostname>','Qlik Sense Server Host name. localhost if not specified')
  .option('-P, --port <port>', 'API Port Number, 4242 will be use if not specified', parseInt)
  .option('-o, --object <object>', 'MANDATORY : Object type like user, app, stream, systemrule, etc...')
  .option('-m, --method <method>','GET or POST. GET will be use if not specified')
  .option('-f, --full','Get all details about the object type')
  .option('-w, --write','Write output result to file')
  .option('-i, --import', 'Import an object')
  .option('-v, --verbose', 'A value that can be increased', increaseVerbosity, 0)
  .parse(process.argv);

if (!program.hostname) 
  program.hostname='localhost';

if (!program.port) 
  program.port='4242';

if (!program.object) 
  throw new Error('--object required');

if ((program.write) && (program.args.length() == 0))
	 throw new Error('fileName required with --write option');

if (!program.method) 
  program.method='GET';


options = {
   hostname: program.hostname,
   port: program.port,
   path: '/qrs/'+program.object,
   method: program.method,
   headers: {
      'x-qlik-xrfkey' : 'abcdefghijklmnop',
      'X-Qlik-User' : 'UserDirectory= Internal; UserId= sa_repository '
   },
   key: fs.readFileSync("./cer/"+program.hostname+"/client_key.pem"),
   cert: fs.readFileSync("./cer/"+program.hostname+"/client.pem"),
   ca: fs.readFileSync("./cer/"+program.hostname+"/root.pem")
};


if(program.full && (program.method == 'GET')) {
	options.path = options.path.concat('/full');
}	
options.path = options.path.concat('?xrfkey=abcdefghijklmnop');


if (program.method == 'POST') {
	var str='';
//	const stats = fs.statSync(program.args[0])
//	const fileSizeInBytes = stats.size

	var postData = JSON.parse(fs.readFileSync(program.args[0], 'utf8'));
	options.headers["Content-Type"] = 'application/json';
//	options.headers["Content-Length"] = fileSizeInBytes;
//	options.headers["Accept-Encoding"] = 'gzip,deflate';
	options.headers["Accept-Charset"] = 'utf-8; q=0.9, us-ascii;q=0.1, iso-8859-1';
	options.headers["Accept"] = 'text/xml; q=0.1, application/json; q=0.2';
//	options.headers["Connection"] = 'Keep-Alive';
	options.headers["User-Agent"] = 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:26.0) Gecko/20100101 Firefox/26.0';

	try {
		var post_req = https.request(options, function(res)  {

	      	res.setEncoding('utf8');
	        res.on('response', function (response, body) {
	            statusCode = res.statusCode;
	            console.log(statusCode);
			});
			res.on('data', function (chunk) {
			    str += chunk;
			    console.log('Response: ' + chunk);
			});

			res.on('end', function () {				
				console.log('Response: ' + str);
			}); 
		});	

		post_req.on('error', function(error) {
		  	console.log(error);
		});

		post_req.write(JSON.stringify(postData));
		post_req.end();
		console.log(post_req);

	} catch (err) {
	   	console.log("Errore :"+err);
	} 
} 


if(program.method == 'GET') {
	var str='';
	console.log(options);

	try {
	 	var req = https.get(options, function(res) {

			res.on('data', function (chunk) {
			    str += chunk;
			});

			res.on('end', function () {
				if(program.write) {
					fs.writeFileSync(program.args[0],str);
				} else {
					console.log(res.statusCode);
				    console.log(JSON.parse(str));
				}
			}); 
		});

		req.on('error', function(error){
			console.log("Errore :"+error);
		});


	     } catch (err) {
	     	console.log("Errore :"+err);
	} 

}

 

