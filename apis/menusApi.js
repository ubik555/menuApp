var express = require('express');
var bodyParser = require('body-parser');
var status = require('http-status');
var mongoose = require('mongoose');
var helper = require('../helper');


module.exports = function(wagner) {

  var api = express.Router();

  api.get('/', wagner.invoke(function(Menu) {
    return function(req, res) {
        console.info("GET many: ");
      Menu.find().deepPopulate('meals.receipts').exec(helper.handleMany.bind(null, 'menus', res));
    };
  }));

  // GET BY ID
  api.get('/:id', wagner.invoke(function(Menu) {
    return function(req, res) {
      console.info("GET id: " + req.params.id );
      var id = new mongoose.Types.ObjectId(req.params.id);
      Menu.findOne({_id: id}).deepPopulate('meals.receipts').exec(helper.handleOne.bind(null, 'menu', res));

    }}));

  // INSERT menu
  api.post('/', wagner.invoke(function(Menu) {
    return function(req, res) {
      console.info("POST " + req.body.week);
      var menu = newMenuFromRequest(req, new Menu());      // create a new instance

      // save the bear and check for errors
      menu.save(function(err) {
        if (err) {
          return res.
            json({ error: err.toString() });
        }
        else
        {
            res.json(menu);
        }

      });
    }
  }));

    // INSERT meals
  api.post('/:id/meals', wagner.invoke(function(Menu, Meal) {
      return function(req, res) {
        console.info("POST " + req.body);
        var id = new mongoose.Types.ObjectId(req.params.id);
        Menu.findOne({_id: id}, function(err, menu)
          {
            if (err) {
              return res.
                json({ error: err.toString() });
            }
            console.log("Menu week: " + menu.week);
            var meal = new Meal();
            meal.user = req.body.user;
            meal.day = req.body.day;
            meal.type = req.body.type;
            meal.save(function(err) {
              if (err)
                return res.json({ error: err.toString() });
              });

            menu.meals.push(meal);
            menu.populate("receipts");
            // save the menu and check for errors
            menu.save(function(err) {
              if (err) {
                return res.
                  json({ error: err.toString() });
              }
              else
              {
                  res.json(menu);
              }
            });
        });
      }
    }));

  // INSERT meals
  api.post('/:id/meals/:id/receipts', wagner.invoke(function(Meal, Receipt) {
      return function(req, res) {
        var id = new mongoose.Types.ObjectId(req.params.id);
        Meal.findOne({_id: id}, function(err, meal)
        {
          if (err) {
            return res.
              json({ error: err.toString() });
          }
          console.log("Meal type: " + meal.type + "receipt " + req.body.receiptId);
          var receiptId = new mongoose.Types.ObjectId(req.body.receiptId);
          Receipt.findOne({_id: receiptId}, function(err, receipt)
          {
            if (err) {
              return res.
                json({ error: err.toString() });
            }
            console.log(receipt.name);
            meal.receipts.push(receipt);
            meal.populate("receipts");
            // save the menu and check for errors
            meal.save(function(err) {
              if (err) {
                return res.
                  json({ error: err.toString() });
              }
              else
              {
                  res.json(meal);
              }
            });
          });
        });
      }
    }));

   // DELETE ingredient
   api.delete('/:id', wagner.invoke(function(Menu) {
     return function(req, res) {
       console.info("GET id: " + req.params.id );
       var id = new mongoose.Types.ObjectId(req.params.id);
       Menu.remove({_id: id}, function(err, menu){
          if (err)
            res.send(err);
          res.json({ message: 'Successfully deleted' });
        });
      }
    }));

    // INSERT meals
  api.post('/:id/meals', wagner.invoke(function(Menu, Meal) {
      return function(req, res) {
        console.info("POST " + req.body);
        var id = new mongoose.Types.ObjectId(req.params.id);
        Menu.findOne({_id: id}, function(err, menu)
          {
            if (err) {
              return res.
                json({ error: err.toString() });
            }
            console.log("Menu week: " + menu.week);
            var meal = new Meal();
            meal.user = req.body.user;
            meal.day = req.body.day;
            meal.type = req.body.type;
            menu.meals.push(meal);
            // save the menu and check for errors
            menu.save(function(err) {
              if (err) {
                return res.
                  json({ error: err.toString() });
              }
              else
              {
                  res.json(menu);
              }
            });
        });
      }
    }));

   // DELETE ingredient
   api.delete('/:id', wagner.invoke(function(Menu) {
     return function(req, res) {
       console.info("GET id: " + req.params.id );
       var id = new mongoose.Types.ObjectId(req.params.id);
       Menu.remove({_id: id}, function(err, menu){
          if (err)
            res.send(err);
          res.json({ message: 'Successfully deleted' });
        });
      }
    }));


  function newMenuFromRequest(req, menu)
  {
    menu.week = req.body.week;
    return menu;
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
