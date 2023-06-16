import React from "react";
import styled from "@emotion/styled";

const StyledParallaxMirror = styled.div`
  visibility: visible;
  "z-index": "100;
  position: fixed;
  top: 0px;
  left: 0px;
  overflow: hidden;
  transform: "translate3d(0px 0px 0p);
  height: 786px;
  width: 1280px;
`;

const StyledImg = styled.img`
  transform: translate3d(0px; 0px, 0p);
  position: absolute;
  top: 0px;
  left: 0px;
  height: 853px;
  width: 1280x;
  maxWidth: none;
`;

const ParallaxMirror = (): JSX.Element => (
  <StyledParallaxMirror
    className="parallax-mirror"
  >
    <StyledImg
      className="parallax-slider"
      src="images/hero-bg.jpg"
      alt=""
    />
  </StyledParallaxMirror>
);

export default ParallaxMirror;
