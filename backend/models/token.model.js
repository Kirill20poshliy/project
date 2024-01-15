const { sequelize } = require('../db/db.config')
const { DataTypes } = require('sequelize')

const Token = sequelize.define('Token', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.STRING
    },
    admin_id: {
        type: DataTypes.INTEGER
    }
})


module.exports = Token