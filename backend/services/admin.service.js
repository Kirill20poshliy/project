const ApiError = require('../errors/api.errors')
const Admin = require('../models/admin.model')
const bcrypt = require('bcrypt')
const AdminDTO = require('../dtos/admin.dto')
const tokenService = require('../services/token.service')

class AdminService {

    async registration(body) {
        const {login, password} = body
        const candidate = await Admin.findOne({where: {login: login}})
        if (candidate) {
            throw ApiError.BadRequest(`Администратор с логином ${login} уже существует!`)
        }
        const hashPass = await bcrypt.hash(password, 3)
        const newAdmin = await Admin.create({
            login: login,
            password: hashPass,
        })
        const adminDTO = new AdminDTO(newAdmin.id, newAdmin.login)
        const tokens = tokenService.generateTokens({...adminDTO})
        await tokenService.saveToken(adminDTO.adminId, tokens.refreshToken)
        return {
            ...tokens,
            data: adminDTO
        }
    }

    async login(body) {
        const {login, password} = body
        if (!login || !password) throw ApiError.BadRequest(`Укажите все параметры входа!`)
        const candidate = await Admin.findOne({where: {login: login}})
        if (!candidate) throw ApiError.BadRequest(`Администратора с логином ${login} не существует!`)
        const passEqual = await bcrypt.compare(password, candidate.password)
        if (!passEqual) throw ApiError.BadRequest(`Неверный пароль!`)
        const adminDTO = new AdminDTO(candidate.id, candidate.login)
        const tokens = tokenService.generateTokens({...adminDTO})
        await tokenService.saveToken(adminDTO.adminId, tokens.refreshToken)
        return {
            ...tokens,
            data: adminDTO
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        if (!token) {
            throw ApiError.ServerError()
        }
        return token
    }

    async refresh(refreshToken) {
        const tokenDB = await tokenService.findToken(refreshToken)
        const validate = tokenService.validateRefreshToken(refreshToken)
        if (!validate || !tokenDB) {
            throw ApiError.BadRequest('Ошибка токенов!')
        }
        const id = tokenDB.AdminId
        const admin = await Admin.findByPk(id)
        if (!admin) {
            throw ApiError.BadRequest(`Админа с id: ${tokenDB.UserId} не существует!`)
        }
        const adminDTO = new AdminDTO(admin.id, admin.login)
        const tokens = tokenService.generateTokens({...adminDTO})
        await tokenService.saveToken(adminDTO.adminId, tokens.refreshToken)
        return {
            ...tokens,
            data: adminDTO
        }   
    }

}

module.exports = new AdminService