import { useState } from 'react';
import { Book } from '../types/Book';
import { addBook } from '../api/BookApi';

const emptyBook: Book = {
  bookId: 0,
  title: '',
  author: '',
  publisher: '',
  isbn: 0,
  pageCount: 0,
  price: 0,
  classification: '',
  category: ''
};

const AddBookCard = ({ refresh }: { refresh: () => void }) => {
  const [newBook, setNewBook] = useState<Book>({ ...emptyBook });

  const handleSubmit = async () => {
    await addBook(newBook);
    setNewBook({ ...emptyBook });
    refresh(); // reload the book list
  };

  return (
    <div className="card shadow-sm rounded-4 border-start p-3 mb-4">
      <h4>Add New Book</h4>

      <input className="form-control mb-2" placeholder="Title" value={newBook.title} onChange={e => setNewBook({ ...newBook, title: e.target.value })} />
      <input className="form-control mb-2" placeholder="Author" value={newBook.author} onChange={e => setNewBook({ ...newBook, author: e.target.value })} />
      <input className="form-control mb-2" placeholder="Publisher" value={newBook.publisher} onChange={e => setNewBook({ ...newBook, publisher: e.target.value })} />
      <input className="form-control mb-2" type="number" placeholder="ISBN" value={newBook.isbn} onChange={e => setNewBook({ ...newBook, isbn: +e.target.value })} />
      <input className="form-control mb-2" type="number" placeholder="Pages" value={newBook.pageCount} onChange={e => setNewBook({ ...newBook, pageCount: +e.target.value })} />
      <input className="form-control mb-2" type="number" placeholder="Price" value={newBook.price} onChange={e => setNewBook({ ...newBook, price: +e.target.value })} />
      <input className="form-control mb-2" placeholder="Classification" value={newBook.classification} onChange={e => setNewBook({ ...newBook, classification: e.target.value })} />
      <input className="form-control mb-3" placeholder="Category" value={newBook.category} onChange={e => setNewBook({ ...newBook, category: e.target.value })} />

      <button className="btn btn-success" onClick={handleSubmit}>Add Book</button>
    </div>
  );
};

export default AddBookCard;
