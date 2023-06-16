import { FaTrash } from "react-icons/fa";
import {useMutation} from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/ClientMutations";
import {GET_CLIENTS} from "../queries/ClientQueries";

const CompanyRow = ({client}) => {
  const {name = "******", email = "******", person = "******"} = client;
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    update(cache, {data: {deleteClient}}) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter(client => client.id !== deleteClient.id)
        }
      });
    }
  });

  return (
    <tr>
      <td>
        {name || "*****"}
      </td>
      <td>
        {person || "*****"}
      </td>
      <td>
        {email || "*****"}
      </td>
      <td>
        <button
          className='btn btn-danger btn-sm'
          onClick={() => {deleteClient() || alert('This feature has been disabled for demo purposes')}}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  )
};

export default CompanyRow;