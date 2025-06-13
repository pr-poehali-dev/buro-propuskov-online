import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = authLogin(login, password, isAdminMode);
      if (success) {
        navigate("/dashboard");
      } else {
        setError(
          isAdminMode
            ? "Неверные данные администратора"
            : "Неверный логин или пароль",
        );
      }
    } catch (err) {
      setError("Ошибка входа в систему");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Icon name="Shield" size={48} className="text-primary" />
          </div>
          <CardTitle className="text-2xl">Бюро пропусков</CardTitle>
          <CardDescription>
            Войдите в систему управления ключами
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-4">
              <button
                type="button"
                onClick={() => setIsAdminMode(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  !isAdminMode
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <Icon name="User" className="mr-2 h-4 w-4 inline" />
                Сотрудник
              </button>
              <button
                type="button"
                onClick={() => setIsAdminMode(true)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isAdminMode
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <Icon name="ShieldCheck" className="mr-2 h-4 w-4 inline" />
                Администратор
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login">Логин или Email</Label>
              <Input
                id="login"
                type="text"
                placeholder="Введите логин или email"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                  Вход...
                </>
              ) : (
                "Войти"
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-primary hover:underline"
            >
              Забыли пароль?
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Тестовые данные для входа:</p>
            <p>
              <strong>Логин:</strong> admin
            </p>
            <p>
              <strong>Пароль:</strong> admin
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
