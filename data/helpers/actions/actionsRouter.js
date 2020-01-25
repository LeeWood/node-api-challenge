const express = require('express');
const db = require('./actionModel.js');
const router = express.Router();

//GET REQUESTS

//POST REQUESTS

//PUT REQUESTS

//DELETE REQUESTS

//CUSTOM MIDDLEWARE
function validateProjId(req, res, next) { //project must have valid existing id

  const { id } = req.params;
  db.get(id)
    .then(project => {
      if(project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({
          message: "The project with this ID could not be found."
        });
      }
    });
}
module.exports = router;