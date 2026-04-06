import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, ShieldCheck, Zap, ArrowRight, Star, Layers, Cpu, Globe } from 'lucide-react';

const Card = ({ icon: Icon, title, desc }) => (
  <div className="glass-card p-8 group hover:-translate-y-2 transition-all duration-300">
    <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
      <Icon className="text-primary" size={28} />
    </div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

const Home = () => {
  return (
    <div className="space-y-32 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-primary text-sm font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Zap size={14} className="fill-primary" />
          <span>The Future of Engineering Projects is here</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000">
          Accelerate Your <br />
          <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent text-glow">
            Engineering Journey
          </span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          HEKA ProjectHive provides students with high-quality, ready-to-use engineering projects across all major departments. Verified by experts, built for success.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
          <Link to="/projects" className="bg-primary text-slate-900 font-bold px-10 py-4 rounded-full text-lg shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            Browse Projects
          </Link>
          <Link to="/contact" className="glass-card px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all border-slate-700">
            Contact Support
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-slate-800 pt-16">
          {[
            { label: 'Total Projects', val: '500+' },
            { label: 'Happy Students', val: '10k+' },
            { label: 'Departments', val: '12+' },
            { label: 'Rating', val: '4.9/5' }
          ].map((s, i) => (
            <div key={i} className="text-center group">
              <div className="text-3xl font-black text-white group-hover:text-primary transition-colors">{s.val}</div>
              <div className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Explore Departments</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Find projects specialized for your field of study</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card icon={Cpu} title="CSE & IT" desc="Advanced AI/ML, Cloud Computing, and App Development projects using modern stacks." />
          <Card icon={Globe} title="ECE & EEE" desc="Embedded Systems, IoT, Robotics and Power Electronics implementations." />
          <Card icon={Layers} title="Mechanical & Robotics" desc="CAD designs, Robotics automation, and Manufacturing process simulations." />
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="glass-card relative p-12 md:p-20 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] pointer-events-none" />
          <div className="max-w-xl">
            <h2 className="text-4xl font-black mb-8 leading-tight">Why Choose <br /><span className="text-primary uppercase tracking-tighter">ProjectHive?</span></h2>
            <ul className="space-y-6">
              {[
                { i: ShieldCheck, t: 'Verified Quality', d: 'Every project is thoroughly checked for academic standards and bug-free code.' },
                { i: Rocket, t: 'Instant Delivery', d: 'Get access to your project files immediately after purchase via your dashboard.' },
                { i: Star, t: 'Expert Support', d: 'Need help? Our team of engineers is available 24/7 to guide you through implementation.' }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 bg-primary/10 p-2 rounded-lg">
                    <item.i className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{item.t}</h4>
                    <p className="text-slate-400 text-sm">{item.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative bg-slate-900 border border-slate-700 p-4 rounded-3xl overflow-hidden aspect-square w-64 md:w-80">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" alt="Engineering Lab" className="w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="text-center space-y-10 py-20 rounded-[40px] bg-gradient-to-br from-indigo-900/40 via-slate-900/40 to-purple-900/40 border border-white/5 relative overflow-hidden backdrop-blur-3xl">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/20 blur-[120px]" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/20 blur-[120px]" />
          
          <h2 className="text-4xl md:text-6xl font-black text-white px-4">Ready to level up your academics?</h2>
          <p className="text-slate-400 max-w-xl mx-auto px-4">Join thousands of students and get access to the best projects today.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/signup" className="w-full sm:w-auto bg-primary text-slate-900 font-black px-12 py-5 rounded-full text-xl shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
              Create Free Account
            </Link>
            <Link to="/projects" className="w-full sm:w-auto group flex items-center justify-center gap-2 text-white font-bold text-lg hover:text-primary transition-colors">
              Explore Projects <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
