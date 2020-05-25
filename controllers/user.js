const { User, Task, Category } = require('../models/index')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken, verifyToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');
const secretPasswordGoogle = process.env.SECRET_GOOGLE

class Controller {
    static register(req, res, next) {
        let newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
            .then(user => {
                let payload = {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    id: user.id,
                    email: user.email
                }
                let token = generateToken(payload);
                res.status(201).json({
                    token: token
                });
            })
            .catch(err => {
                next(err);
            })
    }
    static login(req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user => {
                if (user) {
                    if (comparePass(req.body.password, user.password)) {
                        let payload = {
                            first_name: user.first_name,
                            last_name: user.last_name,
                            id: user.id,
                            email: user.email,
                            image: user.image,
                            background: user.background,
                        }
                        let token = generateToken(payload);
                        res.status(200).json({
                            token: token
                        })
                    } else {
                        next({
                            status: 400,
                            message: 'Email / Password Wrong'
                        })
                    }
                } else {
                    next({
                        status: 400,
                        message: 'Email / Password Wrong'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
    // static regenerateToken(req, res, next) {
    //     if (req.headers.token) {
    //         try {
    //             let decoded = verifyToken(req.headers.token);
    //             User.findOne({
    //                 where: {
    //                     id: decoded.id
    //                 }
    //             })
    //                 .then(user => {
    //                     if (user) {
    //                         let payload = {
    //                             first_name: user.first_name,
    //                             last_name: user.last_name,
    //                             id: user.id,
    //                             email: user.email,
    //                             image: user.image,
    //                             background: user.background,
    //                         };
    //                         let token = generateToken(payload);
    //                         res.status(200).json({
    //                             token: token
    //                         })
    //                     } else {
    //                         next({
    //                             status: 401,
    //                             message: 'Unauthorized'
    //                         })
    //                     }
    //                 })
    //                 .catch(err => {
    //                     next(err)
    //                 })
    //         } catch (error) {
    //             next({
    //                 status: 401,
    //                 message: 'Unauthorized'
    //             })
    //         }
    //     } else {
    //         next({
    //             status: 401,
    //             message: 'Unauthorized'
    //         })
    //     }
    // }
    static findUser(req, res, next) {
        User.findOne({
            where: {
                id: req.decoded.id,
            },
            order: [
                ['id', 'ASC'],
                [
                    { model: Category, as: 'Categories' },
                    'id', 'ASC'
                ],
                [
                    { model: Category, as: 'Categories' },
                    { model: Task, as: 'Tasks' },
                    'id', 'ASC'
                ]
            ],
            include: [{
                model: Category,
                include: [{
                    model: Task,
                }]
            }],
        })
            .then((user) => {
                res.status(200).json(user);
            })
            .catch(err => {
                next(err)
            });
    }
    static editUser(req, res, next) {
        let update = req.body;
        User.update(update, {
            where: {
                id: req.decoded.id
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
            });
    }
    static
}

module.exports = Controller;
