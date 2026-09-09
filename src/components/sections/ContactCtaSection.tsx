import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { ArrowButton } from '../ui/ArrowButton';

export const ContactCtaSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'airbnb',
    timeline: '1-3-months',
    details: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const services = [
    { id: 'airbnb', label: 'Airbnb & Rental Visuals' },
    { id: 'realtor', label: 'Personal-Brand Film' },
    { id: 'villa', label: 'Branded Villa Cinema' },
    { id: 'website', label: 'Bespoke Property Website' },
    { id: 'full', label: 'Full Studio Campaign' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'A valid email address is required';
    }
    if (!formData.details.trim()) {
      newErrors.details = 'Please briefly outline your property or project';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#090909] text-white pt-24 sm:pt-32 pb-24 sm:pb-32 overflow-hidden"
    >
      {/* Editorial Grid Container */}
      <div className="w-full max-w-[1792px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Eyebrow & Slogan */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-12 sm:pb-16 border-b border-white/20">
          <div className="flex items-center gap-4">
            <span className="text-[12px] sm:text-[13px] font-medium tracking-editorial uppercase text-[#17B8C2]">
              ENQUIRIES & COMMISSIONS
            </span>
            <div className="w-12 h-[1px] bg-[#17B8C2]" />
          </div>
          <div className="text-[11px] font-medium tracking-editorial uppercase text-white/60">
            LONDON · DUBAI · MARRAKECH · WORLDWIDE
          </div>
        </div>

        {/* Main Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 sm:pt-16">
          {/* Left Column: Heading, Proposition & Direct Details */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl sm:text-6xl lg:text-[72px] font-light leading-[0.98] tracking-tight text-white whitespace-pre-line mb-6">
                Let’s make<br />your property<br />impossible to<br />overlook.
              </h2>

              <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-[480px]">
                We partner with villa owners, leading brokerages, and hospitality brands to create digital assets and websites that command immediate desire.
              </p>
            </div>

            {/* Direct Studio Contact Information */}
            <div className="space-y-6 pt-8 border-t border-white/20">
              <div className="flex items-center gap-3 text-white/90">
                <Mail className="w-4 h-4 text-[#17B8C2]" />
                <a
                  href="mailto:hello@offset.studio"
                  className="text-sm font-medium tracking-nav hover:text-[#17B8C2] transition-colors"
                >
                  hello@offset.studio
                </a>
              </div>

              <div className="flex items-center gap-3 text-white/80 text-sm">
                <MapPin className="w-4 h-4 text-[#17B8C2]" />
                <span>Private Commission Inquiries Worldwide</span>
              </div>

              <div className="flex items-center gap-3 text-white/80 text-sm">
                <Phone className="w-4 h-4 text-[#17B8C2]" />
                <span>Studio Desk: +44 20 7946 0912</span>
              </div>

              <div className="pt-4 text-xs font-mono tracking-widest text-white/50">
                AVERAGE RESPONSE TIME: &lt; 24 HOURS
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Form */}
          <div className="lg:col-span-7 xl:col-span-7 bg-[#141414] border border-white/15 p-6 sm:p-10 lg:p-12">
            {isSubmitted ? (
              <div className="py-16 text-center space-y-6">
                <div className="w-16 h-16 bg-[#17B8C2]/20 border border-[#17B8C2] text-[#17B8C2] flex items-center justify-center mx-auto rounded-none">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-light text-white tracking-tight">
                  Enquiry Received
                </h3>
                <p className="text-white/70 max-w-md mx-auto text-sm leading-relaxed">
                  Thank you for sharing your property vision. Our studio team will review your requirements and follow up with a bespoke proposal deck within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-xs uppercase tracking-button text-[#17B8C2] hover:underline"
                >
                  SEND ANOTHER ENQUIRY
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Heading */}
                <div className="border-b border-white/15 pb-4 mb-6">
                  <span className="text-xs font-medium tracking-editorial uppercase text-[#17B8C2] block mb-1">
                    PROJECT SCOPE & TIMELINE
                  </span>
                  <div className="text-lg font-light text-white">
                    Tell us about the space you want to capture.
                  </div>
                </div>

                {/* Service Selection Pills */}
                <div>
                  <label className="block text-xs font-medium tracking-editorial uppercase text-white/70 mb-3">
                    PRIMARY REQUIREMENT
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, service: s.id })}
                        className={`text-xs uppercase tracking-nav px-4 py-2.5 transition-colors cursor-pointer border ${
                          formData.service === s.id
                            ? 'bg-[#17B8C2] text-[#090909] border-[#17B8C2] font-semibold'
                            : 'bg-black/30 text-white/80 border-white/20 hover:border-white/50'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium tracking-editorial uppercase text-white/70 mb-2"
                    >
                      YOUR NAME *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Julian Vance"
                      className="w-full bg-black/40 border border-white/20 focus:border-[#17B8C2] focus:outline-none text-white px-4 py-3 text-sm rounded-none transition-colors"
                    />
                    {errors.name && (
                      <span className="text-xs text-[#E35D43] mt-1 block">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium tracking-editorial uppercase text-white/70 mb-2"
                    >
                      EMAIL ADDRESS *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. julian@vancepartners.com"
                      className="w-full bg-black/40 border border-white/20 focus:border-[#17B8C2] focus:outline-none text-white px-4 py-3 text-sm rounded-none transition-colors"
                    />
                    {errors.email && (
                      <span className="text-xs text-[#E35D43] mt-1 block">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Company / Property Name & Target Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-xs font-medium tracking-editorial uppercase text-white/70 mb-2"
                    >
                      PROPERTY / COMPANY NAME
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Villa Marrakech / Sotheby's"
                      className="w-full bg-black/40 border border-white/20 focus:border-[#17B8C2] focus:outline-none text-white px-4 py-3 text-sm rounded-none transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-timeline"
                      className="block text-xs font-medium tracking-editorial uppercase text-white/70 mb-2"
                    >
                      EXPECTED TIMELINE
                    </label>
                    <select
                      id="contact-timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full bg-[#111] border border-white/20 focus:border-[#17B8C2] focus:outline-none text-white px-4 py-3 text-sm rounded-none transition-colors cursor-pointer"
                    >
                      <option value="immediate">Immediate (&lt; 2 weeks)</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="1-3-months">1 to 3 months</option>
                      <option value="planning">Pre-construction / Planning</option>
                    </select>
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label
                    htmlFor="contact-details"
                    className="block text-xs font-medium tracking-editorial uppercase text-white/70 mb-2"
                  >
                    PROPERTY LOCATION & SCOPE DETAILS *
                  </label>
                  <textarea
                    id="contact-details"
                    rows={4}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Tell us about the architectural style, location, square meters, key spaces to highlight, or current marketing challenges..."
                    className="w-full bg-black/40 border border-white/20 focus:border-[#17B8C2] focus:outline-none text-white p-4 text-sm rounded-none transition-colors resize-none"
                  />
                  {errors.details && (
                    <span className="text-xs text-[#E35D43] mt-1 block">
                      {errors.details}
                    </span>
                  )}
                </div>

                {/* Submit Row */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-[11px] text-white/50 tracking-wider">
                    CONFIDENTIALITY ASSURED · NDA AVAILABLE
                  </div>

                  <ArrowButton
                    id="contact-submit-btn"
                    variant="white"
                    type="submit"
                    className="w-full sm:w-auto"
                  >
                    SUBMIT ENQUIRY
                  </ArrowButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
