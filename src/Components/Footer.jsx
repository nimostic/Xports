import React from "react";
import { Link } from "react-router";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // React Icons use kora hoyeche
import logo from "../../public/logo.svg";
import AngledButton from "./AngledButton";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
    { icon: <FaFacebook size={20} />, link: "https://facebook.com" },
    { icon: <FaTwitter size={20} />, link: "https://twitter.com" },
    { icon: <FaInstagram size={20} />, link: "https://instagram.com" },
    { icon: <FaLinkedin size={20} />, link: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-black text-gray-300 pt-12 pb-6 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="logo"/>
            </Link>
            <p className="text-sm leading-relaxed">
              Explore the best contests and showcase your skills. Join our community to win exciting prizes and gain recognition.
            </p>
          </div>

          {/* Dynamic Links Generation */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.path} 
                      className="hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter / Contact Section */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="text-sm mb-4">Stay updated with our latest news.</p>
            <div className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="input input-sm bg-gray-900 border-gray-700 text-white rounded focus:border-primary focus:outline-none w-full"
              />
              
              <AngledButton text="Subscribe"></AngledButton>
            </div>
          </div>
        </div>

        <hr className="border-gray-800 mb-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">
            © {currentYear} <span className="text-primary font-medium text-sm">Xports</span>. All Rights Reserved.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.link} 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-primary transition-all duration-300 hover:scale-110"
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