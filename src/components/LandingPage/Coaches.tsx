import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import useCoaches from '../../hooks/useCoaches';

const Coaches = () => {
  const { coaches, loading } = useCoaches();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCoach = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, coaches.length));
  };

  const prevCoach = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, coaches.length)) % Math.max(1, coaches.length));
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </section>
    );
  }

  if (!coaches || coaches.length === 0) return null;

  const currentCoach = coaches[currentIndex];

  return (
    <section className="py-16 bg-white" id="coaches">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Our Elite Coaching Staff
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Shaping the Future of Football with Experience and Passion
          </p>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
          
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-blue-600 rounded-3xl -rotate-6"></div>
              <img 
                src={currentCoach.image} 
                alt={currentCoach.name} 
                className="absolute inset-0 w-full h-full object-cover rounded-3xl border-4 border-white shadow-xl"
              />
            </div>
          </div>
          
          <div className="lg:w-1/2 text-center lg:text-left">
            <h3 className="text-3xl font-bold text-slate-900 mb-2">{currentCoach.name}</h3>
            <p className="text-blue-700 font-semibold text-lg mb-6">{currentCoach.role}</p>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8 inline-block lg:block">
              <p className="text-slate-700 text-lg leading-relaxed mb-4">
                Professional coach dedicated to player growth, discipline, and high-performance football development.
              </p>
              
              <div className="flex items-center justify-center lg:justify-start gap-4">
                 <a href="#" className="p-2 bg-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white rounded-full transition-colors" aria-label="Instagram"><FaInstagram className="w-5 h-5"/></a>
                 <a href="#" className="p-2 bg-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white rounded-full transition-colors" aria-label="X"><FaXTwitter className="w-5 h-5"/></a>
                 <a href="#" className="p-2 bg-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white rounded-full transition-colors" aria-label="LinkedIn"><FaLinkedinIn className="w-5 h-5"/></a>
              </div>
            </div>

            {coaches.length > 1 && (
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <button 
                  onClick={prevCoach} 
                  className="p-4 bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-600 hover:text-blue-600 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="text-slate-500 font-medium">
                  {currentIndex + 1} / {coaches.length}
                </div>
                <button 
                  onClick={nextCoach} 
                  className="p-4 bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-600 hover:text-blue-600 rounded-full transition-colors"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Coaches;

