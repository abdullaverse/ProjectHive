import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Search, Filter, Cpu, Globe, Layers, ArrowRight, Star, ShoppingBag, Loader2 } from 'lucide-react';

const DEPARTMENTS = [
  { name: 'All', icon: Layers },
  { name: 'CSE', icon: Cpu },
  { name: 'ECE', icon: Globe },
  { name: 'EEE', icon: Cpu },
  { name: 'Robotics', icon: Layers },
  { name: 'Mechanical', icon: Layers }
];

const Projects = () => {
  const { api } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDept, setActiveDept] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.error('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filtered = projects.filter(p => {
    const matchDept = activeDept === 'All' || p.Department === activeDept;
    const matchSearch = p.Title.toLowerCase().includes(search.toLowerCase()) || 
                        p.Description.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black mb-4">Engineering Marketplace</h1>
          <p className="text-slate-400">Discover ready-to-deploy projects across all major departments</p>
        </div>
        
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white focus:border-primary/50 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Dept Filter */}
      <div className="flex flex-wrap gap-3 pb-4 border-b border-slate-800 overflow-x-auto no-scrollbar">
        {DEPARTMENTS.map((dept) => (
          <button
            key={dept.name}
            onClick={() => setActiveDept(dept.name)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap border ${
              activeDept === dept.name 
                ? 'bg-primary text-slate-900 border-primary shadow-lg shadow-primary/20 scale-105' 
                : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            {dept.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-40 flex flex-col items-center justify-center gap-4 text-slate-500">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="animate-pulse">Loading Projects Database...</p>
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((proj) => (
            <div key={proj.ProjectID} className="glass-card overflow-hidden group flex flex-col h-full bg-slate-900/30">
              <div className="relative h-60 w-full overflow-hidden bg-slate-800">
                <img 
                  src={proj.ImageURL || 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=800&auto=format&fit=crop'} 
                  alt={proj.Title} 
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=800&auto=format&fit=crop'; }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 left-4 bg-primary/90 text-slate-900 text-[10px] uppercase font-black px-2.5 py-1 rounded-md shadow-lg">
                  {proj.Department}
                </div>
                {proj.Featured && (
                  <div className="absolute top-4 right-4 bg-amber-500 text-slate-900 text-[10px] uppercase font-black px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1">
                    <Star size={10} fill="currentColor" /> Featured
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{proj.Title}</h3>
                <p className="text-slate-400 text-sm line-clamp-2 mb-6 flex-grow">{proj.Description}</p>
                <div className="pt-6 border-t border-slate-800/50 flex items-center justify-between mt-auto">
                  <div>
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Price</p>
                    <p className="text-2xl font-black text-white">₹{proj.Price}</p>
                  </div>
                  <Link 
                    to={`/projects/${proj.ProjectID}`} 
                    className="bg-primary/10 hover:bg-primary text-primary hover:text-slate-900 p-3 rounded-xl transition-all shadow-lg group-hover:shadow-primary/10 border border-primary/20"
                  >
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center glass-card">
          <ShoppingBag size={48} className="mx-auto text-slate-700 mb-4" />
          <h3 className="text-xl font-bold text-slate-300">No projects found</h3>
          <p className="text-slate-500 mt-2">Try adjusting your filters or search keywords.</p>
        </div>
      )}
    </div>
  );
};

export default Projects;
