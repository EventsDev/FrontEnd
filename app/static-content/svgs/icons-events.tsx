import React from "react";
import { SvgXml,  } from "react-native-svg";
import { svgMarkups } from "./svg-markups";

const iconsSvgs = {
  beer: () => {
    return <SvgXml xml={ svgMarkups.beerSvg } width="100%" height="100%" />;
  }
}

export default iconsSvgs;
