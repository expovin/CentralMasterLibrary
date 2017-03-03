var fs = require('fs');

// Connessione a Qlik Sense


module.exports = {
   hostname: 'localhost',
   port: '4242',
   path: '/qrs/user?xrfkey=abcdefghijklmnop',
   method: 'GET',
   headers: {
      'x-qlik-xrfkey' : 'abcdefghijklmnop',
      'X-Qlik-User' : 'UserDirectory= Internal; UserId= sa_repository '
   },
   key: fs.readFileSync("./cer/"+req.headers.server_name+"/client_key.pem");,
   cert: fs.readFileSync("./cer/"+req.headers.server_name+"/client.pem");,
   ca: fs.readFileSync("./cer/"+req.headers.server_name+"/root.pem"),
}
