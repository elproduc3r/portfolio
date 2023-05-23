import {useQuery} from "@apollo/client";
import ClientRow from "./ClientRow";
import Spinner from "./Spinner";
import {GET_CLIENTS} from "../queries/ClientQueries";

const Clients = () => {
  const {loading, errors, data} = useQuery(GET_CLIENTS);

  if (loading) return (<Spinner />);
  if (errors) return (<div>{`Errors: ${errors}`}</div>);
  
  return (
    <>
      { !loading && !errors && (
         <table className='table table-hover mt-3'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      )}
    </>
  )
};

export default Clients;