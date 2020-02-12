const router = require('express').Router();
const userRouter = require('./user');
const categoriesRouter = require('./categories')
const tasksRouter = require('./tasks')
const authentication = require('../middlewares/authentication')

router.use('/', userRouter);
router.use(authentication);
router.use('/categories', categoriesRouter)
router.use('/tasks', tasksRouter)

module.exports = router;