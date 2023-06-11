import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_INTERVIEW } from '../mutations/InterviewMutations';
import { GET_INTERVIEWS } from '../queries/InterviewQueries';
import { GET_CLIENTS } from '../queries/ClientQueries';

export default function AddInterviewModal() {
  const [type, setType] = useState('');
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState('upcoming');

  const [addInterview] = useMutation(ADD_INTERVIEW, {
    variables: { type, clientId, status },
    update(cache, { data: { addInterview } }) {
      const { projects } = cache.readQuery({ query: GET_INTERVIEWS });
      cache.writeQuery({
        query: GET_INTERVIEWS,
        data: { projects: [...projects, addInterview] },
      });
    },
  });

  // Get Clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const onSubmit = (e) => {
    e.preventDefault();

    if (clientId === '' || type === '' || status === '') {
      return alert('Please fill in all fields');
    }

    addInterview(type, clientId, status);

    setType('');
    setStatus('new');
    setClientId('');
  };

  if (loading) return null;
  if (error) return 'Something Went Wrong';

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type='button'
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#addInterviewModal'
            onClick={() => {window?.$('#addInterviewModal').modal()}}
          >
            <FaList className='icon' />
            New Interview
          </button>

          <div className="modal fade" tabIndex="-1" role="dialog" id='addInterviewModal'>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <form onSubmit={onSubmit}>
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">New Interview</h4>
                  </div>
                  <div className="modal-body">
                  
                    <div>
                      <label className='form-label'>Client</label>
                      <select
                        id='clientId'
                        className='form-select'
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option value=''>Select Client</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className='form-label'>Type</label>
                      <input
                        type='text'
                        className='form-control'
                        id='type'
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      />
                    </div>
                    <div style={{display: "flex", justifyContent: "space-around", flexWrap: "nowrap"}}>
                      <div>
                        <label className='form-label'>Status</label>
                        <select
                          id='status'
                          className='form-select'
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value='upcoming'>Upcoming</option>
                          <option value='completed'>Completed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    <button
                        type='submit'
                        data-bs-dismiss='modal'
                        className='btn btn-primary'
                      >
                        Submit
                      </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
