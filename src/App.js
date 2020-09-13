import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { BookCase } from './BookCase';
import SearchPage from './SearchPage';

const bookshelves = [
  { key: 'currentlyReading', name: 'Currently Reading' },
  { key: 'wantToRead', name: 'Want to Read' },
  { key: 'read', name: 'Have Read' },
];
class App extends Component {

  state = {
    books: [],
    searchBooks: [],
    error: false,
  };

  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    })
      .catch(err => {
        console.log(err);
        this.setState({ error: true });
      })
  };

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).catch(err => {
      console.log(err);
      this.setState({ error: true });
    });

    if (shelf !== 'none') {
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id)
      }));
    } else {
      book.shelf = shelf;
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id).concat(book)
      }));
    }
  };

  searchForBooks = query => {
    if (query.length > 0) {
      BooksAPI.search(query).then(books => {
        if (books.error) {
          this.setState({ searchBooks: [] });
        } else {
          this.setState({ searchBooks: books });
        }
      });
    } else {
      this.setState({ searchBooks: [] });
    }
  };
  resetSearch = () => {
    this.setState({ searchBooks: [] });
  }

  refreshPage = () => {
    window.location.reload();
  }

  render() {
    const { books, searchBooks, error } = this.state;
    if (error) {
      return <div>An error has occurred, please try again later.</div>
    }
    return (
      <div className="App" >
        <div>
          <header className="App-header">
            <h1>Bookshelf</h1>
          </header>
        </div>
        <Route exact path="/" render={() => (
          <div>
            <div>
              <Link to="search">
                <button className="open-search">Search for a book</button>
              </Link>
            </div>
            <BookCase bookshelves={bookshelves} books={books} onMove={this.moveBook} />
          </div>
        )}
        />
        <Route path="/search" render={() => (
          <SearchPage books={books} searchBooks={searchBooks} onSearch={this.searchForBooks} onMove={this.moveBook} onResetSearch={this.resetSearch} />
        )}
        />
      </div>
    );
  }

}

export default App;
