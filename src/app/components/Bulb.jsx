import React from 'react';

const getFillFromType = type => {
  if (type === 'active') {
    return 'yellow';
  }

  if (type === 'lost') {
    return 'red';
  }

  return '';
};

const classNameFromType = type => {
  if (type === 'won') {
    return 'bulb-won';
  }

  if (type === 'lost') {
    return 'bulb-lost';
  }

  return '';
};

const Bulb = ({ type, onClick }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={getFillFromType(type)}
      className={`bulb-svg ${classNameFromType(type)}`}
    >
      <path
        stroke="gray"
        d="M15 20.5c0 .276-.224.5-.5.5h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5zm-.5-2.5h-5c-.276 0-.5.224-.5.5s.224.5.5.5h5c.276 0 .5-.224.5-.5s-.224-.5-.5-.5zm-3.799 5.659c.19.216.465.341.752.341h1.094c.287 0 .562-.125.752-.341l1.451-1.659h-5.5l1.451 1.659zm8.299-16.925c0 4.164-3.75 6.98-3.75 10.266h-6.5c0-3.286-3.75-6.103-3.75-10.266 0-4.343 3.498-6.734 6.996-6.734 3.502 0 7.004 2.394 7.004 6.734zm-7.719-3.015l-.219-1.177c-2.017.373-3.258 1.851-3.517 3.846l1.188.154c.116-.9.602-2.463 2.548-2.823z"
      />
    </svg>
  );
};

export default Bulb;
