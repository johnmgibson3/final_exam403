import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';

function PurchasePage() {
  const navigate = useNavigate();
  const { title, price, bookId } = useParams();
  const { addToCart } = useCart();
  const [purchaseAmount, setPurchaseAmount] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || 'No Book Found',
      price: Number(price),
      purchaseAmount,
    };
    addToCart(newItem);
    localStorage.setItem('lastVisitedPage', window.location.pathname);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>Purchase {title}</h2>

      <h3>Quantity to Add:</h3>
       <br />
       <br />
       <div className='bar'>

        <input
          type="number"
          placeholder="Enter quantity to purchase"
          value={purchaseAmount}
          onChange={(x) => setPurchaseAmount(Number(x.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
<br />
      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default PurchasePage;
