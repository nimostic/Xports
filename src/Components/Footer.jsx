import React, { useRef, useState } from "react";
import { Link } from "react-router";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import logo from "../../public/logo.png";
import AngledButton from "./AngledButton";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_Reply_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(() => {
        toast.success("Subscribed successfully!");
        formRef.current.reset();
      })
      .catch((error) => {
        toast.error("Subscription failed. Try again.");
        console.error("EmailJS Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", path: "/" },
        { name: "All Contests", path: "/all-contests" },
        { name: "Our Service", path: "/our-service" },
        { name: "FAQ", path: "/faq" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms & Conditions", path: "/terms" },
        { name: "Contact Us", path: "/contact" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FaFacebook size={20} />, link: "https://www.facebook.com/riyadreverie" },
    { icon: <FaTwitter size={20} />, link: "https://x.com/abunayeemriyad" },
    { icon: <FaInstagram size={20} />, link: "https://www.instagram.com/riyad_reverie" },
    { icon: <FaLinkedin size={20} />, link: "https://www.linkedin.com/in/abunayeemriyad" },
  ];

  return (
    <footer className="bg-base-100 text-base-content pt-16 pb-8 border-t border-base-content/10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section - Large & Bold */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <img src={logo} alt="logo" className="h-12 w-auto transition-transform group-hover:scale-105 duration-500" />
            </Link>
            <p className="text-sm leading-relaxed font-medium opacity-70 italic">
              Explore the best contests and showcase your skills. Join our
              community to win exciting prizes and gain global recognition.
            </p>
          </div>

          {/* Dynamic Links - Matching Typography */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-primary font-black italic uppercase tracking-tighter text-xl mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-sm font-bold uppercase italic tracking-widest opacity-60 hover:opacity-100 hover:text-primary transition-all duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 h-0.5 bg-primary group-hover:w-3 transition-all"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Section */}
          <div>
            <h3 className="text-primary font-black italic uppercase tracking-tighter text-xl mb-6">
              Newsletter
            </h3>
            <p className="text-sm mb-6 font-medium italic opacity-70">Stay updated with our latest arena news.</p>
            
            <form ref={formRef} onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                name="user_email"
                type="email"
                required
                placeholder="Enter email"
                className="w-full bg-base-200 border border-base-content/10 px-4 py-3 rounded-xl focus:outline-none focus:border-primary/50 text-sm font-bold italic tracking-widest transition-all placeholder:opacity-30"
              />

              <AngledButton 
                type="submit" 
                disabled={loading}
                className="w-full"
                text={loading ? "Subscribing..." : "Subscribe"} 
              />
            </form>
          </div>
        </div>

        <hr className="border-base-content/5 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] md:text-xs font-black italic uppercase tracking-[0.2em] opacity-40">
            © {currentYear} <span className="text-primary">Xports Arena</span>. All Rights Reserved.
          </p>

          {/* Social Icons - Styled Cards */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-base-200 rounded-xl flex items-center justify-center hover:text-primary hover:scale-110 transition-all duration-300 shadow-lg border border-base-content/5"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;