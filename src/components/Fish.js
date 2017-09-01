import React from 'react';

import { formatPrice } from '../helpers';

class Fish extends React.Component {
  render() {
    const { details } = this.props;

    if (!details) return null;

    return (
      <li className="menu-fish">
        <img src={details.image} alt="" />
        <h3 className="fish-name">
          {details.name}
          <span>{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button>Add To Order</button>
      </li>
    );

  }
};

export default Fish;
