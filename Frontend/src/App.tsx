// src/App.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/HomePage';
import EntertainersPage from './pages/EntertainerPage';
import EntertainerDetails from './pages/EntertainerDetails';
// … other imports

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entertainers" element={<EntertainersPage />} />
        <Route path="/entertainers/:id" element={<EntertainerDetails />} />
        {/* … your other routes */}
      </Routes>
    </Router>
  );
}

export default App;