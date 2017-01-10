var mongoose = require('mongoose')
var schema = require('./schemas/ingredientSchema.js')

// default to a 'localhost' configuration:
var connection_string = '127.0.0.1:27017';

// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_URL;
}

mongoose.connect(connection_string + '/menuapp');

exports.get = function (req, res) {
    var Ingredient = mongoose.model('Ingredient', schema, 'ingredients');

    var myIngredient = new Ingredient({
      name:'salt',
      vegetarian:true,
      vegan:true,
      gluten_free:true
    });

    myIngredient.save(function(error){
      if (error){
        console.log(error);
        process.exit(1);
      }

    })
    res.send('Hello World.')
  };
