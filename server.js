const express = require('express');
const projectsRouter = require('./data/helpers/projects/projectsRouter.js');
const actionsRouter = require('./data/helpers/actions/actionsRouter.js');
const server = express();
const helmet = require('helmet');
const cors = require('cors');

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use('/projects', projectsRouter);
server.use('/actions', actionsRouter); 

server.get('/', (req, res) => {
  res.send(
    `<h2>Sprint Challenge server up and running!</h2>`
  )
});

module.exports = server;