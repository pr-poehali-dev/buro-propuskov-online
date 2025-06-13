import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { User } from "@/hooks/useSaveData";

interface UserFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  submitText: string;
  defaultValues?: User;
  isManager?: boolean; // Добавляем проп для проверки роли
}

const UserForm: React.FC<UserFormProps> = ({
  form,
  onSubmit,
  submitText,
  defaultValues,
  isManager = false,
}) => {
  // Проверяем роль текущего пользователя
  const currentUser = JSON.parse(localStorage.getItem("current_user") || "{}");
  const userIsManager =
    currentUser.role === "manager" || currentUser.role === "admin";
  const canEdit = isManager || userIsManager;

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ФИО</FormLabel>
              <FormControl>
                <Input
                  placeholder="Введите полное имя"
                  defaultValue={defaultValues?.name}
                  disabled={!canEdit}
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
                  defaultValue={defaultValues?.email}
                  disabled={!canEdit}
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
                <Input
                  placeholder="Введите штрихкод"
                  defaultValue={defaultValues?.barcode}
                  disabled={!canEdit}
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
                  defaultValue={defaultValues?.login}
                  disabled={!canEdit}
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
                  defaultValue={defaultValues?.password}
                  disabled={!canEdit}
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
                defaultValue={defaultValues?.department || field.value}
                disabled={!canEdit}
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
                  <SelectItem value="Бухгалтерия">Бухгалтерия</SelectItem>
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
                defaultValue={defaultValues?.role || field.value}
                disabled={!canEdit}
                required
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

        {defaultValues && (
          <FormField
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Статус</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={defaultValues.status}
                  disabled={!canEdit}
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
        )}

        <FormField
          name="faceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Face ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="Идентификатор Face ID"
                  defaultValue={defaultValues?.faceId}
                  disabled={!canEdit}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {canEdit && (
          <Button type="submit" className="w-full">
            {submitText}
          </Button>
        )}
        {!canEdit && (
          <div className="text-center text-gray-500 py-4">
            Только менеджеры могут редактировать данные пользователей
          </div>
        )}
      </form>
    </Form>
  );
};

export default UserForm;
