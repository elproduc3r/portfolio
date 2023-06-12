import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { FaTrash } from "react-icons/fa";
import { DELETE_INTERVIEW } from "../mutations/InterviewMutations";
import { GET_INTERVIEWS } from "../queries/InterviewQueries";

export default function InterviewCard({ interview }) {
  const {client, type, status, time, date} = interview;
  const [deleteInterview] = useMutation(DELETE_INTERVIEW, {
    variables: {id: interview.id},
    update(cache, {data: {deleteInterview}}) {
      const { interviews } = cache.readQuery({
        query: GET_INTERVIEWS
      });
      cache.writeQuery({
        query: GET_INTERVIEWS,
        data: {
          interviews: interviews.filter(interview => interview.id !== deleteInterview.id)
        }
      });
    }
  });

  const interviewDate = Date.parse(`${time} ${date}`);
  const now = Date.now();
  const interviewCompleted = interviewDate < now;
  const color = interviewCompleted ? "#eeeeee" : "transparent";
  const currentStatus = interviewCompleted ? "completed" : status;

  return (
    <tr style={{backgroundColor: color}}>
      <td>
        {"*******"}
      </td>
      <td>
        {time}
      </td>
      <td>
        {date}
      </td>
      <td>
        {"*******"}
      </td>
      <td>
        {type}
      </td>
      <td>
        {currentStatus}
      </td>
      <td>
      <button
          className='btn btn-danger btn-sm'
          onClick={()=>{alert('This feature has been disabled for demo purposes')}}  
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
