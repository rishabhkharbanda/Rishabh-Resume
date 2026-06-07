import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle, 
  X, 
  AlertCircle, 
  ArrowRight,
  Shield,
  Briefcase
} from 'lucide-react';

interface ContactFormProps {
  onSuccess: (data: { name: string; email: string; subject: string; message: string }) => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Field Touched / Focused States
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [subjectTouched, setSubjectTouched] = useState(false);
  const [messageTouched, setMessageTouched] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  // Real-time validations
  const isNameValid = name.trim().length > 2;
  const isSubjectValid = subject.trim().length > 2;
  const isMessageValid = message.trim().length > 8;

  // Domain checks for Business Email requirement
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValidFormat = emailRegex.test(email);
  const isPersonalDomain = isEmailValidFormat && (
    email.toLowerCase().includes('@gmail.com') ||
    email.toLowerCase().includes('@yahoo.com') ||
    email.toLowerCase().includes('@outlook.com') ||
    email.toLowerCase().includes('@hotmail.com') ||
    email.toLowerCase().includes('@aol.com') ||
    email.toLowerCase().includes('@icloud.com') ||
    email.toLowerCase().includes('@personal.com')
  );

  const isEmailFullyValid = isEmailValidFormat && !isPersonalDomain;

  // Validate on Submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNameTouched(true);
    setEmailTouched(true);
    setSubjectTouched(true);
    setMessageTouched(true);

    if (isNameValid && isEmailFullyValid && isSubjectValid && isMessageValid) {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        onSuccess({ name, email, subject, message });
      }, 1200);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
      {/* Left Column: Direct Contact Info & Maps */}
      <div className="md:col-span-5 space-y-12">
        <div className="liquid-glass p-8 border border-outline-variant/40 relative group overflow-hidden rounded-3xl">
          {/* Subtle floating orb ambient background */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 -mr-8 -mt-8 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-300" />
          
          <h3 className="font-headline text-2xl font-bold mb-8">Get In Touch</h3>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-outline-variant/40 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-mono text-[9px] text-on-surface-variant mb-0.5 tracking-wider font-extrabold uppercase select-none">EMAIL</p>
                <a 
                  className="font-sans text-sm text-on-surface hover:text-primary transition-colors font-medium break-all" 
                  href="mailto:rishabhkharbanda08@gmail.com"
                >
                  rishabhkharbanda08@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-outline-variant/40 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-mono text-[9px] text-on-surface-variant mb-0.5 tracking-wider font-extrabold uppercase select-none">PHONE</p>
                <a 
                  className="font-sans text-sm text-on-surface hover:text-primary transition-colors font-medium" 
                  href="tel:+918604726050"
                >
                  +91 86047 26050
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-outline-variant/40 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-mono text-[9px] text-on-surface-variant mb-0.5 tracking-wider font-extrabold uppercase select-none">LOCATION</p>
                <p className="font-sans text-sm text-on-surface font-medium">Hyderabad, India</p>
              </div>
            </div>
          </div>

          {/* Social Links inside details card */}
          <div className="mt-10 pt-8 border-t border-outline-variant/30 flex gap-4">
            <a 
              className="w-11 h-11 flex items-center justify-center rounded-xl border border-outline-variant/40 bg-surface/30 hover:border-primary hover:text-primary transition-all active:scale-95 text-on-surface-variant" 
              href="https://www.linkedin.com/in/rishabh-kharbanda-7a3659209" 
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <Briefcase className="w-5 h-5" />
            </a>
            <a 
              className="w-11 h-11 flex items-center justify-center rounded-xl border border-outline-variant/40 bg-surface/30 hover:border-primary hover:text-primary transition-all active:scale-95 text-on-surface-variant" 
              href="tel:+918604726050"
              title="Phone"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Map Visualization of Hyderabad City */}
        <div className="relative aspect-video bg-surface-container overflow-hidden border border-outline-variant/40 rounded-3xl group/map">
          <img 
            alt="Hyderabad Hub map visual" 
            className="w-full h-full object-cover grayscale opacity-55 group-hover/map:grayscale-0 group-hover/map:opacity-85 transition-all duration-700" 
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxOGHCBso8GGUCGvJIl7I2LvW7dubU31T_RgT5-_74V7qDcVFGPV9L7-5UOhe8ZhDEFuWGHZPxXtNZnwYP--j_Xz9p_xPdu9-foaMOVoZKn26ByWMQk5pamtrjG8TEpNvp0JnlF-tyzezXOyKx3lJN4MB6RK4wrDhRSCE7RPca2PjU87pYkkP3K-QfTI1fPcvbbXq8viPJV0p_AWz6G2nx9xJXoxyyfViwMaxNVKReQ3pnLsx2N4eCwdzXxeLPF9SWIy6IkwSomuz1"
          />
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none" />
          <div className="absolute bottom-4 left-4 bg-surface/80 backdrop-blur-md p-3.5 border border-outline-variant/40 rounded-xl">
            <p className="font-mono text-[10px] text-primary uppercase tracking-widest font-extrabold">
              HYDERABAD HUB
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Contact Input Form */}
      <div className="md:col-span-7">
        <div className="liquid-glass-active p-8 md:p-12 border border-outline-variant/40 rounded-3xl shadow-xl">
          <form className="space-y-8" onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block font-bold">
                  FULL NAME
                </label>
                <div className="relative">
                  <input 
                    type="text"
                    required
                    value={name}
                    placeholder="John Doe"
                    onChange={(e) => {
                      setName(e.target.value);
                      setNameTouched(true);
                    }}
                    className={`w-full bg-surface/30 backdrop-blur-md border-2 p-4 outline-none transition-all rounded-xl text-sm focus:bg-surface/75 ${
                      nameTouched 
                        ? isNameValid 
                          ? 'border-primary' 
                          : 'border-red-400' 
                        : 'border-outline-variant/60 focus:border-primary'
                    }`}
                  />
                  {nameTouched && isNameValid && (
                    <CheckCircle className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-primary" />
                  )}
                  {nameTouched && !isNameValid && (
                    <AlertCircle className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-red-400" />
                  )}
                </div>
                {nameTouched && (
                  <p className={`font-mono text-[11px] mt-1 font-semibold ${isNameValid ? 'text-primary' : 'text-red-400'}`}>
                    {isNameValid ? 'Looks good!' : 'Please enter your full name'}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block font-bold">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <input 
                    type="email"
                    required
                    value={email}
                    placeholder="john@company.com"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailTouched(true);
                    }}
                    className={`w-full bg-surface/30 backdrop-blur-md border-2 p-4 outline-none transition-all rounded-xl text-sm focus:bg-surface/75 ${
                      emailTouched 
                        ? isEmailFullyValid 
                          ? 'border-primary' 
                          : 'border-red-400' 
                        : 'border-outline-variant/60 focus:border-primary'
                    }`}
                  />
                  {emailTouched && isEmailFullyValid && (
                    <CheckCircle className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-primary" />
                  )}
                  {emailTouched && !isEmailFullyValid && (
                    <AlertCircle className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-red-400" />
                  )}
                </div>
                {emailTouched && (
                  <p className={`font-mono text-[11px] mt-1 font-semibold ${isEmailFullyValid ? 'text-primary' : 'text-red-400'}`}>
                    {isEmailFullyValid 
                      ? 'Ready to go!' 
                      : isPersonalDomain 
                        ? 'Please enter a business email' 
                        : 'Please enter a valid email'}
                  </p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block font-bold">
                SUBJECT
              </label>
              <div className="relative">
                <input 
                  type="text"
                  required
                  value={subject}
                  placeholder="Growth Strategy Discussion"
                  onChange={(e) => {
                    setSubject(e.target.value);
                    setSubjectTouched(true);
                  }}
                  className={`w-full bg-surface/30 backdrop-blur-md border-2 p-4 outline-none transition-all rounded-xl text-sm focus:bg-surface/75 ${
                    subjectTouched 
                      ? isSubjectValid 
                        ? 'border-primary' 
                        : 'border-red-400'
                      : 'border-outline-variant/60 focus:border-primary'
                  }`}
                />
                {subjectTouched && isSubjectValid && (
                  <CheckCircle className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-primary" />
                )}
                {subjectTouched && !isSubjectValid && (
                  <AlertCircle className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-red-400" />
                )}
              </div>
              {subjectTouched && (
                <p className={`font-mono text-[11px] mt-1 font-semibold ${isSubjectValid ? 'text-primary' : 'text-red-400'}`}>
                  {isSubjectValid ? 'Looks good!' : 'Please input a strategic subject topic'}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block font-bold">
                MESSAGE
              </label>
              <div className="relative">
                <textarea 
                  required
                  rows={6}
                  value={message}
                  placeholder="Tell me about your project or data challenges..."
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setMessageTouched(true);
                  }}
                  className={`w-full bg-surface/30 backdrop-blur-md border-2 p-4 outline-none transition-all rounded-xl text-sm resize-none focus:bg-surface/75 ${
                    messageTouched 
                      ? isMessageValid 
                        ? 'border-primary' 
                        : 'border-red-400'
                      : 'border-outline-variant/60 focus:border-primary'
                  }`}
                />
                {messageTouched && isMessageValid && (
                  <CheckCircle className="w-5 h-5 absolute right-4 top-4 text-primary" />
                )}
                {messageTouched && !isMessageValid && (
                  <AlertCircle className="w-5 h-5 absolute right-4 top-4 text-red-400" />
                )}
              </div>
              {messageTouched && (
                <p className={`font-mono text-[11px] mt-1 font-semibold ${isMessageValid ? 'text-primary' : 'text-red-400'}`}>
                  {isMessageValid ? 'Ready to go!' : 'Please describe your request details (min. 8 characters)'}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={submitting}
              className="w-full md:w-auto bg-primary text-on-primary px-10 py-4.5 font-mono text-[11px] tracking-widest font-bold flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 transition-all group rounded-full cursor-pointer disabled:opacity-50 font-extrabold uppercase shadow-lg border-none"
            >
              <span>{submitting ? 'VALIDATING PACKETS...' : 'SEND MESSAGE'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
