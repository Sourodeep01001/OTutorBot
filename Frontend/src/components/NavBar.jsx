import React , {useState} from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";


const NavBar = () => {

  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('auth');
    navigate('/');
  };

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "About",
      slug: "/about",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "DashBoard",
      slug: "/dashBoard",
      active: authStatus,
    }
  ];

  return (
    <div className="w-full h-full border-2 dark:border-transparent flex justify-between px-5 lg:px-20 items-center">
      <div className="flex items-center justify-center gap-1">
        <h2 className="text-2xl text-orange-500 font-semibold">O</h2>
        <h2 className="text-lg italic">TutorBOT</h2>
      </div>
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="ri-menu-line text-2xl"></i>
        </button>
      </div>
      <div className={`lg:flex hidden items-center justify-center gap-4`}>
        <div className="flex gap-4">
          {navItems.map((item) => {
            return (
              item.active && (
                <NavLink
                  to={item.slug}
                  key={item.slug}
                  className="px-5 py-2 hover:bg-blue-500 hover:text-white transition-colors duration-200 rounded-3xl text-base font-semibold"
                  style={({ isActive }) => ({
                    color: isActive ? "orange" : "",
                  })}
                >
                  {item.name}
                </NavLink>
              )
            );
          })}
        </div>
        {authStatus && (
          <button
            className="px-5 py-2 hover:bg-blue-500 hover:text-white transition-colors duration-200 rounded-3xl text-base font-semibold"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-gray-800 shadow-md rounded-lg flex items-center justify-center pt-5">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => {
              return (
                item.active && (
                  <NavLink
                    to={item.slug}
                    key={item.slug}
                    className="px-5 py-2 hover:bg-blue-500 hover:text-white transition-colors duration-200 rounded-3xl text-base font-semibold"
                    style={({ isActive }) => ({
                      color: isActive ? "orange" : "",
                    })}
                    onClick={() => setIsOpen(false)} // Close the menu on item click
                  >
                    {item.name}
                  </NavLink>
                )
              );
            })}
            {authStatus && (
              <button
                className="px-5 py-2 hover:bg-blue-500 hover:text-white transition-colors duration-200 rounded-3xl text-base font-semibold"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false); // Close the menu on logout
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
