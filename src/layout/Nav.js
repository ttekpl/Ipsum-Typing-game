import React from "react";
import Styled from "styled-components";
import { NavLink } from "react-router-dom";

const Menu = Styled.nav`
background-color:#383838;
height:100vh;
width:70vw;
position:absolute;
z-index:2;
top:0;
left:0;
transition:.3s ease-out;
transform: ${props =>
  props.isActive ? "translateX(0)" : "translateX(-100% )"};

  @media(min-width:1024px){
    transform:none;
    width:100px;
  }
`;

const ItemsList = Styled.ul`
height:60%;
display:flex;
flex-direction:column;
list-style:none;
margin-top:60px;

`;

const MenuItem = Styled(NavLink)`
text-transform:uppercase;
letter-spacing:2px;
height:50px;
display:flex;
justify-content:center;
align-items:center;
transition:.2s;
color:#aaa;
text-transform:uppercase;
text-decoration:none;
border-bottom:3px solid #333;
outline:none;

@media(min-width:1024px){
   font-size:10px;
  }
`;

const Nav = props => {
  return (
    <Menu isActive={props.isActive}>
      <ItemsList>
        <li>
          <MenuItem to="/" exact>
            Game
          </MenuItem>
        </li>
        <li>
          <MenuItem to="/Rules">Rules</MenuItem>
        </li>
        <li>
          <MenuItem to="/Laderboards">LaderBoards</MenuItem>
        </li>
        <li>
          <MenuItem to="/Contact">Contact</MenuItem>
        </li>
      </ItemsList>
    </Menu>
  );
};

export default Nav;
