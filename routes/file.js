var express = require('express');
var fs = require('fs');

var router = express.Router();

/* GET users listing. */
router.get('/QSSite', function(req, res, next) {

	var results = [];

	fs.readdirSync("cer/").forEach(function(file) {		
		results.push(file);
	});
	res.json(results);
})

;

module.exports = router;