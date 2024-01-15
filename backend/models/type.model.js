const { sequelize } =  require('../db/db.config')
const { DataTypes } = require('sequelize')
const Event = require('./event.model')

const Type = sequelize.define('Type', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING
    }
})

Type.hasMany(Event)

module.exports = Type