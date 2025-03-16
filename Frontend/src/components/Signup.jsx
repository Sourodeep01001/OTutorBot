import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    userEmail: "",
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData.userEmail === "" || formData.userName === "" || formData.password === ""){
      setError("Please fill the form correctly..")
      return
    }

    setIsDisabled(true);

    try {
      const response = await fetch(
        "https://otutorbot.onrender.com/req/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(`Sucessfully Signed Up with ${data.userName}`);

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

          localStorage.setItem(
            "auth",
            JSON.stringify({
              status: true,
              userData: {
                userName: data.userName,
                userEmail: data.userEmail,
              },
            })
          );

          navigate("/dashBoard");
        } else {
          navigate("/");
        }
      } else {
        setError('something went wrong !');
        console.log(`Failed to Sign Up with ${response.status}`);
      }
    } catch (error) {
      setError('something went wrong !');
      console.log(error);
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="lg:w-1/2 w-full h-full flex justify-center items-center">
        <form
          className="w-2/3 h-1/2 flex flex-col gap-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h2 className="lg:text-2xl text-lg font-medium capitalize">
            Sign up to create Account
          </h2>

          <input
            type="text"
            name="userName"
            placeholder="Name"
            value={formData.userName}
            onChange={handleChange}
            className="px-4 py-2 border-2 dark:border-gray-400 rounded-md dark:text-black"
          />

          <input
            type="email"
            placeholder="Email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            className="px-4 py-2 border-2 dark:border-gray-400 rounded-md dark:text-black"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="px-4 py-2 border-2 dark:border-gray-400 rounded-md dark:text-black"
          />

          <button
            className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
              isDisabled ? "cursor-not-allowed bg-gray-600" : "cursor-pointer"
            }`}
            disabled={isDisabled}
          >
            Sign Up
          </button>

          {error && (
            <h4 className="text-center text-lg font-semibold text-red-500">
              {error}
            </h4>
          )}

          <h4 className="text-center text-lg font-semibold">or</h4>
          <div>
            <h4 className="text-base text-center">
              Already have an Account- ?{" "}
              <Link
                className="underline text-lg text-blue-500 font-semibold cursor-pointer"
                to={"/login"}
              >
                SignIn
              </Link>
            </h4>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
