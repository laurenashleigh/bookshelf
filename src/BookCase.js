import React from 'react';


const Book = (props) => {
  const book = props;
  return (
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
      <div className="book.authors">
        <p>{book.authors}</p>
      </div>
    </div>
  );
}


export const BookShelf = (props) => {
  const { shelf, books } = props;
  const booksOnThisShelf = Object.values(books).filter(book => book.shelf === shelf.key);
  return (
    <div>
      <h2>{shelf.name}</h2>
      <div>
        <ol>
          {booksOnThisShelf.map(book => (
            <Book key={book.id} book={book} />
          ))}
        </ol>
      </div>
    </div>
  )
};

export const BookCase = (props) => {
  const { bookshelves, books } = props;
  return (
    <div className="list-books-content">
      <h2>My Reads</h2>
      <div>
        {bookshelves.map(shelf => (
          <BookShelf key={shelf.key} shelf={shelf} books={books} />
        ))}
      </div>
    </div>
  )
}
