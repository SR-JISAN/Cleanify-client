import { TextAlignJustify, TextAlignStart } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';

const NavBar = () => {
  const { user, singOutUser } = useContext(AuthContext);
    const [menu,setMenu] =useState(false)
    const handleMenu =()=>{
        setMenu(!menu)
    }

    const handleSignOut = ()=>{
      singOutUser()
        .then((result) => {
          console.log(result);
          setMenu(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const links = (
      <>
        <NavLink to="/home">
          <li>Home</li>
        </NavLink>

        <NavLink to="/issues">
          <li>Issues</li>
        </NavLink>
        {!user && (
          <>
            <NavLink to="/login">
              <li>LogIn</li>
            </NavLink>
          </>
        )}

        {user && (
          <>
            <NavLink to="/addIssue">
              <li>Add Issue</li>
            </NavLink>
            <NavLink to="/myIssue">
              <li>My Issue</li>
            </NavLink>
            <NavLink to="/myContribution">
              <li>My Contribution</li>
            </NavLink>
          </>
        )}
      </>
    );
    
    return (
      <nav className="bg-white shadow-sm relative z-50">
        <div className="navbar maxWidth mx-auto">
          <div className="navbar-start ">
            <div onClick={handleMenu} className="mr-3 lg:hidden">
              <div className=" relative z-50">
                {menu ? (
                  <div>
                    <TextAlignStart size={23} color="#29ce09" strokeWidth={3} />
                    <div className="bg-white top-10  animate__animated animate__backInLeft px-10 py-5 rounded-2xl shadow-2xl absolute">
                      <ul className="text-purple-700 font-semibold flex flex-col gap-2">
                        {links}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <TextAlignJustify size={23} color="#29ce09" strokeWidth={3} />
                )}
              </div>
            </div>

            <Link to="/" className="font-bold text-2xl text-green-700">
              🌿 Cleanify
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="gap-4 menu-horizontal px-1">{links}</ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user.photoURL}
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-white text-black rounded-box z-50 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <NavLink to="/home">
                    <button onClick={handleSignOut} className="my-btn mt-1">
                      <svg
                        viewBox="0 0 24 24"
                        className="arr-2"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                      </svg>
                      <span className="text">SignOut</span>
                      <span className="circle"></span>
                      <svg
                        viewBox="0 0 24 24"
                        className="arr-1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                      </svg>
                    </button>
                  </NavLink>
                </ul>
              </div>
            ) : (
              <NavLink to="register">
                <button className="my-btn">
                  <svg
                    viewBox="0 0 24 24"
                    className="arr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                  </svg>
                  <span className="text">Register</span>
                  <span className="circle"></span>
                  <svg
                    viewBox="0 0 24 24"
                    className="arr-1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                  </svg>
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    );
};

export default NavBar;