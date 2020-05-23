const router = require('express').Router();
const Controller = require('../controllers/user');
const CategoriesController = require('../controllers/categories');
const authentication = require('../middlewares/authentication');

router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.post('/login/google', Controller.loginGoogle);
router.get('/user', authentication, CategoriesController.findAllById);

module.exports = router;
