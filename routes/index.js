var express = require('express');
var router = express.Router();
var debug = require('debug')('index');

var mongoose = require('mongoose');
var Exercise = mongoose.model('Exercise');
var Goal = mongoose.model('Goal');
var Workout = mongoose.model('Workout');
var WorkoutSummary = mongoose.model('WorkoutSummary');

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

router.post('/updateWorkout/:workout', function(req, res, next) {

    var newWorkout = req.body;
    req.workout.title = newWorkout.title;
    req.workout.workoutSets = newWorkout.workoutSets;
    req.workout.workoutReps = newWorkout.workoutReps;
    req.workout.exercise1 = newWorkout.exercise1;
    req.workout.exercise2 = newWorkout.exercise2;
    req.workout.exercise3 = newWorkout.exercise3;
    req.workout.save(function(err, workout) {
        if (err)
        {
            return next(err);
        }
        res.json(newWorkout);

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

router.get('/deleteWorkout/:workout', function(req, res) {
    //Workout.findById
    req.workout.remove(function(err) {
        if (err)
        {
            return next(err);
        }
    });
    res.json("successfully deleted workout!");

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


var seeder = require('mongoose-seeder');
var data = require('../data/data.json');
router.get('/seedData', function(req, res, next) {

    //res.send(data);

    seeder.seed(data, {dropCollections: true}).then(function(dbData) {

        res.json(dbData);

    }).catch(function(err) {

        // handle error
        return next(err);

    });

});

var plotly = require('plotly')('rhsu0268', 'pxqr91oaa8');
var fs = require('fs');
router.get('/graphTest', function(req, res, next) {

    /*
    var data = [{x:[0,1,2], y:[3,2,1], type: 'bar'}];
    var graphOptions = {fileopt : "extend", filename : "fitnessGraph"};


    plotly.plot(data, graphOptions, function (err, msg) {
        //console.log(data);
        console.log(msg);
        console.log(msg.filename);


        //res.send(msg.filename);

        plotly.getFigure('rhsu0268', '3', function(err, figure) {

            if (err)
            {
                console.log(err);
            }

            var imgOpts = {
                format: 'png',
                width: 1000,
                height: 500
            };

            plotly.getImage(figure, imgOpts, function(error, imageStream) {

                if (error)
                {
                    return next(error);
                }
                var fileStream = fs.createWriteStream('fitness.png');
                console.log(fileStream);
                res.sendFile(imageStream.pipe(fileStream).path);


            });

        });

    });

    */


});



router.get('/completedWorkouts', function(req, res, next) {

    WorkoutSummary.find(function(err, completedWorkouts) {
        if (err)
        {
            return next(err);
        }
    


        res.json(completedWorkouts);

    });

});


router.post('/completedWorkouts', function(req, res, next) {

    var completedWorkout = new WorkoutSummary(req.body);

    completedWorkout.save(function(err, completedWorkout) {
        if (err)
        {
            return next(err);
        }

        res.json(completedWorkout);

    });

});





module.exports = router;
