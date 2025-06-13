import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface ActivityItem {
  id: string;
  user: string;
  action: "issued" | "returned" | "created";
  office: string;
  time: string;
}

const RecentActivity: React.FC = () => {
  const activities: ActivityItem[] = [
    {
      id: "1",
      user: "Иванов И.И.",
      action: "issued",
      office: "Каб. 301",
      time: "10:30",
    },
    {
      id: "2",
      user: "Петрова А.С.",
      action: "returned",
      office: "Каб. 205",
      time: "10:15",
    },
    {
      id: "3",
      user: "Сидоров П.П.",
      action: "issued",
      office: "Каб. 410",
      time: "09:45",
    },
    {
      id: "4",
      user: "Козлова М.В.",
      action: "created",
      office: "-",
      time: "09:30",
    },
  ];

  const getActionText = (action: string) => {
    switch (action) {
      case "issued":
        return "Выдан ключ";
      case "returned":
        return "Возвращен ключ";
      case "created":
        return "Создан пользователь";
      default:
        return action;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "issued":
        return "default";
      case "returned":
        return "secondary";
      case "created":
        return "outline";
      default:
        return "default";
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "issued":
        return "Key";
      case "returned":
        return "KeyRound";
      case "created":
        return "UserPlus";
      default:
        return "Activity";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Icon name="Clock" size={20} />
          <span>Последние действия</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Icon
                    name={getActionIcon(activity.action) as any}
                    size={14}
                    className="text-primary"
                  />
                </div>
                <div>
                  <div className="font-medium text-sm">{activity.user}</div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Badge
                      variant={getActionColor(activity.action) as any}
                      className="text-xs"
                    >
                      {getActionText(activity.action)}
                    </Badge>
                    {activity.office !== "-" && <span>{activity.office}</span>}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">{activity.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
