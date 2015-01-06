var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var Meta = new Schema({
    id: ObjectId,
    metaType: String,
    metaValue: Object
});