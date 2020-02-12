const errorHandler = (err, req, res, next) => {
    let status = err.status ? err.status : 500;
    let error = err.message ? err.message : 'Internal server error';
    if (err.name === 'SequelizeValidationError') {
        status = 400;
        error = [];
        err.errors.forEach(el => {
            error.push(el.message)
        });
    }
    if (err.name === 'SequelizeDatabaseError') {
        status = 400;
        error = 'Invalid input';
    }
    res.status(status).json(error)
}

module.exports = errorHandler;