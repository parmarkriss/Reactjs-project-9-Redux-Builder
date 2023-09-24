import './App.css';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { ADD_RECORD, DELETE_RECORD, EDIT_RECORD, UPDATE_RECORD } from './action/action';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const record = useSelector(state => state.crud.users);
  const single = useSelector(state => state.crud.user);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const [editid, setEditid] = useState("");

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };


  const handleSubmit = () => {
    if (editid) {
      let obj = {
        id: editid,
        firstname: firstname,
        lastname: lastname,
        email: email
      }
      dispatch(UPDATE_RECORD(obj))
    } else {
      let obj = {
        id: Math.floor(Math.random() * 100000),
        firstname: firstname,
        lastname: lastname,
        email: email
      }
      dispatch(ADD_RECORD(obj))
    }
    setFirstname("");
    setLastname("");
    setEmail("");
  }

  useEffect(() => {
    setFirstname(single.firstname);
    setLastname(single.lastname);
    setEmail(single.email);
    setEditid(single.id);
  }, [single])
  return (
    <>
      <div className="container1">
        <button className="btn btn-primary" type="button" onClick={toggleForm}>
          Toggel
        </button>
      </div>
      {isOpen && (
        <div className="container" >

          <h2>Registration Form</h2>
          <form>
            <div className="form-group">
              <label htmlFor="firstName">First Name:-</label>
              <input
                type="text"
                name="firstname"
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:-</label>
              <input
                type="text"
                name="lastname"
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Id:-</label>
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="form-group">
              {editid ? (
                <button className="btn btn-primary" type="button" onClick={handleSubmit}>
                  Edit
                </button>
              ) : (
                <button className="btn btn-primary" type="button" onClick={handleSubmit}>
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      )}
      <br />

      <div className='container-xl'>
        {record.length > 0 ? ( // Check if there are records
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Email Id</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {record.map((item) => {
                const { id, firstname, lastname, email } = item;
                return (
                  <tr key={id}>
                    <td>{firstname}</td>
                    <td>{lastname}</td>
                    <td>{email}</td>
                    <td>
                      <button className="btn btn-secondary" onClick={() => dispatch(DELETE_RECORD(id))}>
                        <i className="bi bi-trash3-fill"></i>
                      </button>
                      <button className="btn btn-danger ms-1" onClick={() => dispatch(EDIT_RECORD(id))}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h5 className='text-center'>No records available.</h5>
        )}
      </div>
    </>
  );
}

export default App;
