var xmlParser = require('xml2js').parseString;
var fs = require('fs');
var moment = require('moment');

module.exports = function(strxml, callback) {
    xmlParser(strxml, function(err, result) {
        if(err) {
            return callback(err);
        }

        if(!result.TrainingCenterDatabase || !result.TrainingCenterDatabase.Activities || result.TrainingCenterDatabase.Activities.length === 0) {
            return callback('Invalid TCX File');
        }

        var activities = result.TrainingCenterDatabase.Activities[0];

        _.reduce(activities.Lap, function(memo, lap) {
            if(!memo.startTime) {
                memo.startTime = lap.$.StartTime;
            }

            return memo;
        }, {});

    });
};