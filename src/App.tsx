import React, { useState, useEffect } from 'react';  
import Sidebar from './components/Sidebar';  
import { Menu, Bell, Search } from 'lucide-react';  
import DashboardHome from './pages/DashboardHome';  
import BookList from './pages/BookList';  
import BookForm from './pages/BookForm';  
import Settings from './pages/Settings';  
import Login from './pages/Login';  
import { View, Book, Order } from './types';  
import { getBooks, getOrders, addBookToDB, updateBookInDB } from './services/firebase';  
  
const App: React.FC = () => {  
  const [isAuthenticated, setIsAuthenticated] = useState(false);  
  const [darkMode, setDarkMode] = useState(false);  
  const [currentView, setCurrentView] = useState<View>('dashboard');  
  const [isMobileOpen, setIsMobileOpen] = useState(false);  
    
  const [books, setBooks] = useState<Book[]>([]);  
  const [orders, setOrders] = useState<Order[]>([]);  
  const [loading, setLoading] = useState(true);  
  const [editingBook, setEditingBook] = useState<Book | null>(null);  
  
  useEffect(() => {  
    if (isAuthenticated) {  
      const fetchData = async () => {  
        setLoading(true);  
        const [booksData, ordersData] = await Promise.all([getBooks(), getOrders()]);  
        setBooks(booksData);  
        setOrders(ordersData);  
        setLoading(false);  
      };  
      fetchData();  
    }  
  }, [isAuthenticated]);  
  
  const handleLogin = () => {  
    setIsAuthenticated(true);  
  };  
  
  const handleLogout = () => {  
    setIsAuthenticated(false);  
    setCurrentView('dashboard');  
  };  
  
  const toggleTheme = () => {  
    setDarkMode(!darkMode);  
  };  
  
  const handleAddClick = () => {  
    setEditingBook(null);  
    setCurrentView('add-book');  
  };  
  
  const handleEditClick = (book: Book) => {  
    setEditingBook(book);  
    setCurrentView('add-book');  
  };  
  
  const handleSaveBook = async (book: Book) => {  
    setLoading(true);  
    if (editingBook) {  
      const updatedBook = await updateBookInDB(book);  
      setBooks(prev => prev.map(b => b.id === updatedBook.id ? updatedBook : b));  
    } else {  
      const savedBook = await addBookToDB(book);  
      setBooks(prev => [...prev, savedBook]);  
    }  
    setEditingBook(null);  
    setLoading(false);  
    setCurrentView('books');  
  };  
  
  const handleCancelForm = () => {  
    setEditingBook(null);  
    setCurrentView('books');  
  };  
  
  const renderContent = () => {  
    if (loading) {  
      return (  
        <div className="flex items-center justify-center h-full">  
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>  
        </div>  
      );  
    }  
  
    switch (currentView) {  
      case 'dashboard':  
        return <DashboardHome orders={orders} />;  
      case 'books':  
        return <BookList books={books} onAddClick={handleAddClick} onEditClick={handleEditClick} />;  
      case 'add-book':  
        return <BookForm initialData={editingBook} onSave={handleSaveBook} onCancel={handleCancelForm} />;  
      case 'orders':  
        return <div className="p-10 text-center text-gray-500 dark:text-gray-400">Orders Management Module (Coming Soon)</div>;  
      case 'settings':  
        return <Settings darkMode={darkMode} toggleTheme={toggleTheme} />;  
      default:  
        return <DashboardHome orders={orders} />;  
    }  
  };  
  
  if (!isAuthenticated) {  
    return <Login onLogin={handleLogin} />;  
  }  
  
  return (  
    <div className={`${darkMode ? 'dark' : ''}`}>  
      <div className="flex min-h-screen bg-[#F3F4F6] dark:bg-slate-900 transition-colors duration-200">  
        <Sidebar   
          currentView={currentView}   
          setCurrentView={setCurrentView}   
          isMobileOpen={isMobileOpen}  
          setIsMobileOpen={setIsMobileOpen}  
          onLogout={handleLogout}  
        />  
  
        <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">  
          <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 h-20 px-6 flex items-center justify-between transition-colors">  
            <div className="flex items-center">  
              <button   
                onClick={() => setIsMobileOpen(true)}  
                className="lg:hidden p-2 mr-4 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"  
              >  
                <Menu className="w-6 h-6" />  
              </button>  
              <h2 className="text-xl font-bold text-gray-800 dark:text-white capitalize hidden sm:block">  
                {currentView.replace('-', ' ')}  
              </h2>  
            </div>  
  
            <div className="flex items-center space-x-4">  
              <div className="hidden md:flex relative">  
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />  
                <input   
                  type="text"   
                  placeholder="Search..."   
                  className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-slate-800 border-none rounded-full text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none w-64 transition-all"  
                />  
              </div>  
              <button className="relative p-2 text-gray-400 hover:text-orange-500 transition-colors">  
                <Bell className="w-6 h-6" />  
              </button>  
              <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-orange-500 text-white flex items-center justify-center font-bold cursor-pointer hover:bg-slate-800 dark:hover:bg-orange-600 transition-colors">  
                AD  
              </div>  
            </div>  
          </header>  
  
          <main className="flex-1 p-6 overflow-auto">  
            {renderContent()}  
          </main>  
        </div>  
      </div>  
    </div>  
  );  
};  
  
export default App;  