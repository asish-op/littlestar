"use client";

import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

type EnrollmentForm = {
  playerName: string;
  parentName: string;
  ageGroup: string;
  phone: string;
  email: string;
  message: string;
};

type EnrollmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  submitLabel?: string;
  successMessage?: string;
  defaultMessage?: string;
};

const createInitialForm = (message = ''): EnrollmentForm => ({
  playerName: '',
  parentName: '',
  ageGroup: '',
  phone: '',
  email: '',
  message
});

const EnrollmentModal = ({
  isOpen,
  onClose,
  title = 'Enroll Now',
  description = 'Fill the form and our team will get back to you.',
  submitLabel = 'Submit Enrollment',
  successMessage = 'Enrollment submitted successfully. We will contact you shortly.',
  defaultMessage = ''
}: EnrollmentModalProps) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [form, setForm] = useState<EnrollmentForm>(() => createInitialForm(defaultMessage));

  useEffect(() => {
    if (isOpen) {
      setForm(createInitialForm(defaultMessage));
      setSubmitError('');
      setSubmitSuccess('');
    }
  }, [defaultMessage, isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

      setSubmitSuccess(successMessage);
      setForm(createInitialForm(defaultMessage));
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enrollment-modal-title"
    >
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          aria-label={`Close ${title} form`}
          className="absolute right-3 top-3 rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 id="enrollment-modal-title" className="text-2xl font-black text-slate-900 mb-1">{title}</h3>
        <p className="text-slate-600 mb-5">{description}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Player Name *"
              value={form.playerName}
              onChange={(event) => setForm((prev) => ({ ...prev, playerName: event.target.value }))}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Parent Name"
              value={form.parentName}
              onChange={(event) => setForm((prev) => ({ ...prev, parentName: event.target.value }))}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Age Group"
              value={form.ageGroup}
              onChange={(event) => setForm((prev) => ({ ...prev, ageGroup: event.target.value }))}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              placeholder="Phone Number *"
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Message"
            value={form.message}
            onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 min-h-[110px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {submitError ? <p className="text-sm text-red-600">{submitError}</p> : null}
          {submitSuccess ? <p className="text-sm text-emerald-700">{submitSuccess}</p> : null}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-blue-700 py-3 text-white font-bold transition-colors hover:bg-blue-800 disabled:opacity-60"
          >
            {submitting ? 'Submitting...' : submitLabel}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnrollmentModal;
