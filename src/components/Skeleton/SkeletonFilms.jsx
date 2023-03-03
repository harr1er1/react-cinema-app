import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={570}
    height={360}
    viewBox="0 0 1000 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#B1B0B0"
    {...props}
  >
    <rect x="0" y="0" rx="3" ry="3" width="400" height="540" />
    <rect x="440" y="55" rx="3" ry="3" width="460" height="25" />
    <rect x="440" y="100" rx="3" ry="3" width="460" height="25" />
    <rect x="440" y="150" rx="3" ry="3" width="460" height="25" />
    <rect x="440" y="200" rx="3" ry="3" width="460" height="25" />
    <rect x="440" y="250" rx="3" ry="3" width="460" height="25" />
    <rect x="440" y="300" rx="3" ry="3" width="460" height="25" />
    <rect x="440" y="350" rx="3" ry="3" width="460" height="25" />
    <rect x="440" y="400" rx="3" ry="3" width="460" height="25" />
    <rect x="440" y="0" rx="3" ry="3" width="200" height="35" />
    <rect x="440" y="450" rx="10" ry="10" width="460" height="80" />
  </ContentLoader>
);

export default Skeleton;
