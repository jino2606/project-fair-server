/* Paths to resolve the client requests */

/* import express */
const express = require('express')

const userController = require('../controllers/userController')
const projectController = require('../controllers/projectController')

/* import the jwt middleware that we jus created */
const jwtMiddleware = require('../Middleware/jwtMiddleware')

/* import the multer that we jus created */
const multerconfig = require('../Middleware/multerMiddleware')

/* Create an object for the class router in express */
const router = new express.Router()

/* path for resolving the request */
/* syntax
    router.<httprequest>('<path to resolve request>', ()=>{<how to resolve request>})
*/
/* Register */
router.post('/user/register', userController.register)

/* Login */
router.post('/user/login', userController.login)

/* App project */
router.post('/projects/add', jwtMiddleware, multerconfig.single('projectImage'), projectController.addProject) /* Give the middle ware before controller to route the req to middlewate before goingto controller */

/* Projects getHomeProjects*/
router.get('/projects/homeProjects', projectController.getHomeProjects)

/* Projects getAllProjects*/
router.get('/projects/allProjects', jwtMiddleware, projectController.getAllProjects)

/* Projects getUserProjects*/
router.get('/projects/userProjects', jwtMiddleware, projectController.getUserProjects)

/* Projects update UserProjects*/
router.put('/projects/updateProjects/:id', jwtMiddleware, multerconfig.single('projectImage'), projectController.updateUserProject)

//delete project
router.delete('/projects/remove/:id', jwtMiddleware, projectController.deleteUserProject)

//updateUser
router.put('/user/update',jwtMiddleware, multerconfig.single("profile"), userController.editUser)

/* Export Router */
module.exports = router