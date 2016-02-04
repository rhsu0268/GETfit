var mongoose = require('mongoose');

var GoalSchema = new mongoose.Schema({
    name: String,
    age: Number,
    heightFt: String,
    heightIn: String,
    weight: String,
    bmi: Number,
    fitnessGoal: String


});

mongoose.model('Goal', GoalSchema);
