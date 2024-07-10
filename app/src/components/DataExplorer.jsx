import React, { useState } from "react";

const MySQLTerminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'password') {
      setAuthenticated(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const command = input.trim().toLowerCase();

    let result;
    switch (command) {
      case "select * from Employees":
        result = [
          { Employee: "Alice", age: 25, IP: "1.0.0.32" },
          { Employee: "Bob", age: 30, IP: "1.0.0.36" },
          { Employee: "Charlie", age: 28, IP: "1.0.0.35" },
        ];
        break;
      case "show tables":
        result = [
          { Tables_in_database: "Employees" },
          { Tables_in_database: "products" },
        ];
        break;
      case "describe users":
        result = [
          { Field: "user", Type: "varchar(255)" },
          { Field: "info", Type: "varchar(255)" },
          { Field: "age", Type: "int" },
          { Field: "location", Type: "varchar(255)" },
        ];
        break;
      default:
        result = `Error: Command not recognized - "${command}"`;
        break;
    }

    const commandOutput = Array.isArray(result) ? formatOutput(result) : result;
    const historyEntry = { command, output: commandOutput };
    setHistory([...history, historyEntry]); // Append new entry to history
    setInput("");
  };

  const createTableLine = (columnWidths) => {
    // width+2 to accomodate for trailing spaces in table elements
    return (
      columnWidths.map((width) => `+${"-".repeat(width + 2)}`).join("") + "+"
    );
  };

  const formatOutput = (data) => {
    if (Array.isArray(data)) {
      if (data.length === 0) return "Empty set.";
      const headers = Object.keys(data[0]);
      const columnWidths = headers.map((header) =>
        Math.max(
          header.length,
          ...data.map((row) => row[header].toString().length)
        )
      );
      const separatorRow = createTableLine(columnWidths);
      const headerRow = `| ${headers
        .map((header, i) => header.padEnd(columnWidths[i]))
        .join(" | ")} |`;
      const bodyRows = data
        .map(
          (row) =>
            `| ${headers
              .map((header, i) =>
                row[header].toString().padEnd(columnWidths[i])
              )
              .join(" | ")} |`
        )
        .join("\n");
      return `${separatorRow}\n${headerRow}\n${separatorRow}\n${bodyRows}\n${separatorRow}`;
    } else {
      return data;
    }
  };

  const renderOutput = (output) => {
    return output
      .split("\n")
      .map((line, index) => <div key={index}>{line}</div>);
  };

  if (!authenticated) {
    return (
      <div className="bg-black text-white p-4 h-full flex flex-col items-center justify-center">
        <div className="mb-4 text-lg font-bold">Authenticate to proceed</div>
        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="bg-gray-800 text-white px-2 py-1 mb-2 rounded"
            autoFocus
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-gray-800 text-white px-2 py-1 mb-2 rounded"
          />
          <button type="submit" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-black text-white p-4 h-full flex flex-col">
      <div className="overflow-y-auto flex-grow">
        {history.map((entry, index) => (
          <div key={index}>
            <div className="command">{`> ${entry.command}`}</div>
            <div className="output whitespace-pre-wrap text-nowrap overflow-x-auto">
              <code>{entry.output}</code>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-2 flex">
        <span className="prompt">{">"}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-gray-800 text-white flex-grow px-2 py-1 ml-2 rounded focus:outline-none"
          autoFocus
        />
      </form>
    </div>
  );
};

export default MySQLTerminal;
