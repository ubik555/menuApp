var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var mongoose = require('mongoose');

module.exports = function(wagner) {
  var api = express.Router();

  api.use(bodyparser.json());

  api.get('/', wagner.invoke(function(Ingredient) {
    return function(req, res) {
      Ingredient.
      find({}).exec(handleMany.bind(null, 'ingredients', res));
    };
  }));

  api.get('/:id', wagner.invoke(function(Ingredient) {
    return function(req, res) {
      console.info("GET id: " );
      Ingredient.findOne({_id: mongoose.Types.ObjectId(req.params.id)},
        handleOne.bind(null, 'ingredient', res));
    };
  }));

  api.post('/', wagner.invoke(function(Ingredient) {
    return function(req, res) {

        var ingredient = new Ingredient();      // create a new instance
        console.info("post: " + req.body);
        ingredient.name = req.body.name;
        ingredient.vegan = req.body.vegan;
        ingredient.vegetarian = req.body.vegetarian;
        ingredient.gluten_free = req.body.gluten_free;

        // save the bear and check for errors
        ingredient.save(function(err) {
            if (err)
                res.send(err);

            res.json(ingredient);
        });
      }
  }));

  return api;
};

function handleOne(property, res, error, result) {
  console.info("RESULT: " +result);
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

  var json = {};
  json[property] = result;
  res.json(json);
}

function handleMany(property, res, error, result) {
  console.info("RESULT: " +result);
  if (error) {
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json({ error: error.toString() });
  }

  res.send(result);
}
