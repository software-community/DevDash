import React, { useEffect, useState } from 'react';
import "./Blockchain.css";


const TransactionMine = () => {

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
          if (pvtKeySplit[i].match(/[a-z]/i)){
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

    // function to generate the nonce shown after teh transaction is completed
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
            setTransaction("Successfull");
            setTimeLeft(frameRuleTime - (Math.floor(Date.now() / 1000) % frameRuleTime))
        } else {
            setTransaction("Failed");
        }
        console.log("Transaction: ", transaction);
    }

    const handleClick = () => {
        return
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen">

            {transaction !== "Successfull" && (
            <div>
            <p>{pubKey}</p>
            <div className="p-5 grid text-xl justify-items-center w-[80vw] bg-yellow-500 border-2 border-yellow-800 rounded-lg">
                <div>
                <div className='flex'>
                    <p className='text-center text-4xl pb-5'>Issue a transaction</p>
                    <div className='group relativeflex justify-center'>
                        {/* <button className='text-4xl justify-end bg-transparent' data-tooltip-target="tooltip-bottom">ⓘ</button> */}
                    </div>
                </div>



                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-2">

                    <div className='flex flex-col'>
                        <label>Recipient</label>
                        <input readOnly={true} className="rounded-lg text-sm w-[70vw] p-2" placeholder="softcom_vault"></input>
                    </div>
                    
                    <div className='flex flex-col'>
                        <label>Amount of SoftCoin</label>
                        <input type="number" className="rounded-lg text-sm w-[70vw] p-2" placeholder="42069"></input>
                    </div>
                    
                    <div className='flex flex-col'>
                        <label>Public key</label>
                        <input 
                            className="rounded-lg text-sm w-[70vw] p-2" 
                            placeholder="Enter your Public key"
                            onChange={(e) => setInputPubKey(e.target.value)}    
                        ></input>
                    </div>
                    
                    <div className="grid-cols-2 grid gap-5">
                        <input type="submit" className="bg-blue-500 text-white rounded-lg p-2 w-[20vw] cursor-pointer" value="Send"></input>
                        <input type="reset" className="bg-red-500 text-white rounded-lg p-2 w-[20vw] cursor-pointer" value="Reset"></input> 
                    </div>
                    
                </form>
                </div>

            { transaction === "Failed" && (
                <div className='flex flex-col place-items-center'>
                    <p className='text-red-600 italic'>Wrong Public Key, try again...</p>
                </div>
            )}

            </div>
        </div>
        )}

        { transaction === "Successfull" && (
            <div className= {`p-5 grid text-xl justify-items-center w-[80vw] border-2 border-yellow-800 rounded-lg ${timeLeft > 0 ? 'bg-red-500' : 'bg-green-500'}`}>
                <div className='flex flex-col justify-items-center gap-5'>
                    <p>Transaction details correct, waiting to be added to block</p>
                    <p className='text-green-700 w-[70vw] text-center'>Time left: {timeLeft}</p>

                    <div className='flex gap-2 flex-col'>
                        <p>Block Nonce: </p>
                        {timeLeft > 0 && (
                            <p className='text-red-600'>░░░░░░░░░░░░░░░</p>
                        )}
                        {timeLeft === 0 && (
                            <p className='text-red-600 font-retro'>{initialBlockNonce}</p>
                        ) }
                    </div>
                    <div className='flex gap-2 flexcol'>
                        <p>Transaction Number: </p>
                        {timeLeft > 0 && (
                            <p className='text-red-600'>░░░░░░░░░░░░░░░</p>
                        )}
                        {timeLeft === 0 && (
                            <p className='text-red-600 font-retro'>54150</p>
                        ) }
                    </div>
                    <div className='flex gap-2 flex-col'>
                        <p>Timestamp: </p>
                        {timeLeft > 0 && (
                            <p className='text-red-600 '>░░░░░░░░░░░░░░░</p>
                        )}
                        {timeLeft === 0 && (
                            <p className='text-red-600 font-retro'>{Math.floor(Date.now() / 1000)}</p>
                        ) }
                    </div>

                    {timeLeft === 0 && (
                        <div className='flex place-items-center flex-col gap-2'>
                            <p className='italic text-green-100'>Congrats! You are upgraded to a miner</p>
                            <button 
                                className='bg-blue-500 text-black'
                                onClick={handleClick}
                            ><a className='text-black' href="/blockMine">Next</a></button>
                        </div>
                    )}

                </div>
            </div>
        )}


        </div>
    )}



export default TransactionMine;