const express = require('express')
const app = express()
const port = 3003

var mammoth = require("mammoth");
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
const base64 = require('base64topdf');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/convert', upload.single('fileUpload'), function (req, res, next) {
  
  if(req.file){

    

  mammoth.convertToHtml({path: req.file.path})
    .then(function(result){
        var html = result.value;
        res.json(html)
    }).done()	
  }
  else{
  	res.send("File Upload Failed !")
  }

});

app.post('/pdf', function (req, res, next) {
  
  var kk = req.body.base;
  let decodedBase64 = base64.base64Decode(kk, 'PdfFileNameToWrite.pdf');
  res.send(decodedBase64);
});

app.get('/',function(req,res){
  res.json("ok");
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))