const express = require('express')
const cors = require('cors')
const eventRouter = require('./routes/event.routes')
const { sequelize, connectDB } = require('./db/db.config')
const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', eventRouter)

const start = () => {

    app.listen(PORT, () => {
        try {
            connectDB()
            console.log(`Server started on PORT: ${PORT}`)
        } catch (e) {
            console.log(e.message)
        }
    })

}

start()