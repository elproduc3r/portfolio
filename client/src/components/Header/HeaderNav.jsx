import { useContext } from "react";
import { NavContext } from "../PageContainer";

const HeaderNav = () => {
  const {closeNav} = useContext(NavContext);
  return (
    <nav className="header-nav">
        <a
          href="#0"
          className="header-nav__close"
          title="close"
          onClick={(event) => closeNav(event)}
        >
          <span>Close</span>
        </a>
        <div className="header-nav__content">
          <h3>FullStack Studio</h3>
          <ul className="header-nav__list">
            <li className="current">
              <a className="smoothscroll" href="#home" title="home">Home</a>
            </li>
            <li>
              <a className="smoothscroll" href="#about" title="about">About</a>
            </li>
            <li>
              <a className="smoothscroll" href="#services" title="services">Services</a>
            </li>
            <li>
              <a
                className=""
                target="_blank"
                rel="noreferrer"
                href="https://drive.google.com/file/d/1XAxuxv7xvtEMdLgWihQQ6XwAdVEW9qTE/view?usp=sharing"
                title="services"
              >
                Resume
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#contact" title="contact">Contact</a>
            </li>
          </ul>
          <p>
            Proven track record of building and maintaining high-quality web applications  
          </p>
          <ul className="header-nav__social">
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/in/jermaine-jackson-622b68248/"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
  );
};

export default HeaderNav;
