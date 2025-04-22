import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

interface Entertainer {
  entertainerId: number;
  entStageName?: string;
  entSsn?: string;
  entStreetAddress?: string;
  entCity?: string;
  entState?: string;
  entZipCode?: string;
  entPhoneNumber?: string;
  entWebPage?: string;
  entEmailAddress?: string;
  dateEntered?: string;
}
const EntertainerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ent, setEnt] = useState<Entertainer | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Entertainer>({ entertainerId: 0 });

  // Fetch the full entity
  useEffect(() => {
    (async () => {
      const res = await fetch(`https://johngibsonfinal-eugrgmegaygcb5bu.centralus-01.azurewebsites.net/api/entertainers/${id}`, {
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json() as Entertainer;
        setEnt(data);
        setForm(data);
      }
    })();
  }, [id]);

  if (!ent) return <div className="container py-5 text-center">Loading…</div>;

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
  };

  const handleSave = async () => {
    await fetch(`https://johngibsonfinal-eugrgmegaygcb5bu.centralus-01.azurewebsites.net/api/entertainers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    });
    setEnt(form);
    setEditing(false);
  };

  const handleDelete = async () => {
    await fetch(`https://johngibsonfinal-eugrgmegaygcb5bu.centralus-01.azurewebsites.net/api/entertainers/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    navigate('/entertainers');
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <Link to="/entertainers" className="btn btn-outline-primary mb-3">
          ← Back to list
        </Link>
  
        {/* DISCLAIMER ALERT */}
        <div className="alert alert-info">
          <strong>Note:</strong> Only fields with values will be shown. Use <em>Edit</em> below to add any missing details.
        </div>
  
        <div className="card shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
          <div className="card-body">
            {!editing ? (
              <>
                <h3 className="card-title mb-3">{ent.entStageName}</h3>
                <dl className="row mb-4">
                  {Object.entries(ent).map(([key, val]) =>
                    key !== 'entertainerId' && val != null && (
                      <React.Fragment key={key}>
                        <dt className="col-sm-4">
                          {key
                            .replace(/([A-Z])/g, ' $1')
                            .replace(/^./, str => str.toUpperCase())}
                        </dt>
                        <dd className="col-sm-8">{val.toString()}</dd>
                      </React.Fragment>
                    )
                  )}
                </dl>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => setEditing(true)}
                  >
                    ✏️ Edit
                  </button>
                  <button className="btn btn-danger" onClick={handleDelete}>
                    🗑️ Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="card-title mb-3">Edit Entertainer</h3>
                {Object.entries(form).map(([key, val]) =>
                  key !== 'entertainerId' ? (
                    <div className="mb-3" key={key}>
                      <label className="form-label">
                        {key
                          .replace(/([A-Z])/g, ' $1')
                          .replace(/^./, str => str.toUpperCase())}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={val ?? ''}
                        onChange={handleChange(key)}
                      />
                    </div>
                  ) : null
                )}
                <div className="d-flex justify-content-end">
                  <button className="btn btn-success me-2" onClick={handleSave}>
                    💾 Save
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setEditing(false)}
                  >
                    ✖ Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default EntertainerDetails;
