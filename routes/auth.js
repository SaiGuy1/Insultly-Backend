const express = require('express')
const router = express.Router();
// const mw = require('../middleware');
const ctrl = require('../controllers');

// POST Signup (Create) Single User
router.post('/', ctrl.auth.signup);

// Show (VIEW) Single User
router.get('/:id', ctrl.auth.show);

// PUT Update Single User
router.put('/:id', ctrl.auth.update);

// DELETE Destroy Single User
router.delete('/:id', ctrl.auth.destroy);

// POST Login API Route
router.post('/login', ctrl.auth.login);

// GET Verify Single User
router.get('/verify', ctrl.auth.verify);

// DELETE Logout Single User
router.delete('/logout', ctrl.auth.logout);

module.exports = router;
