import { gql } from '@apollo/client';

const GET_INTERVIEWS = gql`
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
        email
        person
      }
    }
  }
`;

const GET_INTERVIEW = gql`
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
        email
        person
      }
    }
  }
`;

export { GET_INTERVIEWS, GET_INTERVIEW };
