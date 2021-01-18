const roleService = require('../../service/roleService')
const roleResolver = {
  Query: {
    roles: () => roleService.getAll(),
    roleByID: async (parent, { roleID }) => await roleService.getByID(roleID)
  },

  Mutation: {
    add: async (parent, { name, description }) => await roleService.create({ name, description }),
    remove: async (parent, { id }) => await roleService.remove(id)
  }
};

module.exports = roleResolver