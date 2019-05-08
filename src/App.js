import React, { useState, useEffect } from "react";
import GameField from "./pages/GameField";
import Rules from "./pages/Rules";
import Contact from "./pages/Contact";
import Laderboards from "./pages/Laderboards";
import Nav from "./layout/Nav";
import Styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Wrap = Styled.main`
height:100vh;
width:100%;
display:flex;
`;

const Content = Styled(Switch)`
width:70%;
height:100%;

`;

const GlobalStyles = createGlobalStyle`
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}
`;

function App() {
  const [value, setValue] = useState("");

  const [txt, setTxt] = useState("");

  const [isCounting, setIsCounting] = useState(false);

  const [timer, setTimer] = useState(0);

  const [isValid, setIsValid] = useState([]);

  const [isCompleted, setIsCompleted] = useState(false);

  const [records, setRecords] = useState([]);

  const refreshTxt = () => {
    console.log(records);
    const API = `https://baconipsum.com/api/?type=meat-and-filler&paras=5`;
    fetch(API)
      .then(response => {
        if (response.ok) return response.json();
        else throw new Error("Fetching text failed");
      })
      .then(data => {
        const newTxt = data.join(".").slice(0, 100);
        // if(newTxt.length<400){
        //   newTxt.concat(data[1])
        // }

        setIsCounting(false);
        setTxt(newTxt);
        setValue("");
        setIsCompleted(false);
        setIsValid([]);
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
      const startTime = new Date().getTime();
      setTimer(startTime);
      console.log(records);
    } else if (isCompleted) {
      const endTime = new Date().getTime();
      const record = endTime - timer;
      setTimer(record);
      setRecords([...records, record]);
      console.log(record);
      console.log(records);
    }
  }, [isCounting]);

  useEffect(() => {
    const comparingTxt = txt.split(" ");

    const userTxt = value.split(" ");
    const newIsValid = [];
    userTxt.forEach((txt, index) => {
      if (txt === comparingTxt[index]) newIsValid[index] = true;
      else {
        newIsValid[index] = false;
      }
    });
    if (newIsValid[newIsValid.length - 1] === false)
      newIsValid[newIsValid.length - 1] = "typing";
    setIsValid(newIsValid);
    if (value !== "") {
      if (newIsValid.length === txt.split(" ").length) {
        let check = true;
        newIsValid.forEach(val => {
          if (val !== true) {
            check = false;
          }
        });
        if (check) {
          setIsCompleted(true);
          setIsCounting(false);
        }
      }
    }
  }, [value]);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <GlobalStyles />
      <div
        className="App"
        onClick={timer !== 0 ? () => setIsCounting(false) : null}
      >
        <Wrap>
          <Nav />
          <Content>
            <Route
              exact
              path="/"
              render={() => (
                <GameField
                  txt={txt}
                  refreshTxt={refreshTxt}
                  value={value}
                  onChange={onInputChange}
                  isCounting={isCounting}
                  timer={timer}
                  isValid={isValid}
                  isCompleted={isCompleted}
                />
              )}
            />
            <Route path="/Rules" component={Rules} />
            <Route path="/Laderboards" component={Laderboards} />
            <Route path="/Contact" component={Contact} />
          </Content>
        </Wrap>
      </div>
    </Router>
  );
}

export default App;
