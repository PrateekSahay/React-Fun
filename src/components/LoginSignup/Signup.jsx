import { useState } from "react";
import { onSignUpAPI } from "./helper.js";

const SignUp = ({ handleSignUpState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSignUpClick = () => {
    const res = onSignUpAPI({ email, password, name });
    if (res) {
      handleSignUpState(false);
    } else {
      handleSignUpState(false);
    }
  };

  return (
    <div className="container">
      <header>SignUp</header>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={onSignUpClick}>Signup</button>
    </div>
  );
};

export default SignUp;
