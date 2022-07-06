import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles((theme) => ({
  container: {
    minWidth: "350px",
    maxWidth: "400px",
    color: "white",
    margin: "50px auto 0 auto",
    textAlign: "center",
    lineHeight: "25px",
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
}));

function WordGame() {
  const classes = useStyles();

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
            "mt-4 flex items-center justify-center"
          )}
        >
          <p className="text-7xl font-extrabold">A</p>
        </div>
        <p className="text-1xl font-normal mt-6">Time: 0.000s</p>
        <p className={"text-1xl font-light mt-1 opacity-80"}>
          my best time: 1:39s!
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
          id="user-input"
          placeholder="Type Here"
          className={clsx("p-1", classes.input)}
        />
        <button className={classes.resetButton}>Reset</button>
      </div>
    </div>
  );
}

export default WordGame;
