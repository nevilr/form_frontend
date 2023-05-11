import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

  const API_ENDPOINT = 'http://localhost:3000/users';
  const ACCESS_TOKEN = 'access';
  const LOGIN_ERROR_MESSAGE = 'Please enter a valid email and password.';
  const NETWORK_ERROR_MESSAGE = 'An error occurred while logging in. Please try again later.';

  const navigate = useNavigate()

  const [loginError, setLoginError] = useState('');
  const [state, setState] = useState({
    email: "",
    password: ""
  })

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }



  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const { email, password } = state;

      const response = await fetch(`${API_ENDPOINT}?email=${email}`);
      const data = await response.json();
      const user = data.find((user) => user.email === email);

      if (user?.password === password) {
        localStorage.setItem('token', ACCESS_TOKEN);
        navigate('/home');
      } else {
        setLoginError(LOGIN_ERROR_MESSAGE);
      }
    } catch (error) {
      console.error(error);
      setLoginError(NETWORK_ERROR_MESSAGE);
    }
  }

  return (
    <div className='container h-100'>
      <div className="row h-100">
        <div className="col d-flex justify-content-center align-items-center">
          <div className="card" style={{ width: '22rem', padding: "12px", backgroundColor: "#1162" }}>
            <h3 className='m-auto fw-bold'>Login</h3>
            <form onSubmit={handleSubmit}>
              <div> {loginError && <p>{loginError}</p>}</div>
              <div className='my-2'>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={state.email} onChange={handleChange} placeholder='email' required />
              </div>
              <div className='my-2'>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name='password' value={state.password} onChange={handleChange} placeholder='password' required />
              </div>
              <div className='d-flex justify-content-center'>
                <Button type="submit">Log in</Button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default LoginPage;











//  async function handleSubmit(event) {
//     event.preventDefault();

//     try {
//       // Send a request to the JSON server to retrieve the user's data
//       const response = await fetch(`http://localhost:3000/users?email=${state.email}`);
//       const data = await response.json();
//       const token = 'access';
//       // Check if the user exists and the password matches
//       if (data.length > 0 && data[0].password === state.password) {
//         localStorage.setItem('token', token);
//         navigate('/home')

//         // Allow the user to access the home page here
//       } else {
//         setLoginError('Please Enter Valid email and password.');
//       }
//     } catch (error) {
//       console.error(error);
//       setLoginError('An error occurred while logging in. Please try again later.');
//     }
//   }