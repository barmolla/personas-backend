const Project      = require('../model/project')
const ApiResponse = require('../model/response')

const getByID = async (req, res) => {
    const projectFound = await Project.find({_id: req.params.id })

    return projectFound ?
        res.status(200).send(new ApiResponse({ status: 200, message: 'OK', result: projectFound })) : 
        res.status(404).send(new ApiResponse({ status: 404, message: 'entity not found', result: ''}))
}

const getAll = async (req, res) => {
    const projects = await Project.find()

    res.status(200).send(new ApiResponse({ status: 200, message: 'OK', result: projects }))
}

const create = async (req, res) => {
    const { name, description} = req.body
    const projectToInsert = new Project({ name, description })

    const project = await projectToInsert.save()

    res.status(201).send(new ApiResponse({ status: 201, message: 'OK', result: project }))
}

const remove = async (req, res) => {
    const projectFound = await Project.find({ _id: req.params.id })

    if (projectFound) {
       await Project.remove({ _id: req.params.id })

       return res.status(204).send(new ApiResponse({ status: 204, message: 'removed', result: '' }))

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
    const projectFound = await Project.find({ _id: req.params.id })

    if (projectFound) {
        await Project.updateOne(validBody)

        return res.status(200).send(new ApiResponse({ status: 200, message: 'entity updated', result: '' }))

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