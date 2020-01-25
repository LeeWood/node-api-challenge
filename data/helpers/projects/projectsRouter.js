const express = require('express');
const db = require('./projectModel.js');
const router = express.Router();

//GET REQUESTS
router.get('/', (req, res) => { //read all projects

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

router.get('/:id', (req, res) => { //read id specific project
  res.status(200).json({
    success: true,
    proj: req.project 
  });
});

//POST REQUESTS
router.post('/', validateProj, (req, res) => { //create new prpject
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
router.put('/:id', validateProjId, validateProjShort, (req, res) => { //update existing project
  
  const id = req.params.id;
  const edits = req.body;

  db.update(id, edits)
    .then(proj => {
      res.status(201).json({
        success: true,
        message: "Project info updated.",
        proj
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "There was a problem updating project.",
        error: err
      });
    });
});

//DELETE REQUESTS
router.delete('/:id', (req, res) => {

  const id = req.params.id;

 
})

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

function validateProjShort(req, res, next) {
  //version of project verification where request body needs a value, but not all values. For editing project purposes. This way the user can edit smaller detail like title or completed without having to re-write the entire description.
  const data = req.body;
  if(data.name || data.description || data.completed) {
    next();
  } else {
    res.status(400).json({
      message: "Please include project data."
    });
  }
}

module.exports = router;