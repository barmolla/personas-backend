const Superior    = require('../model/superior')
const ApiResponse = require('../model/response')

const getByID = async (req, res) => {
    const superiorFound = await Superior.find({ _id: req.params.id })

    return superiorFound ?
        res.status(200).send(new ApiResponse({ status: 200, message: 'OK', result: superiorFound })) : 
        res.status(404).send(new ApiResponse({ status: 404, message: 'entity not found', result: ''}))
}

const getAll = async (req, res) => {
    const superiors = await Superior.find()

    res.status(200).send(new ApiResponse({ status: 200, message: 'OK', result: superiors }))
}

const create = async (req, res) => {
    const { name, surname } = req.body
    const superiorToInsert  = new Superior({ name, surname })

    const superior = await superiorToInsert.save()

    res.status(201).send(new ApiResponse({ status: 201, message: 'OK', result: superior }))
}

const remove = async (req, res) => {
    const superiorFound = await Superior.find({ _id: req.params.id })

    if (superiorFound) {
       await Superior.remove({ _id: req.params.id })

       return res.status(204).send(new ApiResponse({ status: 204, message: 'removed', result: '' }))

    } else {
       return res.status(404).send(new ApiResponse({ status: 404, message: 'entity not found', result: ''}))
    }
}

const check = obj => obj && obj.length > 0

const getValidBody = body => {
    const { name, surname } = body
    const validBody = {}

    if (check(name))    validBody.name    = name
    if (check(surname)) validBody.surname = surname

    return validBody
}

const patch = async (req, res) => {
    const validBody = getValidBody(req.body)
    const superiorFound = await Superior.find({ _id: req.params.id })

    if (superiorFound) {
        await Superior.updateOne(validBody)

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