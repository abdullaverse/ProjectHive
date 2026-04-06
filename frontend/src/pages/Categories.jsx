import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, Globe, Layers, Zap, 
  Smartphone, Code, Database, 
  BrainCircuit, Bot, Hammer 
} from 'lucide-react';

const DEPARTMENTS = [
  { id: 'cse', name: 'Computer Science', icon: Cpu, color: 'blue', desc: 'AI/ML, Web Apps, Blockchain & Cloud computing projects.' },
  { id: 'ece', name: 'Electronics', icon: Globe, color: 'purple', desc: 'Embedded systems, VLSI, and Communication network designs.' },
  { id: 'me', name: 'Mechanical', icon: Hammer, color: 'orange', desc: 'CAD, Manufacturing, and Heat transfer simulation projects.' },
  { id: 'aiml', name: 'AI & ML', icon: BrainCircuit, color: 'pink', desc: 'Neural networks, Computer vision, and Deep learning implementations.' },
  { id: 'robotics', name: 'Robotics', icon: Bot, color: 'emerald', desc: 'Arduino, Raspberry Pi, and Autonomous system prototypes.' },
  { id: 'it', name: 'Information Tech', icon: Smartphone, color: 'indigo', desc: 'Network security, Database management, and Mobile apps.' }
];

const Categories = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-5xl font-black">Choose Your <span className="text-primary">Department</span></h1>
        <p className="text-slate-400 text-lg">Browse curated projects specifically designed for your field of engineering.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DEPARTMENTS.map((dept) => (
          <Link 
            to={`/projects?department=${dept.name}`} 
            key={dept.id}
            className="glass-card p-10 group relative overflow-hidden flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:bg-slate-900/50"
          >
            {/* Background Glow */}
            <div className={`absolute -bottom-12 -right-12 w-32 h-32 bg-${dept.color}-500/10 rounded-full blur-[60px] pointer-events-none transition-all group-hover:scale-150 group-hover:bg-${dept.color}-500/20`} />
            
            <div className={`bg-${dept.color}-500/10 p-6 rounded-[2rem] mb-8 transition-all group-hover:scale-110 group-hover:rotate-6`}>
              <dept.icon size={48} className={`text-${dept.color}-400 group-hover:text-${dept.color}-300 transition-colors`} />
            </div>

            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{dept.name}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-10 group-hover:text-slate-300 transition-colors uppercase tracking-widest font-medium">
              {dept.desc}
            </p>

            <span className="mt-auto inline-flex items-center gap-2 text-xs font-black text-primary uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
              View {dept.name} Projects <Zap size={14} className="fill-primary" />
            </span>
          </Link>
        ))}
      </div>

      {/* Specialty Row */}
      <div className="glass-card p-12 bg-gradient-to-br from-slate-900 to-indigo-950 flex flex-col md:flex-row items-center justify-between gap-12 mt-20">
         <div className="max-w-xl">
           <h2 className="text-3xl font-black mb-4">Can't find your department?</h2>
           <p className="text-slate-400">Our engineers are constantly expanding the library. You can request a custom project according to your requirements.</p>
         </div>
         <Link to="/contact" className="bg-white text-slate-900 font-black px-10 py-4 rounded-full shadow-2xl hover:bg-primary transition-all whitespace-nowrap">
           Request Custom Project
         </Link>
      </div>
    </div>
  );
};

export default Categories;
