import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const FileManagerLogo = ({
  width = 100,
  height = 100,
  fill = '#fff',
  stroke = '#0ff',
  strokeWidth = '.125',
  ...props
}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fill={fill}>
      <Path d="M196.267 341.333c-4.719 0-8.533 3.823-8.533 8.533s3.814 8.533 8.533 8.533H230.4c4.719 0 8.533-3.823 8.533-8.533s-3.814-8.533-8.533-8.533h-34.133zm51.2-153.6h-51.2c-4.719 0-8.533 3.823-8.533 8.533s3.814 8.533 8.533 8.533h51.2c4.719 0 8.533-3.823 8.533-8.533s-3.814-8.533-8.533-8.533zM264.533 256H281.6c4.719 0 8.533-3.823 8.533-8.533s-3.814-8.533-8.533-8.533h-17.067c-4.719 0-8.533 3.823-8.533 8.533s3.814 8.533 8.533 8.533z" />
      <Path d="M384 494.933H76.8c-14.114 0-25.6-11.486-25.6-25.6V93.867c0-4.71-3.814-8.533-8.533-8.533s-8.533 3.823-8.533 8.533v375.467C34.133 492.86 53.274 512 76.8 512H384c4.719 0 8.533-3.823 8.533-8.533s-3.814-8.534-8.533-8.534z" />
      <Path d="M469.333 102.4h-68.267c-14.114 0-25.6-11.486-25.6-25.6V51.2c0-4.71-3.814-8.533-8.533-8.533S358.4 46.49 358.4 51.2v25.6c0 23.526 19.14 42.667 42.667 42.667H460.8v281.6c0 14.114-11.486 25.6-25.6 25.6H145.067c-14.114 0-25.6-11.486-25.6-25.6v-358.4c0-14.114 11.486-25.6 25.6-25.6h218.334l65.766 65.766a8.523 8.523 0 0 0 12.066 0 8.525 8.525 0 0 0 0-12.066L372.966 2.5a8.497 8.497 0 0 0-6.033-2.5H145.067C121.54 0 102.4 19.14 102.4 42.667v358.4c0 23.526 19.14 42.667 42.667 42.667H435.2c23.526 0 42.667-19.14 42.667-42.667V110.933a8.531 8.531 0 0 0-8.534-8.533z" />
      <Path d="M418.133 460.8h-307.2c-14.114 0-25.6-11.486-25.6-25.6V59.733c0-4.71-3.814-8.533-8.533-8.533s-8.533 3.823-8.533 8.533V435.2c0 23.526 19.14 42.667 42.667 42.667h307.2c4.719 0 8.533-3.823 8.533-8.533s-3.815-8.534-8.534-8.534z" />
      <Path d="M307.2 298.667a8.53 8.53 0 0 0-8.533-8.533h-102.4c-4.719 0-8.533 3.823-8.533 8.533s3.814 8.533 8.533 8.533h102.4a8.53 8.53 0 0 0 8.533-8.533zM196.267 256H230.4c4.719 0 8.533-3.823 8.533-8.533s-3.814-8.533-8.533-8.533h-34.133c-4.719 0-8.533 3.823-8.533 8.533s3.814 8.533 8.533 8.533zm102.4-136.533h-102.4c-4.719 0-8.533 3.823-8.533 8.533s3.814 8.533 8.533 8.533h102.4c4.719 0 8.533-3.823 8.533-8.533s-3.814-8.533-8.533-8.533zM384 238.933h-68.267c-4.719 0-8.533 3.823-8.533 8.533s3.814 8.533 8.533 8.533H384c4.719 0 8.533-3.823 8.533-8.533s-3.814-8.533-8.533-8.533zm-17.067-51.2H281.6c-4.719 0-8.533 3.823-8.533 8.533s3.814 8.533 8.533 8.533h85.333c4.719 0 8.533-3.823 8.533-8.533s-3.814-8.533-8.533-8.533zM264.533 358.4H384c4.719 0 8.533-3.823 8.533-8.533s-3.814-8.533-8.533-8.533H264.533c-4.719 0-8.533 3.823-8.533 8.533s3.814 8.533 8.533 8.533zm102.4-51.2c4.719 0 8.533-3.823 8.533-8.533s-3.814-8.533-8.533-8.533H332.8c-4.719 0-8.533 3.823-8.533 8.533s3.814 8.533 8.533 8.533h34.133z" />
    </G>
  </Svg>
);

export default FileManagerLogo;
