import React, { useState, useRef, useEffect } from 'react';
import './Terminal.css'; // Import the CSS file for the Terminal component
import sshVerify from '../Scripts/sshVerify'; // Import the SSH verification function

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const terminalRef = useRef(null);

  const templates = {
    help: 'Available commands: help, hello, clear',
    hello: 'Hello! How can I assist you today?',
    clear: '',
    'oh my goddo': 'its salman kun\n yaha bhi hoga\n wha bhi hoga\n ab to saare jahan me hoga\n kya?\n mera hi jalwa'
  };

  useEffect(() => {
    // Scroll to the bottom of the terminal when history changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const command = input.trim();
    let output;

    if (command.startsWith('ssh')) {
      output = sshVerify(command);
    } else {
      output = templates[command];

      if (output === undefined) {
        output = `Command not found: ${command}`;
      }
    }

    setHistory([...history, { command, output }]);
    setInput('');

    if (command === 'clear') {
      setHistory([]);
    }
  };

  const renderOutput = (output) => {
    return output.split('\n').map((line, index) => (
      <div key={index}>{line}</div>
    ));
  };

  return (
    <div className="terminal">
      <div className="history" ref={terminalRef}>
        {history.map((item, index) => (
          <div key={index}>
            <div className="command">{`> ${item.command}`}</div>
            <div className="output">{renderOutput(item.output)}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="form">
        <span className="prompt">{'>'}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input"
          autoFocus
        />
      </form>
    </div>
  );
};

export default Terminal;
