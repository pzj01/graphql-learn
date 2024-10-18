import { gql } from 'graphql-tag'

let id = 1

export const typeDefs = gql`
  #类型
  type User {
    id: Int
    name: String
    email: String
  }

  # 查询
  type Query {
    users: [User]
    user(id: Int!): User
  }

  # 突变
  type Mutation {
    createUser(name: String!, email: String!): User
    updateUser(id: Int!, name: String!, email: String!): User
    deleteUser(id: Int!): User
  }
`

const users = [
  {
    id: id++,
    name: '张三',
    email: '123@qq.com',
  },
]

export const resolvers = {
  Query: {
    users() {
      console.log('获取用户列表', users)
      return users
    },
    user(_, { id }) {
      const user = users.find(user => user.id === id)
      console.log('获取用户', user)
      return user
    }
  },
  Mutation: {
    createUser(_, { name, email }) {
      const user = { id: id++, name, email }
      console.log('创建用户', user)
      users.push(user)
      return user
    },
    updateUser(_, { id, ...other }) {
      const user = users.find(user => user.id === id)
      Object.assign(user, other)
      console.log('更新用户', user)
      return user
    },
    deleteUser(_, { id }) {
      const index = users.findIndex(user => user.id === id)
      if(index === -1) {
        console.log('用户不存在')
        return null
      }
      const user = users.splice(index, 1)
      console.log('删除用户', user)
      return user
    }
  },
}