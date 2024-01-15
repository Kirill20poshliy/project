const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
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