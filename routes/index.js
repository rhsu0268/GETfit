var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Exercise = mongoose.model('Exercise');
var Goal = mongoose.model('Goal');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/myFitness', function(req, res, next) {
  res.render('myFitness', { title: 'Express' });
});



router.param('exercise', function(req, res, next, id) {

    var query = Exercise.findById(id);

    query.exec(function(err, post) {
        if (err)
        {
            return next(err);
        }
        id (!exercise)
        {
            return next(new Error('can\'t find exercise'));
        }

        req.exercise = exercise;
        return next();


    });

});


router.get('/exercises/:exercise', function(req, res) {
    res.json(req.exercise);

});

// route to get all the exercises
router.get('/exercises', function(req, res, next) {
    Exercise.find(function(err, exercises) {

        if (err)
        {
            return next(err);
        }

        res.json(exercises);

    });
});


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

module.exports = router;
