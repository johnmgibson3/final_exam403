import { useEffect, useState } from 'react';
import { Book } from '../types/Book';

import 'bootstrap/dist/css/bootstrap.min.css';

import EditableBookCard from './EditableBookCard';
import AddBookCard from './AddBookCard';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, settotalPages] = useState<number>(0);


  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `category=${encodeURIComponent(cat)}`)
        .join('&');

      const url = `https://localhost:5000/api/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`;

      console.log('SelectedCategories:', selectedCategories);
      console.log('Final URL:', url);

      const response = await fetch(
        `https://localhost:5000/api/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`,
        {
          credentials: 'include',
        }
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      settotalPages(Math.ceil(totalItems / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, sortOrder, totalItems, selectedCategories]);

  return (
    <>
      <h1>Book List</h1>
      <br />
      <AddBookCard refresh={() => window.location.reload()} />

      {books.map((b) => (
  <EditableBookCard
    key={b.bookId}
    book={b}
    refresh={() => window.location.reload()}
  />
))}


      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNum(i + 1)}
          disabled={pageNum === i + 1}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />
      <label>
        Sort by Project Name:
        <select
          onChange={(e) => {
            const value = e.target.value;
            setSortOrder(value);
            setPageNum(1); // Reset to page 1
          }}
          value={sortOrder}
        >
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </label>
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => setPageSize(Number(p.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
