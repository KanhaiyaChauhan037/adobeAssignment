const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User Endpoints
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);
router.get('/analytics/users', userController.getTotalNumberOfUsers);
router.get('/analytics/users/top-active', userController.getTopActiveUsers);

module.exports = router;
