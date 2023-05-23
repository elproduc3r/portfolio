const ParallaxMirror = () => {
  const parallaxMirrorStyles = {
    "visibility": "visible",
    "zIndex": "-100",
    "position": "fixed",
    "top": "0px",
    "left": "0px",
    "overflow": "hidden",
    "transform": "translate3d(0px, 0px, 0px)",
    "height": "786px",
    "width": "1280px"
  };

  const parallaxMirrorImgStyles = {
    "transform": "translate3d(0px, 0px, 0px)",
    "position": "absolute",
    "top": "0px",
    "left": "0px",
    "height": "853px",
    "width": "1280x",
    "maxWidth": "none",
  }

  return (
    <div
      className="parallax-mirror"
      style={parallaxMirrorStyles}
    >
      <img
        className="parallax-slider"
        src="images/hero-bg.jpg"
        style={parallaxMirrorImgStyles}
        alt=""
      />
    </div>
  )
};

export default ParallaxMirror;