import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Briefcase, Zap, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Contact = () => {
  const { api } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-20">
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-5xl font-black">Get in <span className="text-primary">Touch</span></h1>
        <p className="text-slate-400 text-lg">Have a question or need a custom engineering project? Our team is ready to help you build the future.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="glass-card p-8 bg-slate-900/40">
              <Mail className="text-primary mb-6" size={32} />
              <h4 className="font-bold text-white mb-2">Email Us</h4>
              <p className="text-slate-400 text-sm">abdullaverse@gmail.com</p>
              <p className="text-slate-500 text-[10px] uppercase font-bold mt-4 tracking-widest">Response in 24h</p>
            </div>
            <div className="glass-card p-8 bg-slate-900/40">
              <Phone className="text-primary mb-6" size={32} />
              <h4 className="font-bold text-white mb-2">Call Us</h4>
              <p className="text-slate-400 text-sm">+91 9176590993</p>
              <p className="text-slate-500 text-[10px] uppercase font-bold mt-4 tracking-widest">9 AM - 6 PM IST</p>
            </div>
          </div>

          <div className="glass-card p-8 flex gap-6 bg-slate-900/40">
            <div className="bg-primary/20 p-4 rounded-2xl h-fit">
              <MapPin className="text-primary" size={32} />
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Our Location</h4>
              <p className="text-slate-400 leading-relaxed">
                ProjectHive Research Lab,<br />
                Near Anna University, Guindy,<br />
                Chennai, Tamil Nadu 600025, India
              </p>
            </div>
          </div>

          <div className="glass-card p-10 bg-primary/5 border-primary/10 overflow-hidden relative">
             <div className="absolute top-0 right-0 p-4 text-primary opacity-20"><Zap size={48} /></div>
             <h3 className="text-xl font-black mb-4">Engineering Partnerships</h3>
             <p className="text-slate-400 text-sm mb-6">We collaborate with universities and research labs to provide students with industrial-grade project implementations.</p>
             <button className="text-primary font-black uppercase text-xs tracking-widest hover:underline flex items-center gap-2">Learn More <Briefcase size={14} /></button>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-card p-10 bg-slate-900/50 border-white/5 relative">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/40 rounded-br-2xl" />
          
          <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
             <MessageSquare className="text-primary" /> Send Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-4 px-4 text-white outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-4 px-4 text-white outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Subject</label>
              <input 
                type="text" 
                required
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-4 px-4 text-white outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                placeholder="Project Request / Query"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Message</label>
              <textarea 
                rows="5" 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-4 px-4 text-white outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all shadow-inner resize-none"
                placeholder="Tell us what you're looking for..."
              ></textarea>
            </div>

            {success && (
              <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 p-4 rounded-xl flex items-center gap-3 text-sm animate-in zoom-in duration-300">
                <CheckCircle2 size={18} />
                <span>Message sent successfully! We'll reply soon.</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-slate-900 font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-primary/20 group transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  <span>Initialize Contact</span>
                  <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
