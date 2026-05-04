import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-surface-50 p-4">
    <div className="text-center">
      <h1 className="text-8xl font-black text-primary-600/20 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-surface-900 mb-2">Page not found</h2>
      <p className="text-surface-500 mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/" className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white hover:bg-primary-700 transition-colors shadow-sm">
        Go to Dashboard
      </Link>
    </div>
  </div>
);

export default NotFound;
