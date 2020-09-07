import React from 'react';
import allBooks from './data';

const Book = () => {
  const books = allBooks;
  const booksList = books.map((book) =>
    <div className="book">
      <div
        className="book-image"
        style={{
          width: 300,
          height: 500,
          backgroundImage: `url(${book.imageLinks.thumbnail})`
        }}

      />
      <div className="book-title">
        <h2>{book.title}</h2>
        <p>{book.subtitle}</p>
      </div>
      <div className="book-image">

      </div>
      <div className="book.authors">
        <p>{book.authors}</p>
      </div>

    </div>
  )
  return (
    <div>
      {booksList}
    </div>

  );
}

export default Book;

export const BookShelf = () => {
  return (
    <div>
      <h2>Bookshelf Title</h2>
      <div>
        <ol className="books-grid">
          <Book />
        </ol>
      </div>
    </div>
  )
}
