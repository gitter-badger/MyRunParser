/* jshint -W030 */
describe('Models', function() {
    var models = require('../../api/models');

    describe('Samples', function() {
        var samples = models.Sample;

        var express = require('../../config/express');

        console.log(express._router.stack[5].handle);
        describe('Sample schema', function() {
            var schema = samples.schema;

            it('should have sequence', function() {
                schema.path('sequence').should.exist;
            });

            it('should have startTime', function() {
                schema.path('startTime').should.exist;
            });

            it('should have distance', function() {
                schema.path('distance').should.exist;
            });

            it('should have altitude', function() {
                schema.path('altitude').should.exist;
            });

            it('should have latitude', function() {
                schema.path('latitude').should.exist;
            });

            it('should have longitude', function() {
                schema.path('longitude').should.exist;
            });

            it('should have cadence', function() {
                schema.path('cadence').should.exist;
            });

            it('should have meta', function() {
                schema.path('meta').should.exist;
            });
        });

        describe('Sample method to add sample point', function() {
            var method = samples.addSamplePoint;

            it('should have method', function() {
                method.should.exist;
            });

            it('should return an object', function() {
                method().should.exist;
            });

            it('should returnn a valid model', function() {
                method()._id.should.exist;
            });

            it('should return unique models with each call', function() {
                method()._id.should.not.equal(method()._id);
            });

            describe('set fields correctly', function() {
                var data, sample;

                beforeEach(function(done) {
                    data = require('../data/samples').example1;
                    sample = method(data);

                    done();
                });

                it('should set time correctly', function() {
                    sample.startTime.should.equalDate(new Date(data.Time));
                });

                it('should set distance', function() {
                    sample.distance.should.equal(data.DistanceMeters);
                });

                it('should set altitude', function() {
                    sample.altitude.should.equal(data.AltitudeMeters);
                });

                it('should set latitude', function() {
                    sample.latitude.should.equal(data.Position.LatitudeDegrees);
                });

                it('should set longitude', function() {
                    sample.longitude.should.equal(data.Position.LongitudeDegrees);
                });
            });
        });
    });

    describe('Laps', function() {
        var laps = models.Lap;

        describe('Lap schema', function() {
            var schema = models.Lap.schema;
            it('should have start date', function() {
                schema.path('startTime').should.exist;
            });

            it('should have sequence', function() {
                schema.path('sequence').should.exist;
            });

            it('should have intensity', function() {
                schema.path('intensity').should.exist;
            });

            it('should have totalTime', function() {
                schema.path('totalTime').should.exist;
            });

            it('should have distanceMeters', function() {
                schema.path('distanceMeters').should.exist;
            });

            it('should have calories', function() {
                schema.path('calories').should.exist;
            });

            it('should have samples', function() {
                schema.path('samples').should.exist;
            });

            it('should have method named "addSample"', function() {
                new models.Lap.model().addSample.should.exist;
            });
        });

        describe('Lap method to add a lap', function() {
            var method = laps.addLap;

            it('should have method', function() {
                method.should.exist;
            });

            it('should return an object', function() {
                method().should.exist;
            });

            it('should return a valid model', function() {
                method()._id.should.exist;
            });

            it('should return unique models with each call', function() {
                method()._id.should.not.equal(method()._id);
            });

            describe('set fields correctly', function() {
                var data, lap;

                beforeEach(function(done) {
                    data = require('../data/laps').lap1;
                    lap = method(data);
                    done();
                });

                it('should should set startTime', function() {
                    lap.startTime.should.equalDate(new Date(data.$.StartTime));
                });

                it('should set intensity', function() {
                    lap.intensity.should.equal(data.Intensity);
                });

                it('should set totalTime', function() {
                    lap.totalTime.should.equal(data.TotalTimeSeconds);
                });

                it('should set distanceMeters', function() {
                    lap.distanceMeters.should.equal(data.DistanceMeters);
                });

                it('should set calories', function() {
                    lap.calories.should.equal(data.Calories);
                });
            });
        });

        describe('Lap model', function() {
            var model;

            beforeEach(function(done) {
                model = new laps.model();

                done();
            });

            it('should have method addSample', function() {
                model.addSample.should.exist;
            });

            it('should have method addSamples', function() {
                model.addSamples.should.exist;
            });

            describe('Add single sample', function() {
                var sample;

                beforeEach(function(done) {
                    model = new laps.model();
                    sample = require('../data/samples').example1;

                    done();
                });

                it('should return instance of itself for method chaining', function() {
                    model.addSample(sample).should.equal.model;
                });

                it('should add the sample to the samples array', function() {
                    model.addSample(sample)
                        .samples[0]
                        .should.equal.sample;
                });

                it('should set the sequence number of the added sample to 1', function() {
                    model.addSample(sample)
                        .samples[0].sequence
                        .should.equal(1);
                });

                it('should set subsequent sequence  numbers correctly', function() {
                    model.addSample(sample).addSample(require('../data/samples').example1)
                        .samples[1].sequence
                        .should.equal(2);

                    model.samples[0].sequence
                        .should.equal(1);
                });
            });

            describe('Add multiple samples', function() {
                var sample1, sample2, sample3;

                beforeEach(function(done) {
                    var data1 = require('../data/samples').example1;
                    var data2 = require('../data/samples').example1;
                    var data3 = require('../data/samples').example1;

                    sample1 = new models.Sample.model(data1);
                    sample2 = new models.Sample.model(data2);
                    sample3 = new models.Sample.model(data3);

                    model.addSamples([sample1, sample2, sample3]);

                    done();
                });

                it('should add multiple samples', function() {
                    model.samples.length.should.equal(3);
                });

                it('should set the sequence numbers for the added samples', function() {
                    model.samples[0].sequence.should.equal(1);
                    model.samples[1].sequence.should.equal(2);
                    model.samples[2].sequence.should.equal(3);
                });
            });
        });
    });

    describe('Activity', function() {
        var activities = models.Activity;

        describe('Activity schema', function() {
            var schema = activities.schema;

            it('should have laps', function() {
                schema.path('laps').should.exist;
            });

            it('should have method named "addLap"', function() {
                new activities.model().addLap.should.exist;
            });
        });

        describe('Activity method to add a new activity', function() {
            var method = activities.addActivity;

            it('should have method', function() {
                method.should.exist;
            });

            it('should return an object', function() {
                method().should.exist;
            });

            it('should return a valid model', function() {
                method()._id.should.exist;
            });

            it('should return unique models with each call', function() {
                method()._id.should.not.equal(method()._id);
            });
        });
    });
});