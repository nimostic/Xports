import React, { useRef } from "react"; // useRef dorkar form reference er jonno
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const { register, handleSubmit, reset } = useForm();
  const form = useRef(); // Form-er data dhorar jonno ref

  const onSubmit = (data) => {
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        (result) => {
          toast.success("Message sent successfully!");
          reset();
        },
        (error) => {
          toast.error("Failed to send message.");
        },
      );
  };

  return (
    <div className="bg-base-100  py-20 text-base-content">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Info Side */}
        <div className="space-y-6">
          <h1 className="text-4xl uppercase italic text-primary tracking-tighter">
            Get in Touch
          </h1>
          <p className="text-gray-400 text-lg">
            Have questions about a contest or payment? Our team is here to help
            24/7.
          </p>
          <div className="mt-10 space-y-4">
            <p className="flex items-center gap-3">
              <span className="text-primary">📍</span> Dhaka, Bangladesh
            </p>
            <p className="flex items-center gap-3">
              <span className="text-primary">📧</span>{" "}
              support@contest-platform.com
            </p>
          </div>
        </div>

        <div className="bg-base-100 p-8 rounded-3xl border border-gray-800">
          <form
            ref={form}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs uppercase font-bold text-gray-500 mb-2">
                Name
              </label>
              <input
                {...register("from_name", { required: true })}
                name="from_name"
                className="w-full bg-base-100 border border-gray-700 p-3 rounded-xl focus:border-primary outline-none"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-bold text-gray-500 mb-2">
                Email
              </label>
              <input
                {...register("user_email", { required: true })}
                name="user_email"
                type="email"
                className="w-full bg-base-100 border border-gray-700 p-3 rounded-xl focus:border-primary outline-none"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-bold text-gray-500 mb-2">
                Message
              </label>
              <textarea
                {...register("message", { required: true })}
                name="message"
                className="w-full bg-base-100 border border-gray-700 p-3 rounded-xl h-32 focus:border-primary outline-none"
                placeholder="How can we help?"
              ></textarea>
            </div>
            <button className="w-full py-4 bg-primary hover:bg-red-700 text-base-content text-base-content uppercase tracking-widest rounded-xl transition-all">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
