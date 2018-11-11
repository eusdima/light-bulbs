import React from "react";
import PropTypes from "prop-types";

import ActiveBulb from "../assets/active-bulb.svg";
import InactiveBulb from "../assets/inactive-bulb.svg";

const Bulb = ({ active, onClick }) => (
  <img
    className="lightBulb"
    src={active ? ActiveBulb : InactiveBulb}
    alt="Light Bulb"
    onClick={onClick}
  />
);

Bulb.proptypes = {
  active: PropTypes.bool.isRequired
};

export default Bulb;
