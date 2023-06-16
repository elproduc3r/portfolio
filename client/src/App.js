import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Availability from "./pages/Availability";
import EnvContext from "./components/EnvContext";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: '/graphql',
  cache,
});

function App() {

  const env = process.env.NODE_ENV || "development"

  return (
    <EnvContext.Provider value={{env}}>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
              <Route path="/" element={<Layout />}>
                <Route index path="/" element={<Home />} />
                <Route path="availability" element={<Availability />} />
              </Route> 
          </Routes>
        </Router>
      </ApolloProvider>
    </EnvContext.Provider>
  );
}

export default App;