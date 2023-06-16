import {gql} from "@apollo/client";

export const GET_CLIENTS = gql`
  query getClients {
    clients {
      name
      id
      email
      person
    }
  }
`
export const GET_CLIENTS_PRIVATE = gql`
  query getClients {
    clients {
      id
    }
  }
`