import React from 'react';

// Components
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

import sampleFishes from '../sample-fishes';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      fishes: {},
      order: {}
    };

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
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

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key) {
    // take copy of order state
    const order = {...this.state.order};
    // update existing or add new fish
    order[key] = order[key] + 1 || 1;
    // update state
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes)
              .map(fishKey => <Fish key={fishKey} index={fishKey} details={this.state.fishes[fishKey]} addToOrder={this.addToOrder} />)
            }
            <Fish />
          </ul>
        </div>
        <Order />
        <Inventory
          addFish={this.addFish}
          loadSamples={this.loadSamples} />
      </div>
    );
  }
};

export default App;
