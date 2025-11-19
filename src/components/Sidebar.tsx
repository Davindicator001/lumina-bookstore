import React from 'react';
import { LayoutDashboard, BookOpen, PlusCircle, ShoppingBag, Settings, LogOut, Library } from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isMobileOpen, setIsMobileOpen, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'books', label: 'Inventory', icon: BookOpen },
    { id: 'add-book', label: 'Add Book', icon: PlusCircle },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNav = (view: string) => {
    setCurrentView(view as View);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 z-30 h-screen w-64 bg-slate-900 dark:bg-slate-950 text-white transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static flex flex-col border-r border-slate-800 dark:border-slate-900
      `}>
        {/* Logo Area */}
        <div className="h-20 flex items-center px-8 border-b border-slate-800 dark:border-slate-900">
          <Library className="w-8 h-8 text-orange-500 mr-3" />
          <span className="text-xl font-bold tracking-wide">Lumina<span className="text-orange-500">Books</span></span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Main Menu</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 group
                  ${isActive 
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer / Profile */}
        <div className="p-4 border-t border-slate-800 dark:border-slate-900">
          <button 
            onClick={onLogout}
            className="flex items-center w-full px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-red-400 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
