import {useContext} from "react";
import {useQuery} from "@apollo/client";
import CompanyRow from "./CompanyRow";
import Spinner from "./Spinner";
import EnvContext from "./EnvContext";
import {GET_CLIENTS, GET_CLIENTS_PRIVATE} from "../queries/ClientQueries";

const Clients = () => {
  const {env} = useContext(EnvContext);
  const IS_PRIVATE = env !== "development";
  const getQuery = IS_PRIVATE ? GET_CLIENTS_PRIVATE : GET_CLIENTS;
  const {loading, errors, data} = useQuery(getQuery);

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