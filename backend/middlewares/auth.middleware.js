const ApiError = require('../errors/api.errors')
const tokenService = require('../services/token.service')

module.exports = (req, res, next) => {

    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            ApiError.UnauthtorizedError()
        }
        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) {
            ApiError.BadRequest('Отсутствует accessToken!')
        }
        const adminData = tokenService.validateAccessToken(accessToken)
        if (!adminData) {
            ApiError.BadRequest('Несовпадение токенов!')
        }
        req.admin = adminData
        next()
    } catch (e) {
        ApiError.UnauthtorizedError()
    }

}