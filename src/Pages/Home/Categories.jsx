import React from "react";
import { motion } from "framer-motion";
import cats from "../../../public/ContestTypes.json";
import { SiHackaday, SiCplusplus, SiValorant, SiGoogleadsense } from "react-icons/si";
import { HiOutlineLightBulb, HiOutlineColorSwatch, HiOutlineDesktopComputer } from "react-icons/hi";

const getIcon = (value) => {
  const iconClass = "w-8 h-8 transition-transform duration-500 group-hover:scale-110";
  switch (value) {
    case "business": return <HiOutlineLightBulb className={iconClass} />;
    case "coding": return <SiCplusplus className={iconClass} />;
    case "gaming": return <SiValorant className={iconClass} />;
    case "art": return <HiOutlineColorSwatch className={iconClass} />;
    case "hackathon": return <SiHackaday className={iconClass} />;
    case "marketing": return <SiGoogleadsense className={iconClass} />;
    default: return <HiOutlineDesktopComputer className={iconClass} />;
  }
};

const Categories = () => {
  return (
    <section className="py-24 container mx-auto px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-4xl text-base-content uppercase italic font-black tracking-tighter leading-none">
          Top <span className="text-primary">Categories</span>
        </h2>
        <div className="h-1.5 w-20 bg-primary mt-4 rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 pt-4">
        {cats.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
           
            className="group cursor-pointer bg-base-200/40 backdrop-blur-sm p-6 md:p-8 rounded-[2.5rem] border border-base-content/5 hover:border-primary/40 text-center flex flex-col items-center justify-between min-h-[200px] md:min-h-60 transition-all duration-500 shadow-lg hover:shadow-primary/10"
          >
            {/* Icon Container */}
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner shrink-0">
              {getIcon(cat.value)}
            </div>

            {/* Name Container - Flex grow ensures it takes available space */}
            <div className="grow flex items-center justify-center mt-4 w-full">
              <h3 className="font-bold text-base-content uppercase italic text-sm md:text-base tracking-tighter leading-tight wrap-break-word group-hover:text-primary transition-colors duration-300">
                {cat.name}
              </h3>
            </div>

            {/* Hover Indicator */}
            <div className="w-0 h-1 bg-primary mt-4 rounded-full group-hover:w-12 transition-all duration-500"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Categories;