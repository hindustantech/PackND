import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("id");
  if (!user_id) {
    navigate('/login');
  }

  return (
    <nav className="navbar bg-body-tertiary fixed-bottom mt-2">
      <div className="container">
        <ul className="navbar-nav d-flex flex-row justify-content-around w-100">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => `nav-link text-center text-color`}
              to="/"
            >
              {({ isActive }) => (
                <>
                  <img
                    src={isActive ? '/n/HomeSelected.svg' : '/n/Home.svg'}
                    alt="Home"
                    style={{
                      height: '40px',
                      marginBottom: '0', // Ensure no extra space below the image
                    }}
                  />
                  <span style={{ fontSize: '12px' }}>Home</span>
                </>
              )}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => `nav-link text-center text-color`}
              to="/Wallet"
            >
              {({ isActive }) => (
                <>
                  <img
                    src={isActive ? '/n/WalletSelected.svg' : '/n/Wallet.svg'}
                    alt="Wallet"
                    style={{
                      height: '40px',
                      marginBottom: '0', // Ensure no extra space below the image
                    }}
                  />
                  <span style={{ fontSize: '12px' }}>Wallet</span>
                </>
              )}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => `nav-link text-center text-color`}
              to="/history"
            >
              {({ isActive }) => (
                <>
                  <img
                    src={isActive ? '/n/HistorySelected.svg' : '/n/History.svg'}
                    alt="History"
                    style={{
                      height: '40px',
                      marginBottom: '0', // Ensure no extra space below the image
                    }}
                  />
                  <span style={{ fontSize: '12px' }}>History</span>
                </>
              )}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => `nav-link text-center text-color`}
              to="/profile"
            >
              {({ isActive }) => (
                <>
                  <img
                    src={isActive ? '/n/ProfileSelected.svg' : '/n/Profile.svg'}
                    alt="Profile"
                    style={{
                      height: '40px',
                      marginBottom: '0', // Ensure no extra space below the image
                    }}
                  />
                  <span style={{ fontSize: '12px' }}>Profile</span>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
