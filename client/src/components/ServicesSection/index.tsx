import React from "react";
import ServiceCard from "./ServiceCard";

const ServicesSection = () => {
  const services = [
    {
      name: "Web Sites & Web Applications",
      description: "Over 20 years developing large scale web sites and web applications."
    },
    {
      name: "Software Development",
      description: "Custom software solutions tailored to meet you or your business needs."
    },
    {
      name: "Automation Tools",
      description: "Minimize redundant tasks with custom automation solutions."
    },
    {
      name: "Photoshop Automation",
      description: "Speed up production by automating Photoshop to repetitive tasks. Proven background cutting costs in large volume Photo Studios by automating costly time-consuming tasks."
    },
    {
      name: "UI/UX Design",
      description: "Elegantly designed software to meet wireframe expections giving your users a beautiful experience."
    },
    {
      name: "Mobile Games & Apps",
      description: "Successfully launched various top rated Android applications."
    },
    {
      name: "Cloud Management (AWS)",
      description: "Cloud services range from DB setup to Amazon Web Services (AWS) maintentance and enhancements."
    },
  ];
  return (
    <section id="services" className="s-services light-gray">
        <div className="row section-header aos-init" data-aos="fade-up">
          <div className="col-full">
            <h3 className="subhead">services</h3>
            <h1 className="display-1">Offering a range of custom web and software solutions.</h1>
          </div>
        </div>
        <div className="row aos-init" data-aos="fade-up">
          <div className="row services-list block-1-3 block-m-1-2 block-tab-full">
            {
              services.map( (service, i) => (
                <ServiceCard key={`${i}-${service.name}`} {...service}/>
              ))
            }
          </div>
        </div>
      </section>
  );
};

export default ServicesSection;