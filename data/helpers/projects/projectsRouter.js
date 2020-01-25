const express = require('express');
const db = require('./projectModel.js');
const router = express.Router();

//GET REQUESTS
router.get('/', (req, res) => {

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

//POST REQUESTS

//PUT REQUESTS

//DELETE REQUESTS

//CUSTOM MIDDLEWARE

module.exports = router;