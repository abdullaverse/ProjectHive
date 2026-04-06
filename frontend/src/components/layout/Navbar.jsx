import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, Hexagon, User, LogOut, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-card px-6 py-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg shadow-lg shadow-primary/20">
            <Hexagon className="text-white w-6 h-6 fill-white/20" />
          </div>
          <span className="font-heading text-xl font-black bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent uppercase tracking-tight">
            ProjectHive
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-300">
          <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
          <Link to="/categories" className="hover:text-primary transition-colors">Departments</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-800 transition-colors px-4 py-2 rounded-full border border-slate-700">
                <User size={16} />
                <span>{user.username}</span>
              </Link>
              <button onClick={handleLogout} className="text-slate-400 hover:text-accent transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="hover:text-primary">Login</Link>
              <Link to="/signup" className="bg-primary hover:bg-primary/90 text-slate-900 font-bold px-6 py-2 rounded-full transition-all shadow-lg shadow-primary/20">
                Join Now
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 p-4 glass-card animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-4 text-center">
            <Link to="/projects" onClick={() => setIsOpen(false)} className="text-lg py-2">Projects</Link>
            <Link to="/categories" onClick={() => setIsOpen(false)} className="text-lg py-2">Departments</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="text-lg py-2">Contact</Link>
            <hr className="border-slate-800" />
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-primary font-bold">Dashboard</Link>
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-accent">Logout</button>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-slate-300">Login</Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className="bg-primary text-slate-900 font-bold p-3 rounded-xl">Join Now</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
