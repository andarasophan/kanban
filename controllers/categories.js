const { Category } = require('../models/index');

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
            order: [['id', 'ASC']]
        })
            .then(categories => {
                res.status(200).json(categories);
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
        let update = {
            name: req.body.name
        };
        Category.update(update, {
            where: {
                id: req.params.categoryId
            },
            returning: true
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
        Category.destroy({
            where: {
                id: req.params.categoryId
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
}

module.exports = Controller;