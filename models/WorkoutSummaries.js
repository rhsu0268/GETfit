var mongoose = require('mongoose');


var WorkoutSummarySchema = new mongoose.Schema({
    month: String,
    day: Number,
    year: Number,
    title: String,
    exercise1: String,
    exercise1Summary: [Number],
    exercise2: String,
    exercise2Summary: [Number],
    exercise3: String,
    exercise3Summary: [Number]

    //exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'}
});

mongoose.model('WorkoutSummary', WorkoutSummarySchema);
