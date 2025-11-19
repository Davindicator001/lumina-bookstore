import { Book, Order, Category } from '../types';

// Mock Database Service to simulate Firebase calls
const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    price: 24.99,
    stock: 45,
    category: Category.FICTION,
    description: 'Between life and death there is a library, and within that library, the shelves go on forever.',
    coverUrl: 'https://picsum.photos/200/300?random=1'
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 19.99,
    stock: 120,
    category: Category.NON_FICTION,
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day.',
    coverUrl: 'https://picsum.photos/200/300?random=2'
  },
  {
    id: '3',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    price: 29.99,
    stock: 15,
    category: Category.SCI_FI,
    description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission.',
    coverUrl: 'https://picsum.photos/200/300?random=3'
  }
];

const MOCK_ORDERS: Order[] = [
  { id: 'ord-001', customerName: 'Alice Johnson', bookTitle: 'Atomic Habits', amount: 19.99, status: 'Completed', date: '2023-10-25' },
  { id: 'ord-002', customerName: 'Bob Smith', bookTitle: 'The Midnight Library', amount: 24.99, status: 'Pending', date: '2023-10-26' },
  { id: 'ord-003', customerName: 'Charlie Brown', bookTitle: 'Project Hail Mary', amount: 29.99, status: 'Completed', date: '2023-10-26' },
  { id: 'ord-004', customerName: 'Dana White', bookTitle: 'Atomic Habits', amount: 19.99, status: 'Cancelled', date: '2023-10-24' },
];

export const getBooks = async (): Promise<Book[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([...MOCK_BOOKS]), 500));
};

export const getOrders = async (): Promise<Order[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([...MOCK_ORDERS]), 500));
};

export const addBookToDB = async (book: Book): Promise<Book> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      MOCK_BOOKS.push(book);
      resolve(book);
    }, 800);
  });
};

export const updateBookInDB = async (book: Book): Promise<Book> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = MOCK_BOOKS.findIndex(b => b.id === book.id);
      if (index !== -1) {
        MOCK_BOOKS[index] = book;
      }
      resolve(book);
    }, 800);
  });
};
