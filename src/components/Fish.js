import React from 'react';

import { formatPrice } from '../helpers';

class Fish extends React.Component {

  render() {
    const { details, index, addToOrder } = this.props;

    if (!details) return null;

    const isAvailable = details.status === 'available';
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out';

    return (
      <li className="menu-fish">
        <img src={details.image} alt="" />
        <h3 className="fish-name">
          {details.name}
          <span>{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button onClick={() => addToOrder(index)} disabled={!isAvailable}>{buttonText}</button>
      </li>
    );

  }
};

export default Fish;
