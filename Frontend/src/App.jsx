import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("auth"));
    if (data) {
      dispatch(
        login({
          status: true,
          userData: {
            userName: data.userName,
            userEmail: data.userEmail,
          },
        })
      );
    }
  });

  return (
    <div className="w-full h-screen dark:bg-black dark:text-white ">
      <div className="w-full h-20 bg-gray-900 lg:bg-transparent absolute top-0 left-0">
        <NavBar />
      </div>
      <main className="w-full h-full flex justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
