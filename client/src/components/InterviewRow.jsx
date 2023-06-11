export default function InterviewCard({ interview }) {
  const {client, type, status} = interview;
  return (
    <tr>
      <td>
        {client.name}
      </td>
      <td>
        {client.person}
      </td>
      <td>
        {type}
      </td>
      <td>
        {status}
      </td>
    </tr>
  );
}
