import React from 'react'

const About = () => {
  return (
    <div className='lg:w-2/3 w-full h-full flex flex-col justify-center items-center'>
      <h1 className='lg:text-4xl text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-yellow-300 bg-clip-text text-transparent'>About Us</h1>
      <p className='lg:text-lg text-sm text-center mb-4'>
        Welcome to our AI-powered chat assistant platform. Our mission is to provide you with the best AI-driven solutions to help you with your queries and enhance your knowledge.
      </p>
      <p className='lg:text-lg text-sm text-center mb-4'>
        Our team is dedicated to developing cutting-edge technology that leverages artificial intelligence to deliver accurate and helpful responses. Whether you need assistance with your account, have questions about a topic, or want to test your knowledge, our chat assistant is here to help.
      </p>
      <p className='lg:text-lg text-sm text-center mb-4'>
        We believe in continuous improvement and are constantly working to enhance our platform to better serve you. Thank you for choosing our AI-powered chat assistant. We look forward to assisting you!
      </p>
    </div>
  )
}

export default About