import React from "react";
import Styled from "styled-components";

const WrapHeader = Styled.header`
position:absolute;
top:0;
left:0;
height:60px;
width:100%;
background-color:#333333;

@media(min-width:1024px){
    z-index:1000;
  }

`;

const WrapHamburger = Styled.div`
position:absolute;
left:0;
top:0;
height:60px;
width:60px;
z-index:999;
@media(min-width:1024px){
    left:unset;
    right:0;
top:60px;
}
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
const Header = props => {
  return (
    <WrapHeader>
      {props.isHamVisible ? (
        <WrapHamburger onClick={props.onClick}>
          <HamburgerMenu isActive={props.isActive} />
        </WrapHamburger>
      ) : null}
    </WrapHeader>
  );
};

export default Header;
