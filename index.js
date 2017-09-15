var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
const MongoClient = require('mongodb').MongoClient
var upload = multer({ dest: 'uploads/' });
var app = express();
var azure = require('azure-storage');
// var formidable = require('formidable');
var fs = require('fs');

var AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=insurancepoc;AccountKey=/8O3ec3cwvTELgVXLCx3AiO8csIHyJJVzDAzrFb11mHHNdE11jGF/S0AcR86p7TbfhaUFfO3G500V7uY0giL8Q==;EndpointSuffix=core.windows.net";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views','./views');

//Require the Router we defined in policies.js
// var policies = require('./policies.js');
// var claims = require('./claims.js');
//Use the Router on the sub route /policies

//POLICIES
var policies = [
   {id: 1, name: "Life Insurance"},
   {id: 2, name: "Health Insurance"},
   {id: 3, name: "Travel Insurance"},
   {id: 4, name: "Home Insurance"},
   {id: 5, name: "Bike Insurance"}
];
//CLAIMS
var claims = [
   {id: 1, name: "John", policyno: 103}
];
//GET POLICIES
app.get('/policies', function(req, res){
   res.render('policy_list', {policies});
});
app.get('/policies/:id',function(req, res){
	res.send("<a href='/claims'>Claim</a>");
});

// app.use('/policies', policies);

// GET CLAIMS
app.get('/claims', function(req, res){
   res.render('claim');
});

var db
// app.use('/claims', claims,db);

// POST CLAIMS
app.post('/claims', function(req, res){
      var newId = claims[claims.length-1].id+1;
      claims.push({
         id: newId,
         name: req.body.name,
         policyno: req.body.policyno
      });
      res.send("<h1>Claim registered</h1>" + "</br>" + "<a href='/validate'>Validate</a>");
   }
);
// app.post('/claims', (req, res) => {
//   db.collection('claims').save(req.body, (err, result) => {
//     if (err) return console.log(err)

//     res.send('saved to database')
//     res.redirect('/')
//   })
// })
// app.get('/upload', function (req, res) {
//     res.send(
//     '<form action="/upload" method="post" enctype="multipart/form-data">' +
//     '<input type="file" name="recfile" />' +
//     '<input type="submit" value="Upload" />' +
//     '</form>'
//     );
// });
// var type = upload.single('recfile');
// app.post('/upload', type, function (req, res) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// });
// app.post('/upload', function (req, res) {
//     var path = req.files.recfile.path;
//     var bs= azure.createBlobService(AZURE_STORAGE_CONNECTION_STRING);
//     bs.createBlockBlobFromFile('insurancecontainer', 'myblob', 'test', path, function (error) { });
//     res.send("OK");
// });
app.get('/validate', function(req,res){
	res.send(
    '<form action="/validate" method="post">' +
    '<input type="text" name="policyno" />' +
    '<input type="submit" value="Validate" />' +
    '</form>'
    );
});
app.post('/validate', function(req,res){
	var policyno = req.body.policyno;
	var blobSvc = azure.createBlobService(AZURE_STORAGE_CONNECTION_STRING);
	blobSvc.listBlobsSegmented('insurancecontainer', null, function(error, result, response){
  if(!error){
      // result.entries contains the entries
      // If not all blobs were returned, result.continuationToken has the continuation token.
      var k = 0;
      var blob_length = result.entries.length;
      for(var i=0; i<blob_length; i++)
      {
      	if (result.entries[i].name==policyno) {
      		return res.send("Accepted!");
      		k+=1;
      		break;
      	}
      	else{
      		k=0;
      	}
      }  
      if(k==0){
      	  return res.send("Rejected!");  
      }
  
      // if (k=1) {
      // 	res.send("Accepted!");
      // }
      // else{
      // 	res.send("Rejected!");
      // }
  }
});
})
// MongoClient.connect('mongodb://varun.l:payoda123@ds036967.mlab.com:36967/insurance-poc-db', (err, database) => {
//   if (err) return console.log(err)
//   db = database
//   app.listen(process.env.PORT || 3000, () => {
//     console.log('listening on 3000')
//   })
// })
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
// app.listen(process.env.PORT || 3000);