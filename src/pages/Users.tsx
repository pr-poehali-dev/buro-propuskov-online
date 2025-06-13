import React, { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Icon from "@/components/ui/icon";
import SaveButton from "@/components/ui/SaveButton";
import { useForm } from "react-hook-form";
import { useSaveData, User } from "@/hooks/useSaveData";

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

  const { isSaving, lastSaved, saveUsers } = useSaveData();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const deleteUser = (userId: string) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const editUser = (user: User) => {
    setEditingUser(user);
    setIsEditDialogOpen(true);
  };

  const updateUser = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
    setIsEditDialogOpen(false);
    setEditingUser(null);
  };

  const createUser = (newUserData: Omit<User, "id">) => {
    const newUser: User = {
      ...newUserData,
      id: Date.now().toString(),
    };
    setUsers([...users, newUser]);
    setIsCreateDialogOpen(false);
  };

  const form = useForm();
  const editForm = useForm();

  const getRoleColor = (role: string) => {
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

  const getRoleText = (role: string) => {
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

  const getStatusColor = (status: string) => {
    return status === "active" ? "secondary" : "outline";
  };

  const getStatusText = (status: string) => {
    return status === "active" ? "Активен" : "Неактивен";
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
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <Icon name="UserPlus" size={16} />
                  <span>Добавить пользователя</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Создать нового пользователя</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form
                    className="space-y-4"
                    onSubmit={form.handleSubmit((data) => {
                      createUser({
                        name: data.name,
                        email: data.email,
                        department: data.department,
                        role: data.role,
                        status: "active",
                        keysIssued: 0,
                        barcode: data.barcode,
                        login: data.login,
                        password: data.password,
                      });
                    })}
                  >
                    <FormField
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ФИО</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Введите полное имя"
                              {...field}
                              required
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="user@company.ru"
                              {...field}
                              required
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="barcode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Штрихкод</FormLabel>
                          <FormControl>
                            <Input placeholder="Введите штрихкод" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="login"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Логин</FormLabel>
                          <FormControl>
                            <Input placeholder="Введите логин" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Пароль</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Введите пароль"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Отдел</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            required
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите отдел" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="IT">IT-отдел</SelectItem>
                              <SelectItem value="HR">HR</SelectItem>
                              <SelectItem value="Бухгалтерия">
                                Бухгалтерия
                              </SelectItem>
                              <SelectItem value="Охрана">Охрана</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Роль</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            required
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите роль" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="employee">
                                Сотрудник
                              </SelectItem>
                              <SelectItem value="manager">Менеджер</SelectItem>
                              <SelectItem value="admin">
                                Администратор
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Создать пользователя
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Диалог редактирования пользователя */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Редактировать пользователя</DialogTitle>
            </DialogHeader>
            {editingUser && (
              <Form {...editForm}>
                <form
                  className="space-y-4"
                  onSubmit={editForm.handleSubmit((data) => {
                    updateUser({
                      ...editingUser,
                      name: data.name || editingUser.name,
                      email: data.email || editingUser.email,
                      department: data.department || editingUser.department,
                      role: data.role || editingUser.role,
                      status: data.status || editingUser.status,
                      barcode: data.barcode || editingUser.barcode,
                      login: data.login || editingUser.login,
                      password: data.password || editingUser.password,
                    });
                  })}
                >
                  <FormField
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ФИО</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Введите полное имя"
                            defaultValue={editingUser.name}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="user@company.ru"
                            defaultValue={editingUser.email}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="barcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Штрихкод</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Введите штрихкод"
                            defaultValue={editingUser.barcode}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="login"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Логин</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Введите логин"
                            defaultValue={editingUser.login}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Пароль</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Введите пароль"
                            defaultValue={editingUser.password}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Отдел</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={editingUser.department}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите отдел" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="IT">IT-отдел</SelectItem>
                            <SelectItem value="HR">HR</SelectItem>
                            <SelectItem value="Бухгалтерия">
                              Бухгалтерия
                            </SelectItem>
                            <SelectItem value="Охрана">Охрана</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Роль</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={editingUser.role}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите роль" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="employee">Сотрудник</SelectItem>
                            <SelectItem value="manager">Менеджер</SelectItem>
                            <SelectItem value="admin">Администратор</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Статус</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={editingUser.status}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите статус" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Активен</SelectItem>
                            <SelectItem value="inactive">Неактивен</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Сохранить изменения
                  </Button>
                </form>
              </Form>
            )}
          </DialogContent>
        </Dialog>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="Users" size={20} />
              <span>Список пользователей</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Поиск пользователей..."
                className="max-w-sm"
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ФИО</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Отдел</TableHead>
                  <TableHead>Роль</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Ключи</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-gray-600">
                      {user.email}
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleColor(user.role) as any}>
                        {getRoleText(user.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(user.status) as any}>
                        {getStatusText(user.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{user.keysIssued}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => editUser(user)}
                        >
                          <Icon name="Edit" size={14} />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <Icon name="Trash2" size={14} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Удалить пользователя?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Это действие нельзя отменить. Пользователь{" "}
                                {user.name} будет удален навсегда.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Отмена</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteUser(user.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Удалить
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Users;
