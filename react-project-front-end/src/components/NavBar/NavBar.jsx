
import { Link } from 'react-router'

const NavBar = () => (
  <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
    <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Link to="/kids">Kids</Link>
      <div>
        <Link to="/signup" style={{ marginRight: '1rem' }}>Signup</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  </header>
)

export default NavBar