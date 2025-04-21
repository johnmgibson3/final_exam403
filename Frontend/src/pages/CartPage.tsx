import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.purchaseAmount,
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-warning text-center">
          Your cart is currently empty.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th className="text-center">Qty</th>
                <th className="text-end">Price</th>
                <th className="text-end">Subtotal</th>
                <th className="text-center">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item: CartItem) => (
                <tr key={item.bookId}>
                  <td>{item.title}</td>
                  <td className="text-center">{item.purchaseAmount}</td>
                  <td className="text-end">${item.price.toFixed(2)}</td>
                  <td className="text-end">
                    ${(item.purchaseAmount * item.price).toFixed(2)}
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeFromCart(item.bookId)}
                    >
                      ✖
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
        <h4 className="mb-0">
          Total: ${total.toFixed(2)}
        </h4>
        <div className="d-flex gap-2">
          <button
            className="btn btn-success"
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate('/books')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
