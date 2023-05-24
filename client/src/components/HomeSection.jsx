
function HomeSection() {

  const homeLinks = [
    {
      text: "About",
      description: "whoami",
    },
    {
      text: "Services",
      description: "supported services",
    },
    {
      text: "Resume",
      description: "background",
      link: "https://drive.google.com/file/d/1XAxuxv7xvtEMdLgWihQQ6XwAdVEW9qTE/view?usp=sharing",
      target: "_blank"
    },
    {
      text: "Contact",
      description: "get in touch",
    }
  ]

  return (
    <section
      id="home"
      className="s-home target-section"
      data-parallax="scroll"
      data-image-src="images/hero-bg.jpg"
      data-natural-width="3000"
      data-natural-height="2000"
      data-position-y="top"
    >
      <div className="shadow-overlay"></div>
      <div className="home-content">
        <div className="row home-content__main">
          <h1>
            Full Stack <br />
            Web Developer
          </h1>
          <p>
            NodeJS • React • JavaScript(ES6) • TypeScript<br />
            Cloud • PHP • MySQL • REST APIs<br/>
            Mobile Games/Apps • iOS • Android
          </p>
        </div>
      </div>
      <ul className="home-sidelinks">
        {
          homeLinks.map( (link, i) => {
            const href = link.link || `#${link.text.toLowerCase()}`;
            return (
              <li key={`${i}-text`}>
                <a 
                  className="smoothscroll"
                  target={link.target || null}
                  href={href}
                  rel={link.target === "_blank" ? "noreferrer" : null}
                >
                  {link.text}
                  <span>{link.description}</span>
                </a>
              </li>
            )
          })
        }
      </ul>
      <ul className="home-social">
        <li className="home-social-title">Follow Me</li>
        <li>
          <a
            href="https://www.linkedin.com/in/jermaine-jackson-622b68248/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-linkedin"></i>
            <span className="home-social-text">LinkedIn</span>
          </a>
        </li>
      </ul>
    </section>
  )
};

export default HomeSection;
