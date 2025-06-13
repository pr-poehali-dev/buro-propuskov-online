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
}

const UserForm: React.FC<UserFormProps> = ({
  form,
  onSubmit,
  submitText,
  defaultValues,
}) => {
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

        <Button type="submit" className="w-full">
          {submitText}
        </Button>
      </form>
    </Form>
  );
};

export default UserForm;
