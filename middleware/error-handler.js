module.exports = errorHandler

const errorHandler = (err, req, res, next) => {
    // custom application error
    if (typeof (err) === 'string') return res.status(400).json({ status: 400, message: err })

    // mongoose validation error
    if (err.name === 'ValidationError') return res.status(400).json({ status: 400, message: err.message })

    // jwt authentication error
    if (err.name === 'UnauthorizedError') return res.status(401).json({ message: 'Invalid Token' })

    // default to 500 server error
    return res.status(500).json({ status: 500, message: err.message })
}