const { sequelize } = require('../db/db.config')
const { DataTypes } = require('sequelize')
const Event = require('./event.model')

const Group = sequelize.define('Group', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    code: {
        type: DataTypes.INTEGER
    }
})

Group.hasMany(Event)

module.exports = Group