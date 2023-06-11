import {useQuery} from "@apollo/client";
import CompanyRow from "./CompanyRow";
import Spinner from "./Spinner";
import {GET_CLIENTS} from "../queries/ClientQueries";

const Clients = () => {
  const {loading, errors, data} = useQuery(GET_CLIENTS);

  if (loading) return (<Spinner />);
  if (errors) return (<div>{`Errors: ${errors}`}</div>);
  
  return (
    <>
      { !loading && !errors && (
        <>
          <h3>Companies</h3>
          <br />
          <table className='table table-hover mt-3'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Company</th>
                <th>Person</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {data.clients.map((client) => (
                <CompanyRow key={client.id} client={client} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  )
};

export default Clients;