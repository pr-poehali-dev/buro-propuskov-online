import React from "react";
import Navigation from "@/components/layout/Navigation";
import KeyManagement from "@/components/keys/KeyManagement";

const Keys = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Управление ключами
          </h1>
          <p className="text-gray-600">
            Выдача, возврат и учет ключей от кабинетов
          </p>
        </div>
        <KeyManagement
          userRole={
            JSON.parse(localStorage.getItem("current_user") || "{}").role
          }
        />
      </div>
    </div>
  );
};

export default Keys;
