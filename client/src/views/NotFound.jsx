import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(5);

  const startTimer = () => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    startTimer();
    if (secondsLeft === 0) {
      navigate("/");
    }
  }, [secondsLeft]);

  return (
    <div className="w-screen h-screen flex flex-col items-center text-center justify-center">
      <p className="text-xl">You are lost outside the matrix.</p>
      <br /> It's time to wake up. returning to the matrix in {secondsLeft}...
    </div>
  );
};

export default NotFound;
