const router = require('express').Router();
const Controller = require('../controllers/user');
const CategoriesController = require('../controllers/categories');
const authentication = require('../middlewares/authentication');

router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.get('/user', authentication, Controller.findUser);
// router.get('/regenerate-token', Controller.regenerateToken);
router.put('/user/edit', authentication, Controller.editUser);

module.exports = router;
