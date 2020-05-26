const { Category, Task } = require('../models/index');

class Controller {
    static insertData(req, res, next) {
        let newCategory = {
            name: req.body.name,
            user_id: req.decoded.id
        }
        Category.create(newCategory)
            .then(newCategory => {
                res.status(201).json(newCategory)
            })
            .catch(err => {
                next(err)
            })
    }
    static findAllById(req, res, next) {
        Category.findAll({
            where: {
                user_id: req.decoded.id
            },
            order: [
                ['id', 'ASC'],
                [{ model: Task, as: 'Tasks' }, 'id', 'ASC']
            ],
            include: [Task],
        })
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                next(err)
            })
    }
    static findOne(req, res, next) {
        Category.findOne({
            where: {
                id: req.params.categoryId
            }
        })
            .then(category => {
                if (category) {
                    res.status(200).json(category)
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
    static editData(req, res, next) {
        let update = req.body
        Category.update(update, {
            where: {
                id: req.params.categoryId
            },
            returning: true,
            individualHooks: true,
        })
            .then(data => {
                if (data[0]) {
                    res.status(200).json(data)
                } else {
                    next({
                        status: 404,
                        mesa: 'Data not found'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
    static delete(req, res, next) {
        let deleted;
        Category.destroy({
            where: {
                id: req.params.categoryId
            },
            individualHooks: true,
        })
            .then(data => {
                if (data) {
                    deleted = data
                    return Task.destroy({
                        where: {
                            category_id: req.params.categoryId
                        }
                    })
                } else {
                    next({
                        status: 404,
                        message: 'Not found',
                    })
                }
            })
            .then(tasks => {
                res.status(200).json({
                    category: deleted,
                    tasks: tasks,
                    message: 'Deleted'
                })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = Controller;
