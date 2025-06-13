import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { User } from "@/hooks/useSaveData";
import { getRoleColor, getRoleText } from "@/utils/userUtils";

const CurrentUserDisplay: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const loadCurrentUser = () => {
      const stored = localStorage.getItem("currentUser");
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    };

    loadCurrentUser();

    const handleUserChange = () => {
      loadCurrentUser();
    };

    window.addEventListener("userChanged", handleUserChange);
    return () => window.removeEventListener("userChanged", handleUserChange);
  }, []);

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    window.dispatchEvent(new Event("userChanged"));
  };

  if (!currentUser) {
    return (
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-4">
          <div className="flex items-center space-x-3">
            <Icon name="AlertCircle" size={20} className="text-amber-600" />
            <span className="text-amber-800">Пользователь не выбран</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-green-200 bg-green-50">
      <CardContent className="pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="UserCheck" size={20} className="text-green-600" />
            <div>
              <div className="font-medium text-green-900">
                {currentUser.name}
              </div>
              <div className="text-sm text-green-700">
                {currentUser.department}
              </div>
            </div>
            <Badge variant={getRoleColor(currentUser.role) as any}>
              {getRoleText(currentUser.role)}
            </Badge>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={logout}
            className="text-red-600 hover:text-red-700"
          >
            <Icon name="LogOut" size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentUserDisplay;
