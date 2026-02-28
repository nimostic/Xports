import { motion } from "framer-motion";
const HowItWorks = () => {
  return (
    <section className="py-20 container mx-auto px-4 text-center overflow-hidden">
      <h2 className="text-4xl font-black italic uppercase mb-16 tracking-tighter">How it <span className="text-primary">Works</span></h2>
      <div className="grid md:grid-cols-3 gap-12">
        {[
          { t: "Register", d: "Create account." },
          { t: "Submit", d: "Upload work." },
          { t: "Win", d: "Get rewards." }
        ].map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <motion.div 
              whileInView={{ rotate: 360 }}
              transition={{ duration: 1 }}
              className="w-20 h-20 bg-base-100 border-4 border-primary text-primary rounded-full flex items-center justify-center mx-auto text-3xl font-black shadow-xl"
            >
              {i + 1}
            </motion.div>
            <h3 className="text-2xl font-bold uppercase italic tracking-tighter">{step.t}</h3>
            <p className="opacity-70">{step.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default HowItWorks;