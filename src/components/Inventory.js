import React from 'react';
import base from '../base';

// Components
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
  constructor() {
    super();

    this.state = {
      userId: null,
      owner: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.renderInventory = this.renderInventory.bind(this);
  }

  componentDidMount() {
    base.onAuth(user => {
      if (user) {
        this.authHandler(user);
      }
    });
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    const newFish = {
      ...fish,
      [e.target.name]: e.target.value
    };

    this.props.updateFish(key, newFish);

  }

  authenticate(authProvider) {
    let provider;

    switch (authProvider) {
      case 'github':
        provider = new base.auth.GithubAuthProvider();
        break;
      case 'google':
        provider = new base.auth.GoogleAuthProvider();
        break;
      case 'facebook':
        provider = new base.auth.FacebookAuthProvider();
        break;
      default:
    }

    console.log(`Logging in with ${authProvider}`);
    base.auth().signInWithPopup(provider)
      .then(authData => this.authHandler(authData.user))
      .catch(e => {
        console.error(e);
      });
  }

  logout() {
    base.auth().signOut().then(() => {
      this.setState({ userId: null });
    }, error => {
      console.error(error);
    });
  }

  authHandler(user) {

    // only target the specific store info (not entire db)
    const storeRef = base.database().ref(this.props.storeId);

    // query the firebase db once for the store data
    storeRef.once('value', snapshot => {
      const data = snapshot.val() | {};

      // set the owner if one does not exist
      if (!data.owner) {
        storeRef.set({
          owner: user.uid
        });
      }

      // set the user and owner in the app state
      this.setState({
        userId: user.uid,
        owner: data.owner || user.uid
      });

    });

  }

  renderLogin() {
    return(
      <nav className="login">
        <h2>Inventory</h2>
        <p>Please sign in to manage your store's inventory.</p>
        <button className="google" onClick={() => this.authenticate('google')}>Log in with Google</button>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>Log in with Facebook</button>
        <button className="github" onClick={() => this.authenticate('github')}>Log in with Github</button>
      </nav>
    );
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
    const logout = <button onClick={this.logout}>Log Out!</button>;

    if (!this.state.userId) {
      return(
        <div>
          {this.renderLogin()}
        </div>
      );
    }

    if (this.state.userId !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner of this store.</p>
          {logout}
        </div>
      );
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load sample Fishes</button>
      </div>
    );
  }
};

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  storeId: React.PropTypes.string.isRequired,
  addFish: React.PropTypes.func.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired
};

export default Inventory;
