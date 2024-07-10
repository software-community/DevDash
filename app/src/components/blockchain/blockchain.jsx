import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import "./Blockchain.css";
import AnimatedPage from '../AnimatedPage';

const Blockchain = ({ timer, setTimer, goToNextStep }) => {



  const [isOpen, setIsOpen] = useState(true); // State to control the flap
  const [isPaperVisible, setIsPaperVisible] = useState(false);
  const [pvtKey, setPvtKey] = useState(''); // State to store the private key
  const [isKeyShown, setIsKeyShown] = useState(false); // State to track if the private key has been shown
  const [isNextVisible, setIsNextVisible] = useState(false); // State to control the visibility of the next button

  

  // Generate a random private key
  const genPvtKey = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  // useEffect to run only once after the initial render
  useEffect(() => {
    let savedData = JSON.parse(localStorage.getItem('pvtKey'));
    if (!savedData || savedData.trim().length === 0) {
      let generatedPvtKey = genPvtKey(10);
      localStorage.setItem('pvtKey', JSON.stringify(generatedPvtKey));
    }
    savedData = JSON.parse(localStorage.getItem('pvtKey'));
    setPvtKey(savedData);

    let savedData2 = JSON.parse(localStorage.getItem('initialTimestamp'));
    if (!savedData2) {
      let initialTimestamp = Math.floor(Date.now() / 1000);
      localStorage.setItem('initialTimestamp', JSON.stringify(initialTimestamp));
    }
  }, []);

  const flapVariants = {
    closed: {
      translateY: "-100%",
      rotateX: 0,
      originY: 1
    },
    open: {
      translateY: "-100%",
      rotateX: -180,
      originY: 1
    }
  };

  // Function to toggle the envelope flap state
  const toggleFlap = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      // Reset paper animation when flap closes
      setIsPaperVisible(true);
    }
  };

  const showPrivateKey = () => {
    setIsPaperVisible(true);
    setIsKeyShown(true);
    setTimeout(() => {
      setIsNextVisible(true);
    }, 2000); // Delay before showing the next button (2 seconds)
  };

  const handleNextClick = () => {
    
    // navigate(`/level-3(2)?pvtKey=${pvtKey}`)
  };

  return (
    <AnimatedPage>
    <div className="flex flex-col justify-center items-center w-screen">
      <div className="relative flex flex-col gap-10 place-items-center" onClick={toggleFlap}>
        {/* Flap with animation */}
        <motion.div
          className="z-30 absolute top-0 left-0 w-0 h-0 border-x-[35vw] border-x-transparent border-b-[10vh] border-b-yellow-300 md:border-x-[10vw]"
          variants={flapVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 1, ease: "easeOut" }}
          onAnimationComplete={() => {
            if (isOpen) setIsPaperVisible(false);
          }}
        />
        {/* Body */}
        <div className="z-20 h-[20vh] w-[70vw] bg-yellow-300 border-yellow-800 border-2 md:w-[20vw]"></div>
        <div className="z-20 absolute top-0 left-0 w-0 h-0 border-x-[35vw] border-x-transparent border-t-[10vh] border-b-white md:border-x-[10vw]"></div>

        {/* Paper */}
        <AnimatePresence>
          {isPaperVisible && (
            <motion.div
              className="z-30 absolute top-0 bg-white w-[70vw] h-[15vh] flex justify-center items-center flex-col md:w-[20vw]"
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -140, opacity: 1, transition: { delay: 0.5, duration: 0.5 } }}
              exit={{ x: 100, opacity: 0, transition: { duration: 0.2 } }}
            >
              <p className='text-black'>Private Key-</p>
              <p className='text-red-500 font-retro'>{pvtKey}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show Private Key Button */}
        {!isKeyShown && (
          <button
            className='bg-blue-500 text-black px-4 py-2 mt-4'
            onClick={showPrivateKey}
          >
            Show Private Key
          </button>
        )}

        {/* Next Button */}
        {isNextVisible && (
          <button
            className='bg-green-500 text-black px-4 py-2 mt-4'
            onClick={ goToNextStep }
          >
            Next
          </button>
        )}
      </div>
    </div>
    </AnimatedPage>
  );
};

export default Blockchain;
