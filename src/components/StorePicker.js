import React from 'react';

class StorePicker extends React.Component {
  render() {
    return (
      <form className="store-selector">
        <h2>Please enter a store</h2>
        <input type="text" placeholder="Store Name" required />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
};

export default StorePicker;
