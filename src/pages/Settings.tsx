import React from 'react';
import { Moon, Sun, User } from 'lucide-react';

interface SettingsProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const Settings: React.FC<SettingsProps> = ({ darkMode, toggleTheme }) => {
  return (
    <div className="max-w-2xl mx-auto animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your dashboard preferences.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Customize how the dashboard looks.</p>
        </div>
        
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-indigo-500 text-white' : 'bg-orange-100 text-orange-600'}`}>
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{darkMode ? 'Enabled' : 'Disabled'}</p>
            </div>
          </div>
          
          <button 
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-orange-500' : 'bg-gray-200'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Account Information</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">View your administrator details.</p>
        </div>
        <div className="p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
             <User className="w-6 h-6" />
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Admin User</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">admin@luminabooks.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
