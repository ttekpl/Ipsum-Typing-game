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

const Contact = () => {
  return (
    <>
      <StatH1>Contact</StatH1>
      <StatH1 as="a" href="https://github.com/ttekpl">
        Github
      </StatH1>
    </>
  );
};

export default Contact;
