import React from "react";
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
width:100%;
background-color:#1E1E1E;
margin-top:20px;
padding:10px;
font-size:25px;
display:flex;
justify-content:center;
border:3px solid #333333;
color:#aaa;
outline:none;
`;

const Stats = Styled.div`
border-top:2px solid #333333;
padding:20px;
`;

const StatH1 = Styled.h1`
font-size:25px;
color:#aaa;
&:nth-child(1){
  text-align:center;
  font-size:30px;
}
`;

const GameField = props => {
  const userWords = props.value.split(" ");
  const wordsArray = props.txt.split(" ");
  const timeSeconds = Math.floor(props.timer / 1000);
  const timeMiliSeconds = props.timer % 1000;

  return (
    <>
      <Txt>
        {wordsArray.map((word, index) => (
          <>
            <Word
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
      />
      <Stats>
        <StatH1>Stats</StatH1>
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
    </>
  );
};

export default GameField;
