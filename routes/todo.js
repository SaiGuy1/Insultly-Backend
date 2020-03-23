const express = require('express')
const router = express.Router();
// const mw = require('../middleware');
const ctrl = require('../controllers');

// Show All
router.get('/', ctrl.todo.showAll);

// Show One
router.get('/:id', ctrl.todo.show);

// Create ToDo
router.post('/', ctrl.todo.create);

// Edit ToDo
router.put('/:id', ctrl.todo.update);

//Delete ToDo
router.delete('/:id', ctrl.todo.destroy);


module.exports = router;
