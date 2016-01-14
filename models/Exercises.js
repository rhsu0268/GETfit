var mongoose = require('mongoose');

var ExerciseSchema = new mongoose.Schema({
    name: String,
    type: String,
    main_muscles_worked: String,
    level: String,
    sport: String


});

mongoose.model('Exercise', ExerciseSchema);
