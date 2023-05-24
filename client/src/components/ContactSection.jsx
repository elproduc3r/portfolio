import { useEffect } from "react";

const ContactSection = () => {

  useEffect(() => {
    window?.AOS.init( {
      offset: 200,
      duration: 200,
      easing: 'ease-in-sine',
      delay: 50,
      once: true,
      disable: 'mobile'
    });
  }, []);

  return (
    <section id="contact" className="s-contact">
        <div className="row section-header aos-init" data-aos="fade-up">
          <div className="col-full">
            <h3 className="subhead subhead--light">Contact Us</h3>
            <h1 className="display-1 display-1--light">Get in touch and let's make something great together. Let's turn your
              idea on an even greater product.</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-full contact-main aos-init" data-aos="fade-up">
            <p>
              <a href="mailto:jackson.jermaine2023@gmail.com&subject=Web Inquiry" className="contact-email">Email me</a>
              
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-five tab-full contact-secondary aos-init" data-aos="fade-up">
            <h3 className="subhead subhead--light">Where To Find Us</h3>
            <p className="contact-address">
              Los Angeles/Hybrid/Remote<br />
              CA<br />
              US
            </p>
          </div>
          <div className="col-five tab-full contact-secondary aos-init" data-aos="fade-up">
            <div className="contact-subscribe">
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-full cl-copyright">
            <span>
              Copyright &copy;<script>
                document.write(new Date().getFullYear());
              </script>&nbsp;| All rights reserved | This site was developed with NodeJS, Express, React, GraphQL & MongoDB
            </span>
          </div>
        </div>
        <div className="cl-go-top" style={{"display": "none"}}>
          <a className="smoothscroll" title="Back to Top" href="#top">
            <i className="icon-arrow-up" aria-hidden="true"></i>
          </a>
        </div>
      </section>
  );
};

export default ContactSection;