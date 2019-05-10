import React, { useState, useEffect } from "react";
import GameField from "./pages/GameField";
import Rules from "./pages/Rules";
import Contact from "./pages/Contact";
import Laderboards from "./pages/Laderboards";
import Nav from "./layout/Nav";
import Header from "./layout/Header";
import Styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Content = Styled.main`
height:100%;
width:100%;
background-color:#1E1E1E;
padding:20px;
padding-top:80px;
@media(min-width:1024px){
  position:absolute;
  left:100px;
  width:calc(100% - 100px);
  padding:50px;
  padding-top:110px;
  overflow:hidden;
}
`;

const GlobalStyles = createGlobalStyle`
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}
body{
  width:100vw;
  font-family: 'Raleway', sans-serif;
  color:#aaa;
}
div.App{
  height:100vh;
width:100%;
background-color:#1E1E1E;
overflow:hidden;

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

  const [isMenuActive, setIsMenuActive] = useState(false);

  const [isHamVisible, setIsHamVisivle] = useState(true);

  const refreshTxt = () => {
    window.addEventListener("resize", () => {
      console.log("resize");
      if (window.innerWidth >= 1024) {
        setIsHamVisivle(false);
      } else {
        setIsHamVisivle(true);
      }
    });

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
        setIsCompleted(false);
        setIsValid([]);
      })
      .catch(err => {
        console.log(err);
      });
    setValue("");
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
        // onClick={timer !== 0 ? () => setIsCounting(false) : null}
      >
        <Header
          isHamVisible={isHamVisible}
          onClick={() => setIsMenuActive(!isMenuActive)}
          isActive={isMenuActive}
        />
        <Nav isActive={isMenuActive} />
        <Content>
          <Switch>
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
                  isActive={isMenuActive}
                  isHamVisible={isHamVisible}
                  setIsHamVisivle={setIsHamVisivle}
                />
              )}
            />
            <Route path="/Rules" component={Rules} />
            <Route
              path="/Laderboards"
              render={() => <Laderboards records={records} />}
            />
            <Route path="/Contact" component={Contact} />
          </Switch>
        </Content>
      </div>
    </Router>
  );
}

export default App;
