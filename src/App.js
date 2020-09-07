import React, { Component } from 'react';
import './App.css';
import { BookShelf } from './BookCase';


class App extends Component {
  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <h1>Bookshelf</h1>
          <p>
            <BookShelf />
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Add book
          </a>
        </header>
      </div>
    );
  }

}

export default App;
