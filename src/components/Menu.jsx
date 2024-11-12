import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { AuthContext } from "../context/AuthContext";
import { ChevronDownIcon } from "@heroicons/react/outline";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEmployeeSubMenuOpen, setIsEmployeeSubMenuOpen] = useState(false);
  const { logout, user } = useContext(AuthContext);
  // console.log("user", user);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate("/login");
    toggleMenu();
  };

  const toggleEmployeeSubMenu = () => {
    setIsEmployeeSubMenuOpen(!isEmployeeSubMenuOpen);
  };

  return (
    <nav className=" p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-black ">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-300">
              Contact
            </Link>
          </li>

          {/* Sub-menu */}
          <li className="relative">
            <button
              onClick={toggleEmployeeSubMenu}
              className="hover:text-gray-300 flex flex-row items-center"
            >
              Employees <ChevronDownIcon className="w-5 h-5" />
            </button>
            {isEmployeeSubMenuOpen && (
              <ul className="absolute top-full left-0 mt-1  rounded shadow-lg text-black">
                {/* 
                // for testing 
                <li>
                  <Link
                    to="/employees"
                    onClick={() => setIsEmployeeSubMenuOpen(false)}
                    className="block px-4 py-2 text-nowrap hover:bg-gray-300"
                  >
                    Employee List
                  </Link>
                </li> */}
                {user?.role === "admin" && (
                  <li>
                    <Link
                      to="/add-employee"
                      onClick={() => setIsEmployeeSubMenuOpen(false)}
                      className="block px-4 py-2 text-nowrap hover:bg-gray-300"
                    >
                      Add Employee
                    </Link>
                  </li>
                )}
              </ul>
            )}
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="hover:text-gray-300 text-nowrap"
            >
              Log Out
            </button>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <div className="md:hidden flex items-center z-20">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <XIcon className="h-6 w-6 text-black " />
            ) : (
              <MenuIcon className="h-6 w-6 text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden absolute rounded-md  top-10 right-0 p-10 flex flex-col items-center space-y-4 text-black font-serif z-10 bg-white border-2 border-purple-800">
          <li className="border-b-2 border-purple-500 w-full text-center">
            <Link to="/" onClick={toggleMenu} className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li className="border-b-2 border-purple-500 w-full text-center">
            <Link
              to="/about"
              onClick={toggleMenu}
              className="hover:text-gray-300"
            >
              About
            </Link>
          </li>
          <li className="border-b-2 border-purple-500 w-full text-center">
            <Link
              to="/contact"
              onClick={toggleMenu}
              className="hover:text-gray-300"
            >
              Contact
            </Link>
          </li>

          {/* sub-menu */}
          <li className="border-b-2 border-purple-500 w-full text-center">
            <button
              onClick={toggleEmployeeSubMenu}
              className="hover:text-gray-300 flex flex-row items-center"
            >
              Employees <ChevronDownIcon className="w-5 h-5" />
            </button>
            {isEmployeeSubMenuOpen && (
              <ul className="flex flex-col items-center mt-2 space-y-2">
                {/* 
                // for testing 
                <li className="border-b-2 border-purple-500 w-full text-center">
                  <Link
                    to="/employees"
                    onClick={() => {
                      toggleMenu();
                      setIsEmployeeSubMenuOpen(false);
                    }}
                    className="hover:text-gray-300"
                  >
                    Employee List
                  </Link>
                </li> */}
                {user?.role === "admin" && (
                  <li className="border-b-2 border-purple-500 w-full text-center">
                    <Link
                      to="/add-employee"
                      onClick={() => {
                        toggleMenu();
                        setIsEmployeeSubMenuOpen(false);
                      }}
                      className="hover:text-gray-300"
                    >
                      Add Employee
                    </Link>
                  </li>
                )}
              </ul>
            )}
          </li>

          <li className="border-b-2 border-purple-500 w-full text-center">
            <button onClick={handleLogout} className="hover:text-gray-300">
              Log Out
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Menu;
