import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { BookCase } from './BookCase';

class App extends Component {
  bookshelves = [
    { key: 'currentlyReading', name: 'Currently Reading' },
    { key: 'wantToRead', name: 'Want to Read' },
    { key: 'read', name: 'Have Read' },
  ];

  state = {
    books: [],
  };

  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    })
  };

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf);

    let updatedBooks = [];
    updatedBooks = this.state.books.filter(b => b.id !== book.id);

    if (shelf !== 'none') {
      book.shelf = shelf;
      updatedBooks = updatedBooks.concat(book);
    }

    this.setState({
      myBooks: updatedBooks,
    });
  };

  render() {
    const { books } = this.state;
    return (
      <div className="App" >
        <Route exact path="/" render={() => (
          <div>
            <header className="App-header">
              <h1>Bookshelf</h1>
            </header>
            <BookCase bookshelves={this.bookshelves} books={books} onMove={this.moveBook} />
            <div className="open-search">
              <Link to="search">
                <button>Search for a book</button>
              </Link>
            </div>
          </div>
        )}
        />
        <Route path="/search" render={() => (
          <div></div>
        )}
        />
      </div>
    );
  }

}

export default App;
