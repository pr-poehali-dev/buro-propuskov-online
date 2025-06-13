export const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "destructive";
    case "manager":
      return "default";
    case "employee":
      return "secondary";
    default:
      return "outline";
  }
};

export const getRoleText = (role: string) => {
  switch (role) {
    case "admin":
      return "Администратор";
    case "manager":
      return "Менеджер";
    case "employee":
      return "Сотрудник";
    default:
      return role;
  }
};

export const getStatusColor = (status: string) => {
  return status === "active" ? "secondary" : "outline";
};

export const getStatusText = (status: string) => {
  return status === "active" ? "Активен" : "Неактивен";
};
