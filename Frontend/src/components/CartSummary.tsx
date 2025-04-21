import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.purchaseAmount * item.price,
    0
  );

  const handleClick = () => {
    navigate('/cart');
  };

  return (
    <div
      title="Click to view cart"
      onClick={handleClick}
      style={{
        position: 'fixed',
        top: '10px',
        right: '20px',
        backgroundColor: '#f8f9fa',
        padding: '10px 15px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        fontSize: '16px',
        zIndex: 1000,
      }}
    >
      🛒 <strong style={{ marginLeft: '6px' }}>${totalAmount.toFixed(2)}</strong>
    </div>
  );
};

export default CartSummary;
