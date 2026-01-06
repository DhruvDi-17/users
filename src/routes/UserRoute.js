const express = require('express')
const router =express.Router()
const UserController = require('../controllers/UserController')
const AuthMiddleware = require('../middleware/AuthMiddleware')

router.use(AuthMiddleware)
router.post('/user',UserController.CreateUsers)
router.get('/user/:id',UserController.getUsersById)
router.get('/user',UserController.getUsers)
router.delete('/user/:id',UserController.DeleteUser)

module.exports = router                                                                            