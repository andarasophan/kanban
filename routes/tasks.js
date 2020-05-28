const router = require('express').Router();
const tasksController = require('../controllers/tasks');
const { authorizationCategory, authorizationTask } = require('../middlewares/authorization');

router.post('/:categoryId', authorizationCategory, tasksController.insertData)
router.get('/:categoryId', authorizationCategory, tasksController.findAllByCategoryId)
router.get('/:categoryId/:taskId', authorizationTask, tasksController.findOne)
router.put('/:categoryId/:taskId', authorizationTask, tasksController.editData)
router.put('/:categoryId/:taskId/updateCategory', authorizationTask, tasksController.editTaskCategoryId)
router.delete('/:categoryId/:taskId', authorizationTask, tasksController.deleteData)

module.exports = router;
