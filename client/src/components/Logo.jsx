
const Logo = (props) => {
  const {mode = "dark"} = props;
  const logoSrc = mode === "dark" ? "images/logo2.png" : "images/logo2-light.png";
  return (
    <div className="header-logo">
      <a className="site-logo" href="/">
        <img src={logoSrc} alt="Homepage" />
      </a>
    </div>
  );
};

export default Logo;
