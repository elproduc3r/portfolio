import Spinner from './Spinner';
import { useQuery } from '@apollo/client';
import InterviewRow from './InterviewRow';
import { GET_INTERVIEWS } from '../queries/InterviewQueries';

export default function Interview() {
  const { loading, error, data } = useQuery(GET_INTERVIEWS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {data.interviews.length > 0 ? (
        <>
          <h3>Interviews</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.interviews.map((interview) => (
                <InterviewRow key={interview.id} interview={interview} />
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No Interviews</p>
      )}
    </>
  );
}
        