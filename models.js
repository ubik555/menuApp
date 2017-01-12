var mongoose = require('mongoose');

module.exports = function(wagner) {
  // default to a 'localhost' configuration:
  var connection_string = '127.0.0.1:27017/menuapp';

  // if OPENSHIFT env variables are present, use the available connection info:
  if(process.env.OPENSHIFT_MONGODB_DB_URL){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + 'menuapp';
  }

  mongoose.connect(connection_string);
  console.error("mongoose connected")

  var Ingredient =
    mongoose.model('ingredient', require('./schemas/ingredientSchema'), 'ingredients');
    
  wagner.factory('Ingredient', function() {
    return Ingredient;
  });

  return {
    Ingredient: Ingredient
  };
};
