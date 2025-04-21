import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import BookList from '../components/BookList';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container-fluid px-4 px-md-5">
        <CartSummary />
        <WelcomeBand />

        <div className="row mt-4">
          {/* Category Filter Column */}
          <div className="col-md-4 col-lg-3 mb-4">
            <div className="h-100 p-3 bg-white rounded shadow-sm">
              <CategoryFilter
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
            </div>
          </div>

          {/* Book List Column */}
          <div className="col-md-8 col-lg-9">
            <div className="p-3 bg-white rounded shadow-sm">
              <BookList selectedCategories={selectedCategories} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
