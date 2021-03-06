import React, { Component } from 'react';


export const Book = ({ book, shelf, onMove }) => {
  return (
    <div className="book">
      <div
        className="book-image"
        style={{
          width: 140,
          height: 200,
          backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : 'icons/book-placeholder.svg'})`,
        }}
      />
      <div className="book-title">
        <h2>{book.title}</h2>
        <p>{book.subtitle}</p>
      </div>
      <div className="book.authors">
        <p>{book.authors ? book.authors.join(', ') : 'Unknown Author'}</p>
      </div>
      <BookshelfChanger onMove={onMove} book={book} shelf={shelf} />
    </div>
  );
}

class BookshelfChanger extends Component {
  state = {
    value: this.props.shelf,
  };
  handleChange = event => {
    this.setState({ value: event.target.value });
    this.props.onMove(this.props.book, event.target.value);
  }
  render() {
    return (
      <div>
        <select value={this.state.value} onChange={this.handleChange} className="select-bookshelf">
          <option value="move">
            Move book to...
          </option>
          <option value="currentlyReading">Currently reading</option>
          <option value="wantToRead">Want to read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}


export const BookShelf = ({ shelf, books, onMove }) => {
  const booksOnThisShelf = Object.values(books).filter(book => book.shelf === shelf.key);
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {booksOnThisShelf.map(book => (
            <Book key={book.id} book={book} onMove={onMove} shelf={shelf.key} />
          ))}
        </ol>
      </div>
    </div>
  )
};

export const BookCase = (props) => {
  const { bookshelves, books, onMove } = props;
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h2>My Reads</h2>
      </div>
      <div className="list-books-content">
        {bookshelves.map(shelf => (
          <BookShelf key={shelf.key} shelf={shelf} books={books} onMove={onMove} />
        ))}
      </div>
    </div>
  )
}

export default Book;