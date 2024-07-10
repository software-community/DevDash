import React, { useState, useEffect, useRef } from "react";
import ChatBot from "react-simple-chatbot";
import alluArjun from "../assets/alluArjun.png";
import ohMyGoddo from "../assets/ohMyGoddo.png";
import { useNavigate } from 'react-router-dom';


function sha256(ascii) {
  function rightRotate(value, amount) {
      return (value >>> amount) | (value << (32 - amount));
  };


  var mathPow = Math.pow;
  var maxWord = mathPow(2, 32);
  var lengthProperty = 'length'
  var i, j; // Used as a counter across the whole file
  var result = ''

  var words = [];
  var asciiBitLength = ascii[lengthProperty] * 8;

  //* caching results is optional - remove/add slash from front of this line to toggle
  // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
  // (we actually calculate the first 64, but extra values are just ignored)
  var hash = sha256.h = sha256.h || [];
  // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
  var k = sha256.k = sha256.k || [];
  var primeCounter = k[lengthProperty];
  /*/
  var hash = [], k = [];
  var primeCounter = 0;
  //*/

  var isComposite = {};
  for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
          for (i = 0; i < 313; i += candidate) {
              isComposite[i] = candidate;
          }
          hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
          k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      }
  }

  ascii += '\x80' // Append Ƈ' bit (plus zero padding)
  while (ascii[lengthProperty] % 64 - 56) ascii += '\x00' // More zero padding
  for (i = 0; i < ascii[lengthProperty]; i++) {
      j = ascii.charCodeAt(i);
      if (j >> 8) return; // ASCII check: only accept characters in range 0-255
      words[i >> 2] |= j << ((3 - i) % 4) * 8;
  }
  words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
  words[words[lengthProperty]] = (asciiBitLength)

  // process each chunk
  for (j = 0; j < words[lengthProperty];) {
      var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
      var oldHash = hash;
      // This is now the undefinedworking hash", often labelled as variables a...g
      // (we have to truncate as well, otherwise extra entries at the end accumulate
      hash = hash.slice(0, 8);

      for (i = 0; i < 64; i++) {
          var i2 = i + j;
          // Expand the message into 64 words
          // Used below if 
          var w15 = w[i - 15], w2 = w[i - 2];

          // Iterate
          var a = hash[0], e = hash[4];
          var temp1 = hash[7]
              + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
              + ((e & hash[5]) ^ ((~e) & hash[6])) // ch
              + k[i]
              // Expand the message schedule if needed
              + (w[i] = (i < 16) ? w[i] : (
                  w[i - 16]
                  + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) // s0
                  + w[i - 7]
                  + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10)) // s1
              ) | 0
              );
          // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
          var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
              + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])); // maj

          hash = [(temp1 + temp2) | 0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
          hash[4] = (hash[4] + temp1) | 0;
      }

      for (i = 0; i < 8; i++) {
          hash[i] = (hash[i] + oldHash[i]) | 0;
      }
  }

  for (i = 0; i < 8; i++) {
      for (j = 3; j + 1; j--) {
          var b = (hash[i] >> (j * 8)) & 255;
          result += ((b < 16) ? 0 : '') + b.toString(16);
      }
  }
  return result;
};

function caeserCipher(str, num) {
  num = num % 26;
  let lowerCaseString = str.toLowerCase();
  let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  let newString = '';
  for (let i = 0; i < lowerCaseString.length; i++) {
      let currentLetter = lowerCaseString[i];
      if (currentLetter === ' ') {
          newString += currentLetter;
          continue;
      }
      let currentIndex = alphabet.indexOf(currentLetter);
      let newIndex = currentIndex + num;
      if (newIndex > 25) newIndex = newIndex - 26;
      if (newIndex < 0) newIndex = 26 + newIndex;
      if (str[i] === str[i].toUpperCase()) {
          newString += alphabet[newIndex].toUpperCase();
      } else newString += alphabet[newIndex];
  }
  return newString;
}

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
          message: "no bot required for this level",
          end: true,
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
    } else if (level === 3){
      return [
        {
          id: 1,
          message: "Welcome to Noncence!",
          trigger: 2,
        },
        {
          id: 2,
          message: "You should have your public key by now. Here are the steps to generate your private key:",
          trigger: 3,
        },
        {
          id: 3,
          message: '1. First, replace the letters by their number equivalent such that "A=1, B=2, ...".',
          trigger: 4
        },
        {
          id: '3-extra',
          message: 'For example: k1a7fk2a9 -> 11117611219',
          trigger: 'choice-msg'
        },
        {
          id: 4,
          message: '2. Next, multiply by 1729. You can use your calculator for this.',
          trigger: 5
        },
        {
          id: '4-extra',
          message: 'For example: 11117611219 -> 19222349797651',
          trigger: 'choice-msg'
        },
        {
          id: 5,
          message: '3. Take the last 9 digits of the result.',
          trigger: 6
        },
        {
          id: '5-extra',
          message: 'For example: 19222349797651 -> 349797651',
          trigger: 'choice-msg'
        },
        {
          id: 6,
          message: '4. Convert every odd number to its letter equivalent.',
          trigger: 7
        },
        {
          id: '6-extra',
          message: 'For example: 349797651 -> c4igi6ea',
          trigger: 'choice-msg'
        },
        {
          id: 7,
          message: 'Done! You have your private key. Use it to mine your block.',
          trigger: 'choice-msg'
        },
        {
          id: 'choice-msg',
          message: 'Any specific step you need help with?',
          trigger: 'choice',
        },
        {
          id: 'choice', 
          options: [
            { value: 1, label: "1st", trigger: '3-extra' },
            { value: 2, label: "2nd", trigger: '4-extra' },
            { value: 3, label: "3rd", trigger: '5-extra' },
            { value: 4, label: "4th", trigger: '6-extra' },
          ],
        },
        
      ];
    } else if (level === 'blockmine'){
      return [
        {
          id: 1,
          message: "You are ready to mine your block. To get block nonce, you will require sha256 and caeser cipher encryption methods. Let's start!",
          trigger: 'choice-msg'
        },
        {
          id: 'choice-msg',
          message: 'Choose the encryption method you want to use:',
          trigger: 'choice',
        },
        {
          id: 'choice', 
          options: [
            { value: "SHA-256", label: "SHA-256", trigger: 'sha256-msg' },
            { value: "Caeser Cipher", label: "Caeser Cipher", trigger: 'caeser-string-msg' },
          ],
        },
        {
          id: 'sha256-msg',
          message: 'Enter the string to encrypt with sha256:',
          trigger: 'sha256',
        },
        {
          id: 'sha256',
          user: true,
          trigger: 'sha256-response',
        },
        {
          id: 'sha256-response',
          component: <SHA256Component />,
          asMessage: true,
          trigger: 'choice-msg',
        },
        {
          id: 'caeser-string-msg',
          message: 'Enter the string to encrypt with Caesar Cipher:',
          trigger: 'caeser-string-input',
        },
        {
          id: 'caeser-string-input',
          user: true,
          trigger: 'caeser-shift-msg',
        },
        {
          id: 'caeser-shift-msg',
          message: 'Enter the shift number:',
          trigger: 'caeser-shift-input',
        },
        {
          id: 'caeser-shift-input',
          user: true,
          validator: (value) => {
            if (isNaN(value)) {
              return 'Please enter a valid number.';
            }
            return true;
          },
          trigger: 'caeser-computation',
        },
        {
          id: 'caeser-computation',
          component: <CaeserCipherComponent />,
          asMessage: true,
          trigger: 'choice-msg',
        },
      ];
    }
    else {
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


const CaeserCipherComponent = ({ steps }) => {
  const caeserString = caeserCipher(steps['caeser-string-input'].value, parseInt(steps['caeser-shift-input'].value, 10));
  return (
    <div style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
      Caesar Cipher Encrypted String: {caeserString}
    </div>
  );
};

const SHA256Component = ({ previousStep }) => {
  const encryptedString = sha256(previousStep.message);
  return (
    <div style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
      SHA-256 Encrypted String: {encryptedString}
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
