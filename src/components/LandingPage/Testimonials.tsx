import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import useTestimonials from '../../hooks/useTestimonials';

const Testimonials = () => {
  const { testimonials, loading } = useTestimonials();
  const [activeIndex, setActiveIndex] = useState(0);

  if (loading) {
    return (
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-12 h-12 border-4 border-slate-700 border-t-white rounded-full animate-spin mx-auto"></div>
        </div>
      </section>
    );
  }

  if (!testimonials || testimonials.length === 0) return null;

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-slate-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16 relative z-10">
          <div className="text-center lg:text-left mb-8 lg:mb-0">
            <span className="text-blue-400 font-semibold tracking-wider uppercase text-sm mb-3 block">Player Feedback</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Real Experiences
            </h2>
            <div className="w-24 h-1.5 bg-blue-500 mx-auto lg:mx-0 rounded-full"></div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={prevSlide}
              className="p-4 bg-slate-800 text-white hover:bg-blue-600 rounded-full transition-colors focus:ring-4 focus:ring-blue-500/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-4 bg-slate-800 text-white hover:bg-blue-600 rounded-full transition-colors focus:ring-4 focus:ring-blue-500/20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="opacity-10 absolute top-0 left-0 -translate-x-12 -translate-y-12">
            <Quote size={180} className="text-white" />
          </div>

          <div className="bg-slate-800 rounded-3xl p-10 lg:p-16 border border-slate-700 mx-auto max-w-4xl relative z-10 shadow-2xl">
            <div className="mb-8">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className="w-6 h-6 inline-block fill-amber-400 text-amber-400 mr-1" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>

            <p className="text-2xl md:text-3xl text-slate-300 font-normal leading-relaxed mb-10 relative z-10 italic">
              "{testimonials[activeIndex]?.feedback || 'A truly immersive environment that brings out the best in every player. Highly recommended for focused athletes.'}"
            </p>

            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-slate-700 rounded-full border-2 border-slate-600 flex items-center justify-center text-white text-xl font-bold overflow-hidden shadow-lg">
                {testimonials[activeIndex]?.image ? (
                  <img src={testimonials[activeIndex].image} alt={testimonials[activeIndex].name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-blue-400">{testimonials[activeIndex]?.name?.charAt(0) || 'A'}</span>
                )}
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-1">{testimonials[activeIndex]?.name || 'Adam Smith'}</h4>
                <p className="text-slate-400 text-sm tracking-wide uppercase">{testimonials[activeIndex]?.role || 'Academy Parent'}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;

