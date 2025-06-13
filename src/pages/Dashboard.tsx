import React from "react";
import Navigation from "@/components/layout/Navigation";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { useSaveData } from "@/hooks/useSaveData";

const Dashboard = () => {
  const { loadUsers, loadKeys } = useSaveData();

  // Загружаем данные
  const users = loadUsers();
  const keys = loadKeys();

  // Проверяем роль пользователя
  const currentUser = JSON.parse(localStorage.getItem("current_user") || "{}");
  const userRole = currentUser.role;
  const isManager = userRole === "manager" || userRole === "admin";

  // Вычисляем статистику
  const totalKeys = keys.length;
  const issuedToday = keys.filter((key) => {
    if (!key.issuedAt) return false;
    const today = new Date().toDateString();
    const issuedDate = new Date(key.issuedAt).toDateString();
    return issuedDate === today;
  }).length;
  const activeUsers = users.filter((user) => user.status === "active").length;
  const lostKeys = keys.filter((key) => key.status === "lost").length;

  // Группируем пользователей по отделам
  const departmentStats = users.reduce(
    (acc, user) => {
      if (!acc[user.department]) {
        acc[user.department] = { active: 0, total: 0 };
      }
      acc[user.department].total++;
      if (user.status === "active") {
        acc[user.department].active++;
      }
      return acc;
    },
    {} as Record<string, { active: number; total: number }>,
  );

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
            value={totalKeys}
            icon="Key"
            color="primary"
          />
          <StatCard
            title="Выдано сегодня"
            value={issuedToday}
            icon="TrendingUp"
            color="success"
          />
          {isManager && (
            <StatCard
              title="Активных пользователей"
              value={activeUsers}
              icon="Users"
              color="primary"
            />
          )}
          {isManager && (
            <StatCard
              title="Утерянных ключей"
              value={lostKeys}
              icon="AlertTriangle"
              color="warning"
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />

          {isManager && (
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">
                Статистика по отделам
              </h3>
              <div className="space-y-3">
                {Object.entries(departmentStats).map(([department, stats]) => (
                  <div
                    key={department}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm text-gray-600">{department}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: `${(stats.active / stats.total) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {stats.active}/{stats.total}
                      </span>
                    </div>
                  </div>
                ))}
                {Object.keys(departmentStats).length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    Нет данных по отделам
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
