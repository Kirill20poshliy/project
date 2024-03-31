const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: process.env.DATABASE_DIALECT,
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000,
    }
})

const connectDB = async () => {
    try {
        await sequelize.authenticate()
    } catch (e) {
        console.log(e.message)
    }
}

module.exports = { sequelize, connectDB }