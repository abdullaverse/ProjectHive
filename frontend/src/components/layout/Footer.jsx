import React from 'react';
import { Hexagon, Mail, Phone, MapPin, Globe, MessageCircle, Share2, Info } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 pt-20 pb-10 border-t border-slate-800 relative bg-slate-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Hexagon size={32} className="text-primary fill-primary/20" />
            <span className="font-heading text-2xl font-black text-white uppercase tracking-tight">ProjectHive</span>
          </div>
          <p className="text-slate-400 max-w-sm mb-8">
            HEKA ProjectHive is the leading futuristic platform for engineering students to find high-quality academic projects. Accelerate your career with our state-of-the-art marketplace.
          </p>
          <div className="flex gap-4">
            {[Globe, MessageCircle, Share2, Info].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-primary/20 transition-all text-slate-300 hover:text-primary">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="/projects" className="underline-offset-4 hover:underline hover:text-primary">All Projects</a></li>
            <li><a href="/categories" className="underline-offset-4 hover:underline hover:text-primary">Departments</a></li>
            <li><a href="/contact" className="underline-offset-4 hover:underline hover:text-primary">Contact Us</a></li>
            <li><a href="/dashboard" className="underline-offset-4 hover:underline hover:text-primary">User Dashboard</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Support</h4>
          <ul className="space-y-4 text-slate-400">
            <li className="flex items-center gap-3"><Mail size={18} className="text-primary" /> abdullaverse@gmail.com</li>
            <li className="flex items-center gap-3"><Phone size={18} className="text-primary" /> +91 9176590993</li>
            <li className="flex items-center gap-3"><MapPin size={18} className="text-primary" /> Chennai, India</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-slate-900 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} HEKA ProjectHive by Abdulla A. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
