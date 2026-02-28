import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const reviews = [
  { id: 1, name: "Alex J.", role: "Digital Artist", text: "The best platform for creators. I won my first contest here!" },
  { id: 2, name: "Sarah K.", role: "Dev Engineer", text: "The UI is so clean and the community is amazing. Highly recommended." },
  { id: 3, name: "Mike R.", role: "Pro Gamer", text: "Competitive and fair. This site truly values real talent." },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 container mx-auto px-4 text-center overflow-hidden">
      <motion.h2 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="text-4xl font-black italic uppercase mb-16 tracking-tighter"
      >
        What People <span className="text-primary">Say</span>
      </motion.h2 >

      <div className="relative max-w-2xl mx-auto h-64 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute p-8 bg-base-100 rounded-[2.5rem] border border-base-content/10 shadow-2xl"
          >
            <p className="text-xl italic font-medium opacity-80 mb-6">"{reviews[index].text}"</p>
            <div>
              <h4 className="font-black uppercase tracking-widest text-primary italic">{reviews[index].name}</h4>
              <p className="text-xs uppercase font-bold opacity-50">{reviews[index].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-primary" : "w-2 bg-base-content/20"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials