import Spinner from './Spinner';
import styled from "@emotion/styled";
import { useQuery } from '@apollo/client';
import InterviewRow from './InterviewRow';
import { GET_INTERVIEWS } from '../queries/InterviewQueries';

const StyledTable = styled.table`
  border-spacing: 0;
`;
export default function Interview() {
  const { loading, error, data } = useQuery(GET_INTERVIEWS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  const {interviews} = data;
  let newSortInterviews = [...interviews];
  newSortInterviews = newSortInterviews.length > 0 ? newSortInterviews.reverse() : [];

  return (
    <>
      {data.interviews.length > 0 ? (
        <>
          <h3>Interviews</h3>
          <StyledTable>
            <thead>
              <tr>
                <th>Name</th>
                <th>Time</th>
                <th>Date</th>
                <th>Contact</th>
                <th>Type</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {newSortInterviews.map((interview) => (
                <InterviewRow key={interview.id} interview={interview} />
              ))}
            </tbody>
          </StyledTable>
        </>
      ) : (
        <p>No Interviews</p>
      )}
    </>
  );
}
        