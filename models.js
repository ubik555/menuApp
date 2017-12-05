var mongoose = require('mongoose');
var _ = require('underscore');
module.exports = function(wagner) {
  // default to a 'localhost' configuration:
  //var connection_string = '127.0.0.1:27017/menuapp';
  //mongoose.connect(connection_string);

  mongoose.connect(process.env.MONGOLAB_URI, function (error) {
      if (error) console.error(error);
      else console.log('mongo connected');
  });

  var Ingredient =
    mongoose.model('Ingredient', require('./schemas/ingredient'), 'ingredients');
  var Receipt =
    mongoose.model('Receipt', require('./schemas/receipt'), 'receipt');
  var Menu =
    mongoose.model('Menu', require('./schemas/menu'), 'menu');
  var Meal =
      mongoose.model('Meal', require('./schemas/meal'), 'meal');
  var models = {
      Ingredient: Ingredient,
      Receipt: Receipt,
      Meal:Meal,
      Menu: Menu

  };

  // To ensure DRY-ness, register factories in a loop
  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

    return models;
};
