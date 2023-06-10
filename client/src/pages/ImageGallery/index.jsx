import React from "react";
import styled from "@emotion/styled";
import PageContainer from "../../components/PageContainer";
import ParallaxMirror from "../../components/ParallaxMirror";
import Pace from "../../components/Pace";

const Header = styled.h1`
  color: #ffffff;
`;

const ImageGalleryContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ImageContainer = styled.div`
  width: 25%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  display: block;
  margin-top: 20px;
`;

const StyledA = styled.a`
  border-width: 0px;
  color: red;
  padding: 8px 8px;
  background-color: transparent;

`;

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    const mapImages = {};
    props.links.map( link => mapImages[link] = true);
    this.state = {
      mapImages
    };

    this.clickHandler = this.clickHandler.bind(this);

  }

  clickHandler = (imgURL) => {
    const {mapImages} = this.state;
    mapImages[imgURL] = false;
    this.setState(mapImages);
  }
  
  render() {
    const {mapImages} = this.state;
    const images = Object.keys(mapImages);
    
    return (
      <div>
        {
          images.map( (imgURL, i) => (
            mapImages[imgURL] && 
            <div key={`${i}-${imgURL}`}>
              <img
                src={imgURL}
                alt="gallery item"
              />
              <button
                href="#"
                onClick={() => {this.clickHandler(imgURL)}}
                className="remove"
              >
              </button>
            </div>
          ))
        }
      </div>
    )
  };
};

const ImageGallery = () => {
  const links = [
    "https://photos.puppyspot.com/3/listing/733983/photo/501673752_medium.jpg",
    "https://photos.puppyspot.com/3/listing/733983/photo/501673749_medium.jpg"
  ];
  return (
    <PageContainer>
      <ParallaxMirror />
      <Pace />
      <section className="s-home target-section">
        <div className="shadow-overlay"></div>
        <Header>Image Gallery</Header>
        <ImageGalleryContainer>
          <Gallery
            links={links}
          />
        </ImageGalleryContainer>
      </section>
    </PageContainer>
  );
};

export default ImageGallery;

