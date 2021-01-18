const { gql } = require('apollo-server-express')

const roleSchema = gql`
  type Role {
    name: String
    description: String
  }

  extend type Query {
    roles: [Role]
    roleByID(roleID: ID): [Role]
  }

  type Mutation {
    add(name: String, description: String): Role
    remove(id: ID): Boolean
  }
`;

module.exports = roleSchema