import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ConfirmSignup.scss";

function ConfirmSignup() {
  const [seconds, setSeconds] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate("/home");
    }, 3000);

    return () => {
      clearInterval(countdown);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div className="confirmsignup">
      <div className="confirmsignupbx">
        <h1>Confirm Signup</h1>
        <p>
          Redirecting to home in <span>{seconds}</span> seconds...
        </p>
      </div>
    </div>
  );
}

export default ConfirmSignup;
