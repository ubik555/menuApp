var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: {type: String, required: true },
  vegetarian:{ type: Boolean,required: true},
  vegan:
  {
    type: Boolean,
    required: true
  },
  gluten_free:
  {
    type: Boolean,
    required: true
  }
});

module.exports = schema;
module.exports.receiptSchema = schema;
