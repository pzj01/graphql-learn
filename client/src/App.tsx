import { ApolloProvider } from '@apollo/client'
import GraphQLDemo from './components/GraphQLDemo.tsx'
import apollo from '../lib/apollo.ts'

function App() {
  return (
    <ApolloProvider client={apollo}>
      <div className="border flex justify-center items-center">
        <GraphQLDemo />
      </div>
    </ApolloProvider>
  )
}

export default App
