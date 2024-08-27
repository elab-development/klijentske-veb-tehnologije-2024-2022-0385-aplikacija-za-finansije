import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/finances" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Finances
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/planning" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Planning
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
