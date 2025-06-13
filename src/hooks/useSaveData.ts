import { useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: "admin" | "manager" | "employee";
  status: "active" | "inactive";
  keysIssued: number;
}

export interface KeyRecord {
  id: string;
  office: string;
  status: "available" | "issued" | "lost";
  issuedTo?: string;
  issuedAt?: string;
  department: string;
}

export const useSaveData = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const saveUsers = async (users: User[]) => {
    setIsSaving(true);

    // Имитация API запроса
    await new Promise((resolve) => setTimeout(resolve, 1000));

    localStorage.setItem("users_data", JSON.stringify(users));
    setLastSaved(new Date());
    setIsSaving(false);
  };

  const saveKeys = async (keys: KeyRecord[]) => {
    setIsSaving(true);

    // Имитация API запроса
    await new Promise((resolve) => setTimeout(resolve, 1000));

    localStorage.setItem("keys_data", JSON.stringify(keys));
    setLastSaved(new Date());
    setIsSaving(false);
  };

  const loadUsers = (): User[] => {
    const data = localStorage.getItem("users_data");
    return data ? JSON.parse(data) : [];
  };

  const loadKeys = (): KeyRecord[] => {
    const data = localStorage.getItem("keys_data");
    return data ? JSON.parse(data) : [];
  };

  return {
    isSaving,
    lastSaved,
    saveUsers,
    saveKeys,
    loadUsers,
    loadKeys,
  };
};
