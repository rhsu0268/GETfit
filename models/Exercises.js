var mongoose = require('mongoose');

var ExerciseSchema = new mongoose.Schema({
    title: String,
    group: Number,
    goals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Goal'}]


});

mongoose.model('Exercise', ExerciseSchema);
