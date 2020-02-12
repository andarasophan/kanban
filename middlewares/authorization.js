const { Category, Task } = require('../models/index')

const authorizationCategory = (req, res, next) => {
    Category.findOne({
        where: {
            id: req.params.categoryId
        }
    })
        .then(category => {
            if (category) {
                if (+category.user_id === +req.decoded.id) {
                    next();
                } else {
                    next({
                        status: 401,
                        message: 'You are not authorized'
                    })
                }
            } else {
                next({
                    status: 404,
                    message: 'Category not found'
                })
            }
        })
        .catch(err => {
            next(err)
        })
}

const authorizationTask = (req, res, next) => {
    Task.findOne({
        where: {
            id: req.params.taskId
        }
    })
        .then(task => {
            if (task) {
                if (+task.user_id === +req.decoded.id && +task.category_id === +req.params.categoryId) {
                    next();
                } else {
                    next({
                        status: 401,
                        message: 'You are not authorized'
                    })
                }
            } else {
                next({
                    status: 404,
                    message: 'Data not found'
                })
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = { authorizationCategory, authorizationTask };