import React from 'react';
import Svg, {Path} from 'react-native-svg';

const UploadIcon = ({
  width = 100,
  height = 100,
  fill = '#0ff',
  stroke = '#0ff',
  strokeWidth = '.125',
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 211.293 211.293"
    {...props}>
    <Path
      fill={fill}
      d="M176.777 54.027H133.43a7.5 7.5 0 0 0 0 15h35.847v127.266H42.016V69.027H77.86a7.5 7.5 0 0 0 7.5-7.5 7.5 7.5 0 0 0-7.5-7.5H34.516a7.5 7.5 0 0 0-7.5 7.5v142.266a7.5 7.5 0 0 0 7.5 7.5h142.261a7.5 7.5 0 0 0 7.5-7.5V61.527a7.5 7.5 0 0 0-7.5-7.5z"
    />
    <Path
      fill={fill}
      d="m82.058 41.693 16.087-16.087V135.66a7.5 7.5 0 0 0 7.5 7.5c4.143 0 7.5-3.357 7.5-7.5V25.607l16.086 16.086a7.474 7.474 0 0 0 5.303 2.197 7.5 7.5 0 0 0 5.303-12.803l-28.889-28.89a7.497 7.497 0 0 0-10.606-.001l-28.891 28.89a7.5 7.5 0 0 0 10.607 10.607z"
    />
  </Svg>
);

export default UploadIcon;
