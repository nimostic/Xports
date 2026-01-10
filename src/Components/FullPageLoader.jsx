// Components/FullPageLoader.jsx
import Lottie from 'lottie-react';
import loadingAnim from '../../public/gaming.json';

const FullPageLoader = () => {
    return (
        <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#0a0a0a]">
            <div className="w-64">
                <Lottie animationData={loadingAnim} loop={true} />
            </div>
            <h2 className="text-primary font-black uppercase italic tracking-[0.3em] mt-4 animate-pulse">
                Loading Arena...
            </h2>
        </div>
    );
};

export default FullPageLoader;