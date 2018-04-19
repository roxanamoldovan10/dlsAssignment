var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/rollcall', ['code']);

// Save code
router.post('/code', function(req, res, next) {
    console.log("LOGIN REQ: " + req.body.code + " class " +  req.body.room + " date " + req.body.date);
    db.code.save({code:req.body.code, room: req.body.room, date: req.body.date}, function(err, result){
        if(result){
            res.send({result: result});
        } else {
            return res.status(400).send(err);
        }
    });
    
});

// Get code
router.get('/getCode', function(req, res, next) {
    console.log("CODE getcode: " + req.query.code);
    db.code.findOne({code:req.query.code}, function(err, result){
        if(result){
            res.send({result: result});
        } else {
            return res.status(400).send(err);
        }
    });
});
 
module.exports = router;