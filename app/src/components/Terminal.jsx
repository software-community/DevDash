import React, { useState, useRef, useEffect } from "react";
import "./Terminal.css"; // Import the CSS file for the Terminal component
import sshVerify from "../Scripts/sshVerify"; // Import the SSH verification function
import Notepad from "./Notepad";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [sshVerified, setSshVerified] = useState(false);
  const [notepadContent, setNotepadContent] = useState('');
  const [isNotepadOpen, setIsNotepadOpen] = useState(false);
  const terminalRef = useRef(null);

  const fileContent = `Azure database info:\n 
  Username: admin\n
  Password: password`;

  useEffect(() => {
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
      if (output === 'Congo you won 100M dollars') {
        setSshVerified(true);
      } else {
        setSshVerified(false);
      }
    } else {
      output = executeCommand(command);
    }

    setHistory([...history, { command, output }]);
    setInput('');

    if (command === 'clear') {
      setHistory([]);
      setIsNotepadOpen(false);
    }
  };

  const executeCommand = (command) => {
    if (command.startsWith('ssh')) {
      return sshVerify(command);
    }

    switch (command) {
      case 'ls':
        return sshVerified ? 'No files found' : 'Please verify SSH first by running the ssh command.';
      case 'ls-a':
        return sshVerified ? 'hidden files found: heheheha' : 'Please verify SSH first by running the ssh command.';
      case 'cat heheheha':
        if (sshVerified) {
          setNotepadContent(fileContent);
          setIsNotepadOpen(true);
          return 'Opening file...';
        } else {
          return 'Please verify SSH first by running the ssh command.';
        }
      case 'help':
        return 'Available commands: help, hello, clear';
      case 'hello':
        return 'Hello! How can I assist you today?';
      case 'oh my goddo':
        return 'its salman kun\n yaha bhi hoga\n wha bhi hoga\n ab to saare jahan me hoga\n kya?\n mera hi jalwa';
      default:
        return `Command not found: ${command}`;
    }
  };

  const renderOutput = (output) => {
    return output
      .split("\n")
      .map((line, index) => <div key={index}>{line}</div>);
  };

  return (
      <div className="terminal">
        {isNotepadOpen ? (
        <Notepad
        content={notepadContent}
        onClose={() => setIsNotepadOpen(false)}
        fileName={"heheheha.txt"}
      />
      ) : (
        <div className="history" ref={terminalRef}>
          {history.map((item, index) => (
            <div key={index}>
              <div className="command">{`> ${item.command}`}</div>
              <div className="output">{renderOutput(item.output)}</div>
            </div>
          ))}
        </div>
      )}
      {!isNotepadOpen && (
        <form onSubmit={handleSubmit} className="form">
          <span className="prompt">{">"}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input"
            autoFocus
          />
        </form>
      )}
      </div>
  );
};

export default Terminal;
