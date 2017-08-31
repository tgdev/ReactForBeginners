import React from 'react';

// Helpers
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  goToStore(event) {
    event.preventDefault();
    const storeId = this.storeInput.value;
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        <h2>Please enter a store</h2>
        <input type="text" placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input }} required />
        <button type="submit">Visit Store</button>
      </form>
    );
  }

};

StorePicker.contextTypes = {
  router: React.PropTypes.object
};

export default StorePicker;
