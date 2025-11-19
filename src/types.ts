export enum Category {
  FICTION = 'Fiction',
  NON_FICTION = 'Non-Fiction',
  SCI_FI = 'Sci-Fi',
  MYSTERY = 'Mystery',
  TECHNOLOGY = 'Technology',
  HISTORY = 'History'
}

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  stock: number;
  category: Category;
  description: string;
  coverUrl: string;
}

export interface Order {
  id: string;
  customerName: string;
  bookTitle: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Cancelled';
  date: string;
}

export interface SalesData {
  name: string;
  sales: number;
  revenue: number;
}

export type View = 'dashboard' | 'books' | 'add-book' | 'orders' | 'settings';
