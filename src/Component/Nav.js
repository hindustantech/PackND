import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  const user_id=localStorage.getItem("id");
  if(!user_id){
    navigate('/login');
  }
  return (
    <nav className="navbar bg-body-tertiary fixed-bottom">
      <div className="container">
        <ul className="navbar-nav d-flex flex-row justify-content-around w-100">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link text-center text-color`
              }
              to="/"
            >
              {({ isActive }) => (
                <>
                  <i
                    className={`fa fa-home ${isActive ? 'text-danger' : ''}`}
                    aria-hidden="true"
                  ></i>
                  <br />
                  Home
                </>
              )}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link text-center text-color`
              }
              to="/Wallet"
            >
              {({ isActive }) => (
                <>
                  <i
                    className={`fa fa-inr ${isActive ? 'text-danger' : ''}`}
                    aria-hidden="true"
                  ></i>
                  <br />
                  Wallet
                </>
              )}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link text-center text-color`
              }
              to="/history"
            >
              {({ isActive }) => (
                <>
                  <i
                    className={`fa-regular fa-calendar ${isActive ? 'text-danger' : ''}`}
                    aria-hidden="true"
                  ></i>
                  <br />
                  History
                </>
              )}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link text-center text-color`
              }
              to="/profile"
            >
              {({ isActive }) => (
                <>
                  <i
                    className={`fa-solid fa-user ${isActive ? 'text-danger' : ''}`}
                  ></i>
                  <br />
                  Profile
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
