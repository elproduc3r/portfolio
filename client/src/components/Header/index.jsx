import { useContext } from "react";
import Logo from "../Logo";
import HeaderNav from "./HeaderNav";
import { NavContext } from "../PageContainer";

const Header = () => {
  const {openNav} = useContext(NavContext);
  return (
    <header className="s-header">
      <Logo />
      <HeaderNav />
      <a
        className="header-menu-toggle"
        href="#menu"
        onClick={(event) => {openNav(event)}}
      >
        <span className="header-menu-icon"></span>
      </a>
    </header>
  );
};

export default Header;
