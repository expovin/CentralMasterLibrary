var fs = require('fs');

// Connessione a Qlik Sense


module.exports = {
   hostname: '[SERVAR-NAME]',
   port: '[PORT]',
   path: '/qrs/[TYPE]?xrfkey=abcdefghijklmnop',
   method: 'GET',
   headers: {
      'x-qlik-xrfkey' : 'abcdefghijklmnop',
      'X-Qlik-User' : 'UserDirectory= Internal; UserId= sa_repository '
   },
   key: "KeyToReplace",
   cert: "KeyToReplace",
   ca: "KeyToReplace",
}
