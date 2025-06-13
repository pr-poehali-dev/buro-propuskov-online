import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/hooks/useSaveData";

interface AuthContextType {
  currentUser: User | null;
  login: (loginData: string, password: string, isAdmin?: boolean) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  resetPassword: (email: string) => boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Проверяем сохраненную сессию при загрузке
    const savedUser = localStorage.getItem("current_user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (
    loginData: string,
    password: string,
    isAdmin = false,
  ): boolean => {
    // Получаем список пользователей из localStorage
    const usersData = localStorage.getItem("users_data");
    const users: User[] = usersData
      ? JSON.parse(usersData)
      : [
          {
            id: "1",
            name: "Иванов Иван Иванович",
            email: "ivanov@company.ru",
            department: "IT",
            role: "admin",
            status: "active",
            keysIssued: 2,
            barcode: "1234567890",
            login: "admin",
            password: "admin",
          },
        ];

    // Специальная проверка для администратора
    if (isAdmin) {
      // Проверяем стандартные админские учетные данные
      if (loginData === "admin" && password === "admin") {
        const adminUser = users.find((u) => u.role === "admin") || {
          id: "1",
          name: "Администратор",
          email: "admin@company.ru",
          department: "Администрация",
          role: "admin",
          status: "active",
          keysIssued: 0,
          barcode: "ADMIN001",
          login: "admin",
          password: "admin",
        };
        setCurrentUser(adminUser);
        localStorage.setItem("current_user", JSON.stringify(adminUser));
        return true;
      }
      return false;
    }

    // Обычная проверка для сотрудников
    const user = users.find(
      (u) =>
        (u.login === loginData || u.email === loginData) &&
        u.password === password &&
        u.status === "active" &&
        u.role !== "admin",
    );

    if (user) {
      setCurrentUser(user);
      localStorage.setItem("current_user", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const resetPassword = (email: string): boolean => {
    // Получаем список пользователей
    const usersData = localStorage.getItem("users_data");
    const users: User[] = usersData ? JSON.parse(usersData) : [];

    // Проверяем существование пользователя с таким email
    const user = users.find((u) => u.email === email);

    if (user) {
      // В реальном приложении здесь бы отправлялось письмо с инструкциями
      console.log(`Инструкции по восстановлению пароля отправлены на ${email}`);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("current_user");
  };

  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated: !!currentUser,
    resetPassword,
    isAdmin: currentUser?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
