export function disableAction(
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ClipboardEvent<HTMLInputElement>
) {
  e.preventDefault();
  return false;
}


export function generateRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  return alphabet[Math.floor(Math.random() * alphabet.length)]
}

 export function getTime(timeInMilliSeconds: number) {
    const minutes = Math.floor(
      (timeInMilliSeconds / 60000) % 60
    ).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const seconds = Math.floor((timeInMilliSeconds / 1000) % 60).toLocaleString(
      "en-US",
      {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }
    );
    const milliseconds = Math.floor(
      (timeInMilliSeconds / 10) % 100
    ).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    return `${minutes}:${seconds}:${milliseconds}`;
  }