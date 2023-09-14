import { TypeAnimation } from "react-type-animation";

import "../styles/welcome.css";
import React from "react";

import { motion } from "framer-motion";

interface WelcomeProps {
  start: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ start }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setTimeout(() => {
      containerRef.current!.style.opacity = "0";
      containerRef.current!.style.filter = "blur(100px)";
      setTimeout(() => {
        containerRef.current!.style.display = "none";
        start();
      }, 500);
    }, 3500);
  }, []);

  return (
    <div ref={containerRef} className="welcome-container">
      <TypeAnimation
        onChange={(e) => console.log(e)}
        cursor={false}
        sequence={["SITRONICS", 400, "LIGHT TRACKER"]}
        onEnded={() => {
          console.log("END");
        }}
        wrapper="span"
        speed={20}
        style={{ fontSize: 50, display: "inline-block" }}
        className="welcome-text"
        repeat={0}
        deletionSpeed={1}
      />
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5, repeat: 0 }}
        animate={{ opacity: 0.08 }}
        className="light l-1"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 1.5, repeat: 0 }}
        animate={{ opacity: 0.1 }}
        className="light l-2"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 3, repeat: 0 }}
        animate={{ opacity: 0.15 }}
        className="light l-3"
      ></motion.div>
    </div>
  );
};

export default Welcome;
