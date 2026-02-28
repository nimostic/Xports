  import { motion } from "framer-motion";
  const CTA = () => {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      className="container mx-auto px-4 my-20"
    >
      <div className="bg-primary rounded-[3rem] p-12 relative overflow-hidden text-center text-white shadow-2xl">
        {/* Animated Background Circles */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"
        />
        
        <h2 className="text-4xl md:text-6xl font-black italic uppercase mb-6 tracking-tighter">Ready to show <br /> your talent?</h2>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="btn btn-lg bg-white text-primary border-none rounded-2xl px-10 italic uppercase font-black"
        >
          Get Started Now
        </motion.button>
      </div>
    </motion.div>
  );
};
export default CTA