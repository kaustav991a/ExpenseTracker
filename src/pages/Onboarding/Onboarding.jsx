import { motion } from "framer-motion";
import "./Onboarding.scss";
import heroImg from "../../assets/images/man.png";
import { useNavigate } from "react-router-dom";

function Onboarding() {
  const navigate = useNavigate(); // ✅ correct way to use the hook

  const handleSignup = () => {
    navigate("/signup"); // ✅ use the navigate function returned by the hook
  };
  const handleLogin = () => {
    navigate("/login"); // ✅ use the navigate function returned by the hook
  };
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
      <a href="" className="btn" onClick={handleSignup}>
        Get Started
      </a>
      <p>
        Already have account?{" "}
        <a href="" onClick={handleLogin}>
          Log In
        </a>
      </p>
    </motion.div>
  );
}

export default Onboarding;
