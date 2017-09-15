var express = require('express');
var router = express.Router();
var claims = [
   {id: 1, name: "John", policyno: 103}
];

//Routes will go here

// router.post('/', function(req, res){
//       var newId = claims[claims.length-1].id+1;
//       claims.push({
//          id: newId,
//          name: req.body.name,
//          policyno: req.body.dur
//       });
//       res.send("Claim registered. Location: /claims/" + newId);
//    }
// );
router.post('/', (req, res) => {
  db.collection('claims').save(req.body, (err, result) => {
    if (err) return console.log(err)

    res.send('saved to database')
    res.redirect('/')
  })
})
router.get('/', function(req, res){
   res.render('claim');
});
router.get('/:id', function(req, res){
	res.send(claims[req.params.id-1].name);
});
module.exports = router;