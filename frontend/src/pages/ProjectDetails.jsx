import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowLeft, ShoppingCart, ShieldCheck, 
  FileText, Star, Clock, CheckCircle2, 
  AlertTriangle, Loader2, Download 
} from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();
  const { api, user } = useAuth();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        console.error('Project not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleOrder = async () => {
    if (!user) return navigate('/login');
    setOrdering(true);
    try {
      await api.post('/orders', { projectId: id });
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      alert('Failed to place order. Please try again.');
    } finally {
      setOrdering(false);
    }
  };

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  if (!project) return (
    <div className="max-w-7xl mx-auto px-6 py-20 text-center">
      <AlertTriangle size={64} className="mx-auto text-amber-500 mb-6" />
      <h2 className="text-3xl font-black mb-4">Project Not Found</h2>
      <Link to="/projects" className="text-primary font-bold hover:underline">Back to Marketplace</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={18} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Image & Preview */}
        <div className="space-y-8">
          <div className="glass-card overflow-hidden h-[400px] w-full relative group bg-slate-800">
            <img 
              src={project.ImageURL || 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=800&auto=format&fit=crop'} 
              alt={project.Title} 
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=800&auto=format&fit=crop'; }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-6 left-6 bg-primary/95 text-slate-900 font-black px-4 py-1.5 rounded-full text-xs shadow-xl uppercase tracking-widest">
              {project.Department}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
             {[1,2,3].map(i => (
               <div key={i} className="glass-card aspect-square bg-slate-900/40 flex items-center justify-center border-slate-800">
                 <FileText size={24} className="text-slate-600" />
               </div>
             ))}
          </div>
        </div>

        {/* Right: Details & Action */}
        <div className="space-y-10">
          <div>
            <h1 className="text-4xl font-black mb-4 leading-tight">{project.Title}</h1>
            <div className="flex items-center gap-6 mt-6">
              <span className="flex items-center gap-2 text-amber-400 font-bold"><Star size={18} fill="currentColor" /> 4.9 (124 Reviews)</span>
              <span className="flex items-center gap-2 text-emerald-400 font-bold"><CheckCircle2 size={18} /> Verified Quality</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-slate-400 text-lg leading-relaxed">{project.Description}</p>
          </div>

          <div className="glass-card p-8 bg-slate-900/50 border-white/5 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] pointer-events-none" />
            
            <div className="flex items-baseline justify-between border-b border-white/5 pb-6">
              <span className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">Total Price</span>
              <span className="text-4xl font-black text-white">₹{project.Price}</span>
            </div>

            <div className="space-y-4">
               {['Full Source Code', 'Project PDF & Documentation', 'Installation Guide', 'Future Updates'].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                   <div className="bg-primary/20 p-1 rounded-md"><CheckCircle2 size={14} className="text-primary" /></div>
                   {item}
                 </div>
               ))}
            </div>

            {success ? (
              <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 p-4 rounded-2xl flex items-center justify-center gap-3 font-bold animate-in zoom-in duration-300">
                <CheckCircle2 size={24} />
                <span>Order Placed! Redirecting...</span>
              </div>
            ) : (
              <button 
                onClick={handleOrder}
                disabled={ordering}
                className="w-full bg-primary hover:bg-primary/90 text-slate-900 font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-primary/20 group active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {ordering ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    <ShoppingCart size={24} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Order Project Files</span>
                  </>
                )}
              </button>
            )}
            
            <div className="flex items-center justify-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest pt-2">
              <ShieldCheck size={14} /> 100% Secure Transaction
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4 flex gap-4 items-center bg-slate-900/30">
              <Clock className="text-primary" size={20} />
              <div>
                <p className="text-white text-xs font-bold uppercase">Delivery</p>
                <p className="text-slate-400 text-[10px]">Instant Download</p>
              </div>
            </div>
            <div className="glass-card p-4 flex gap-4 items-center bg-slate-900/30">
              <Download className="text-primary" size={20} />
              <div>
                <p className="text-white text-xs font-bold uppercase">File Type</p>
                <p className="text-slate-400 text-[10px]">ZIP (Source + PDF)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
