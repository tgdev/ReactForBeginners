import React from 'react';

// Components
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    const newFish = {
      ...fish,
      [e.target.name]: e.target.value
    };

    this.props.updateFish(key, newFish);

  }

  renderInventory(key) {
    const fish = this.props.fishes[key];

    return (
      <div className="fish-edit" key={key}>

        <input type="text" name="name" placeholder="Fish Name" value={fish.name} onChange={e => this.handleChange(e, key)} />
        <input type="text" name="price" placeholder="Fish Price" value={fish.price} onChange={e => this.handleChange(e, key)} />

        <select name="status" value={fish.status} onChange={e => this.handleChange(e, key)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea name="desc" placeholder="Fish Description" value={fish.desc} onChange={e => this.handleChange(e, key)} />
        <input type="text" name="image" placeholder="Fish Image" value={fish.image} onChange={e => this.handleChange(e, key)} />

        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>

      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load sample Fishes</button>
      </div>
    );
  }
};

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  addFish: React.PropTypes.func.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired
};

export default Inventory;
