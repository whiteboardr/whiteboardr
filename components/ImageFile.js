import React from 'react';

const ImageFile = ({ url, className, ...props }) => (
  <img {...props} className={`wi ${className || ''}`} src={url} />
);

export default ImageFile;
