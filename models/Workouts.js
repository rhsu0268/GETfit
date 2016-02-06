var mongoose = require('mongoose');


var WorkoutSchema = new mongoose.Schema({
    title: String,
    workoutSets: Number,
    workoutReps: Number,
    exercise1: String,
    exercise2: String,
    exercise3: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}

    //exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'}
});

mongoose.model('Workout', WorkoutSchema);
