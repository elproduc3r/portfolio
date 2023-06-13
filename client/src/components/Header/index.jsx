import { useContext, useEffect, useState } from "react";
import classnames from "classnames";
import Logo from "../Logo";
import HeaderNav from "./HeaderNav";
import { NavContext } from "../PageContainer";
import { ModeContext } from "../ModeContext";

const Header = () => {
  const {mode} = useContext(ModeContext);
  const {openNav} = useContext(NavContext);
  const [opaqueClass, setOpaqueClass] = useState("");

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 150) {
        setOpaqueClass("opaque")
      } else {
        setOpaqueClass("");
      }
    });
  }, []);

  return (
    <header className="s-header">
      <Logo />
      <HeaderNav />
      <a
        className={classnames('header-menu-toggle', opaqueClass, mode)} 
        href="#menu"
        onClick={(event) => {openNav(event)}}
      >
        <span className={classnames('header-menu-icon')}></span>
      </a>
    </header>
  );
};

export default Header;
