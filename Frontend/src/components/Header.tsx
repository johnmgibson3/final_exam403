// src/components/Header.tsx
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">Entertainment Agency</Link>
      <div className="navbar-nav">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/entertainers">Entertainers</Link>
      </div>
    </div>
  </nav>
);

export default Header;
