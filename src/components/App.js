import React from 'react';

// Components
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header />
          { /* Fishes go here... */}
          <Order />
          <Inventory />
        </div>
      </div>
    );
  }
};

export default App;
