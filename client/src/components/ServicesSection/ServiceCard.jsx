
const ServiceCard = (props) => {
  const {name, description} = props;
  return (
    <div className="col-block service-item aos-init" data-aos="fade-up">
      <div className="service-icon service-icon--brand-identity">
        <i className="icon-earth"></i>
      </div>
      <div className="service-text">
        <h3 className="h4">{name}</h3>
        <p>
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;