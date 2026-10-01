import {Link} from 'react-router-dom'
export default function NotFound(){return <div className="wrap text-center py-32"><h1 className="text-7xl font-extrabold gradient-text">404</h1><p className="text-muted my-4">This page does not exist.</p><Link to="/" className="btn-primary">Back to Home</Link></div>}
