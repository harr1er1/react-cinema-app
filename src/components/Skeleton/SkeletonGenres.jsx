import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={330}
    height={280}
    viewBox="0 0 330 280"
    backgroundColor="#f3f3f3"
    foregroundColor="#B1B0B0"
    {...props}
  >
    <rect x="20" y="0" rx="10" ry="10" width="310" height="220" /> 
    <rect x="70" y="240" rx="5" ry="5" width="210" height="20" />
  </ContentLoader>
);

export default Skeleton;
