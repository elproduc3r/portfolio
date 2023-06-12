import { useState } from 'react';
import { FaCity } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../mutations/ClientMutations';
import { GET_CLIENTS } from '../queries/ClientQueries';

export default function AddClientModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [person, setPerson] = useState('');

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, person },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || person === '') {
      return alert('Please fill in all fields');
    }

    addClient(name, email, person);

    window?.$('#addClientModal').modal('hide')

    setName('');
    setEmail('');
    setPerson('');
  };

  return (
    <>
      <button
        type='button'
        className='btn btn-secondary'
        data-bs-toggle='modal'
        data-bs-target='#addClientModal'
        onClick={() => {window?.$('#addClientModal').modal()}}
      >
        <FaCity className='icon' />
        Add Company
      </button>

      <div className="modal fade" tabIndex="-1" role="dialog" id='addClientModal'>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form onSubmit={onSubmit}>
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">New Company</h4>
              </div>
              <div className="modal-body">
                <div className='mb-3'>
                  <label className='form-label'>Company</label>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Person (Recruiter/Hiring Manager)</label>
                  <input
                    type='text'
                    className='form-control'
                    id='phone'
                    value={person}
                    onChange={(e) => setPerson(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer" style={{display: "flex", alignItems: "center", flexWrap: "nowrap"}}>
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
  );
}
