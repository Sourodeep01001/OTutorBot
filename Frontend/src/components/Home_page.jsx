import React, { useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";

const Home_page = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("auth"));

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [examTopic, setExamTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUrlAvailable, setIsUrlAvailable] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const [ischatopen , setIschatopen] = useState(false);

  const [error , setError] = useState("");

  useEffect(() => {
    const userDetail = JSON.parse(localStorage.getItem("auth"));
    console.log("userDetail:", userDetail); // Debugging log
    if (!userDetail) {
      console.log("No user detail found, navigating to home."); // Debugging log
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchData() {
      try {
        const chatList = await fetch(
          `https://otutorbot.onrender.com/chats/${userData?.userData.userEmail}`,
          {
            method: "GET",
          }
        );

        if (chatList.ok) {
          const data = await chatList.json();
          setMessages(data);
        } else {
          console.error("Failed to fetch chat list");
        }
      } catch (error) {
        console.error("Error fetching chat list:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setIsUrlAvailable("");
  }, [examTopic]);

  const handleSend = async () => {
    setInputValue("");
    setIsDisabled(true);
    if (inputValue.trim()) {
      try {
        const res = await fetch("https://otutorbot.onrender.com/ai/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: userData.userData.userEmail,
            question: inputValue,
          }),
        });

        try {
          if (res.ok) {
            const chatList = await fetch(
              `https://otutorbot.onrender.com/chats/${userData.userData.userEmail}`,
              {
                method: "GET",
              }
            );

            if (chatList.ok) {
              const data = await chatList.json();
              setMessages(data);
              setInputValue("");
            } else {
              console.error("Failed to fetch chat list");
            }
          }
        } catch (error) {
          console.error("Error fetching chat list:", error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsDisabled(false);
      }
    }
  };

  const handleBtn = async () => {

    if(!examTopic){
      setError("Please enter exam topic")
      return
    }

    setLoading(true);
    setExamTopic("");
    try {
      const response = await fetch("https://otutorbot.onrender.com/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: examTopic }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setIsUrlAvailable(data.formUrl);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // for validate exam input 

  const validateExamTopic = (value) => {
    if (!value) return "Exam topic cannot be empty.";
    if (value.length < 3) return "Exam topic must be at least 3 characters long.";
    if (!/^[a-zA-Z\s]+$/.test(value)) return "Exam topic must contain only letters and spaces.";
    return ""; // No errors
  };
  

  const handleChange = (e) => {
    const value = e.target.value;
    setError(validateExamTopic(value));
    setExamTopic(value);
  };
  

  return (
    <>
      <div className="w-full h-full flex flex-col lg:flex-row items-center pt-44 lg:pt-20">
        <div className="w-full lg:w-1/2 lg:h-full lg:px-20 px-5 lg:pt-10">
          <div className="w-full flex flex-col items-start justify-center">
            <h3 className="text-3xl font-semibold tracking-wider uppercase bg-gradient-to-r from-pink-500 to-yellow-300 bg-clip-text text-transparent">
              Ai powered chat assistant
            </h3>

            <h5 className="mt-5 text-base font-light dark:text-gray-400">
              Clear your all dought of any topics and test your knowledge by
              giving a test. Our AI-powered assistant is here to help you with
              any questions you have, Get instant answers and explanations to
              enhance your learning experience, Whether it's for study or
              curiosity, our chat assistant is ready to assist.
            </h5>

            <div className="w-full flex flex-col gap-2 mt-5">
              <h4 className="text-lg font-semibold capitalize ml-2">
                Give Exam Topic
              </h4>

              <div className="relative w-1/2">
                <input
                  type="text"
                  placeholder="Enter Exam Topic"
                  value={examTopic}
                  onChange={(e) => handleChange(e)}
                  className="px-4 py-3 rounded-3xl bg-transparent border-[1px] text-base font-semibold"
                />

                {
                  error && <h4 className="text-lg font-semibold capitalize ml-2 text-red-500">{error}</h4>
                }
              </div>
            </div>

            {!isUrlAvailable && (
              <button
                className={`px-5 py-2 text-white capitalize font-semibold text-lg rounded-3xl mt-5 ${error ? "bg-gray-500" : "bg-blue-500"}`}
                onClick={() => handleBtn()}
                disabled={error}
              >
                {loading ? "Loading..." : "Prepare Test"}
              </button>
            )}

            {isUrlAvailable && (
              <a
                href={isUrlAvailable}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 bg-green-500 text-white capitalize font-semibold text-lg rounded-3xl mt-5"
              >
                Start Test
              </a>
            )}
          </div>

          <div className="lg:hidden">
            <button className="px-5 py-2 bg-blue-500 text-white capitalize font-semibold text-lg rounded-3xl mt-5"
            onClick={() => setIschatopen(true)}
            >
              ChatWithAI
            </button>
          </div>
        </div>

        <div className="hidden w-full h-full lg:w-1/2 lg:h-full lg:px-20 px-5 lg:flex flex-col items-start justify-center">
          {/* // chat section */}
          <div className="w-full h-full bg-slate-100 dark:bg-gray-900 rounded-xl overflow-hidden hideScroll">
            <div className="w-full h-[60px] border-b-2 border-gray-300 flex items-center px-5 justify-between">
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={logo}
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="ml-5">
                  <h4 className="text-base font-medium capitalize">
                    Chat Assistant 🧑‍💻
                  </h4>
                </div>
              </div>

              <div>
                <h4 className="text-base font-medium capitalize">
                  Hey {userData?.userData.userName} 👋
                </h4>
              </div>
            </div>

            <div className="w-full h-[calc(90%-60px)] overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-end mb-2">
                    <div className="max-w-xs p-3 rounded-lg bg-blue-500 text-white">
                      {message.question}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-xs p-3 rounded-lg bg-gray-300 text-black">
                      {message.response}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full h-16 flex items-center justify-center bg-gray-800">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="w-4/5 h-12 px-5 outline-none bg-slate-300 rounded-2xl dark:text-black"
              />

              <button
                className="w-14 h-12 bg-blue-500 rounded-2xl ml-2 outline-none"
                onClick={handleSend}
                disabled={isDisabled}
              >
                {isDisabled ? (
                  <l-waveform
                    size="35"
                    stroke="3.5"
                    speed="1"
                    color="black"
                  ></l-waveform>
                ) : (
                  <i className="ri-send-plane-2-fill text-2xl flex items-center justify-center text-white"></i>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>




      {ischatopen && (
        <div className="absolute top-32 w-full h-5/6 lg:w-1/2 lg:h-full lg:px-20 px-5 lg:flex flex-col items-start justify-center">
          {/* // chat section */}
          <div className="w-full h-full bg-slate-100 dark:bg-gray-900 rounded-xl overflow-hidden hideScroll">
            <div className="w-full h-[60px] border-b-2 border-gray-300 flex items-center px-5 justify-between">
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={logo}
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="ml-5">
                  <h4 className="text-base font-medium capitalize">
                    Chat Assistant 🧑‍💻
                  </h4>
                </div>
              </div>

              <div className="flex items-center justify-center gap-7">
              <div>
                <h4 className="text-base font-medium capitalize">
                  Hey {userData?.userData.userName} 👋
                </h4>
              </div>

              <button onClick={() => setIschatopen(false)}>
              <i className="ri-close-large-fill text-xl font-semibold"></i>
              </button>
              </div>
            </div>

            <div className="w-full h-[calc(90%-60px)] overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-end mb-2">
                    <div className="max-w-xs p-3 rounded-lg bg-blue-500 text-white">
                      {message.question}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-xs p-3 rounded-lg bg-gray-300 text-black">
                      {message.response}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full h-16 flex items-center justify-center bg-gray-800">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="w-4/5 h-12 px-5 outline-none bg-slate-300 rounded-2xl dark:text-black"
              />

              <button
                className="w-14 h-12 bg-blue-500 rounded-2xl ml-2 outline-none"
                onClick={handleSend}
                disabled={isDisabled}
              >
                {isDisabled ? (
                  <l-waveform
                    size="35"
                    stroke="3.5"
                    speed="1"
                    color="black"
                  ></l-waveform>
                ) : (
                  <i className="ri-send-plane-2-fill text-2xl flex items-center justify-center text-white"></i>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home_page;
