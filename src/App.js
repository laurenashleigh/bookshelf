import React, { Component } from 'react';
import './App.css';
import { BookCase } from './BookCase';
import allBooks from './data';

class App extends Component {
  bookshelves = [
    { key: 'currentlyReading', name: 'Currently Reading' },
    { key: 'wantToRead', name: 'Want to Read' },
    { key: 'read', name: 'Have Read' },
  ]

  state = {
    books: allBooks,
  }

  componentDidMount = () => {
    console.log(this.state)
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <h1>Bookshelf</h1>
        </header>
        <BookCase bookshelves={this.bookshelves} books={this.state.books} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Add book
          </a>
      </div>
    );
  }

}

export default App;
