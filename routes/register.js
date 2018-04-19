var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/rollcall', ['registered_students']);

// Save stud
router.post('/register', function(req, res, next) {
    console.log("REG: " + req.body.user + " code " +  req.body.code);
    db.registered_students.save({user:req.body.user, code: req.body.code}, function(err, result){
        if(result){
            res.send({result: result});
        } else {
            return res.status(400).send(err);
        }
    });
    
});
module.exports = router;