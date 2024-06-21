import React from 'react';
import {Svg, Path, Defs} from 'react-native-svg';

const HeartIcon = (props) => {
  return (
    <Svg
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox={`0 0 ${props.size ?? 24} ${props.size ?? 24}`}
      {...props}>
      <Path
        d="M10.607 5.536L12.02 6.949 13.435 5.536C15.388 3.583 18.553 3.583 20.506 5.536C22.459 7.488 22.459 10.654 20.506 12.607L12.021 21.092L3.536 12.607C1.583 10.654 1.583 7.488 3.536 5.536C5.488 3.583 8.654 3.583 10.607 5.536Z"
        fill="#FFFFFF"
        stroke={props.color ?? 'black'}
        strokeWidth="1.5"
      />
    </Svg>
  );
};

export default HeartIcon;
