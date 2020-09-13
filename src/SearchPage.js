
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './BookCase';

class SearchPage extends Component {
  render() {
    const { books, onSearch, onResetSearch, onMove, searchBooks } = this.props;
    const updatedBooks = searchBooks.map(book => {
      books.map(b => {
        if (b.id === book.id) {
          book.shelf = b.shelf;
        }
        return b;
      });
      return book;
    });
    return (
      <div>
        <div>
          <Link to="/">
            <button onClick={onResetSearch} className="close-search">Close</button>
          </Link>
        </div>
        <SearchBooksInput onSearch={onSearch} />
        <div>
          <ol className="books-grid">
            {updatedBooks.map(book => (
              <Book key={book.id} book={book} shelf={book.shelf ? book.shelf : 'none'} onMove={onMove} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
};

class SearchBooksInput extends Component {
  state = {
    value: '',
  };
  handleChange = event => {
    const val = event.target.value;
    this.setState({ value: val }, () => {
      this.props.onSearch(val);
    });
  };
  render() {
    return (
      <div className="list-books-title">
        <input type="text" placeholder="Search by title or author" value={this.state.value} onChange={this.handleChange} className="input" />
      </div>
    )
  }
}

export default SearchPage;