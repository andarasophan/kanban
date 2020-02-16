const router = require('express').Router();
const tasksController = require('../controllers/tasks');
const { authorizationCategory, authorizationTask } = require('../middlewares/authorization');

router.post('/:categoryId', authorizationCategory, tasksController.insertData)
router.get('/:categoryId', authorizationCategory, tasksController.findAllByCategoryId)
router.get('/:categoryId/:taskId', authorizationCategory, authorizationTask, tasksController.findOne)
router.put('/:categoryId/:taskId', authorizationCategory, authorizationTask, tasksController.editData)
router.put('/:categoryId/:taskId/updateCategory', authorizationCategory, authorizationTask, tasksController.editCategory)
router.delete('/:categoryId/:taskId', authorizationCategory, authorizationTask, tasksController.deleteData)

module.exports = router;