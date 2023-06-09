import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT } from '../mutations/ProjectMutations';
import { GET_PROJECTS } from '../queries/ProjectQueries';
import { GET_CLIENTS } from '../queries/ClientQueries';

export default function AddProjectModal() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState('new');

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  // Get Clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || description === '' || status === '') {
      return alert('Please fill in all fields');
    }

    addProject(name, description, clientId, status);

    setName('');
    setDescription('');
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
            data-bs-target='#addProjectModal'
            onClick={() => {window?.$('#addProjectModal').modal()}}
          >
            <FaList className='icon' />
            New Project
          </button>

          <div className="modal fade" tabIndex="-1" role="dialog" id='addProjectModal'>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <form onSubmit={onSubmit}>
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">New Interview</h4>
                  </div>
                  <div className="modal-body">
                  
                      <div>
                        <label className='form-label'>Name</label>
                        <input
                          type='text'
                          className='form-control'
                          id='name'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className='form-label'>Description</label>
                        <input
                          type='text'
                          className='form-control'
                          id='description'
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
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
                            <option value='new'>Not Started</option>
                            <option value='progress'>In Progress</option>
                            <option value='completed'>Completed</option>
                          </select>
                        </div>

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

          {/* <div
            className='modal fade'
            id='addProjectModal'
            aria-labelledby='addProjectModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='addProjectModalLabel'>
                    New Project
                  </h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='modal-body'>
                  
                </div>
              </div>
            </div>
          </div> */}
        </>
      )}
    </>
  );
}
