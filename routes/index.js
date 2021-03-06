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



router.get('/getGoals', function(req, res, next) {


    Goal.find(function(err, goals) {
        if (err)
        {
            return next(err);
        }

        res.json(goals);

    });

});

router.get('/goals/:userId', function(req, res, next) {

    console.log(req.params.userId);

    Goal.find({user: req.params.userId}, function(err, goals) {
        if (err)
        {
            return next(err);
        }

        res.json(goals);

    });

});

router.post('/goals', function(req, res, next) {

    var goal = new Goal(req.body);

    goal.save(function(err, goal) {
        if (err)
        {
            return next(err);
        }

        res.json(goal);

    });

});

router.post('/updateGoals', function(req, res, next) {

    console.log(req.body.user);
    console.log(req.body);

    Goal.update({ user: req.body.user},
        {$set: {name: req.body.name,
                age: req.body.age,
                heightFt: req.body.heightFt,
                heightIn: req.body.heightIn,
                weight: req.body.weight,
                bmi: req.body.bmi,
                fitnessGoal: req.body.fitnessGoal}}
        , function(err, goals) {
        if (err)
        {
            return next(err);
        }

        console.log(goals);
        res.json(goals)

    });

    /*
    var newGoal = req.body;
    req.goal.name = newGoal.name;
    req.goal.age = newGoal.age;
    req.goal.heightFt = newGoal.heightFt;
    req.goal.heightIn = newGoal.heightIn;
    req.goal.weight = newGoal.weight;
    req.goal.user = newGoal.user;
    req.goal.bmi = newGoal.bmi;
    req.goal.fitnessGoal = newGoal.fitnessGoal;
    req.goal.save(function(err, newGoal) {
        if (err)
        {
            return next(err);
        }
        res.json(newGoal);

    });
    */

});

router.get('/deleteGoals', function(req, res, next) {

    //console.log(req.params.userId);

    Goal.remove({}, function(err, goals) {
        if (err)
        {
            return next(err);
        }

        res.send("Goals are successfully deleted!");

    });

});

router.get('/getWorkouts', function(req, res, next) {

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

router.get('/getUserWorkouts/:userId', function(req, res) {

    Workout.find({user: req.params.userId}, function(err, workouts) {
        if (err)
        {
            return next(err);
        }

        res.json(workouts);

    });

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



router.get('/completedWorkouts/:userId', function(req, res, next) {



    WorkoutSummary.find({user: req.params.userId}, function(err, completedWorkouts) {
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

/*
router.post('/findUpdateCompletedWorkout', function(req, res, next) {
    // try to find the workout
    WorkoutSummary.find({title: req.workout.title}, function(err, completedWorkouts) {
        if (err)
        {
            return next(err);
        }



        res.json(completedWorkouts);

    });
});
*/


router.get('/deleteCompletedWorkouts', function(req, res) {
    //Workout.findById
    WorkoutSummary.remove({}, function(err) {
        if (err)
        {
            return next(err);
        }
    });
    res.send("successfully deleted completed workouts!");

});



var passport = require('passport');
var User = mongoose.model('User');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});


// logging and logging out
router.post('/register', function(req, res, next) {

    if (!req.body.username || !req.body.password )
    {
        return res.status(400).json({message: 'Please fill out all fields'});
    }
    var user = new User();

    user.username = req.body.username;

    user.setPassword(req.body.password);

    user.save(function(err) {
        if (err)
        {
            return next(err);
        }
        return res.json({token: user.generateJWT()});
    });
});

router.post('/login', function(req, res, next) {
    if (!req.body.username || !req.body.password)
    {
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    passport.authenticate('local', function(err, user, info) {

        if (err)
        {
            return next(err);
        }

        if (user)
        {
            return res.json({token: user.generateJWT()});
        }
        else
        {
            return res.status(401).json(info);
        }


    })(req, res, next);

});



router.get('/users', function(req, res, next) {

    User.find(function(err, workouts) {
        if (err)
        {
            return next(err);
        }

        res.json(workouts);

    });

});













module.exports = router;
