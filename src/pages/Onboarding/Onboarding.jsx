import { motion } from "framer-motion";
import "./Onboarding.scss";
import heroImg from "../../assets/images/man.png";
import { Link } from "react-router-dom";

function Onboarding() {
  return (
    <motion.div
      className="imgbxouter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="imgbg">
        <img src={heroImg} alt="hero" />
        <h1>spend smarter save more</h1>
      </div>
      <Link to="/signup" className="btn">
        Get Started
      </Link>
      <p>
        Already have account? <Link to="/login">Log In</Link>
      </p>
    </motion.div>
  );
}

export default Onboarding;
