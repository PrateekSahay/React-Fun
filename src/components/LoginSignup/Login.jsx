import { useState } from "react";
import { onLoginAPI } from "./helper.js";
import { emailPattern } from "./constant.js";

const Login = ({ handleLoggedInState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onEmailBlur = (e) => {
    // if (!e.target.value) {
    //   setIsFormValid(true);
    // }
    if (!emailPattern.test(e.target.value)) {
      setIsFormValid(false);
    }
    // else {
    //     setIsFormValid(false)
    // }
  };

  const onLogin = () => {
    const res = onLoginAPI({ email, password });
    if (res) {
      handleLoggedInState(true);
    } else {
      handleLoggedInState(false);
    }
  };

  return (
    <div className="container">
      <header>Login</header>
      <input
        type="text"
        placeholder="email"
        onChange={(e) => onEmailChange(e)}
        onBlur={(e) => onEmailBlur(e)}
        value={email}
      />
      <input
        type="text"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={onLogin}>Login</button>
      {!isFormValid && <label>Form is invalid</label>}
    </div>
  );
};

export default Login;
