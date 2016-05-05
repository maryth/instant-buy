/**
 * App entry point
 */

// Polyfill
import 'babel-polyfill';

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import BestBuySearch from './pages/search/page';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Base styling
import './common/base.css';


// ID of the DOM element to mount app on
const DOM_APP_EL_ID = 'app';


injectTapEventPlugin();

ReactDOM.render((<BestBuySearch /> ), document.getElementById(DOM_APP_EL_ID));

