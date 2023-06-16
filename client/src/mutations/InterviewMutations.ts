import { gql } from '@apollo/client';

const ADD_INTERVIEW = gql`
  mutation AddInterview(
    $type: String!
    $status: InterviewStatus!
    $time: String!
    $date: String!
    $clientId: ID!
  ) {
    addInterview(
      type: $type
      status: $status
      time: $time
      date: $date
      clientId: $clientId
    ) {
      id
      type
      status
      time
      date
      client {
        id
        name
        email
        person
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
    $time: String!
    $date: String!
    $status: InterviewStatusUpdate!
  ) {
    updateInterview(
      id: $id
      type: $type
      time: $time
      date: $date
      status: $status
    ) {
      id
      type
      status
      time
      date
      client {
        id
        name
        email
        person
      }
    }
  }
`;

export { ADD_INTERVIEW, DELETE_INTERVIEW, UPDATE_INTERVIEW };
