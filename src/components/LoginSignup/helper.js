const onLoginAPI = ({ email, password }) => {
    if (email && password) {
      const emailStored = localStorage.getItem("email");
      const passStored = localStorage.getItem("password");
      if (emailStored === email && passStored === password) {
        return true;
      }
    }
    return false;
  };
  
  const onSignUpAPI = ({ email, password, name }) => {
    if (email && password && name) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("name", name);
      return true;
    }
    return false;
  };
  
  export { onLoginAPI, onSignUpAPI };
  