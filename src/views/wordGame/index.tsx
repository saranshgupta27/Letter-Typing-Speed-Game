import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import {
  disableAction,
  generateRandomLetter,
  getTime as getFormattedTime,
} from "../../utils/helpers";
import { resultValues } from "../../utils/constants";

const useStyles = createUseStyles((theme) => ({
  container: {
    minWidth: "350px",
    maxWidth: "400px",
    color: "white",
    margin: "50px auto 0 auto",
    textAlign: "center",
    lineHeight: "25px",
  },
  time: {
    width: "20px",
    overflow: "clip",
  },
  letterContainer: {
    color: "var(--green)",
    background: "white",
    width: "100%",
    height: "150px",
    borderRadius: "12px",
  },
  userInputContainer: {
    width: "100%",
    background: "var(--secondary)",
  },
  input: {
    color: "black",
    fontWeight: "600",
    textTransform: "uppercase",
    background: "inherit",
    outline: "none",
    textAlign: "center",
    width: "100%",

    "&::placeholder": {
      textTransform: "initial",
      display: "none",
      fontWeight: "400",
    },
  },
  resetButton: { background: "var(--pink)", width: "150px", height: "inherit" },
  timeContainer: { width: "120px", textAlign: "left" },
  failure: { color: "red" },
}));

function WordGame() {
  const classes = useStyles();
  const [randomLetter, setRandomLetter] = useState(generateRandomLetter);
  const [userInputData, setUserInputData] = useState<string>("");
  const [timeInMilliSeconds, setTimeInMilliSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore") || "0")
  );
  const [result, setResult] = useState<null | resultValues>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;

    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setTimeInMilliSeconds((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isTimerRunning]);

  function handleUserKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    //Starting the time if it isn't running already
    if (!isTimerRunning) setIsTimerRunning(true);

    //disabling value of key to affect value of our input
    e.preventDefault();

    if (randomLetter === e.key.toUpperCase()) {
      setUserInputData(
        userInputData ? `${userInputData + randomLetter}` : randomLetter
      );

      let newRandomLetter = generateRandomLetter();

      //this will ensure our new letter will never be the same as previous letter
      while (newRandomLetter === randomLetter) {
        newRandomLetter = generateRandomLetter();
        if (newRandomLetter !== randomLetter) {
          break;
        }
      }

      setRandomLetter(newRandomLetter);

      if (userInputData?.length === 19) {
        setIsTimerRunning(false);
        if (timeInMilliSeconds < highScore) {
          localStorage.setItem("highScore", `${timeInMilliSeconds}`);
          setHighScore(timeInMilliSeconds);
          return setResult(resultValues.success);
        }
        setResult(resultValues.failure);
      }
      return;
    }

    return setTimeInMilliSeconds((prev) => prev + 500);
  }

  function onReset() {
    setIsTimerRunning(false);
    setUserInputData("");
    setResult(null);
    setTimeInMilliSeconds(0);
    setRandomLetter(generateRandomLetter);
  }

  return (
    <div className={clsx(classes.container)}>
      <div className="flex flex-col items-center justify-center px-2">
        <h1 className="text-3xl font-medium mb-2">Type the Alphabet</h1>
        <p className="text-1xl font-light mb-2">
          Typing game to see how fast you type. Timer starts when you do :)
        </p>

        <div
          className={clsx(
            classes.letterContainer,
            { [classes.failure]: result === resultValues.failure },
            "mt-4 flex items-center justify-center"
          )}
        >
          <p className="text-7xl font-extrabold">{result || randomLetter}</p>
        </div>
        <div className={clsx(classes.timeContainer, "flex items-center gap-1")}>
          <p className="text-1xl font-normal mt-6">
            Time: {getFormattedTime(timeInMilliSeconds)}
          </p>
        </div>
        <p className={"text-1xl font-light mt-1 opacity-80"}>
          my best time: {getFormattedTime(highScore)}!
        </p>
      </div>
      <div
        className={clsx(
          "mt-10 flex justify-between",
          classes.userInputContainer
        )}
      >
        <input
          type="text"
          value={userInputData}
          id="user-input"
          onKeyDown={handleUserKeyPress}
          //disabling cut, copy, paste functionality so user can't modify input field
          onCut={disableAction}
          onCopy={disableAction}
          onPaste={disableAction}
          placeholder="Type Here"
          className={clsx("p-1", classes.input)}
        />
        <button className={classes.resetButton} onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default WordGame;
