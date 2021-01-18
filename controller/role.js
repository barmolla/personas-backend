const Role    = require('../model/role')
const roleService = require('../service/roleService')
const ApiResponse = require('../model/response')

const getByID = async (req, res) => {
    const roleFound = await roleService.getByID(req.params.id)

    return roleFound ?
        res.status(200).send(new ApiResponse({ status: 200, message: 'OK', result: roleFound })) : 
        res.status(404).send(new ApiResponse({ status: 404, message: 'entity not found', result: ''}))
}

const getAll = async (req, res) => res.status(200).send(new ApiResponse({ status: 200, message: 'OK', result: await roleService.getAll() }))

const create = async (req, res) => {
    const { name, description } = req.body
    const role = await roleService.create({ name, description })

    res.status(201).send(new ApiResponse({ status: 201, message: 'OK', result: role }))
}

const remove = async (req, res) => {
    if (await roleService.remove(req.params.id)) {
       return res.status(204).send(new ApiResponse({ status: 204, message: 'removed', result: '' }))
    }

    return res.status(404).send(new ApiResponse({ status: 404, message: 'entity not found', result: ''}))
}

const check = obj => obj && obj.length > 0

const getValidBody = body => {
    const { name, description } = body
    const validBody = {}

    if (check(name))        validBody.name          = name
    if (check(description)) validBody.description   = description

    return validBody
}

const patch = async (req, res) => {
    const validBody = getValidBody(req.body)
    const roleFound = await Role.find({ _id: req.params.id })

    if (roleFound) {
        await Role.updateOne(validBody)

        return res.status(200).send(new ApiResponse({ status: 200, message: 'entity updated', result: ''}))

    }

    return res.status(404).send(new ApiResponse({ status: 404, message: 'entity not found', result: ''}))
}

module.exports = {
    getByID,
    getAll,
    create,
    remove,
    patch
}