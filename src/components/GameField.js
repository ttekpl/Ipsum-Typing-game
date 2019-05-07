import React from "react";
import Styled from "styled-components";
import "../styles/GameField.scss";

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
  ${props => (props.not ? "background-color:white" : "")}
}


`;

const GameField = props => {
  console.log(props.txt.split(" "));
  console.log(props.txt);
  return (
    <section className="GameField">
      <Txt className="GameField__txt">
        {props.txt.split(" ").map((word, index) => (
          <>
            <Word
              data-text={word}
              green={props.isValid[index]}
              not={props.isValid[index] === undefined}
            />{" "}
          </>
        ))}
      </Txt>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="When you start typing the time also starts"
        onChange={props.onChange}
      />
      <button onClick={props.refreshTxt}>Regenerate text</button>
    </section>
  );
};

export default GameField;
