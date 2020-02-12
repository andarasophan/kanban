const router = require('express').Router();
const categoriesController = require('../controllers/categories');
const { authorizationCategory } = require('../middlewares/authorization');

router.post('/', categoriesController.insertData)
router.get('/', categoriesController.findAllById)
router.get('/:categoryId', authorizationCategory, categoriesController.findOne)
router.put('/:categoryId', authorizationCategory, categoriesController.editData)
router.delete('/:categoryId', authorizationCategory, categoriesController.delete)

module.exports = router;