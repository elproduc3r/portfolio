import { gql } from '@apollo/client';

const ADD_CLIENT = gql`
  mutation addClient($name: String!, $email: String!, $person: String!) {
    addClient(name: $name, email: $email, person: $person) {
      id
      name
      email
      person
    }
  }
`;

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      name
      email
      person
    }
  }
`;

export { ADD_CLIENT, DELETE_CLIENT };
