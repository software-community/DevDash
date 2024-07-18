const sshCredentials = { // if change here, do in Browser.jsx as well
    username: "admin",
    password: "bankEuro",
    host: "localhost",
    port: "1234"
  };
  
  const sshVerify = (userInput) => {
    const pattern = /ssh\s+(?<username>[^@]+)@(?<host>[^\s]+)\s+-p\s+(?<port>\d+)\s+=>\s+(?<password>.+)/;
    const match = userInput.match(pattern);
  
    if (match) {
      const { username, host, port, password } = match.groups;
  
      if (username !== sshCredentials.username) {
        return "Username not found";
      }
      if (host !== sshCredentials.host) {
        return "Invalid host";
      }
      if (password !== sshCredentials.password) {
        return "Incorrect password";
      }
      if (port !== sshCredentials.port) {
        return "Incorrect port";
      }
  
      return "Verification successful.";
    } else {
      return "SSH Syntax error";
    }
  };
  
  export default sshVerify;
  