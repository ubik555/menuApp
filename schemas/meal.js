var mongoose = require('mongoose');
var receipt = require('./receipt');

var schema = new mongoose.Schema({
  user: {type: String, required: true },
  day: {type: String, required: true },
  type:{ type: String, enum: ['LUNCH', 'DINNER']},
  receipts:[{type: mongoose.Schema.Types.ObjectId, ref: 'Receipt'}]
});

module.exports = schema;
module.exports.mealSchema = schema;
