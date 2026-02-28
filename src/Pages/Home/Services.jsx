import { motion } from "framer-motion";
const Services = () => {
  const items = [
    { t: "Fast Support", d: "24/7 dedicated help desk." },
    { t: "Secure Payments", d: "Instant and safe withdrawals." },
    { t: "Global Reach", d: "Compete with the world's best." }
  ];

  return (
    <section className="py-20 container mx-auto px-4 grid md:grid-cols-3 gap-8">
      {items.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ rotateY: 10, rotateX: 5, y: -5 }}
          className="p-10 bg-linear-to-br from-base-200 to-base-100 rounded-4xl border border-base-content/5 shadow-lg group"
        >
          <div className="w-12 h-1 bg-primary mb-6 transition-all group-hover:w-full" />
          <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4">{item.t}</h3>
          <p className="opacity-70 font-medium">{item.d}</p>
        </motion.div>
      ))}
    </section>
  );
};
export default Services;