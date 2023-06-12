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
  const [time, setTime] = useState('');
  const [convertedTime, setConvertedTime] = useState('');
  const [date, setDate] = useState('');

  const [addInterview] = useMutation(ADD_INTERVIEW, {
    variables: { type, clientId, status, time: convertedTime, date },
    update(cache, { data: { addInterview } }) {
      const { interviews } = cache.readQuery({ query: GET_INTERVIEWS });
      cache.writeQuery({
        query: GET_INTERVIEWS,
        data: { interviews: [...interviews, addInterview] },
      });
    },
  });

  // Get Clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const convertAndSetTime = (time) => {
    setTime(time);
    let [hours, mins] = time.split(":");
    hours = Number(hours);
    const amPm = hours < 12 ? "am" : "pm";
    hours = hours > 12 ? Number(hours) - 12 : hours;
    console.log(`setting: ${hours}:${mins} ${amPm} `)
    setConvertedTime(`${hours}:${mins} ${amPm}`);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (clientId === '' || type === '' || status === '' || time ==='' || date === '') {
      return alert('Please fill in all fields');
    }

    addInterview(type, clientId, status, convertedTime, date);

    window?.$('#addInterviewModal').modal('hide');

    setTime('');
    setConvertedTime('');
    setDate('');
    setType('');
    setStatus('upcoming');
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
                    <div style={{display: "flex", flexWrap: "nowrap", justifyContent: "flex-start"}}>
                      <div style={{width: "40%"}}>
                        <label className='form-label'>Time</label>
                        <input
                          type='time'
                          className='form-control time'
                          id='time'
                          value={time}
                          onChange={(e) => convertAndSetTime(e.target.value)}
                        />
                      </div>
                      <div style={{width: "40%"}}>
                        <label className='form-label'>Date</label>
                        <input
                          type='date'
                          className='form-control time'
                          id='date'
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>
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
                    <div style={{display: "flex", justifyContent: "flex-start", flexWrap: "nowrap"}}>
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
