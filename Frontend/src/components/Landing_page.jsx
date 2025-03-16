import React from "react";
import { useNavigate } from "react-router-dom";
import coverPicture from "../assets/home_page_img.png"

const Landing_page = () => {

  const navigate = useNavigate();

  const btnClick = () => {
    const data = JSON.parse(localStorage.getItem("auth"));
    if(data){
      return navigate('/dashboard')
    }
    return navigate("/signup");
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row justify-between items-center">

      {/* for text  */}
      <div className=" w-full h-1/2 lg:w-1/2 lg:h-full lg:py-40 py-36 lg:px-20 px-5">
        <div>
          <h2 className="lg:text-8xl text-5xl uppercase font-medium tracking-tight bg-gradient-to-r from-pink-500 to-yellow-300 bg-clip-text text-transparent">
            an ai power
          </h2>
          <h2 className="lg:text-8xl text-5xl uppercase font-medium tracking-tight bg-gradient-to-r from-pink-500 to-yellow-300 bg-clip-text text-transparent">
            chat{" "}
            <span>
              <i className="ri-chat-smile-2-line"></i>
            </span>
          </h2>
          <h2 className="lg:text-8xl text-5xl uppercase font-medium tracking-tight bg-gradient-to-r from-pink-500 to-yellow-300 bg-clip-text text-transparent">
            assistant
          </h2>
        </div>
        <div className="mt-8">
          <button
            className="px-6 py-2 text-lg font-semibold bg-blue-500 rounded-3xl text-white hover:bg-blue-600 transition-colors duration-200"
            onClick={() => btnClick()}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* for image  */}
      <div className="w-full h-1/2 lg:w-1/2 lg:h-full flex items-center justify-center">
        <img 
        src={coverPicture} 
        alt="img" 
        className="lg:w-2/3 lg:h-5/6 w-2/3 h-2/3 object-cover"
        />
      </div>
    </div>
  );
};

export default Landing_page;
