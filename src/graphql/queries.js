import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query GetEmployees(
    $page: Int
    $limit: Int
    $sortBy: String
    $name: String
    $role: String
    $age: Int
    $attendance: Int
  ) {
    employees(
      page: $page
      limit: $limit
      sortBy: $sortBy
      name: $name
      role: $role
      age: $age
      attendance: $attendance
    ) {
      totalCount
      employees {
        id
        name
        age
        role
      }
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      id
      name
      age
      role
      class
      subjects
      attendance
    }
  }
`;
