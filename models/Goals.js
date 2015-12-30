var mongoose = require('mongoose');


var GoalSchema = new mongoose.Schema({
    numRep: Number,
    numSet: Number,
    exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'}
});

mongoose.model('Goal', GoalSchema);
