import { useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfileAsync } from "../redux/profileSlice";

import "../styles/SignUp.css";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const name = profile.name;
  const email = profile.email;
  const password = profile.password;

  /*   const {
    name,
    email,
    password,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleRegister,
    nameValidation,
    passwordValidation,
  } = useContext(RegisterContext) || {}; */

  const navigate = useNavigate();

  /*   const { isLoggedIn, setLoggedIn, initPath, hasToken } =
    useContext(ProfileContext); */

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      handleRegister();
      // Handle successful registration, if needed
      setLoggedIn(true);
    } catch (error) {
      // Handle registration error, if needed
      console.error(error); // Example: Display the error message
    }
  };

  /*  if (isLoggedIn) {
    return (
      <Navigate to={initPath.includes("signup") ? "/me/survey" : initPath} />
    );
  } */

  const isFormValid = name !== "" && email !== "" && password !== "";

  useEffect(()=>{
    dispatch(getUserProfileAsync())
  }, [dispatch])

  return (
    <>
      <div className="signup-background">
        <div className="signup-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="signup-input-box">
              <span className="signup-icon">
                <FontAwesomeIcon icon={faUser} name="name"></FontAwesomeIcon>
              </span>
              <label>
                {" "}
                name:
                <input
                  type="text"
                  name="name"
                  value={name}
                  //onChange={handleNameChange}
                />
              </label>
              {/*    {nameValidation && (
                <p
                  style={{ color: "grey", fontSize: "10px", marginTop: "-2em" }}
                >
                  {nameValidation}
                </p>
              )} */}
            </div>

            <div className="signup-input-box">
              <span className="signup-icon">
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
                  name="email"
                  value={email}
                  //onChange={handleEmailChange}
                />
              </label>
            </div>

            <div className="signup-input-box">
              <span className="signup-icon">
                <FontAwesomeIcon
                  icon={faLock}
                  name="password"
                ></FontAwesomeIcon>
              </span>
              <label>
                password:
                <input
                  type="password"
                  name="password"
                  //value={password}
                  //onChange={handlePasswordChange}
                  style={{ marginBottom: "0" }}
                />
              </label>
              {/* {passwordValidation && (
                <p
                  style={{
                    color: "grey",
                    fontSize: "10px",
                    marginTop: "-2em",
                    marginBottom: "0px",
                  }}
                >
                  {passwordValidation}
                </p>
              )} */}
            </div>

            <div className="signup-btn">
              <button type="submit" disabled={!isFormValid}>
                {" "}
                Register
              </button>
            </div>

            <div className="signup-to-login">
              <div>
                <p>Do you already have an account? </p>
              </div>
              <div>
                <p>
                  <Link to="/login" className="link-to-signup-to-login">
                    Login
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

export default SignUp;
