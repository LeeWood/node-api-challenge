const express = require('express');
const db = require('./projectModel.js');
const router = express.Router();

//GET REQUESTS
router.get('/', (req, res) => { //all projects

  db.get()
    .then(projs => {
      res.status(200).json({
        success: true,
        projs
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "There has been a problem retrieving posts.",
        error: err
      });
    });
});

router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    proj: req.project 
  });
});

//POST REQUESTS

//PUT REQUESTS

//DELETE REQUESTS

//CUSTOM MIDDLEWARE
function validateProjId(req, res, next) {

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