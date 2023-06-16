import { FaTrash } from "react-icons/fa";
import {useMutation} from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/ClientMutations";
import {GET_CLIENTS, GET_CLIENTS_PRIVATE} from "../queries/ClientQueries";
import { useContext } from "react";
import EnvContext from "./EnvContext";

const CompanyRow = ({client}) => {
  const {name = "******", email = "******", person = "******"} = client;
  const {env} = useContext(EnvContext);
  const IS_PRIVATE = env !== "development";
  const getQuery = IS_PRIVATE ?  GET_CLIENTS_PRIVATE : GET_CLIENTS;
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    update(cache, {data: {deleteClient}}) {
      const { clients } = cache.readQuery({
        query: getQuery
      });
      cache.writeQuery({
        query: getQuery,
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
        {email || "*****"}
      </td>
      <td>
        {person || "*****"}
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