const { sequelize } = require('../db/db.config')
const { DataTypes } = require('sequelize')

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING
    },
    datetime: {
        type: DataTypes.DATE
    },
    duration: {
        type: DataTypes.TIME
    },
    link: {
        type: DataTypes.STRING
    },
    canceled: {
        type: DataTypes.BOOLEAN
    }
})

module.exports = Event