const Person      = require('../model/person')
const ApiResponse = require('../model/response')

const getByID = async (req, res) => {
    const personFound = await Person.find({_id: req.params.id })

    return personFound ?
        res.status(200).send(new ApiResponse({ status: 200, message: 'OK', result: personFound })) : 
        res.status(404).send(new ApiResponse({ status: 404, message: 'entity not found', result: ''}))
}

const getAll = async (req, res) => {
    const pageSize = 5
    const page = req.query.page || 1
    const people = await Person
        .find()
        .skip((pageSize * page) - pageSize)
        .limit(pageSize)
    const totalElements = await Person.count()

    res.status(200).send(new ApiResponse({ 
        status: 200, 
        message: 'OK', 
        result: people,
        currentPage: page,
        pages: Math.ceil(totalElements / pageSize),
        totalElements
     }))
}

const create = async (req, res) => {
    const { 
        name, surname, role,
        dependsOn, project,
        provider, admissionDate,
        egressDate, dateOfBirth, dni
    } = req.body

    const personToInsert = new Person({
        name, surname, role,
        dependsOn, project,
        provider, admissionDate,
        egressDate, dateOfBirth, dni
    })

    const person = await personToInsert.save()

    res.status(201).send(new ApiResponse({ status: 201, message: 'OK', result: person }))
}

const remove = async (req, res) => {
    const personFound = await Person.find({ _id: req.params.id })

    if (personFound) {
       await Person.remove({ _id: req.params.id })

       return res.status(204).send(new ApiResponse({ status: 204, message: 'removed', result: '' }))

    } else {
       return res.status(404).send(new ApiResponse({ status: 404, message: 'entity not found', result: ''}))
    }
}

const check = obj => obj && obj.length > 0

const getValidBody = body => {
    const { 
        _id, name, surname, role,
        dependsOn, project,
        provider, admissionDate,
        egressDate, dateOfBirth, dni
    } = body

    const validBody = {}

    if (check(name))          validBody.name          = name
    if (check(dependsOn))     validBody.dependsOn     = dependsOn
    if (check(surname))       validBody.surname       = surname
    if (check(role))          validBody.role          = role
    if (check(project))       validBody.project       = project
    if (check(provider))      validBody.provider      = provider
    if (check(admissionDate)) validBody.admissionDate = admissionDate
    if (check(egressDate))    validBody.egressDate    = egressDate
    if (check(dateOfBirth))   validBody.dateOfBirth   = dateOfBirth
    if (check(dni))           validBody.dni           = dni

    return validBody
}

const patch = async (req, res) => {
    const validBody = getValidBody(req.body)
    const personFound = await Person.find({ _id: req.params.id })

    if (personFound) {
        await Person.updateOne({ _id: req.params.id }, validBody)

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