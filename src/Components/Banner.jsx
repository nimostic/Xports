import React from "react";
import { Typewriter } from "react-simple-typewriter";
import bannerPic from "../../public/banner.png";
import heroPic from "../../public/hero-1.png";
import AngledButton from "./AngledButton";
import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const text = e.target.search.value;
    if (text) {
      navigate(`/all-contests?search=${text}`);
    }
  };

  return (
    <div
      className="hero min-h-[600px] lg:min-h-screen bg-cover bg-center relative transition-all duration-500"
      style={{ backgroundImage: `url(${bannerPic})` }}
    >
      <div className="absolute inset-0 bg-black/60 dark:bg-black/80"></div>

      <div className="hero-content flex-col lg:flex-row-reverse relative z-10 px-6 max-w-7xl mx-auto">
        
        <div className="flex-1 flex justify-center lg:justify-end custom-fade-in">
          <img
            src={heroPic}
            className="max-w-xs md:max-w-sm rounded-3xl border-2 border-primary/50 shadow-2xl transition-transform hover:scale-105 duration-300"
            alt="Hero"
          />
        </div>

        {/* Left Side Content */}
        <div className="flex-1 text-center lg:text-left">
         
          <h1 className="text-4xl lg:text-7xl text-white uppercase font-black tracking-tighter leading-[1.1] mb-6 min-h-[140px] lg:min-h-[180px]">
            Win Big with <br />
            <span className="text-primary drop-shadow-[2px_2px_0px_rgba(255,255,255,0.8)] dark:drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              <Typewriter
                words={["Xports", "Innovation", "Victory"]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </h1>

          <p className="max-w-xl text-gray-200 text-lg lg:text-xl mb-10 font-medium leading-relaxed">
            Explore hundreds of creative contests, showcase your skills, and win
            amazing prizes in our global arena.
          </p>

          
          <div className="relative max-w-md mx-auto lg:mx-0 shadow-2xl rounded-full overflow-hidden">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                name="search"
                placeholder="Search contest types..."
                className="w-full px-8 py-5 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 transition-all text-lg rounded-full"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <button
                  type="submit"
                  className="bg-primary hover:bg-[#d10c07] text-white px-8 py-3 rounded-full font-bold transition-all active:scale-95 shadow-lg"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          
          
          <div className="mt-8 flex gap-6 justify-center lg:justify-start text-white/70 text-sm">
             <span className="flex items-center gap-1">✓ Verified Contests</span>
             <span className="flex items-center gap-1">✓ Secure Payments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;