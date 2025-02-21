import React from "react";

const Banner = () => {
  return (
    <section
      className="relative bg-cover bg-center text-white py-16 h-[500px]"
      style={{
        backgroundImage:
          'url("https://i.ibb.co/yB8MLmw4/exhausted-employee-looking-laptop-office-desk-114579-28384.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="flex items-center justify-center h-full container mx-auto text-center relative z-10">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            Welcome to FlowTask
          </h1>
          <p className="text-lg sm:text-xl mb-6">
            Your guide to success, career growth, and professional development.
          </p>
          <a
            href="#services"
            className="inline-block bg-white text-black px-8 py-3 rounded-full text-lg hover:bg-gray-200 transition duration-300"
          >
            Explore Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default Banner;
