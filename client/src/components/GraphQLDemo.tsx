import { useQuery,  useMutation } from '@apollo/client'
import { FormEvent, useState } from 'react'
import { GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER } from '../action/user'

enum SummitType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete'
}

export default function GraphQLDemo() {  
  const [form, setForm] = useState({
    id: '',
    name: '',
    email: ''
  })
  const { data, error, loading, refetch } = useQuery(GET_USERS)
  
  const [createUser] = useMutation(CREATE_USER)
  const [updateUser] = useMutation(UPDATE_USER)
  const [deleteUser] = useMutation(DELETE_USER)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const { submitter }  = e.nativeEvent as SubmitEvent
    const type = submitter?.dataset['submitType'] as SummitType
    switch (type) {
      case SummitType.CREATE:        
        await createUser({ variables: { name: form.name, email: form.email } })
        break;
      
      case SummitType.UPDATE:
        await updateUser({ variables: { ...form, id: +form.id } })
        break;
      
      case SummitType.DELETE:
        await deleteUser({ variables: { id: +form.id } })
        break;
      default:
        break;
    }    
    await refetch()
    setForm({ id: '', name: '', email: '' })
  }

  if(error) {
    return <div>{error.message}</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">GraphQL Demo</h1>
      <table className="table">
        <caption>用户列表</caption>
        <thead>
          <tr className="border">
            <th className="border">id</th>
            <th className="border">name</th>
            <th className="border">email</th>
          </tr>
        </thead>
        <tbody>
          {
            loading
            ? <tr><td>loading...</td></tr>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            : data?.users.map((user: any) => (
              <tr className="border" key={user.id}>
                <td className="border">{user.id}</td><td>{user.name}</td>
                <td className="border">{user.email}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <form className="mt-4 flex flex-col gap-y-2" onSubmit={onSubmit}>
        <label htmlFor="id">
          id:
          <input className="border p-1 pl-2 rounded" onChange={e => setForm({ ...form, id: e.target.value })} value={form.id} type="text" placeholder="id" />
        </label>
        <label htmlFor="name">
          name:
          <input className="border p-1 pl-2 rounded" onChange={e => setForm({ ...form, name: e.target.value })} value={form.name} type="text" placeholder="name" />
        </label>
        <label htmlFor="email">
          email:
          <input className="border p-1 pl-2 rounded" onChange={e => setForm({ ...form, email: e.target.value })} value={form.email} type="text" placeholder="email" />
        </label>
        <button data-submit-type={SummitType.CREATE} className="border p-1 rounded hover:bg-slate-200" type="submit">create user</button>
        <button data-submit-type={SummitType.UPDATE} className="border p-1 rounded hover:bg-slate-200" type="submit">update user</button>
        <button data-submit-type={SummitType.DELETE} className="border p-1 rounded hover:bg-slate-200" type="submit">delete user</button>
      </form>
    </div>
  )
}