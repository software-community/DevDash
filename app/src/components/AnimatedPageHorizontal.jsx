import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, x: -500 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 0 },
};

const AnimatedPageHorizontal = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPageHorizontal;