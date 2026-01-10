import React from "react";
import { Typewriter } from "react-simple-typewriter";
import bannerPic from "../../public/banner.png";
import heroPic from "../../public/hero-1.png";
import AngledButton from "./AngledButton";
import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate()

  const handleSearch= (e)=>{
    e.preventDefault();
    const text = e.target.search.value
    // console.log(e.target.search.value);
    if(text){
      navigate(`/all-contests?search=${text}`)
    }
  }
  return (
    <div
      className="hero min-h-[600px] lg:min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bannerPic})` }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-black/80 to-black/40"></div>

      <div className="hero-content flex-col lg:flex-row-reverse relative z-10 text-white px-6">
        {/* Right Side Image */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src={heroPic}
            className="max-w-xs md:max-w-sm rounded-3xl border-2 border-primary/30 shadow-2xl"
            alt="Hero"
          />
        </div>

        {/* Left Side Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-none mb-4 min-h-[120px]">
            Win Big with <br />
            <span className="text-primary drop-shadow-[2px_2px_0px_white]">
              <Typewriter
                words={["Xports", "Innovation", "Victory"]}
                loop={0} // 0 mane infinite loop
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </h1>

          <p className="max-w-xl text-gray-200 text-lg mb-8 font-medium">
            Explore hundreds of creative contests, showcase your skills, and win
            amazing prizes.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto lg:mx-0">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                name="search"
                placeholder="Search contest types..."
                className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-primary shadow-xl"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <button type="submit" className=" bg-primary hover:bg-secondary text-white px-6 py-2 rounded-full font-bold transition-colors">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
