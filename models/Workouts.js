var mongoose = require('mongoose');


var WorkoutSchema = new mongoose.Schema({
    exercise1: String,
    reps1: Number,
    exercise2: String,
    reps2: Number,
    exercise3: String,
    reps3: Number,
    //exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'}
});

mongoose.model('Workout', WorkoutSchema);
