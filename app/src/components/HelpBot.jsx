import React, { useState, useEffect, useRef } from "react";
import ChatBot from "react-simple-chatbot";
import alluArjun from "../assets/alluArjun.png";
import ohMyGoddo from "../assets/ohMyGoddo.png";
import { useNavigate } from 'react-router-dom';

const HelpBot = ({ level = 1, entryNumber, timer, setTimer }) => {
  const navigate = useNavigate();
  const latestTimerRef = useRef(timer);

  console.log("HelpBot rendered. Current timer value:", timer);

  // Update the ref whenever timer changes
  useEffect(() => {
    latestTimerRef.current = timer;
  }, [timer]);

  const NextLevelComponent = () => {
    const [localTimeTaken, setLocalTimeTaken] = useState(null);

    useEffect(() => {
      const capturedTimer = latestTimerRef.current;
      console.log("NextLevelComponent effect running. Captured Timer value:", capturedTimer);

      const updateData = async () => {
        const currentTimeTaken = 1200 - capturedTimer;
        console.log("Calculating time taken. Captured Timer:", capturedTimer, "Time taken:", currentTimeTaken);

        setLocalTimeTaken(currentTimeTaken);

        try {
          const formData = {
            entryNumber: entryNumber,
            timeTaken: currentTimeTaken
          };

          console.log("Sending data to server:", formData);

          const response = await fetch('http://localhost:3000/updateTime', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            const data = await response.json();
            console.log('Server response:', data);
            setTimer(0);  // Reset timer after successful update
          } else {
            console.error('Failed to update time. Status:', response.status);
            const errorText = await response.text();
            console.error('Error details:', errorText);
          }
        } catch (error) {
          console.error('Error updating time:', error.message);
        }
      };

      updateData();

      const timerId = setTimeout(() => {
        navigate(`/intro2?entryNumber=${entryNumber}`);
      }, 2000);

      return () => clearTimeout(timerId);
    }, []);

    return <div>Redirecting to the next level.... Time taken: {localTimeTaken !== null ? localTimeTaken : 'Calculating...'}</div>;
  };

  const getInitialSteps = (level) => {
    if (level === 1) {
      return [
        {
          id: "1",
          message: "You are on level 1. How can I assist you?",
          trigger: "2",
        },
        {
          id: "2",
          options: [
            { value: "option1", label: "Option 1", trigger: "option1-help" },
            { value: "option2", label: "Option 2", trigger: "option2-help" },
          ],
        },
        {
          id: "option1-help",
          message: "Here is help for Option 1.",
          trigger: "continue-options",
        },
        {
          id: "option2-help",
          message: "Here is help for Option 2.",
          trigger: "continue-options",
        },
        {
          id: "continue-options",
          message: "Do you need help with anything else?",
          trigger: "2",
        },
      ];
    } else if (level === 2) {
      return [
        {
          id: 1,
          message: "Welcome to CyberTrace. Hacking happened and hacker to find. u help. story bs",
          trigger: 2,
        },
        {
          id: 2,
          message: "Now that story bs over, any specific component u need help with",
          trigger: 3,
        },
        {
          id: 3,
          options: [
            { value: "browser", label: "Browser", trigger: "browser-help" },
            { value: "terminal", label: "Terminal", trigger: "terminal-help" },
            { value: "azure", label: "Azure", trigger: "azure-help" },
            { value: "hacker", label: "Name the hacker", trigger: "hacker-input" },
          ],
        },
        {
          id: "browser-help",
          message: "Here you need to access bank's files to get ssh credentials, try manipulating url",
          trigger: 2,
        },
        {
          id: "terminal-help",
          message: "Here are the several commands that would be of help:",
          trigger: "terminal-command-1",
        },
        {
          id: "terminal-command-1",
          message: "{ssh <username>@host -p <port> => <password>} : to files access",
          trigger: "terminal-command-2",
        },
        {
          id: "terminal-command-2",
          message: "{ls} : list files",
          trigger: "terminal-command-3",
        },
        {
          id: "terminal-command-3",
          message: "{ls-a} : list all files (including hidden)",
          trigger: "terminal-command-4",
        },
        {
          id: "terminal-command-4",
          message: "{clear} : clear terminal",
          trigger: "terminal-command-5",
        },
        {
          id: "terminal-command-5",
          message: "{cat <filename>} : to open file",
          trigger: 2,
        },
        {
          id: "azure-help",
          message: "You have selected Azure. How can I assist you with Azure?",
          trigger: 2,
        },
        {
          id: "hacker-input",
          user: true,
          trigger: (inputValue) => {
            if (inputValue.value === 'bad') {
              return 'congo-msg';
            } else {
              return 'wrong-ans';
            }
          },
        },
        {
          id: "congo-msg",
          message: "Correct answer! You found the hacker!",
          trigger: 'next-level',
        },
        {
          id: "next-level",
          component: (
            <NextLevelComponent />
          ),
          end: true,
        },
        {
          id: "wrong-ans",
          message: "Wrong answer. Try again!",
          trigger: 2,
        },
      ];
    } else {
      return [
        {
          id: 1,
          message: "This shouldn't render",
          end: true,
        },
      ];
    }
  };

  const [steps] = useState(getInitialSteps(level));

  const theme = {
    background: '#333',
    headerBgColor: '#444',
    headerFontColor: '#fff',
    botBubbleColor: '#555',
    botFontColor: '#fff',
    userBubbleColor: '#666',
    userFontColor: '#fff',
  };

  return (
    <div>
      {entryNumber}
      <ChatBot
        steps={steps}
        floating={true}
        style={{ background: theme.background }}
        contentStyle={{ background: theme.background }}
        botAvatar={alluArjun}
        userAvatar={ohMyGoddo}
        headerTitle="HelpBot"
        hideUserAvatar={true}
        customStyle={{
          backgroundColor: theme.background,
          color: theme.headerFontColor
        }}
      />
    </div>
  );
};

// const RedirectComponent = ({ navigate, entryNumber, timer, setTimer }) => {
//   let timeTaken = 0
//   useEffect(() => {
//     const updateData = async () => {
//       try {
//         timeTaken = 1200 - timer; // Calculate time taken to complete the level
//         const formData = {
//           entryNumber: entryNumber,
//           timeTaken: timeTaken
//         };

//         const response = await fetch('http://localhost:3000/updateTime', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//         });

//         if (response.ok) {
//           console.log('Time updated successfully');
//           setTimer(0); // Update the timer after the fetch request completes successfully
//         } else {
//           console.error('Failed to update time');
//         }
//       } catch (error) {
//         console.error('Error updating time:', error);
//       }
//     };

//     updateData();
//   }, [entryNumber, setTimer, timer]);

//   useEffect(() => {
//     const timerId = setTimeout(() => {
//       navigate(`/intro2?entryNumber=${entryNumber}`);
//     }, 2000);

//     return () => clearTimeout(timerId);
//   }, [navigate, entryNumber]);

//   return <div>Redirecting to the next level....{timeTaken}</div>;
// };

export default HelpBot;
