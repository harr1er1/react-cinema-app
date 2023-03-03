import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={410}
    height={110}
    viewBox="0 0 410 110"
    backgroundColor="#f3f3f3"
    foregroundColor="#B1B0B0"
    {...props}
  >
    <rect x="10" y="10" rx="10" ry="10" width="400" height="100" />
  </ContentLoader>
);

export default Skeleton;
