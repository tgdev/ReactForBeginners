import React from 'react';

// Helpers
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  render() {
    return (
      <form className="store-selector">
        <h2>Please enter a store</h2>
        <input type="text" placeholder="Store Name" defaultValue={getFunName()} required />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
};

export default StorePicker;
