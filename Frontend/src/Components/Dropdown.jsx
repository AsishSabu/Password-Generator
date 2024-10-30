import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearUser } from '../Redux/userSlice';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);


  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };


  return (
    <div className="relative inline-block text-left">
      <div>
        <button className="bg-gray-900 p-2 rounded-lg hover:bg-gray-600 transition duration-300"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          type="button"
          onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {!isAuthenticated && (
              <>
                <Link to="/login" onClick={closeMenu} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0">Login</Link>
                <Link to="/register" onClick={closeMenu} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0">Register</Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <Link to="/saved" onClick={closeMenu} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0">Saved</Link>
                <Link to="/login" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0">Logout</Link>

              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
