import { TypeAnimation } from "react-type-animation";

import "../styles/welcome.css";
import React from "react";
import { useAnimate } from "framer-motion";

const Welcome = () => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }, []);

  React.useEffect(() => {
    // This "li" selector will only select children
    // of the element that receives `scope`.
    animate("div", { opacity: 1 });
  });

  return isVisible ? (
    <div ref={scope} className="welcome-container">
      <TypeAnimation
        sequence={["SITRONICS", 400, "LIGHT TRACKER", 1000]}
        wrapper="span"
        speed={40}
        style={{ fontSize: 50, display: "inline-block" }}
        repeat={1}
      />
    </div>
  ) : null;
};

export default Welcome;
