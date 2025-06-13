import React from "react";
import Navigation from "@/components/layout/Navigation";
import BarcodeScanner from "@/components/scanner/BarcodeScanner";

const Scanner = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Сканер штрихкодов
          </h1>
          <p className="text-gray-600">
            Идентификация сотрудников для выдачи ключей
          </p>
        </div>
        <BarcodeScanner />
      </div>
    </div>
  );
};

export default Scanner;
