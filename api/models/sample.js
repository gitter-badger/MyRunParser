var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var Sample = new Schema({
    sequence: Number,
    startTime: Date,
    distance: Number,
    altitude: Number,
    latitude: Number,
    longitude: Number,
    cadence: Number,
    meta: [ObjectId]
});

var _model = mongoose.model('Sample', Sample);

var addSamplePoint  = function(data) {
    if(!data) {
        return new _model();
    }

    var obj = {
        sequence: 1,
        startTime: new Date(data.Time),
        distance: data.DistanceMeters,
        altitude: data.AltitudeMeters
    };

    if(data.Position) {
        obj.latitude = data.Position.LatitudeDegrees;
        obj.longitude = data.Position.LongitudeDegrees;
    }

    return new _model(obj);
};

module.exports = {
    model: _model,
    schema: Sample,
    addSamplePoint: addSamplePoint
};