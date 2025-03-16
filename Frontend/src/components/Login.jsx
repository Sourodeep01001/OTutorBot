import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [error , setError] = useState('');

  const [formData, setFormData] = React.useState({
    userEmail: "",
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

    if(formData.userEmail === "" || formData.password === ""){
      setError("Please fill the form correctly..")
      return
    }

    setIsDisabled(true);

    try {
      const response = await fetch(
        "https://otutorbot.onrender.com/req/login ",
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
        console.log(`Sucessfully Signed Up with ${data.userEmail}`);

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


          localStorage.setItem('auth', JSON.stringify({
            status: true,
            userData: {
              userName: data.userName,
              userEmail: data.userEmail
          }}));

          navigate("/dashBoard");
        } else {
          navigate("/");
        }
      } else {
        console.log(`Failed to Sign Up with ${response.status}`);
      }
    } catch (error) {
      setError('Something went wrong');
      console.log(error);
    } finally{
      setIsDisabled(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="lg:w-1/2 w-full h-full flex justify-center items-center">
        <form
          className="w-2/3 h-1/2 flex flex-col gap-4"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h2 className="lg:text-2xl text-xl font-medium capitalize">
            Sign in to your Account
          </h2>

          <input
            type="email"
            placeholder="Email"
            name="userEmail"
            onChange={handleChange}
            className="px-4 py-2 border-2 dark:border-gray-400 rounded-md dark:text-black"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="px-4 py-2 border-2 dark:border-gray-400 rounded-md dark:text-black"
          />

          <button 
          className={`px-4 py-2 bg-blue-500 text-white rounded-md ${isDisabled ? 'cursor-not-allowed bg-gray-600' : 'cursor-pointer'}`}
          disabled={isDisabled}
          >
            LogIn
          </button>
          {
            error && <h4 className="text-center text-lg font-semibold text-red-500">{error}</h4>
          }
          <h4 className="text-center text-lg font-semibold">or</h4>
          <div>
            <h4 className="text-base text-center">
              Don't have any Account- ?{" "}
              <Link className="underline text-lg text-blue-500 font-semibold cursor-pointer" to={"/signup"}>
                SignUp
              </Link>
            </h4>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
