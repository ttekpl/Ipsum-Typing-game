import React, { useEffect } from "react";
import Styled from "styled-components";

const Txt = Styled.p`
  background-color:#383838;
  height: 150px;
  width: 100%;
  padding:20px;
  margin-bottom:20px;
  font-family: 'Raleway', sans-serif;
  outline:none;
  border:none;
  font-size:18px;
  color: #aaa;

  @media(min-width:1024px){
  margin-bottom:50px;

}
`;

const Word = Styled.span`
  /* background-color:#383838; */
position:relative;
z-index:1;
border:none;
outline:none;
&::after {
  content: attr(data-text);
  color:#aaa;
}
&::before{
  opacity:.5;
  content:'';
  display:block;
  position:absolute;
  width:100%;
  height:100%;
  border-radius:5px;
  top:0;
  left:0;
  z-index:-2;
  ${props =>
    props.green ? "background-color:#344534" : "background-color:#523939"}
      ${props =>
        props.green === "typing"
          ? "background-color:#B47A34"
          : props.green
          ? "background-color:#344534"
          : "background-color:#523939"}
  ${props => (props.not ? "    background-color:#383838;" : "")}
}
`;

const AgainButton = Styled.button`
width:60%;
background-color:#1E1E1E;
margin:20px auto 0;
padding:10px;
font-size:25px;
display:flex;
justify-content:center;
border:3px solid #333333;
color:#aaa;
outline:none;
@media(min-width:1024px){
  margin-top:0;
  

}
`;

const Stats = Styled.div`
border-top:2px solid #333333;
padding:20px;
@media(min-width:1024px){
  position:absolute;
  top:60px;
  height:calc(100vh - 60px);
  right:0;
  width:50%;
  border-top:none;
  border-left:2px solid #333333;
  transition: transform .3s;
  transform: ${props =>
    props.isActive ? "translateX(0);" : "translateX(100%);"}

}
`;

const StatH1 = Styled.h1`
font-size:25px;
color:#aaa;
&:nth-child(1){
  text-align:center;
  font-size:30px;
}
`;

const WrapTxtFields = Styled.section`
@media(min-width:1024px){
width:50%;
display:flex;
flex-direction:column;
height:100%;
padding-right:50px;


/* height:calc(100vh - 60px); */
}
`;

const GameField = props => {
  const userWords = props.value.split(" ");
  const wordsArray = props.txt.split(" ");
  const timeSeconds = Math.floor(props.timer / 1000);
  const timeMiliSeconds = props.timer % 1000;

  useEffect(() => {
    console.log(window.innerWidth);
    if (window.innerWidth >= 1024) {
      props.setIsHamVisivle(true);
      console.log(window.innerWidth);
      return () => props.setIsHamVisivle(false);
    } else {
      props.setIsHamVisivle(true);
    }
  }, [window.innerWidth]);

  return (
    <>
      <WrapTxtFields>
        <Txt>
          {wordsArray.map((word, index) => (
            <>
              <Word
                key={index}
                data-text={word}
                green={props.isValid[index]}
                not={props.isValid[index] === undefined}
              />
              {!(index === wordsArray.length - 1) ? " " : "."}
            </>
          ))}
        </Txt>
        <Txt
          as="textarea"
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="When you start typing the time also starts"
          onChange={props.isCompleted ? null : props.onChange}
          value={props.value}
        />
        <Stats isActive={props.isActive}>
          <StatH1>Last game stats</StatH1>
          <StatH1>
            time:
            {!props.isCounting && props.isCompleted
              ? `${timeSeconds},${timeMiliSeconds}s`
              : props.isCounting
              ? " is counting"
              : null}
          </StatH1>
          <StatH1>words: {`${userWords.length} / ${wordsArray.length}`}</StatH1>
        </Stats>
        <AgainButton onClick={props.refreshTxt}>Again</AgainButton>
      </WrapTxtFields>
    </>
  );
};

export default GameField;
