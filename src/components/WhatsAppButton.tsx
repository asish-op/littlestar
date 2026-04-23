import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const number = '919059560704';

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/25 transition-transform hover:scale-105 hover:bg-[#20bd5a]"
    >
      <FaWhatsapp className="h-7 w-7" />
    </a>
  );
};

export default WhatsAppButton;
