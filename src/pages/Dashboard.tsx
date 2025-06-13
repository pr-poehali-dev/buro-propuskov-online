import React from "react";
import Navigation from "@/components/layout/Navigation";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivity from "@/components/dashboard/RecentActivity";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Дашборд</h1>
          <p className="text-gray-600">Обзор системы бюро пропусков</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Всего ключей"
            value={45}
            icon="Key"
            color="primary"
          />
          <StatCard
            title="Выдано сегодня"
            value={12}
            icon="TrendingUp"
            color="success"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Активных пользователей"
            value={28}
            icon="Users"
            color="primary"
          />
          <StatCard
            title="Утерянных ключей"
            value={3}
            icon="AlertTriangle"
            color="warning"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />

          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">
              Статистика по отделам
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">IT-отдел</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">15/20</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Бухгалтерия</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">6/10</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">HR</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">2/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
