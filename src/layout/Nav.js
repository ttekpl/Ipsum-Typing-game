import React from "react";
import Styled from "styled-components";
import { NavLink } from "react-router-dom";

const Menu = Styled.nav`
background-color:cadetblue;
height:100%;
`;

const ItemsList = Styled.ul`
height:60%;
display:flex;
flex-direction:column;

`;

const MenuItem = Styled(NavLink)`
text-transform:uppercase;
letter-spacing:2px;
height:50px;
display:flex;
justify-content:center;
align-items:center;
transition:.2s;
&:hover{
  background-color:royalblue;
}
`;

const Nav = () => {
  return (
    <Menu>
      <ul>
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
      </ul>
    </Menu>
  );
};

export default Nav;
