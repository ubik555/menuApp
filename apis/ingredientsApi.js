var express = require('express');
var bodyParser = require('body-parser');
var status = require('http-status');
var mongoose = require('mongoose');
var helper = require('../helper');


module.exports = function(wagner) {

  var api = express.Router();
  api.get('/', wagner.invoke(function(Ingredient) {
    return function(req, res) {
        console.info("GET many: " );
      Ingredient.find().exec(helper.handleMany.bind(null, 'ingredients', res));
    };
  }));
  // GET BY ID
  api.get('/:id', wagner.invoke(function(Ingredient) {
    return function(req, res) {
      console.info("GET id: " + req.params.id );
      var id = new mongoose.Types.ObjectId(req.params.id);
      Ingredient.findOne({_id: id}, helper.handleOne.bind(null, 'ingredient', res));
    }}));

  // INSERT Ingredient
  api.post('/', wagner.invoke(function(Ingredient) {
    return function(req, res) {
      console.info("POST " + req.body);
      var ingredient = newIngredientFromRequest(req, new Ingredient());      // create a new instance

      // save the bear and check for errors
      ingredient.save(function(err) {
        if (err) {
          return res.
            json({ error: err.toString() });
        }
        else
        {
            res.json(ingredient);
        }

      });
    }
  }));

  // UPDATE Ingredient
  api.put('/:id', wagner.invoke(function(Ingredient) {
    return function(req, res) {
      console.info("GET id: " + req.params.id );
      var id = new mongoose.Types.ObjectId(req.params.id);
      Ingredient.findOne({_id: id}, function(err, ingredient){
         if (err)
             res.send(err);
         ingredient = newIngredientFromRequest(req, ingredient);

         // save the bear and check for errors
         ingredient.save(function(err) {
           if (err) {
             return res.
               json({ error: err.toString() });
           }
           else
           {
                 res.json(ingredient);
           }

       });
     });
   }
  }));
   // DELETE ingredient
   api.delete('/:id', wagner.invoke(function(Ingredient) {
     return function(req, res) {
       console.info("GET id: " + req.params.id );
       var id = new mongoose.Types.ObjectId(req.params.id);
       Ingredient.remove({_id: id}, function(err, ingredient){
          if (err)
            res.send(err);
          res.json({ message: 'Successfully deleted' });
        });
    }
  }));

  function newIngredientFromRequest(req, ingredient)
  {
    ingredient.name = req.body.name;
    ingredient.vegan = req.body.vegan;
    ingredient.vegetarian = req.body.vegetarian;
    ingredient.gluten_free = req.body.gluten_free;
    return ingredient;
  };

  return api;
};

/*
function handleOne(property, res, error, result) {
  console.info("RESULT: " + result);
  if (error) {
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json({ error: error.toString() });
  }
  if (!result) {
    return res.
      status(status.NOT_FOUND).
      json({ error: 'Not found' });
  }

  res.send(result);
}

function handleMany(property, res, error, result) {
  console.info("RESULT: " + result);
  if (error) {
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json({ error: error.toString() });
  }

  res.send(result);
}*/
