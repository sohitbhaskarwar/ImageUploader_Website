var express = require('express');
var multer = require('multer');

var router = express.Router();
 
 
 var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'www/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.jpg')
  }
})

var upload = multer({ storage: storage }).single('avatar');



router.post('/', function (req, res) {
  upload(req, res, function (err){
    if (err) {
      // An error occurred when uploading
      return
    }
console.log("UPLOAD????");
    // Everything went fine
  })
});
 
 
 module.exports = router;