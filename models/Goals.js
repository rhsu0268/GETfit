var mongoose = require('mongoose');

var GoalSchema = new mongoose.Schema({
    name: String,
    age: Number,
    heightFt: String,
    heightIn: String,
    BMI: Number,
    FitnessGoal: String


});

mongoose.model('Goal', GoalSchema);
