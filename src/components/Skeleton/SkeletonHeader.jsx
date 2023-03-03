import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={100}
    height={20}
    viewBox="0 0 100 20"
    backgroundColor="#f3f3f3"
    foregroundColor="#B1B0B0"
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="5" width="100" height="20" />
    
  </ContentLoader>
);

export default Skeleton;
