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

const Laderboards = props => {
  return (
    <>
      <StatH1>Laderboards</StatH1>
      {props.records.map((rec, index) => (
        <StatH1>{`${index + 1}. ${Math.floor(rec / 1000)},${rec %
          1000}s`}</StatH1>
      ))}
    </>
  );
};

export default Laderboards;
