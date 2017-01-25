var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var util = require('util');
var mime = require('mime');
const Storage = require('@google-cloud/storage');
const Vision = require('@google-cloud/vision');
const projectId = 'mediaagilitybot';

// Instantiates a client
var vision = Vision({
  projectId: projectId,
  keyFilename: 'keyfile.json'
});

//var upload = multer({dest: 'uploads/'});

//------------------------------------------------------

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});


var upload = multer({ storage : storage}).single('userPhoto');
router.post('/', function(req, res, next) {
  //res.render('index', { title: 'Uploaded' });
  upload(req,res,function(err) {
    if(err) {
      return res.end("Error uploading file."+err);
    }
    //res.end("File is uploaded");
    vision.detectText(req.file.path, function(err, detections, apiResponse) {
      if (err) {
        res.end('Cloud Vision Error'+err);
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.write('<!DOCTYPE HTML><html><body>');

        // Base64 the image so we can display it on the page
        res.write('<img width=200 src="' + base64Image(req.file.path) + '"><br>');

        // Write out the JSON output of the Vision API
        res.write(JSON.stringify(detections, null, 4));

        res.end('</body></html>');
      }
    });
  });

});
//----------------------------------------------------

// router.post('/',upload.single('image'), function(req, res, next) {
//   res.send("Just check the string");
//   console.log(req.file);
//
//
// });


function base64Image(src) {
  var data = fs.readFileSync(src).toString('base64');
  return util.format('data:%s;base64,%s', mime.lookup(src), data);
}


module.exports = router;
