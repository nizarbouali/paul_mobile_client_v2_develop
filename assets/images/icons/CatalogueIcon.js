import React from 'react';
import {Svg, Path, G} from 'react-native-svg';

const CatalogueIcon = (props) => {
  return (
    <Svg
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox={`0 0 ${props.size ?? 24} ${props.size ?? 24}`}
      {...props}>
      <Path
        fill={props.color}
        d="M5,2 L8,2 C9.657,2 11,3.343 11,5 L11,8 C11,9.657 9.657,11 8,11 L5,11 C3.343,11 2,9.657 2,8 L2,5 C2,3.343 3.343,2 5,2 Z"
      />
      <Path
        fill={props.color}
        d="M16,13 L19,13 C20.657,13 22,14.343 22,16 L22,19 C22,20.657 20.657,22 19,22 L16,22 C14.343,22 13,20.657 13,19 L13,16 C13,14.343 14.343,13 16,13 Z"
      />
      <Path
        fill={props.color}
        d="M17.5,2 C19.985,2 22,4.015 22,6.5 C22,8.985 19.985,11 17.5,11 C15.015,11 13,8.985 13,6.5 C13,4.015 15.015,2 17.5,2 Z"
      />
      <Path
        fill={props.color}
        d="M6.5,13 C8.985,13 11,15.015 11,17.5 C11,19.985 8.985,22 6.5,22 C4.015,22 2,19.985 2,17.5 C2,15.015 4.015,13 6.5,13 Z"
      />
    </Svg>
  );
};

export default CatalogueIcon;
