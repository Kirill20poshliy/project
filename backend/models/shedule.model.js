const { sequelize } = require('../db/db.config')
const { DataTypes } = require('sequelize')

const Shedule = sequelize.define('Shedule', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user: {
        type: DataTypes.STRING
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Shedule
