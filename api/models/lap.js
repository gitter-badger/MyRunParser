var mongoose = require('mongoose');
var Sample = require('./sample').schema;
var Schema = mongoose.Schema;

var Lap = new Schema({
    startTime: Date,
    sequence: Number,
    intensity: String,
    totalTime: Number,
    distanceMeters: Number,
    calories: Number,
    samples: [Sample]
});

Lap.methods.addSample = function(sample) {
    sample.sequence = this.samples.length + 1;
    this.samples.push(sample);
    return this;
};

Lap.methods.addSamples = function(samples) {
    samples.forEach(function(item) {
        this.addSample(item);
    }, this);

    return this;
};

var _model = mongoose.model('Lap', Lap);

var addLap = function(data) {
    if(!data) {
        return new _model();
    }

    var startDate = data.$.StartTime;
    return new _model({
        startTime: new Date(startDate),
        intensity: data.Intensity,
        distanceMeters: data.DistanceMeters,
        calories: data.Calories,
        totalTime: data.TotalTimeSeconds
    });
};

module.exports = {
    model: _model,
    schema: Lap,
    addLap: addLap
};