const { gql } = require('apollo-server-express')

const personSchema = gql`
  type Person {
    name: String
    surname: String
    role: String
    dependsOn: String
    project: String
    provider: String
    admissionDate: String
    egressDate: Date
    dateOfBirth: Date
    dni: Int
  }

  type Query {
    people: [Person]
  }
`;

module.exports = personSchema