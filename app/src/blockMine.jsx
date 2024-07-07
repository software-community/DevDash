import React, { useEffect, useState } from 'react';
import "./Blockchain.css";

function sha256(ascii) {
    function rightRotate(value, amount) {
        return (value>>>amount) | (value<<(32 - amount));
    };
    
    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var lengthProperty = 'length'
    var i, j; // Used as a counter across the whole file
    var result = ''

    var words = [];
    var asciiBitLength = ascii[lengthProperty]*8;
    
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
            hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
            k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
        }
    }
    
    ascii += '\x80' // Append Ƈ' bit (plus zero padding)
    while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
    for (i = 0; i < ascii[lengthProperty]; i++) {
        j = ascii.charCodeAt(i);
        if (j>>8) return; // ASCII check: only accept characters in range 0-255
        words[i>>2] |= j << ((3 - i)%4)*8;
    }
    words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
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
                + ((e&hash[5])^((~e)&hash[6])) // ch
                + k[i]
                // Expand the message schedule if needed
                + (w[i] = (i < 16) ? w[i] : (
                        w[i - 16]
                        + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
                        + w[i - 7]
                        + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
                    )|0
                );
            // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
            var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
                + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
            
            hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
            hash[4] = (hash[4] + temp1)|0;
        }
        
        for (i = 0; i < 8; i++) {
            hash[i] = (hash[i] + oldHash[i])|0;
        }
    }
    
    for (i = 0; i < 8; i++) {
        for (j = 3; j + 1; j--) {
            var b = (hash[i]>>(j*8))&255;
            result += ((b < 16) ? 0 : '') + b.toString(16);
        }
    }
    return result;
};


const BlockMine = () => {
    const [minedSuccesfully, setMinedSuccessfully] = useState('')
    const [pvtKey, setPvtKey] = useState('')
    const [inputPubKey, setInputPubKey] = useState('');
    const [InputBlockNonce, setInputBlockNonce] = useState('');
    const [finalBlockNonce, setFinalBlockNonce] = useState('')
    const [initialBlockNonce, setInitialBlockNonce] = useState('');
    const [duration, setDuration] = useState(0);

    const pushTodb = () => {
        const initialTimestamp = JSON.parse(localStorage.getItem('initialTimestamp'));
        const finalTimestamp = Math.floor(Date.now() / 1000);
        setDuration(finalTimestamp - parseInt(initialTimestamp));
        console.log("Duration:", duration)
    }

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('pvtKey'));
        if (savedData) {
          setPvtKey(savedData);
        }

        const savedData2 = JSON.parse(localStorage.getItem('initialBlockNonce'));
        if (savedData2) {
          setInitialBlockNonce(savedData2);
        }

        const fetchFinalBlockNonce = () => {
            let savedData3 = JSON.parse(localStorage.getItem('finalBlockNonce'));
            if (!savedData3 || savedData3.trim().length === 0) {
                let generatedFinalNonce = generateBlockNonce(initialBlockNonce);
                localStorage.setItem('finalBlockNonce', JSON.stringify(generatedFinalNonce));
            } 
            savedData3 = JSON.parse(localStorage.getItem('finalBlockNonce'));
            setFinalBlockNonce(savedData3);
        };
        fetchFinalBlockNonce();


    }, [initialBlockNonce])

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

    const generateBlockNonce = (lastBlockNonce) => {
        let lastBlockNonceM = lastBlockNonce.split('');
        let letters = '';
        let numbers = '';
        for (let i = 0; i < lastBlockNonceM.length; i++) {
            if (lastBlockNonceM[i].match(/[a-z]/i)) {
                letters += lastBlockNonceM[i];
            } else {
                numbers += lastBlockNonceM[i];
            }
        } 
        let newNonce = caeserCipher(letters, 3) + numbers;
        console.log(sha256(newNonce))
        return sha256(newNonce);
    
      }

    // caeser cipher used in the final nonce generation
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


    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputPubKey === pubKeyDerivation(pvtKey) && InputBlockNonce === finalBlockNonce) {
            setMinedSuccessfully("Successfull");
            pushTodb();
        } else {
            setMinedSuccessfully("Failed");
        }
        console.log("Mining:", minedSuccesfully);
    }

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            { minedSuccesfully !== "Successfull" && (
                <div className="p-5 grid text-xl justify-items-center w-[80vw] bg-yellow-500 border-2 border-yellow-800 rounded-lg">
                <div>
                <p className='text-center text-[2em] pb-5'>Mine Block</p>
                <p className='text-xs'>{finalBlockNonce}</p>
                <p>{pubKey}</p>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-2">

                    <div className='flex flex-col'>
                        <label>Block Nonce</label>
                        <input  
                            className="rounded-lg text-sm w-[70vw] p-2"
                            onChange={(e) => setInputBlockNonce(e.target.value)}    
                        ></input>
                    </div>
                    
                    
                    <div className='flex flex-col'>
                        <label>Public key</label>
                        <input 
                            className="rounded-lg text-sm w-[70vw] p-2" 
                            placeholder="Enter your Public key"
                            onChange={(e) => setInputPubKey(e.target.value)}    
                        ></input>
                    </div>

                    <div className='flex flex-col'>
                        <label>Transaction Number</label>
                        <input readOnly={true} className="rounded-lg text-sm w-[70vw] p-2" placeholder="54151"></input>
                    </div>
                    
                    <div className="grid-cols-2 grid gap-5">
                        <input type="submit" className="bg-blue-500 text-white rounded-lg p-2 w-[20vw] cursor-pointer" value="Send"></input>
                        <input type="reset" className="bg-red-500 text-white rounded-lg p-2 w-[20vw] cursor-pointer" value="Reset"></input> 
                    </div>
                    
                </form>
                </div>
                </div>
            )}

            { minedSuccesfully === "Failed" && (
                <div className="p-5 grid text-xl justify-items-center w-[80vw] bg-red-500 border-2 border-yellow-800 rounded-lg">
                    <div className='flex flex-col place-items-center'>
                        <p className='text-red-600 italic'>Wrong Public Key or Block Nonce, try again...</p>
                    </div>
                </div>
            )}

            { minedSuccesfully === "Successfull" && (
                <div className="p-5 grid text-xl justify-items-center w-[80vw] bg-green-500 border-2 border-green-800 rounded-lg">
                    <div className='flex flex-col place-items-center'>
                        <p className='text-white italic text-3xl'>Details Correct...</p>
                        <p className='text-white italic text-sm'>Waiting for confirmation</p>
                    </div>
                </div>
            
            )}

        </div>
    )
}

export default BlockMine;