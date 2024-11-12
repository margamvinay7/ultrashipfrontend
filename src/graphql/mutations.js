import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      accessToken
      employee {
        id
        name
        role
      }
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $name: String!
    $age: Int!
    $role: String!
    $class: String!
    $subjects: [String!]!
    $attendance: Int!
    $password: String!
  ) {
    addEmployee(
      name: $name
      age: $age
      role: $role
      class: $class
      subjects: $subjects
      attendance: $attendance
      password: $password
    ) {
      id
      name
      role
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $name: String
    $age: Int
    $role: String
    $class: String
    $subjects: [String]
    $attendance: Int
  ) {
    updateEmployee(
      id: $id
      name: $name
      age: $age
      role: $role
      class: $class
      subjects: $subjects
      attendance: $attendance
    ) {
      id
      name
      role
      age
      class
      subjects
      attendance
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;
