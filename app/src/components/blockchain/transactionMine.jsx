import React, { useEffect, useState } from 'react';
import "./Blockchain.css";
import AnimatedPage from '../AnimatedPage';
import HelpBot from '../HelpBot';

const TransactionMine = ({ timer, setTimer, goToNextStep }) => {

  const frameRuleTime = 10;

  const [pvtKey, setPvtKey] = useState(''); // State to store the private key
  const [transaction, setTransaction] = useState(''); // State to store the transaction
  const [timeLeft, setTimeLeft] = useState(60000000);
  const [inputPubKey, setInputPubKey] = useState('');
  const [initialBlockNonce, setInitialBlockNonce] = useState(''); // State to store the block nonce

  // Read cookies
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('pvtKey'));
    if (savedData) {
      setPvtKey(savedData);
    }

    let savedData2 = JSON.parse(localStorage.getItem('initialBlockNonce'));
    if (!savedData2 || savedData2.trim().length === 0) {
      let generatedInitialNonce = genInitialNonce();
      localStorage.setItem('initialBlockNonce', JSON.stringify(generatedInitialNonce));
    }
    savedData2 = JSON.parse(localStorage.getItem('initialBlockNonce'));
    setInitialBlockNonce(savedData2);

    // Exit early when we reach 0
    if (timeLeft === 0) return;

    // Save intervalId to clear the interval when the component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // Add timeLeft as a dependency to re-run the effect when we update it
  }, [timeLeft]);

  const pubKeyDerivation = (pvtKey) => {
    let pvtKeySplit = pvtKey.toLowerCase().split('');
    let toNum = "";
    for (let i = 0; i < pvtKeySplit.length; i++) {
      if (pvtKeySplit[i].match(/[a-z]/i)) {
        toNum += (pvtKeySplit[i].charCodeAt(0) - 96).toString();
      } else {
        toNum += pvtKeySplit[i];
      }
    }
    toNum = parseInt(toNum);

    toNum *= 1729;
    toNum = toNum % 1000000000;
    toNum = toNum.toString().split('');
    let pubKey = [];
    for (let i = 0; i < toNum.length; i++) {
      if (parseInt(toNum[i]) % 2 !== 0) {
        pubKey.push(String.fromCharCode(parseInt(toNum[i]) + 96));
      } else {
        pubKey.push(toNum[i]);
      }
    }
    return pubKey.join('');
  }

  const pubKey = pubKeyDerivation(pvtKey);

  // function to generate the nonce shown after the transaction is completed
  const genInitialNonce = () => {
    const date = new Date();
    var seed = date.getDate();

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    let result = '';
    while (counter < 16) {
      result += characters.charAt(Math.floor(seededRandom(seed + counter) * charactersLength));
      counter += 1;
    }
    console.log(result)
    return result;
  }

  // Function to generate a random number from a seed
  function seededRandom(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputPubKey === pubKeyDerivation(pvtKey)) {
      setTransaction("Successful");
      setTimeLeft(frameRuleTime - (Math.floor(Date.now() / 1000) % frameRuleTime))
    } else {
      setTransaction("Failed");
    }
    console.log("Transaction: ", transaction);
  }

  const handleClick = () => {
    { goToNextStep };
  }

  return (
    <AnimatedPage>
    <div className="flex flex-col justify-center items-center h-screen w-screen p-4">
      {transaction !== "Successful" && (
        <div className="w-full max-w-lg">
          <p className="text-center mb-4">{pubKey}</p>
          <div className="p-5 grid text-xl justify-items-center bg-yellow-500 border-2 border-yellow-800 rounded-lg">
            <div>
              <div className='flex justify-between'>
                <p className='text-center text-4xl pb-5'>Issue a transaction</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-2">
                <div className='flex flex-col'>
                  <label>Recipient</label>
                  <input readOnly={true} className="rounded-lg text-sm w-full p-2" placeholder="softcom_vault"></input>
                </div>

                <div className='flex flex-col'>
                  <label>Amount of SoftCoin</label>
                  <input type="number" className="rounded-lg text-sm w-full p-2" placeholder="42069"></input>
                </div>

                <div className='flex flex-col'>
                  <label>Public key</label>
                  <input
                    className="rounded-lg text-sm w-full p-2"
                    placeholder="Enter your Public key"
                    onChange={(e) => setInputPubKey(e.target.value)}
                  ></input>
                </div>

                <div className="grid grid-cols-2 gap-5 w-full mt-4">
                  <input type="submit" className="bg-blue-700 text-white rounded-lg p-2 cursor-pointer" value="Send"></input>
                  <input type="reset" className="bg-red-700 text-white rounded-lg p-2 cursor-pointer" value="Reset"></input>
                </div>
              </form>
            </div>

            {transaction === "Failed" && (
              <div className='flex flex-col place-items-center mt-4'>
                <p className='text-red-700 italic'>Wrong Public Key, try again...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {transaction === "Successful" && (
        <div className={`p-5 grid text-xl justify-items-center w-full max-w-lg border-2 border-yellow-800 rounded-lg ${timeLeft > 0 ? 'bg-red-700' : 'bg-green-700'}`}>
          <div className='flex flex-col justify-items-center gap-5'>
            <p className='text-white'>Transaction details correct, waiting to be added to block</p>
            <p className='text-white w-full text-center'>Time left: {timeLeft}</p>

            <div className='flex flex-col gap-2'>
              <p className='text-white'>Block Nonce: </p>
              {timeLeft > 0 && (
                <p className='text-white'>░░░░░░░░░░░░░░░</p>
              )}
              {timeLeft === 0 && (
                <p className='text-white font-retro'>{initialBlockNonce}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-white'>Transaction Number: </p>
              {timeLeft > 0 && (
                <p className='text-white'>░░░░░░░░░░░░░░░</p>
              )}
              {timeLeft === 0 && (
                <p className='text-white font-retro'>54150</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-white'>Timestamp: </p>
              {timeLeft > 0 && (
                <p className='text-white'>░░░░░░░░░░░░░░░</p>
              )}
              {timeLeft === 0 && (
                <p className='text-white font-retro'>{Math.floor(Date.now() / 1000)}</p>
              )}
            </div>

            {timeLeft === 0 && (
              <div className='flex place-items-center flex-col gap-2 mt-4'>
                <p className='italic text-green-100'>Congrats! You are upgraded to a miner</p>
                <button
                  className='bg-blue-700 text-white px-4 py-2 rounded-lg'
                  onClick={ goToNextStep }
                >Next</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    <HelpBot 
    level={3}/>
    </AnimatedPage>

  )
}

export default TransactionMine;
