import { useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  barcode?: string;
  login?: string;
  password?: string;
  department: string;
  role: "employee" | "manager" | "admin";
  status: "active" | "inactive";
  keysIssued: number;
  faceId?: string; // Новое поле для Face ID
}

export interface KeyRecord {
  id: string;
  office: string;
  status: "available" | "issued" | "lost";
  department: string;
  barcode?: string;
  issuedTo?: string;
  issuedAt?: string;
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

  const deleteUser = (userId: string) => {
    const users = loadUsers();
    const updatedUsers = users.filter((user) => user.id !== userId);
    localStorage.setItem("users_data", JSON.stringify(updatedUsers));
    return updatedUsers;
  };

  const deleteKey = (keyId: string) => {
    const keys = loadKeys();
    const updatedKeys = keys.filter((key) => key.id !== keyId);
    localStorage.setItem("keys_data", JSON.stringify(updatedKeys));
    return updatedKeys;
  };

  return {
    isSaving,
    lastSaved,
    saveUsers,
    saveKeys,
    loadUsers,
    loadKeys,
    deleteUser,
    deleteKey,
  };
};
