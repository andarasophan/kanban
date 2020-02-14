if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes/index')

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors())

app.use('/', routes)
app.use(errorHandler)

app.listen(port, () => console.log(`Connecting on port ${port}!`))