import { User } from "@/hooks/useSaveData";

export const getRoleText = (role: User["role"]): string => {
  switch (role) {
    case "admin":
      return "Администратор";
    case "manager":
      return "Менеджер";
    case "employee":
      return "Сотрудник";
    default:
      return "Неизвестно";
  }
};

export const getRoleColor = (role: User["role"]): string => {
  switch (role) {
    case "admin":
      return "destructive";
    case "manager":
      return "secondary";
    case "employee":
      return "default";
    default:
      return "outline";
  }
};

export const getStatusText = (status: User["status"]): string => {
  switch (status) {
    case "active":
      return "Активен";
    case "inactive":
      return "Неактивен";
    default:
      return "Неизвестно";
  }
};

export const getStatusColor = (status: User["status"]): string => {
  switch (status) {
    case "active":
      return "default";
    case "inactive":
      return "secondary";
    default:
      return "outline";
  }
};
