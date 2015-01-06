var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Lap = require('./lap').schema;

var Activity = new Schema({
    laps: [Lap]
});

Activity.methods.addLap = function() {

};

var _model = mongoose.model('Activity', Activity);

var addActivity = function() {
    return new _model();
};

module.exports = {
    model: _model,
    schema: Activity,
    addActivity: addActivity
};