import { useState } from 'react';
import { Book } from '../types/Book';
import { updateBook, deleteBook } from '../api/BookApi';

const EditableBookCard = ({ book, refresh }: { book: Book; refresh: () => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState<Book>({ ...book });

  return (
    <div className="card shadow-sm rounded-4 border-start p-3 my-2">
      {isEditing ? (
        <>
          <input value={editedBook.title} onChange={(e) => setEditedBook({ ...editedBook, title: e.target.value })} />
          <input value={editedBook.author} onChange={(e) => setEditedBook({ ...editedBook, author: e.target.value })} />
          <input value={editedBook.publisher} onChange={(e) => setEditedBook({ ...editedBook, publisher: e.target.value })} />
          <input value={editedBook.isbn} type='number' onChange={(e) => setEditedBook({ ...editedBook, isbn: +e.target.value })} />
          <input value={editedBook.pageCount} type="number" onChange={(e) => setEditedBook({ ...editedBook, pageCount: +e.target.value })} />
          <input value={editedBook.price} type="number" onChange={(e) => setEditedBook({ ...editedBook, price: +e.target.value })} />
          <input value={editedBook.classification} onChange={(e) => setEditedBook({ ...editedBook, classification: e.target.value })} />
          <input value={editedBook.category} onChange={(e) => setEditedBook({ ...editedBook, category: e.target.value })} />

          <button className="btn btn-primary" onClick={async () => {
            await updateBook(editedBook.bookId, editedBook);
            setIsEditing(false);
            refresh(); // reload book list
          }}>Save</button>
          <button className="btn btn-secondary ms-2" onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{book.title}</h3>
          <ul className="list-unstyled">
            <li><strong>Author:</strong> {book.author}</li>
            <li><strong>Publisher:</strong> {book.publisher}</li>
            <li><strong>ISBN:</strong> {book.isbn}</li>
            <li><strong>Classification:</strong> {book.classification}</li>
            <li><strong>Category:</strong> {book.category}</li>
            <li><strong>Pages:</strong> {book.pageCount}</li>
            <li><strong>Price:</strong> ${book.price}</li>
          </ul>
          <button
    className="btn btn-success me-2"
    onClick={() =>
      window.location.href = `/purchase/${book.title}/${book.price}/${book.bookId}`
    }
  >
    Purchase
  </button>
          <button className="btn btn-warning me-2" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="btn btn-danger" onClick={async () => {
            await deleteBook(book.bookId);
            refresh(); // reload book list
          }}>Delete</button>
        </>
      )}
    </div>
  );
};

export default EditableBookCard;
