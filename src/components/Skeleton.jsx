import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
    <ContentLoader 
    speed={2}
    width={660}
    height={360}
    viewBox="0 0 1000 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#B1B0B0"
    {...props}
  >
    <rect x="0" y="0" rx="3" ry="3" width="250" height="360" /> 
    <rect x="270" y="30" rx="3" ry="3" width="60" height="13" /> 
    <rect x="269" y="57" rx="3" ry="3" width="75" height="13" /> 
    <rect x="270" y="84" rx="3" ry="3" width="118" height="13" /> 
    <rect x="270" y="111" rx="3" ry="3" width="118" height="13" /> 
    <rect x="270" y="138" rx="3" ry="3" width="118" height="13" /> 
    <rect x="270" y="0" rx="3" ry="3" width="120" height="20" /> 
    <rect x="270" y="192" rx="3" ry="3" width="340" height="84" /> 
    <rect x="420" y="30" rx="3" ry="3" width="120" height="13" /> 
    <rect x="420" y="57" rx="3" ry="3" width="120" height="13" /> 
    <rect x="420" y="84" rx="3" ry="3" width="120" height="13" /> 
    <rect x="420" y="111" rx="3" ry="3" width="120" height="13" /> 
    <rect x="420" y="138" rx="3" ry="3" width="120" height="13" />
  </ContentLoader>
)

export default Skeleton;