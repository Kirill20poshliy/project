const { sequelize } = require('../db/db.config')
const { DataTypes } = require('sequelize')
const RefreshToken = require('./token.model')

const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    login: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING
    }
})

Admin.hasMany(RefreshToken)

module.exports = Admin