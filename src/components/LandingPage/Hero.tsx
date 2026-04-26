"use client";

import React, { FormEvent, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { ArrowRight, Play, Star, X } from 'lucide-react';

const Hero = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [form, setForm] = useState({
    playerName: '',
    parentName: '',
    ageGroup: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleEnrollSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!API_URL) {
      setSubmitError('Enrollment service is unavailable right now.');
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError('');
      setSubmitSuccess('');

      await axios.post(`${API_URL}/enrollments`, {
        playerName: form.playerName,
        parentName: form.parentName,
        ageGroup: form.ageGroup,
        phone: form.phone,
        email: form.email,
        message: form.message
      });

      setSubmitSuccess('Enrollment submitted successfully. We will contact you shortly.');
      setForm({
        playerName: '',
        parentName: '',
        ageGroup: '',
        phone: '',
        email: '',
        message: ''
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setSubmitError(error.response?.data?.error || 'Unable to submit form right now.');
      } else {
        setSubmitError('Unable to submit form right now.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[88vh] md:min-h-[90vh] flex items-center pt-16 md:pt-24 pb-12 md:pb-16 overflow-hidden bg-slate-900">
      <img
        src="https://res.cloudinary.com/dwlccnvfh/image/upload/v1753936491/pf9tswepd5vcngpx6cnt_nhc29f.webp"
        alt="Soccer Match at Little Stars Soccer Academy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/65 to-slate-900/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white font-semibold text-sm mb-8 uppercase tracking-wide backdrop-blur-sm border border-white/20">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
              </span>
              Little Stars Football Academy
          </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
              Train with <br />
              <span className="text-blue-300">sreenidhi deccan little stars</span><br />
              Football Club.
            </h1>
            
          <p className="text-base sm:text-lg lg:text-xl text-slate-100 mb-8 md:mb-10 leading-relaxed max-w-xl font-medium">
              Build match-winning habits through structured coaching, competitive exposure, and discipline-led player development at Little Stars Football Academy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <button
              type="button"
              onClick={() => setIsEnrollOpen(true)}
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 group"
            >
                Enroll Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
              
            <a href="#reels" className="bg-white/15 hover:bg-white/25 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 border border-white/30 backdrop-blur-sm">
                <Play className="w-5 h-5 fill-white" />
                Watch Reels
            </a>
          </div>
            
          <div className="mt-12 flex items-center gap-6 sm:gap-10 border-t border-white/25 pt-8">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Student" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-slate-100 font-semibold">Trusted by 1,000+ players and families</p>
            </div>
          </div>
        </div>

        <div className="group hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 items-center gap-5 rounded-3xl border border-white/35 bg-white/15 px-8 py-7 backdrop-blur-md shadow-2xl transition-transform duration-300 hover:scale-110 hover:-translate-y-[52%] overflow-hidden">
          <span className="pointer-events-none absolute -left-2/3 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 transition-all duration-700 group-hover:left-[140%] group-hover:opacity-100" />
          <Image
            src="/lssa-logo.png"
            alt="Little Stars Football Academy logo"
            width={224}
            height={224}
            quality={100}
            sizes="(min-width: 1280px) 112px, 96px"
            className="h-24 w-24 rounded-full border-2 border-white/50 bg-white object-contain p-1"
          />
          <span className="text-5xl font-black text-white">x</span>
          <Image
            src="/sreenidi-logo.jpg"
            alt="Sreenidi Deccan Football Club logo"
            width={224}
            height={224}
            quality={100}
            sizes="(min-width: 1280px) 112px, 96px"
            className="h-24 w-24 rounded-full border-2 border-white/50 bg-white object-contain p-1"
          />
        </div>
      </div>

      {isEnrollOpen ? (
        <div className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsEnrollOpen(false)}
              aria-label="Close enroll form"
              className="absolute right-3 top-3 rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-2xl font-black text-slate-900 mb-1">Enroll Now</h3>
            <p className="text-slate-600 mb-5">Fill the form and our team will get back to you.</p>

            <form onSubmit={handleEnrollSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Player Name *"
                  value={form.playerName}
                  onChange={(e) => setForm((prev) => ({ ...prev, playerName: e.target.value }))}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Parent Name"
                  value={form.parentName}
                  onChange={(e) => setForm((prev) => ({ ...prev, parentName: e.target.value }))}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Age Group"
                  value={form.ageGroup}
                  onChange={(e) => setForm((prev) => ({ ...prev, ageGroup: e.target.value }))}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                placeholder="Message"
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 min-h-[110px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {submitError ? <p className="text-sm text-red-600">{submitError}</p> : null}
              {submitSuccess ? <p className="text-sm text-emerald-700">{submitSuccess}</p> : null}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-blue-700 py-3 text-white font-bold transition-colors hover:bg-blue-800 disabled:opacity-60"
              >
                {submitting ? 'Submitting...' : 'Submit Enrollment'}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Hero;

