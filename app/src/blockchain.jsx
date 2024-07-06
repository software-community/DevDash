import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Blockchain = () => {
  const [isOpen, setIsOpen] = useState(true); // State to control the flap
  const [isPaperVisible, setIsPaperVisible] = useState(false);
  const [pvtKey, setPvtKey] = useState(''); // State to store the private key


      // Generate a random pvt key
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

    // useEffect with an empty dependency array to run only once after the initial render
    useEffect(() => {

        let savedData = JSON.parse(localStorage.getItem('pvtKey'));
        if (!savedData || savedData.trim().length === 0) {
            let generatedPvtKey = genPvtKey(10);
            localStorage.setItem('pvtKey', JSON.stringify(generatedPvtKey));
        } 
        savedData = JSON.parse(localStorage.getItem('pvtKey'));
        setPvtKey(savedData);


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

  function handleClick() {
    navigate('/blockMine?pvtKey=${pvtKey}');
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">

      <div className="relative flex flex-col gap-10 place-items-center" onClick={toggleFlap}> {/* Add onClick event here */}
        {/* Flap with animation */}
        <motion.div
          className="z-20 absolute top-0 left-0 w-0 h-0 border-x-[35vw] border-x-transparent border-b-[10vh] border-b-yellow-300"
          variants={flapVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"} // Use state variable to control animation
          transition={{ duration: 1, ease: "easeOut" }}
          onAnimationComplete={() => {
            // Trigger paper animation only when flap opens
            if (isOpen) setIsPaperVisible(false);
          }}
        />
        {/* Body */}
        <div className="z-30 h-[20vh] w-[70vw] bg-yellow-300 border-yellow-800 border-2"></div>
        <div className="z-10 absolute top-0 left-0 w-0 h-0 border-x-[35vw] border-x-transparent border-t-[10vh]"></div>
        

        {/* Paper */}
        <AnimatePresence>
        {isPaperVisible && (
          <motion.div
            className="z-30 absolute top-0 bg-white w-[70vw] h-[15vh] flex justify-center items-center flex-col"
            initial={{ y: 0, opacity:0 }}
            animate={{ y: -140, opacity:1, transition: { delay: 0.5, duration: 0.5 }}}
            exit={{x: 100, opacity: 0, transition: { duration: 0.2 }}}
            // transition={{ delay: 0.5, duration: 0.5 }} // Adjust timing as needed
          >
            <p className='text-black'>Private Key-</p>
            <p className='text-red-500'>{pvtKey}</p>
          </motion.div>
        )}
        </AnimatePresence>
        <button 
            className='bg-blue-500 text-black'
            onClick={handleClick}
        ><a className='text-black' href="/blockMine">Next</a></button>
      </div>
    </div>
  );
};

export default Blockchain;