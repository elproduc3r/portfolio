import { gql } from '@apollo/client';

const ADD_INTERVIEW = gql`
  mutation AddInterview(
    $type: String!
    $status: InterviewStatus!
    $clientId: ID!
  ) {
    addInterview(
      type: $type
      status: $status
      clientId: $clientId
    ) {
      id
      type
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

const DELETE_INTERVIEW = gql`
  mutation DeleteInterview($id: ID!) {
    deleteInterview(id: $id) {
      id
    }
  }
`;

const UPDATE_INTERVIEW = gql`
  mutation UpdateInterview(
    $id: ID!
    $type: String!
    $status: InterviewStatusUpdate!
  ) {
    updateInterview(
      id: $id
      type: $type
      status: $status
    ) {
      id
      type
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export { ADD_INTERVIEW, DELETE_INTERVIEW, UPDATE_INTERVIEW };
