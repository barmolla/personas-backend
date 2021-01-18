const Role = require('../model/role')

const getByID = async (id) => id ? await Role.find({_id: id }) : []
const getAll  = async () => await Role.find()
const create  = async ({ name, description }) => await (new Role({ name, description})).save()
const remove  = async (id) => {
    if (await Role.find({ _id: id })) {
       await Role.remove({ _id: id })
       return true
    }

    return false
}

module.exports = {
    getByID,
    getAll,
    create,
    remove
}