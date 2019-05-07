import React, { useState, useEffect } from "react";
import GameField from "./components/GameField";
import "./App.css";
import { tsPropertySignature } from "@babel/types";

function App() {
  const [value, setValue] = useState("");

  const [txt, setTxt] = useState("");

  const [isCounting, setIsCounting] = useState(false);

  const [timer, setTimer] = useState(0);

  const [isValid, setIsValid] = useState([]);

  const refreshTxt = () => {
    const API = `https://baconipsum.com/api/?type=meat-and-filler&paras=5`;
    fetch(API)
      .then(response => {
        if (response.ok) return response.json();
        else throw new Error("Fetching text failed");
      })
      .then(data => {
        const newTxt = data.join(".").slice(0, 400);
        // if(newTxt.length<400){
        //   newTxt.concat(data[1])
        // }

        setIsCounting(false);
        setTxt(newTxt);
        setValue("");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onInputChange = e => {
    if (!isCounting) setIsCounting(true);
    setValue(e.target.value);
  };
  useEffect(refreshTxt, []);

  useEffect(() => {
    if (isCounting) {
      setTimer(new Date().getTime());
    } else {
      const endTime = new Date().getTime();
      setTimer(endTime - timer);
    }
  }, [isCounting]);

  useEffect(() => {
    const comparingTxt = txt.slice(0, value.length).split(" ");
    console.log(comparingTxt);

    const userTxt = value.slice(0, value.length).split(" ");
    const newIsValid = [];
    comparingTxt.forEach((txt, index) => {
      if (txt === userTxt[index]) newIsValid[index] = true;
      else {
        newIsValid[index] = false;
      }
    });
    console.log(isValid);
    setIsValid(newIsValid);
  }, [value]);

  return (
    <div
      className="App"
      onClick={timer !== 0 ? () => setIsCounting(false) : null}
    >
      lorem ipsum typing game
      <GameField
        txt={txt}
        refreshTxt={refreshTxt}
        value={value}
        onChange={onInputChange}
        isCounting={isCounting}
        timer={timer}
        isValid={isValid}
      />
    </div>
  );
}

export default App;
