import React, { useState, useEffect } from "react";
import Navigation from "@/components/layout/Navigation";
import { Button } from "@/components/ui/button";

import Icon from "@/components/ui/icon";
import SaveButton from "@/components/ui/SaveButton";
import { useForm } from "react-hook-form";
import { useSaveData, User } from "@/hooks/useSaveData";
import UserTable from "@/components/users/UserTable";
import UserFormDialog from "@/components/users/UserFormDialog";

const Users = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Иванов Иван Иванович",
      email: "ivanov@company.ru",
      department: "IT",
      role: "admin",
      status: "active",
      keysIssued: 2,
      barcode: "1234567890",
      login: "ivanov",
      password: "pass123",
    },
    {
      id: "2",
      name: "Петрова Анна Сергеевна",
      email: "petrova@company.ru",
      department: "Бухгалтерия",
      role: "manager",
      status: "active",
      keysIssued: 1,
      barcode: "0987654321",
      login: "petrova",
      password: "pass456",
    },
    {
      id: "3",
      name: "Сидоров Петр Петрович",
      email: "sidorov@company.ru",
      department: "HR",
      role: "employee",
      status: "active",
      keysIssued: 0,
      barcode: "1122334455",
      login: "sidorov",
      password: "pass789",
    },
    {
      id: "4",
      name: "Козлова Мария Владимировна",
      email: "kozlova@company.ru",
      department: "IT",
      role: "employee",
      status: "inactive",
      keysIssued: 1,
      barcode: "5566778899",
      login: "kozlova",
      password: "pass000",
    },
  ]);

  const { isSaving, lastSaved, saveUsers, loadUsers } = useSaveData();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const createForm = useForm<User>();
  const editForm = useForm<User>();

  useEffect(() => {
    const savedUsers = loadUsers();
    if (savedUsers.length > 0) {
      setUsers(savedUsers);
    }
  }, []);

  const deleteUser = (userId: string) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const editUser = (user: User) => {
    setEditingUser(user);
    editForm.reset(user);
    setIsEditDialogOpen(true);
  };

  const updateUser = (data: User) => {
    if (!editingUser) return;

    const updatedUser: User = {
      ...editingUser,
      ...data,
    };

    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
    setIsEditDialogOpen(false);
    setEditingUser(null);
    editForm.reset();
  };

  const createUser = (data: User) => {
    const newUser: User = {
      ...data,
      id: Date.now().toString(),
      status: "active",
      keysIssued: 0,
    };
    setUsers([...users, newUser]);
    setIsCreateDialogOpen(false);
    createForm.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Управление пользователями
            </h1>
            <p className="text-gray-600">
              Создание и управление учетными записями сотрудников
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <SaveButton
              onSave={() => saveUsers(users)}
              isSaving={isSaving}
              lastSaved={lastSaved}
            />
            <UserFormDialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
              title="Создать нового пользователя"
              form={createForm}
              onSubmit={createUser}
              submitText="Создать пользователя"
            />
            <Button
              className="flex items-center space-x-2"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Icon name="UserPlus" size={16} />
              <span>Добавить пользователя</span>
            </Button>
          </div>
        </div>

        <UserFormDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          title="Редактировать пользователя"
          form={editForm}
          onSubmit={updateUser}
          submitText="Сохранить изменения"
          defaultValues={editingUser || undefined}
        />

        <UserTable
          users={users}
          onEditUser={editUser}
          onDeleteUser={deleteUser}
        />
      </div>
    </div>
  );
};

export default Users;
