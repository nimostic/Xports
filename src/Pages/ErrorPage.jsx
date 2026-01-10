import Lottie from 'lottie-react';
import React from 'react';
import { useNavigate } from 'react-router';
import errorData from '../../public/Error 404.json';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-20 overflow-hidden relative">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -z-10"></div>

            <div className="max-w-3xl w-full text-center">
                {/* Lottie Animation */}
                <div className="w-full max-w-md mx-auto mb-10">
                    <Lottie animationData={errorData} loop={true} />
                </div>

                {/* Text Content */}
                <div className="space-y-6">
                    <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white">
                        Lost in the <span className="text-primary">Arena?</span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-lg mx-auto font-medium">
                        The page you are looking for has been moved, deleted, or never existed in this competition.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                        <button 
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all uppercase text-sm tracking-widest"
                        >
                            <FaArrowLeft className="text-primary" /> Go Back
                        </button>
                        
                        <button 
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-black font-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(244,14,8,0.3)] uppercase text-sm tracking-widest italic"
                        >
                            <FaHome /> Return Home
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute bottom-10 left-10 opacity-10 hidden lg:block">
                <h1 className="text-[150px] font-black text-white leading-none">404</h1>
            </div>
        </section>
    );
};

export default ErrorPage;