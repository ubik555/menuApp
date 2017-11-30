var express = require('express');
var status = require('http-status');


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
}

module.exports = {
  handleMany,
  handleOne
}
