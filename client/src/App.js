import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import ImageGallery from "./pages/ImageGallery";
import Layout from "./pages/Layout";
import Availability from "./pages/Availability";
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

console.log(`PORT:${process.env.PORT}`);

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route index path="/" element={<Home />} />
              <Route path="image-gallery" element={<ImageGallery />} />
              <Route path="availability" element={<Availability />} />
            </Route> 
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;