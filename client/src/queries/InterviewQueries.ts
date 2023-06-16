import { gql } from '@apollo/client';

export const GET_INTERVIEWS = gql`
  query getInterviews {
    interviews {
      id
      type
      status
      time
      date
      client {
        id
        name
      }
    }
  }
`;

export const GET_INTERVIEW = gql`
  query getInterview($id: ID!) {
    interview(id: $id) {
      id
      type
      status
      time
      date
      client {
        id
        name
      }
    }
  }
`;
