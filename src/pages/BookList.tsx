import React from 'react';
import { Edit2, Trash2, Search } from 'lucide-react';
import { Book } from '../types';

interface BookListProps {
  books: Book[];
  onAddClick: () => void;
  onEditClick: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onAddClick, onEditClick }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Inventory</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your books and stock levels.</p>
        </div>
        <button 
          onClick={onAddClick}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg shadow-lg shadow-orange-500/30 transition-all font-medium"
        >
          + Add New Book
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-700/50 border-b border-gray-100 dark:border-slate-700">
                <th className="p-5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Book</th>
                <th className="p-5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                <th className="p-5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stock</th>
                <th className="p-5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <img src={book.coverUrl} alt={book.title} className="w-12 h-16 object-cover rounded shadow-sm" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{book.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{book.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-sm font-semibold text-gray-900 dark:text-white">${book.price}</td>
                  <td className="p-5 text-sm text-gray-600 dark:text-gray-400">{book.stock} units</td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => onEditClick(book)}
                        className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookList;
