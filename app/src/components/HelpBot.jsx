import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import alluArjun from "../assets/alluArjun.png";
import ohMyGoddo from "../assets/ohMyGoddo.png";

const HelpBot = ({ level = 1 }) => {
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
          if (inputValue === 'bad munda') {
            return 'next-level';
          } else {
            return 'wrong-ans';
          }
        },
      },
        {
          id: "next-level",
          message: "Congrats, you found the hacker! Let's move on to blockchain now.",
          trigger: 2,
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

  // const chatbotStyle = {
  //   borderRadius: "8px",
  //   boxShadow: "0 3px 8px rgba(0, 0, 0, 0.2)",
  //   maxWidth: "100%",
  //   margin: "0 auto",
  //   display: "flex",
  //   flexDirection: "column",
  //   height: "100%",
  //   overflow: "hidden",
  //   padding: "0",
  //   zIndex: "50",
  // };

  return (
    <div>
      <ChatBot 
        steps={steps} 
        floating={true} 
        style={{ background: theme.background }}
        contentStyle={{ background: theme.background }}
        botAvatar={alluArjun}
        userAvatar={ohMyGoddo}
        headerTitle="HelpBot"
        hideUserAvatar={true}
        // hideBotAvatar={true}
        customStyle={{
          backgroundColor: theme.background,
          color: theme.headerFontColor
        }}
        // chatbotStyle = {chatbotStyle}
        // {...theme}
      />
    </div>
  );
};

export default HelpBot;
