import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaHome, FaShoppingCart, FaUser, FaInfoCircle } from 'react-icons/fa'; // Import FontAwesome icons
import UserOptions from './userOptions';
import { loadUser } from '../action/userAction';
import Loader from './loader/loader';

export default function MenuAppBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(loadUser());
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="bg-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <button
          className="text-black focus:outline-none md:hidden"
          onClick={toggleMenu}
        >
          <span className="text-xl">&#8801;</span>
        </button>
        <Link
          to="/"
          className="text-black text-2xl font-bold"
        >
          Book-Byte
        </Link>
        {loading ? (
          <Loader /> // Show loader while data is being fetched
        ) : (
          <div className={`md:flex items-center space-x-6 ${isMenuOpen ? 'block' : 'hidden'}`}>
            <Link
              to="/"
              className="text-black hover:text-gray-700 transition duration-300 flex items-center"
            >
              <FaHome className="mr-2" />
              Home
            </Link>

            <Link
              to="/shop"
              className="text-black hover:text-gray-700 transition duration-300 flex items-center"
            >
              <FaShoppingCart className="mr-2" />
              Shop
            </Link>

            <Link
              to="/about"
              className="text-black hover:text-gray-700 transition duration-300 flex items-center"
            >
              <FaInfoCircle className="mr-2" />
              About
            </Link>

            {isAuthenticated ? (
              <UserOptions user={user} />
            ) : (
              <Link
                to="/login"
                className="text-black hover:text-gray-700 transition duration-300 flex items-center"
              >
                <FaUser className="mr-2" />
                Login
              </Link>
            )}
          </div>
        )}
        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <div>
              {/* Add content here for authenticated users */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
