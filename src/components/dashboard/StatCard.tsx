import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "primary" | "success" | "warning" | "danger";
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  color = "primary",
}) => {
  const colorClasses = {
    primary: "text-primary bg-primary/10",
    success: "text-green-600 bg-green-100",
    warning: "text-yellow-600 bg-yellow-100",
    danger: "text-red-600 bg-red-100",
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-full ${colorClasses[color]}`}>
          <Icon name={icon as any} size={16} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <Icon
              name={trend.isPositive ? "TrendingUp" : "TrendingDown"}
              size={12}
              className={trend.isPositive ? "text-green-600" : "text-red-600"}
            />
            <span
              className={`ml-1 ${trend.isPositive ? "text-green-600" : "text-red-600"}`}
            >
              {Math.abs(trend.value)}%
            </span>
            <span className="ml-1">за неделю</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
