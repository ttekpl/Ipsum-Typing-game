import React, { useState, useEffect } from "react";
import GameField from "./components/GameField";
import "./App.css";
import { tsPropertySignature } from "@babel/types";

function App() {
  const [value, setValue] = useState("");

  const [txt, setTxt] = useState("");

  const [isCounting, setIsCounting] = useState(false);

  const [timer, setTimer] = useState(0);

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
        console.log(newTxt.length);
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

  useEffect(() => console.log(timer), [timer]);

  return (
    <div className="App">
      lorem ipsum typing game
      <GameField
        txt={txt}
        refreshTxt={refreshTxt}
        value={value}
        onChange={onInputChange}
        isCounting={isCounting}
      />
    </div>
  );
}

export default App;
