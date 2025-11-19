import React, { useState } from 'react';
import { Book, Category } from '../types';
import { generateBookDescription } from '../services/gemini';
import { Sparkles, Loader2, ArrowLeft } from 'lucide-react';

interface BookFormProps {
  onSave: (book: Book) => void;
  onCancel: () => void;
  initialData?: Book | null;
}

const BookForm: React.FC<BookFormProps> = ({ onSave, onCancel, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [author, setAuthor] = useState(initialData?.author || '');
  const [price, setPrice] = useState<number>(initialData?.price || 0);
  const [stock, setStock] = useState<number>(initialData?.stock || 0);
  const [category, setCategory] = useState<Category>(initialData?.category || Category.FICTION);
  const [description, setDescription] = useState(initialData?.description || '');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateDescription = async () => {
    if (!title || !author) {
      alert("Please enter Title and Author first.");
      return;
    }
    setIsGenerating(true);
    const desc = await generateBookDescription(title, author, category);
    setDescription(desc);
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook: Book = {
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
      title,
      author,
      price,
      stock,
      category,
      description,
      coverUrl: initialData?.coverUrl || `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 100)}`
    };
    onSave(newBook);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <button onClick={onCancel} className="flex items-center text-gray-500 dark:text-gray-400 hover:text-orange-500 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Inventory
      </button>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {initialData ? 'Edit Book' : 'Add New Book'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {initialData ? 'Update book details below.' : 'Enter book details below. Use AI to help with descriptions.'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Book Title</label>
              <input 
                required
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                placeholder="e.g. The Great Gatsby"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Author</label>
              <input 
                required
                type="text" 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                placeholder="e.g. F. Scott Fitzgerald"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price ($)</label>
              <input 
                required
                type="number" 
                step="0.01"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stock</label>
              <input 
                required
                type="number" 
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              >
                {Object.values(Category).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <button 
                type="button"
                onClick={handleGenerateDescription}
                disabled={isGenerating}
                className="text-xs flex items-center text-orange-600 dark:text-orange-400 font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 px-3 py-1 rounded-full"
              >
                {isGenerating ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />}
                {isGenerating ? 'Generating...' : 'Auto-Generate with Gemini'}
              </button>
            </div>
            <textarea 
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              placeholder="Enter book description..."
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-4">
            <button 
              type="button" 
              onClick={onCancel}
              className="px-6 py-2 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow-lg shadow-orange-500/30"
            >
              {initialData ? 'Update Book' : 'Save Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
