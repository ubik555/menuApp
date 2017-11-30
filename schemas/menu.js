var mongoose = require('mongoose');
var meal = require('./meal');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var schema = new mongoose.Schema({
  week: {type: String, required: true },
  meals:[{type: mongoose.Schema.Types.ObjectId, ref: 'Meal'}]
});

schema.plugin(deepPopulate);
module.exports = schema;
