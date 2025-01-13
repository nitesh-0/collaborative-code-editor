import React from 'react';
import Editor from './components/Editor';
import Terminal from './components/Terminal';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="file-explorer">File Explorer (To Be Implemented)</div>
      <div className="main-content">
        <Editor />
        <Terminal />
      </div>
    </div>
  );
};

export default App;
