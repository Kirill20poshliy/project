const jwt = require('jsonwebtoken')
const RefreshToken = require('../models/token.model')
const ApiError = require('../errors/api.errors')

class TokenService {

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, 'jwt-accesstoken-key', {expiresIn: '30d'})
        const refreshToken = jwt.sign(payload, 'jwt-refreshtoken-key', {expiresIn: '30m'})
        return {
            accessToken,
            refreshToken,
        }
    }

    async saveToken(adminId, refreshToken) {
        const isExist = await RefreshToken.findOne({where: {AdminId: adminId}})
        if (isExist) {
            const newToken = await RefreshToken.update({token: refreshToken}, {where: {AdminId: adminId}})
            if (!newToken) {
                throw ApiError.ServerError()
            }
            return newToken
        } else {
            const newToken = await RefreshToken.create({
                token: refreshToken,
                AdminId: adminId
            })
            if (!newToken) throw ApiError.ServerError()
            return newToken
        }
    }

    validateRefreshToken(refreshToken) {
        const isValid = jwt.verify(refreshToken, 'jwt-refreshtoken-key')
        if (!isValid) {
            throw ApiError.BadRequest('Невалидный токен')
        }
        return isValid
    }

    validateAccessToken(accessToken) {
        const isValid = jwt.verify(accessToken, 'jwt-accesstoken-key')
        if (!isValid) {
            throw ApiError.BadRequest('Невалидный токен')
        }
        return isValid
    }

    async removeToken(refreshToken) {
        const remove = await RefreshToken.destroy({where: {token: refreshToken}})
        if (!remove) {
            throw ApiError.ServerError()
        }
        return remove
    }

    async findToken(refreshToken) {
        const token = await RefreshToken.findOne({where: {token: refreshToken}})
        if (!token) {
            throw ApiError.BadRequest('Токена не существует!')
        }
        return token
    }

}

module.exports = new TokenService()