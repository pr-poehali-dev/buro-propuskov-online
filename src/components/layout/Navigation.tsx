import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    return null;
  }

  const navItems = [
    { path: "/", label: "Дашборд", icon: "BarChart3" },
    { path: "/scanner", label: "Сканер", icon: "QrCode" },
    { path: "/keys", label: "Ключи", icon: "Key" },
    ...(currentUser?.role === "admin"
      ? [{ path: "/users", label: "Пользователи", icon: "Users" }]
      : []),
    { path: "/offices", label: "Кабинеты", icon: "Building" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" className="text-primary" size={24} />
            <h1 className="text-xl font-bold text-gray-900">Бюро пропусков</h1>
          </div>

          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={
                    location.pathname === item.path ? "default" : "ghost"
                  }
                  className="flex items-center space-x-2"
                >
                  <Icon name={item.icon as any} size={16} />
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Icon name="User" className="text-gray-600" size={20} />
          <span className="text-sm text-gray-600">
            {currentUser?.name || "Пользователь"}
          </span>
          <Button variant="ghost" size="sm" onClick={logout} className="ml-2">
            <Icon name="LogOut" size={16} />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
