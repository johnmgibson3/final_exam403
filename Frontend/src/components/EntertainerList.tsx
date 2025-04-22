import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

interface Entertainer {
  entertainerId: number;
  entStageName: string;
  bookingsCount: number;
  lastBookingDate: string | null;
}

const EntertainersList: React.FC = () => {
  const [entertainers, setEntertainers] = useState<Entertainer[]>([]);
  const [sortField, setSortField] = useState<'bookings' | 'date'>('bookings');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  // for inline add form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const res = await fetch('https://localhost:5000/api/entertainers', { credentials: 'include' });
    setEntertainers(await res.json());
  };

  const handleAddSave = async () => {
    if (!newName.trim()) return;
    await fetch('https://localhost:5000/api/entertainers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ entStageName: newName.trim() }),
    });
    setNewName('');
    setShowAddForm(false);
    fetchList();
  };

  const sorted = useMemo(() => {
    return [...entertainers].sort((a, b) => {
      const aVal = sortField === 'bookings'
        ? a.bookingsCount
        : a.lastBookingDate ? new Date(a.lastBookingDate).getTime() : 0;
      const bVal = sortField === 'bookings'
        ? b.bookingsCount
        : b.lastBookingDate ? new Date(b.lastBookingDate).getTime() : 0;
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [entertainers, sortField, sortDir]);

  return (
    <div className="container py-4" style={{ maxWidth: '900px' }}>


      {/* Sort controls */}
      <div className="d-flex justify-content-end mb-3 gap-2">
        <select
          className="form-select form-select-sm w-auto"
          value={sortField}
          onChange={e => setSortField(e.target.value as any)}
        >
          <option value="bookings">Sort by bookings</option>
          <option value="date">Sort by last booked</option>
        </select>
        <select
          className="form-select form-select-sm w-auto"
          value={sortDir}
          onChange={e => setSortDir(e.target.value as any)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {/* Inline Add Form */}
      {showAddForm && (
  <div className="card mb-3 shadow-sm">
    <div className="card-body">
      <h5 className="card-title">Add New Entertainer</h5>
      
      {/* 👇 helper note */}
      <p className="text-muted small mb-3">
        This will create the entertainer. You can finish adding all details by visiting their Details page.
      </p>
      
      <div className="mb-3">
        <label className="form-label">Stage Name</label>
        <input
          type="text"
          className="form-control"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder="Enter stage name"
        />
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-success me-2" onClick={handleAddSave}>
          💾 Save
        </button>
        <button className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
          ✖ Cancel
        </button>
      </div>
    </div>
  </div>
)}

      {/* Cards Grid */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {sorted.map(({ entertainerId, entStageName, bookingsCount, lastBookingDate }) => (
          <div key={entertainerId} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{entStageName}</h5>
                  <p className="card-text text-muted mb-1">
                    {bookingsCount > 0
                      ? `${bookingsCount} booking${bookingsCount > 1 ? 's' : ''}`
                      : 'No bookings yet'}
                  </p>
                  {lastBookingDate && (
                    <small className="text-muted">
                      Last: {new Date(lastBookingDate).toLocaleDateString()}
                    </small>
                  )}
                </div>
                <Link
                  to={`/entertainers/${entertainerId}`}
                  className="btn btn-primary mt-3 align-self-start"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      {!showAddForm && (
        <div className="text-center mt-4">
          <button className="btn btn-success btn-lg" onClick={() => setShowAddForm(true)}>
            + Add Entertainer
          </button>
        </div>
      )}
    </div>
  );
};

export default EntertainersList;
