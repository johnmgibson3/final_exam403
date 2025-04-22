// src/pages/HomePage.tsx
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
  <div className="bg-light min-vh-100 py-5">
    <div className="container text-center">
      <h1 className="mb-3">Welcome to the Entertainment Agency</h1>
      <p className="lead mb-4">Discover and book top entertainers for your events.</p>
      <Link to="/entertainers" className="btn btn-primary btn-lg">
        View Entertainers
      </Link>
    </div>
  </div>
);
export default Home;