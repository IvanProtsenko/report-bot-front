import React, { Component } from 'react';
import { Routes, Switch } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Login from './views/Login';
import Main from './views/Main';
import Settings from './views/Settings';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/settings" element={<Settings />} />
          <Route path="/main" element={<Main />} />
          <Route path="/" element={<Login />} />
          {/* <Route path="/main" element={<Main />} />
          <Route path="/settings" element={<Settings />} /> */}
        </Routes>
      </div>
    );
  }
}
