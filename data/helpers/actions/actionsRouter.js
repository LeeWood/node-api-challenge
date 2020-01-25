const express = require('express');
const db = require('./actionModel.js');
const projDb = require('../projects/projectModel.js');
const router = express.Router();

//GET REQUESTS
router.get('/', (req, res) => { //list all actions from all projects

  db.get()
    .then(acts => {
      res.status(200).json({
        success: true,
        acts
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "There was a problem retrieving actions.",
        err
      });
    });
});

router.get('/:id', validateActId, (req, res) => { //get specific action, by action id

  const { id } = req.params;

  db.get(id)
    .then(acts => {
      res.status(200).json({
        success: true,
        acts
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "There was a problem retrieving actions."
      });
    });
});

//POST REQUESTS
router.post('/:proj_id', validateProjId, validateAction, characterCount, (req, res) => {
  
  const { proj_id } = req.params;

  db.insert({...req.body, project_id: proj_id})
    .then(action => {
      res.status(201).json({
        success: true,
        action
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "There was a problem adding the action.",
        error: err
      });
    });
});

//PUT REQUESTS
router.put('/:id', validateActId, validateActShort, characterCount, (req, res) => {

  const { id } = req.params;
  const edits = req.body;

  db.update(id, edits)
    .then(act => {
      res.status(201).json({
        success: true,
        message: "Action info updated.",
        act
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "There was a problem updating action.",
        error: err
      });
    });
});

//DELETE REQUESTS
router.delete('/:id', (req, res) => {
  
  const { id } = req.params;
  
  db.remove(id)
    .then(act => {
      res.status(200).json({
        success: true,
        message: "Action was successfully deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "There was a problem deleting action.",
        error: err
      });
    });
});

//CUSTOM MIDDLEWARE
function validateProjId(req, res, next) { //project must have valid existing id

  const { proj_id } = req.params;
  
  projDb.get(proj_id)
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

function validateActId(req, res, next) { //checks if action exists

  const { id } = req.params;

  db.get(id)
    .then(action => {
      if(action) {
        req.action = action;
        next();
      } else {
        res.status(404).json({
          message: "The action with this ID could not be found."
        });
      }
    });
}

function validateAction(req, res, next) { //new actions must have description, notes

  const data = req.body;

  if(!data) {
    res.status(400).json({
      success: false,
      message: "Missing action data."
    });
  }else if(!data.notes) {
    res.status(400).json({
      success: false,
      message: "Please include action notes."
    });
  } else if(!data.description) {
    res.status(400).json({
      success: false,
      message: "Please include action description"
    });
  } else {
    next();
  }
}

function validateActShort(req, res, next) { //updating actions must have at least one key/val pair

  const body = req.body;

  if(body.description || body.notes || body.completed) {
    next();
  } else {
    res.status(400).json({
      success: false,
      message: "Please include action data."
    });
  }
}

function characterCount(req, res, next) { //character count for action description
  
  const description = req.body.description;
  
  if(description.length > 128) {
    res.status(400).json({
      success: false,
      message: "Please limit descriptions to 128 characters."
    });
  } else {
    next();
  }
}

module.exports = router;