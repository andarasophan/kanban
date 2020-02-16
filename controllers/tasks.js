const { Task } = require('../models/index');

class Controller {
    static insertData(req, res, next) {
        let newTask = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            user_id: req.decoded.id,
            category_id: req.params.categoryId
        }
        Task.create(newTask)
            .then(newTask => {
                res.status(201).json(newTask)
            })
            .catch(err => {
                next(err)
            })
    }
    static findAllByCategoryId(req, res, next) {
        Task.findAll({
            where: {
                category_id: req.params.categoryId
            },
            order: [['id', 'ASC']]
        })
            .then(tasks => {
                res.status(200).json(tasks)
            })
            .catch(err => {
                next(err)
            })
    }
    static findOne(req, res, next) {
        Task.findOne({
            where: {
                id: req.params.taskId
            }
        })
            .then(task => {
                if (task) {
                    res.status(200).json(task)
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
        let update = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date
        };
        Task.update(update, {
            where: {
                id: req.params.taskId
            },
            returning: true
        })
            .then(data => {
                if (data[0]) {
                    res.status(200).json(data)
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
    static deleteData(req, res, next) {
        Task.destroy({
            where: {
                id: req.params.taskId
            }
        })
            .then(data => {
                if (data) {
                    res.status(200).json({
                        data,
                        message: 'Deleted'
                    })
                } else {
                    next({
                        status: 404,
                        message: 'Not found',
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
    static editCategory(req, res, next) {
        let update = {
            category_id: req.body.category_id
        };
        Task.update(update, {
            where: {
                id: req.params.taskId
            },
            returning: true
        })
            .then(data => {
                if (data[0]) {
                    res.status(200).json(data)
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
}

module.exports = Controller;