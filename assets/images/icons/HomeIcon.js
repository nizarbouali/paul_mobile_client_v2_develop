import React from 'react';
import {Svg, Path, G} from 'react-native-svg';

const HomeIcon = (props) => {
  return (
    <Svg
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox={`0 0 ${props.size ?? 24} ${props.size ?? 24}`}
      {...props}>
      <Path
        d="M13.664 3.109l6 4c.834.556 1.335 1.493 1.335 2.496v8.395c0 1.657-1.343 3-3 3H6c-1.657 0-3-1.343-3-3v-8.395c0-.999.502-1.939 1.336-2.496l6-4c1.007-.672 2.32-.672 3.328 0z"
        stroke={props.color}
        strokeWidth="1.5"
        fill="none"
      />
      <Path
        d="M9 15c1.105 0 2 .895 2 2v4h-6v-4c0-1.105.895-2 2-2z"
        stroke={props.color}
        strokeWidth="1.5"
        fill="none"
      />
    </Svg>
  );
};

export default HomeIcon;
