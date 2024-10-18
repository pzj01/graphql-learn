import { gql } from '@apollo/client'

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      name
      email
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $name: String!, $email: String!) {
    updateUser(id: $id, name: $name, email: $email) {
      name
      email
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
      name
      email
    }
  }
`