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

router.get('/:id', (req, res) => { //id specific project
  res.status(200).json({
    success: true,
    proj: req.project 
  });
});

//POST REQUESTS
router.post('/', validateProj, (req, res) => {
  db.insert(req.body)
    .then(proj => {
      res.status(201).json({
        success: true,
        proj
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "THere was a problem creating project.",
        error: err
      });
    });
});

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

function validateProj(req, res, next) { //project must have proper key/value pairs in body
  const data = req.body;
  if(!data) {
    res.status(400).json({
      message: "Missing project data"
    });
  } else if(!data.name) {
    res.status(400).json({
      message: "Please include project name"
    });
  } else if(!data.description) {
    res.status(400).json({
      message: "Please include project description."
    });
  } else {
    next();
  }
}

module.exports = router;