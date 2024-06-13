
import { createContext } from 'react';
import { User } from '../types/User';
/**
 * Контекст авторизации
 */
export const AuthContext = createContext<{
    currentUser: User | null,
    setCurrentUser?: (user: User) => void
} | null>(null);