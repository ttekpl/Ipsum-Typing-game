import React from "react";
import Styled from "styled-components";

const StatH1 = Styled.h1`
font-size:25px;
color:#aaa;
padding:20px;
&:nth-child(1){
  text-align:center;
  font-size:30px;
}
`;

const Rules = () => {
  return (
    <>
      <StatH1>Rules</StatH1>
      <StatH1>1. After the full stop you must press 2 spaces</StatH1>
      <StatH1>
        2. You get 100 characters to write at each game. Master your time!
      </StatH1>
      <StatH1>3. Red color appears after writing a new word!</StatH1>
    </>
  );
};

export default Rules;
