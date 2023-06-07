import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import axios from "axios";
import { ProfileContext } from "../context/ProfileContext";
import "../styles/Login.css";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
<<<<<<< HEAD
  const { hasToken, isLoggedIn, setLoggedIn, setIsLoading, fetchUserProfile, initPath } =
=======
  const { hasToken, isLoggedIn, setLoggedIn, initPath, fetchUserProfile, setIsLoading } =
>>>>>>> 754284ef14e60dee2001427712dbd722acceed79
    useContext(ProfileContext);
  const navigate = useNavigate();
  //console.log(hasToken)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://quit-smoking-app.onrender.com/api/users/login",
        formData
      );
      if (response.status === 200) {
        const token = response.data.token;
        // Store the token in local storage
        localStorage.setItem("token", token);
        setLoggedIn(true);

        // Let's see
        const fetchData = async () => {
          try {
            await fetchUserProfile();
            setLoggedIn(true);
          } catch (error) {
            console.error("Error fetching user profile:", error);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchData();

        navigate("/me/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoggedIn)
    return (
      <Navigate to={initPath.includes("login") ? "/me/dashboard" : initPath} />
    );
  return (
    <>
      <div className="background-login">
        <div className="wrapper-dashboard">
          <form onSubmit={handleSubmit}>
            <div className="input-box-login">
              <span className="icon-login">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  name="email"
                ></FontAwesomeIcon>
              </span>
              <label>
                {" "}
                email:
                <input
                  type="email"
                  id="name"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="input-box-login">
              <span className="icon-login">
                <FontAwesomeIcon
                  icon={faLock}
                  name="password"
                ></FontAwesomeIcon>
              </span>
              <label>
                {" "}
                password:
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="btn-login">
              <button type="submit">Submit</button>
            </div>

            <div className="login-to-signup">
              <div>
                <p>Don&apos;t have an account? </p>
              </div>
              <div>
                <p>
                  <Link to="/signup" className="link-to-signUp-Login">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
