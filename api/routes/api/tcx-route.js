var express = require('express');
var api = express.Router();

api.route('/tcx')
    .all(function(req, res, next) {
        next();
    })
    .get(function() {

    })
    .post(function(req, res) {
       res.type('.xml');

        req.busboy.on('file', function(fieldname, file) {
            console.log(file.length);
            var fileContents = '';

            var chunk;
            file
                .on('readable', function() {
                    while(null !== (chunk = file.read())) {
                        fileContents += new Buffer(chunk).toString();
                    }
                })
                .on('end', function() {
                    res.write(new Buffer(fileContents));
                    res.end();
                });
        });

        req.pipe(req.busboy);
    });

module.exports = api;