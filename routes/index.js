var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
//var Exercise = mongoose.model('Exercise');
var Goal = mongoose.model('Goal');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*('/exercises', function(req, res, next) {
    Exercise.find(function(err, exercises) {

        if (err)
        {
            return next(err);
        }

        res.json(exercises);

    });
});
*/
/*
router.post('/exercises', function(req, res, next) {

    var exercise = new Exercise(req.body);

    exercise.save(function(err, exercise) {
        if (err)
        {
            return next(err);
        }
        res.json(exercise);
    });

});
*/
module.exports = router;
