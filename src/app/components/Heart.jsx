import React from 'react';

const getFillFromType = type => {
  // TODO:refactor the types
  if (type === 'active') {
    return 'red';
  }

  if (type === 'lost') {
    return 'white';
  }
  return 'black';
};

const Heart = ({ type }) => (
  <svg
    enable-background="new 0 0 160 80"
    width="48"
    height="36"
    viewBox="0 0 160 80"
    fill={getFillFromType(type)}
    className="heart-svg"
  >
    <path d="M53 6h7v7h-7zM60 6h8v7h-8zM68 6h6v7h-6zM45 13h8v8h-8zM53 13h7v8h-7zM68 13h6v8h-6zM74 13h9v8h-9zM83 13h7v8h-7zM90 13h8v8h-8zM98 13h7v8h-7zM105 13h8v8h-8zM45 21h8v7h-8zM60 21h8v7h-8zM68 21h6v7h-6zM74 21h9v7h-9zM83 21h7v7h-7zM90 21h8v7h-8zM98 21h7v7h-7zM105 21h8v7h-8zM45 28h8v9h-8zM53 28h7v9h-7zM60 28h8v9h-8zM68 28h6v9h-6zM74 28h9v9h-9zM83 28h7v9h-7zM90 28h8v9h-8zM98 28h7v9h-7zM105 28h8v9h-8zM53 37h7v6h-7zM60 37h8v6h-8zM68 37h6v6h-6zM74 37h9v6h-9zM83 37h7v6h-7zM90 37h8v6h-8zM98 37h7v6h-7zM60 43h8v8h-8zM68 43h6v8h-6zM74 43h9v8h-9zM83 43h7v8h-7zM68 51h6v7h-6zM74 51h9v7h-9zM74 58h9v8h-9zM83 51h7v7h-7zM90 43h8v8h-8zM83 6h7v7h-7zM90 6h8v7h-8zM98 6h7v7h-7z" />
  </svg>
);

export default Heart;
