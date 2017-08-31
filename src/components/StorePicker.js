import React from 'react';

// Helpers
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // constructor() {
  //   super();
  //
  //   this.goToStore = this.goToStore.bind(this);
  // }

  goToStore(event) {
    event.preventDefault();
    console.log(this.storeInput);
    // grab text from box
    // const store = this.storeInput;
    // navigate to store page
    // window.location = `/store/${store}`;
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

export default StorePicker;
