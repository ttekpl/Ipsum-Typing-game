import React from "react";
import "../styles/GameField.scss";

const GameField = props => {
  return (
    <section className="GameField">
      <p className="GameField__txt" data-text={props.txt} />
      <textarea name="" id="" cols="30" rows="10" placeholder="When you start typing the time also starts" onChange={props.onChange}/>
      <button onClick={props.refreshTxt}>Regenerate text</button>
    </section>
  );
};

export default GameField;
