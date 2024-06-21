import React from 'react';
import {Svg, Path, G} from 'react-native-svg';

const ProfileIcon = (props) => {
  return (
    <Svg
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox={`0 0 ${props.size ?? 24} ${props.size ?? 24}`}
      {...props}>
      <G stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <G
          id="catalogue"
          transform="translate(-326, -760)"
          stroke="none"
          strokeWidth="1.5"
          // fillRule="evenodd"
          // opacity="0.400000006"
          // strokeDasharray="0,0"
        >
          <G id="Navbar" transform="translate(0, 745)">
            <G id="Profile" transform="translate(326, 15)">
              <Path
                d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z"
                stroke={props.color ?? 'black'}
              />
              <Path
                d="M12,12 C13.6568542,12 15,10.6568542 15,9 C15,7.34314575 13.6568542,6 12,6 C10.3431458,6 9,7.34314575 9,9 C9,10.6568542 10.3431458,12 12,12 Z"
                stroke={props.color ?? 'black'}
              />
              <Path
                d="M18.9297705,19 C17.5465329,16.6087945 14.9611573,15 12.0000277,15 C8.83690786,15 6.10255396,16.8357646 4.80426025,19.5"
                stroke={props.color ?? 'black'}
              />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default ProfileIcon;
