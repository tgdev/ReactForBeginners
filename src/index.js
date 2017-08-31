// App Libs
import React from 'react';
import { render } from 'react-dom';

// App Styles
import './css/style.css';

// App Components
import StorePicker from './components/StorePicker';

// Hook it up to index.html
render(<StorePicker />, document.querySelector('#main'));
