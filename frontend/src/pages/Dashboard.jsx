import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, Mail, Clock, Shield, Package, 
  ChevronRight, ExternalLink, AlertCircle, 
  Download, CheckCircle2, History 
} from 'lucide-react';

const Dashboard = () => {
  const { user, api } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders');
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Profile Header */}
      <section className="glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center p-1 overflow-hidden">
            <img 
              src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${user?.username}`} 
              alt="Avatar" 
              className="w-full h-full rounded-full"
            />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">{user?.username}</h1>
            <div className="flex items-center gap-4 mt-2 text-slate-400 text-sm">
              <span className="flex items-center gap-1.5"><Mail size={14} className="text-primary" /> {user?.email}</span>
              <span className="flex items-center gap-1.5 capitalize"><Shield size={14} className="text-primary" /> {user?.role}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Last Login</p>
            <p className="text-white font-medium mt-1 flex items-center gap-2 justify-end">
              <Clock size={16} className="text-primary" /> 
              {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Just now'}
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Orders History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <History className="text-primary" />
              <span>Project History</span>
            </h2>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">
              {orders.length} Projects
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary"></div>
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.OrderID} className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/5 transition-all group">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                      <Package size={24} className="text-slate-400 group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-primary transition-colors">{order.ProjectTitle}</h4>
                      <p className="text-slate-500 text-xs mt-1">Order Date: {new Date(order.OrderDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between">
                    <div className="text-right">
                      <p className="text-white font-bold">₹{order.Price}</p>
                      <span className={`text-[10px] font-black uppercase tracking-[0.1em] px-2 py-0.5 rounded-full ${order.Status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {order.Status}
                      </span>
                    </div>
                    {order.Status === 'Delivered' ? (
                      <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all">
                        <Download size={20} />
                      </button>
                    ) : (
                      <button className="bg-slate-800 text-slate-400 p-2.5 rounded-xl cursor-not-allowed">
                        <Clock size={20} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-16 text-center space-y-4">
              <div className="bg-slate-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle size={32} className="text-slate-600" />
              </div>
              <h3 className="text-slate-300 font-bold">No orders found</h3>
              <p className="text-slate-500 text-sm max-w-xs mx-auto">You haven't ordered any engineering projects yet. Start exploring our marketplace!</p>
              <a href="/projects" className="inline-block text-primary font-bold hover:underline underline-offset-8 mt-4">Browse Projects <ChevronRight className="inline" size={16} /></a>
            </div>
          )}
        </div>

        {/* Notifications / Quick Links */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-black mb-6">Notifications</h2>
            <div className="space-y-4">
              {[
                { t: 'Welcome to ProjectHive', d: 'Thank you for joining our platform. Start your projects today!', c: 'primary' },
                { t: 'Profile Verified', d: 'Your account is now fully verified and secured.', c: 'emerald' },
              ].map((n, i) => (
                <div key={i} className="glass-card p-4 flex gap-4 items-start bg-slate-900/40">
                  <CheckCircle2 className={`text-${n.c}-500 shrink-0 mt-0.5`} size={18} />
                  <div>
                    <h5 className="font-bold text-sm text-white">{n.t}</h5>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">{n.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 bg-primary/5 border-primary/10">
            <h3 className="text-lg font-black mb-4 flex items-center gap-2">
              <Shield className="text-primary" size={20} /> Help & Security
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="/contact" className="flex items-center justify-between text-slate-300 hover:text-white group">
                  <span className="text-sm">Contact Support</span>
                  <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between text-slate-300 hover:text-white group">
                  <span className="text-sm">Security Guide</span>
                  <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
