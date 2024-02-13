const express = require('express')
const cors = require('cors')
const eventRouter = require('./routes/event.routes')
const adminRouter = require('./routes/admin.routes')
const { sequelize, connectDB } = require('./db/db.config')
const errorMiddleware = require('./middlewares/error.middleware')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 8080
const corsOptions = {
    origin: '',
    credentials: true,
    preflightContinue: true,
}

const app = express()

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'true, content-type, authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())
app.use('/api', eventRouter)
app.use('/api', adminRouter)

app.use(errorMiddleware)

const start = () => {

    app.listen(PORT, async () => {
        try {
            await connectDB()
            await sequelize.sync()
            console.log(`Server started on PORT: ${PORT}`)
        } catch (e) {
            console.log(e.message)
        }
    })

}

start()