var express = require('express');
var bodyParser = require('body-parser');
var status = require('http-status');
var mongoose = require('mongoose');
var helper = require('../helper');


module.exports = function(wagner) {

  var api = express.Router();
  api.get('/', wagner.invoke(function(Receipt) {
    return function(req, res) {
        console.info("GET many: " );
      Receipt.find().exec(helper.handleMany.bind(null, 'receipts', res));
    };
  }));
  // GET BY ID
  api.get('/:id', wagner.invoke(function(Receipt) {
    return function(req, res) {
      console.info("GET id: " + req.params.id );
      var id = new mongoose.Types.ObjectId(req.params.id);
      Receipt.findOne({_id: id}, helper.handleOne.bind(null, 'receipt', res));
    }}));

  // INSERT Receipt
  api.post('/', wagner.invoke(function(Receipt) {
    return function(req, res) {
      console.info("POST " + req.body);
      var ingredient = newReceiptFromRequest(req, new Receipt());      // create a new instance

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

  // UPDATE Receipt
  api.put('/:id', wagner.invoke(function(Receipt) {
    return function(req, res) {
      console.info("GET id: " + req.params.id );
      var id = new mongoose.Types.ObjectId(req.params.id);
      Receipt.findOne({_id: id}, function(err, ingredient){
         if (err)
             res.send(err);
         ingredient = newReceiptFromRequest(req, ingredient);

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
   api.delete('/:id', wagner.invoke(function(Receipt) {
     return function(req, res) {
       console.info("GET id: " + req.params.id );
       var id = new mongoose.Types.ObjectId(req.params.id);
       Receipt.remove({_id: id}, function(err, ingredient){
          if (err)
            res.send(err);
          res.json({ message: 'Successfully deleted' });
        });
    }
  }));

  function newReceiptFromRequest(req, receipt)
  {
    receipt.name = req.body.name;
    receipt.vegan = req.body.vegan;
    receipt.vegetarian = req.body.vegetarian;
    receipt.gluten_free = req.body.gluten_free;
    return receipt;
  };

  return api;
};
