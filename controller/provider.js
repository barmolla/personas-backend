const Provider    = require('../model/provider')
const ApiResponse = require('../model/response')

const getByID = async (req, res) => {
    const providerFound = await Provider.find({_id: req.params.id })

    return providerFound ?
        res.status(200).send(new ApiResponse({ status: 200, message: 'OK', result: providerFound })) : 
        res.status(404).send(new ApiResponse({ status: 404, message: 'entity not found', result: ''}))
}

const getAll = async (req, res) => {
    const providers = await Provider.find()

    res.status(200).send(new ApiResponse({ status: 200, message: 'OK', result: providers }))
}

const create = async (req, res) => {
    const { name, description} = req.body
    const providerToInsert = new Provider({ name, description })

    const provider = await providerToInsert.save()

    res.status(201).send(new ApiResponse({ status: 201, message: 'OK', result: provider }))
}

const remove = async (req, res) => {
    const providerFound = await Provider.find({ _id: req.params.id })

    if (providerFound) {
       await Provider.remove({ _id: req.params.id })

       return res.status(200).send(new ApiResponse({ status: 200, message: 'removed', result: '' }))

    } else {
       return res.status(404).send(new ApiResponse({ status: 404, message: 'entity not found', result: ''}))
    }
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
    const { _id } = req.params
    const providerFound = await Provider.find({ _id })

    if (providerFound) {
        await Provider.updateOne(validBody)

        return res.status(200).send(new ApiResponse({ status: 200, message: 'entity updated', result: ''}))

    } else {
       return res.status(404).send(new ApiResponse({ status: 404, message: 'entity not found', result: ''}))
    }
}

module.exports = {
    getByID,
    getAll,
    create,
    remove,
    patch
}