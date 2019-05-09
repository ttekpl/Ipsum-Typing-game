import React, { useState, useEffect } from "react";
import GameField from "./pages/GameField";
import Rules from "./pages/Rules";
import Contact from "./pages/Contact";
import Laderboards from "./pages/Laderboards";
import Nav from "./layout/Nav";
import Styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Content = Styled.main`
height:100%;
width:100%;
background-color:#1E1E1E;
padding:20px;
padding-top:70px;

`;

const Header = Styled.header`
position:absolute;
top:0;
left:0;
height:60px;
width:100%;
background-color:#333333;
`;

const WrapHamburger = Styled.div`
position:absolute;
left:0;
top:0;
height:60px;
width:60px;
z-index:999;
`;

const HamburgerMenu = Styled.div`
position:absolute;
height:2px;
width:40px;
left:10px;
top:50%;
transform:translateY(-100%);
background-color:#aaa;
transition:.3s;
${props =>
  props.isActive
    ? " background-color:rgba(170, 170, 170, 0);"
    : " background-color:rgba(170, 170, 170, 1);"}

&::after{
  content:'';
  position:absolute;
  top:calc(-10px * 1.41);
  left:0;
  height:100%;
  width:100%;
 transform-origin:0% center;
 transition:.3s;
 transform:${props => (props.isActive ? "rotate(45deg)" : "rotate(0)")};
 background-color:#aaa;
}


&::before{
  content:'';
  position:absolute;
  transform-origin:0% center;
  top:calc(10px * 1.41);
  left:0;
  height:100%;
  width:100%;
 background-color:#aaa;
 transition:.3s;
 transform:${props => (props.isActive ? "rotate(-45deg)" : "rotate(0)")};
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

}
div.App{
  height:100vh;
width:100%;
background-color:#1E1E1E;

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
        <Header>
          <WrapHamburger onClick={() => setIsMenuActive(!isMenuActive)}>
            <HamburgerMenu isActive={isMenuActive} />
          </WrapHamburger>
        </Header>
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
                />
              )}
            />
            <Route path="/Rules" component={Rules} />
            <Route path="/Laderboards" component={Laderboards} />
            <Route path="/Contact" component={Contact} />
          </Switch>
        </Content>
      </div>
    </Router>
  );
}

export default App;
