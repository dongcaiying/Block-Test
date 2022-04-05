import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'app.css';
import Block from 'pages/block';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/:id" element={<Block />} />
      </Routes>
    </div>
  );
}

const WrappedApp = App;

export default () => {
  return (
    <Router>
      <WrappedApp />
    </Router>
  );
};
