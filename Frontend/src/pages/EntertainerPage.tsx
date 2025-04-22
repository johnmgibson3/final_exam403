import EntertainersList from '../components/EntertainerList';

const EntertainersPage: React.FC = () => (
  <div className="bg-light min-vh-100 py-5">
    <div className="container">
      <h2 className="text-center mb-4">🎤 Our Entertainers</h2>
      <EntertainersList />
    </div>
  </div>
);

export default EntertainersPage;

