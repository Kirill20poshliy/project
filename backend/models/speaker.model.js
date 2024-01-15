const { sequelize } =  require('../db/db.config')
const { DataTypes } = require('sequelize')
const Event = require('./event.model')

const Speaker = sequelize.define('Speaker', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING
    }
})

Speaker.hasMany(Event)

module.exports = Speaker