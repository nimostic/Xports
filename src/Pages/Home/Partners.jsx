import { motion } from "framer-motion";
import { 
  SiGoogle, SiAdobe, SiNetflix, 
  SiSpotify, SiAirbnb, SiNike, SiApple 
} from "react-icons/si"; 

const Partners = () => {

  const partners = [
    { name: "Google", icon: <SiGoogle /> },
    
    { name: "Adobe", icon: <SiAdobe /> },
    { name: "Netflix", icon: <SiNetflix /> },
    { name: "Spotify", icon: <SiSpotify /> },
    { name: "Airbnb", icon: <SiAirbnb /> },
    { name: "Nike", icon: <SiNike /> },
    { name: "Apple", icon: <SiApple /> },
  ];

  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-12 bg-base-100/50 overflow-hidden border-y border-base-content/5">
      <div className="container mx-auto px-4 mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] font-bold opacity-40">
          Trusted by Industry <span className="text-primary">Leaders</span>
        </p>
      </div>

      <div className="relative flex overflow-x-hidden">
        {/* Marquee Wrapper */}
        <motion.div
          className="flex whitespace-nowrap gap-16 md:gap-24 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
          whileHover={{ animationPlayState: "paused" }} 
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center gap-4 text-3xl md:text-4xl font-black italic uppercase tracking-tighter opacity-30 hover:opacity-100 hover:text-primary transition-all duration-500 cursor-pointer group"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">
                {partner.icon}
              </span>
              <span className="hidden sm:inline">{partner.name}</span>
            </div>
          ))}
        </motion.div>

        
        <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-base-100 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-base-100 to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default Partners;