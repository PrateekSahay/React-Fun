import { useState } from "react";
import Login from "./Login";
import SignUp from "./Signup";
import Success from "./Success";
import './styles.css';

const LoginSignupHome = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoggedInState = (state) => {
    setIsLoggedIn(state);
  };

  const handleSignUpState = (state) => {
    setShowSignUp(state);
  };
  if (isLoggedIn) {
    return <Success />;
  }

  if (showSignUp) {
    return <SignUp handleSignUpState={handleSignUpState} />;
  }

  return (
    <div className="container">
      <Login handleLoggedInState={handleLoggedInState} />
      <button onClick={() => handleSignUpState(true)}>Create an account</button>
    </div>
  );
};

export default LoginSignupHome;
