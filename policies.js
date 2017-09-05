var express = require('express');
var router = express.Router();
var policies = [
   {id: 1, name: "Policy1", dur: 1}
];

//Routes will go here
router.get('/', function(req, res){
   res.render('policy_list', {policies});
});

// router.post('/', function(req, res){
//       var newId = policies[policies.length-1].id+1;
//       movies.push({
//          id: newId,
//          name: req.body.name,
//          dur: req.body.dur
//       });
//       res.json({message: "New policy created.", location: "/policies/" + newId});
//    }
// );
router.get('/:id',function(req, res){
	res.send("<a href='/claims'>Claim</a>");
});

module.exports = router;