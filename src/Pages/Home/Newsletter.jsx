import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineMailOpen } from "react-icons/hi";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

const Newsletter = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setLoading(true);

   
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID; 
const templateId = import.meta.env.VITE_EMAILJS_Reply_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((result) => {
        toast.success("Subscribed successfully! Welcome to the club.");
        formRef.current.reset(); 
      })
      .catch((error) => {
        toast.error("Something went wrong. Please try again.");
        console.error("EmailJS Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="py-24 container mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-primary/5 rounded-[3.5rem] p-8 md:p-16 border border-primary/10 relative overflow-hidden text-center"
      >
        <div className="max-w-2xl mx-auto">
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-8 text-primary text-4xl"
          >
            <HiOutlineMailOpen />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">
            Join the <span className="text-primary">Insider</span> List
          </h2>
          <p className="opacity-60 mb-10">Get the latest contest updates directly in your inbox.</p>

          {/* Form with Reference */}
          <form 
            ref={formRef}
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 bg-base-100 p-2 rounded-4xl border border-base-content/10 shadow-xl"
          >
            <input 
              name="user_email" 
              type="email" 
              required
              placeholder="Your email address" 
              className="bg-transparent px-8 py-4 flex-1 outline-none font-bold italic text-sm tracking-widest text-base-content"
            />
            <motion.button 
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className={`btn btn-primary rounded-3xl px-10 h-14 font-black italic uppercase tracking-widest ${loading ? "loading" : ""}`}
            >
              {loading ? "Processing..." : "Subscribe Now"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;