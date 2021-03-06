import React from 'react';
import base from '../base';

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
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);

    this.loadSamples = this.loadSamples.bind(this);

    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
  }

  componentWillMount() {
    // update state with firebase db
    this.ref = base.syncState(
      `${this.props.params.storeId}/fishes`,
      {
        context: this,
        state: 'fishes'
      }
    );

    // check for order data in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
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

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
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

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
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
          </ul>
        </div>

        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder} />

        <Inventory
          fishes={this.state.fishes}
          storeId={this.props.params.storeId}
          addFish={this.addFish}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          loadSamples={this.loadSamples} />
      </div>
    );
  }
};

App.propTypes = {
  params: React.PropTypes.object.isRequired
};

export default App;
