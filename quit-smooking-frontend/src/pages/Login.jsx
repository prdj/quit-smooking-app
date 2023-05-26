import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import "../styles/Login.css";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const { isLoggedIn, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/users/login',
        formData
      );
      if (response.status === 200) {
        const token = response.data.token;
        // Store the token in local storage
        localStorage.setItem('token', token)
        setLoggedIn(true);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(isLoggedIn)

  useEffect(() => {
    console.log('Redirecting to login...');

    navigate('/login', { replace: true });
  }, [navigate]);

  return (
    <>

      <div className='background-login'>
        <div className="wrapper-dashboard">
          <form onSubmit={handleSubmit}>

            <div className='input-box-login'>
              <span className='icon-login'><FontAwesomeIcon icon={faEnvelope} name='email'></FontAwesomeIcon>
              </span>
              <label> email:
              <input type="email" id="name" name="email" value={formData.email}
              onChange={handleChange}
              />
              </label>
            </div>

            <div className='input-box-login'>
              <span className='icon-login'><FontAwesomeIcon icon={faLock} name='password'></FontAwesomeIcon></span>
              <label> password:
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}
              />
              </label>
            </div>

            <div className='btn-login'>
              <button type="submit">Submit</button>
            </div>

            <div className='login-to-signup'>
              <div><p>Don&apos;t have an account? </p></div>
              <div><p><Link to="/signup" className='link-to-signUp-Login'>Sign Up</Link></p></div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
