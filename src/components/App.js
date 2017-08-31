import React from 'react';

// Components
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      fishes: {},
      order: {}
    };

    this.addFish = this.addFish.bind(this);

  }

  addFish(fish) {
    // update state from copy of state (via spread)
    const fishes = {...this.state.fishes};
    // add new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    //setState
    this.setState({ fishes });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <Header tagline="Fresh Seafood Market" />
        { /* Fishes go here... */}
        <Order />
        <Inventory
          addFish={this.addFish} />
      </div>
    );
  }
};

export default App;
