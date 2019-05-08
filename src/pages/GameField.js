import React from "react";
import Styled from "styled-components";

const Txt = Styled.p`
  border:2px solid orange;
  height: auto;
  width: 500px;
  padding:20px;

`;

const Word = Styled.span`
color: black;
position:relative;
z-index:1;

&::after {
  content: attr(data-text);
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
    props.green ? "background-color:#009432" : "background-color:red"}
      ${props =>
        props.green === "typing"
          ? "background-color:orange"
          : props.green
          ? "background-color:#009432"
          : "background-color:red"}
  ${props => (props.not ? "background-color:white" : "")}
}


`;

const GameField = props => {
  const wordsArray = props.txt.split(" ");

  const timeSeconds = Math.floor(props.timer / 1000);
  const timeMiliSeconds = props.timer % 1000;

  return (
    <section className="GameField">
      <Txt className="GameField__txt">
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
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="When you start typing the time also starts"
        onChange={props.isCompleted ? null : props.onChange}
      />
      <button onClick={props.refreshTxt}>Regenerate text</button>
      <h1>
        {!props.isCounting && props.isCompleted
          ? `${timeSeconds},${timeMiliSeconds}s`
          : props.isCounting
          ? "time is counting"
          : null}
      </h1>
    </section>
  );
};

export default GameField;
