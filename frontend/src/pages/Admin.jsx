import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, ShoppingBag, TrendingUp, 
  MessageSquare, Plus, Edit2, 
  Trash2, Check, X, ShieldAlert 
} from 'lucide-react';

const Admin = () => {
  const { api, user } = useAuth();
  const [stats, setStats] = useState({ totalUsers: 0, totalProjects: 0, totalOrders: 0, revenue: 0 });
  const [activeTab, setActiveTab] = useState('stats');
  const [projects, setProjects] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchStats();
      fetchProjects();
      fetchOrders();
      fetchMessages();
    }
  }, [user]);

  const fetchStats = async () => {
    try { const res = await api.get('/admin/stats'); setStats(res.data); } catch (e) {}
  };
  const fetchProjects = async () => {
    try { const res = await api.get('/projects'); setProjects(res.data); } catch (e) {}
  };
  const fetchOrders = async () => {
    try { const res = await api.get('/admin/orders'); setOrders(res.data); } catch (e) {}
  };
  const fetchMessages = async () => {
    try { const res = await api.get('/admin/messages'); setMessages(res.data); } catch (e) {}
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await api.put(`/admin/orders/${id}/status`, { status });
      fetchOrders();
    } catch (e) { alert('Update failed'); }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <ShieldAlert size={64} className="mx-auto text-red-500 mb-6" />
        <h1 className="text-3xl font-black mb-4 uppercase tracking-tighter">Access Forbidden</h1>
        <p className="text-slate-500">Only authorized engineering administrators can access this terminal.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      <div className="flex items-center justify-between">
         <h1 className="text-4xl font-black">Admin <span className="text-primary">Control Center</span></h1>
         <div className="flex gap-2">
            {['stats', 'projects', 'orders', 'messages'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-primary text-slate-900' : 'glass-card text-slate-500 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
         </div>
      </div>

      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { l: 'Total Users', v: stats.totalUsers, i: Users, c: 'blue' },
            { l: 'Total Projects', v: stats.totalProjects, i: ShoppingBag, c: 'purple' },
            { l: 'Total Orders', v: stats.totalOrders, i: TrendingUp, c: 'emerald' },
            { l: 'Revenue Generated', v: `₹${stats.revenue}`, i: Check, c: 'primary' }
          ].map((s, idx) => (
            <div key={idx} className="glass-card p-8 bg-slate-900/40 relative group overflow-hidden">
               <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-${s.c}-500/10 rounded-full blur-[40px] pointer-events-none group-hover:scale-150 transition-all`} />
               <s.i size={24} className={`text-${s.c}-400 mb-4`} />
               <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{s.l}</p>
               <h3 className="text-3xl font-black text-white">{s.v}</h3>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="glass-card overflow-hidden bg-slate-900/30">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-950/50">
              <tr>
                <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-500">Order ID</th>
                <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-500">User / Email</th>
                <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-500">Project / Price</th>
                <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-500">Status</th>
                <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map(o => (
                <tr key={o.OrderID} className="hover:bg-white/5 transition-colors group">
                   <td className="p-5 font-mono text-xs text-slate-500">{o.OrderID.split('-')[0]}...</td>
                   <td className="p-5">
                      <div className="text-sm font-bold text-white">{o.UserEmail}</div>
                      <div className="text-[10px] text-slate-500">{o.UserID.split('-')[0]}</div>
                   </td>
                   <td className="p-5">
                      <div className="text-sm font-bold text-primary">{o.ProjectTitle}</div>
                      <div className="text-[10px] text-slate-500">₹{o.Price}</div>
                   </td>
                   <td className="p-5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${o.Status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                         {o.Status}
                      </span>
                   </td>
                   <td className="p-5 flex gap-2">
                      {o.Status !== 'Delivered' && (
                        <button onClick={() => updateOrderStatus(o.OrderID, 'Delivered')} className="p-2 glass-card hover:bg-emerald-500 hover:text-slate-900 transition-all">
                           <Check size={14} />
                        </button>
                      )}
                      <button className="p-2 glass-card hover:bg-red-500 hover:text-white transition-all">
                         <X size={14} />
                      </button>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Basic Admin message area */}
      {activeTab === 'messages' && (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {messages.map(m => (
              <div key={m.MessageID} className="glass-card p-8 bg-slate-900/40 border-l-4 border-primary">
                 <div className="flex justify-between items-start mb-6">
                    <div>
                       <h4 className="font-bold text-white text-lg">{m.Subject}</h4>
                       <p className="text-slate-500 text-xs mt-1">From: {m.Name} ({m.Email})</p>
                    </div>
                    <div className="text-[10px] text-slate-600 font-bold uppercase">{new Date(m.CreatedAt).toLocaleDateString()}</div>
                 </div>
                 <p className="text-slate-400 text-sm italic leading-relaxed">"{m.Message}"</p>
                 <div className="mt-8 flex gap-4">
                    <button className="bg-primary/10 hover:bg-primary text-primary hover:text-slate-900 text-[10px] font-black uppercase px-4 py-2 rounded-lg transition-all">Reply</button>
                    <button className="glass-card hover:bg-red-500/20 text-slate-500 hover:text-red-400 p-2 rounded-lg transition-all"><Trash2 size={14} /></button>
                 </div>
              </div>
            ))}
         </div>
      )}

      {activeTab === 'projects' && (
         <div className="space-y-6">
            <button className="bg-primary text-slate-900 font-black px-8 py-4 rounded-2xl flex items-center gap-2 shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
               <Plus size={20} /> Add New Project
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {projects.map(p => (
                 <div key={p.ProjectID} className="glass-card p-6 bg-slate-900/10 group">
                    <div className="flex justify-between items-start mb-4">
                       <span className="text-[10px] font-black uppercase text-primary tracking-widest">{p.Department}</span>
                       <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 glass-card hover:bg-slate-800 transition-all"><Edit2 size={14} /></button>
                          <button className="p-2 glass-card hover:bg-red-500/20 text-red-400 transition-all"><Trash2 size={14} /></button>
                       </div>
                    </div>
                    <h4 className="font-bold text-white mb-2 leading-tight">{p.Title}</h4>
                    <p className="text-2xl font-black text-white">₹{p.Price}</p>
                 </div>
               ))}
            </div>
         </div>
      )}
    </div>
  );
};

export default Admin;
