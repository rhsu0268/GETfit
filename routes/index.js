var express = require('express');
var router = express.Router();
var debug = require('debug')('index');

var mongoose = require('mongoose');
var Exercise = mongoose.model('Exercise');
var Goal = mongoose.model('Goal');
var Workout = mongoose.model('Workout');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/myFitness', function(req, res, next) {
  res.render('myFitness', { title: 'Express' });
});

router.get('/planWorkout', function(req, res, next) {
  res.render('planWorkout', { title: 'Express' });
});

router.get('/workouts', function(req, res, next) {

    Workout.find(function(err, workouts) {
        if (err)
        {
            return next(err);
        }

        res.json(workouts);

    });

});


router.post('/workouts', function(req, res, next) {

    var workout = new Workout(req.body);

    workout.save(function(err, workout) {
        if (err)
        {
            return next(err);
        }

        res.json(workout);

    });

});


router.param('workout', function(req, res, next, id) {
    var query = Workout.findById(id);


    query.exec(function (err, workout) {
        if (err)
        {
            debug("Error in querying workout!");
            return next(err);
        }
        if (!workout)
        {
            debug("Error in finding workout!");
            return next(new Error('can\'t find post'));
        }
        req.workout = workout;
        debug(req.workout);
        return next();
    });
});

router.get('/workouts/:workout', function(req, res) {
    res.json(req.workout);

});

router.get('/recommendWorkout', function(req, res, next) {
  res.render('recommendWorkout', { title: 'Express' });
});


router.get('/workoutSummary', function(req, res, next) {
  res.render('workoutSummary', { title: 'Express' });
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
