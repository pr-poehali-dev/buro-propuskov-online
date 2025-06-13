import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SaveButton from "@/components/ui/SaveButton";
import { useSaveData, KeyRecord } from "@/hooks/useSaveData";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";

interface KeyManagementProps {
  isManager?: boolean;
}

const KeyManagement: React.FC<KeyManagementProps> = ({ isManager = false }) => {
  const [keys, setKeys] = useState<KeyRecord[]>(() => {
    const savedKeys = localStorage.getItem("keys_data");
    return savedKeys
      ? JSON.parse(savedKeys)
      : [
          {
            id: "1",
            office: "301",
            status: "issued",
            issuedTo: "Иванов И.И.",
            issuedAt: "2024-01-15",
            department: "IT",
          },
          { id: "2", office: "302", status: "available", department: "IT" },
          {
            id: "3",
            office: "205",
            status: "issued",
            issuedTo: "Петрова А.С.",
            issuedAt: "2024-01-10",
            department: "Бухгалтерия",
          },
          { id: "4", office: "410", status: "available", department: "HR" },
          { id: "5", office: "101", status: "lost", department: "Охрана" },
        ];
  });

  const { isSaving, lastSaved, saveKeys } = useSaveData();

  const deleteKey = (keyId: string) => {
    const updatedKeys = keys.filter((key) => key.id !== keyId);
    setKeys(updatedKeys);
    // Сразу сохраняем в localStorage
    localStorage.setItem("keys_data", JSON.stringify(updatedKeys));
  };

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newKeyOffice, setNewKeyOffice] = useState("");
  const [newKeyDepartment, setNewKeyDepartment] = useState("");

  const departmentLabels: Record<string, string> = {
    it: "IT-отдел",
    hr: "HR",
    accounting: "Бухгалтерия",
    security: "Охрана",
  };

  const addKey = () => {
    if (!newKeyOffice.trim() || !newKeyDepartment) return;

    // Генерируем штрихкод автоматически
    const generateBarcode = () => {
      const prefix = "KEY";
      const timestamp = Date.now().toString().slice(-8);
      const random = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
      return `${prefix}${timestamp}${random}`;
    };

    const newKey: KeyRecord = {
      id: Date.now().toString(),
      office: newKeyOffice.trim(),
      status: "available",
      department: departmentLabels[newKeyDepartment],
      barcode: generateBarcode(),
    };

    const updatedKeys = [...keys, newKey];
    setKeys(updatedKeys);
    // Сразу сохраняем в localStorage
    localStorage.setItem("keys_data", JSON.stringify(updatedKeys));
    setNewKeyOffice("");
    setNewKeyDepartment("");
    setIsDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "secondary";
      case "issued":
        return "default";
      case "lost":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Доступен";
      case "issued":
        return "Выдан";
      case "lost":
        return "Утерян";
      default:
        return status;
    }
  };

  const filteredKeys = keys.filter((key) => {
    const matchesSearch =
      key.office.includes(searchTerm) ||
      key.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (key.issuedTo &&
        key.issuedTo.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === "all" || key.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Проверяем роль пользователя
  const currentUser = JSON.parse(localStorage.getItem("current_user") || "{}");
  const userIsManager = currentUser.role === "manager";
  const finalIsManager = isManager || userIsManager;

  const stats = {
    total: keys.length,
    available: keys.filter((k) => k.status === "available").length,
    issued: keys.filter((k) => k.status === "issued").length,
    lost: keys.filter((k) => k.status === "lost").length,
  };

  // Функция выдачи ключа
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<KeyRecord | null>(null);
  const [recipientName, setRecipientName] = useState("");

  const issueKey = () => {
    if (!selectedKey || !recipientName.trim()) return;

    const updatedKeys = keys.map((key) =>
      key.id === selectedKey.id
        ? {
            ...key,
            status: "issued" as const,
            issuedTo: recipientName.trim(),
            issuedAt: new Date().toLocaleDateString("ru-RU"),
          }
        : key,
    );

    setKeys(updatedKeys);
    localStorage.setItem("keys_data", JSON.stringify(updatedKeys));
    setIssueDialogOpen(false);
    setSelectedKey(null);
    setRecipientName("");
  };

  // Функция возврата ключа
  const returnKey = (keyId: string) => {
    const updatedKeys = keys.map((key) =>
      key.id === keyId
        ? {
            ...key,
            status: "available" as const,
            issuedTo: undefined,
            issuedAt: undefined,
          }
        : key,
    );

    setKeys(updatedKeys);
    localStorage.setItem("keys_data", JSON.stringify(updatedKeys));
  };

  return (
    <div className="space-y-6">
      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-gray-600">Всего ключей</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.available}
              </div>
              <div className="text-sm text-gray-600">Доступно</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats.issued}
              </div>
              <div className="text-sm text-gray-600">Выдано</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {stats.lost}
              </div>
              <div className="text-sm text-gray-600">Утеряно</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Управление ключами */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Icon name="Key" size={20} />
              <span>
                {finalIsManager ? "Выдача ключей и карт" : "Управление ключами"}
              </span>
            </CardTitle>
            <div className="flex items-center space-x-4">
              {!finalIsManager && (
                <SaveButton
                  onSave={() => saveKeys(keys)}
                  isSaving={isSaving}
                  lastSaved={lastSaved}
                />
              )}
              {!finalIsManager && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center space-x-2">
                      <Icon name="Plus" size={16} />
                      <span>Добавить ключ</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Добавить новый ключ</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Номер кабинета"
                        value={newKeyOffice}
                        onChange={(e) => setNewKeyOffice(e.target.value)}
                      />
                      <Select
                        value={newKeyDepartment}
                        onValueChange={setNewKeyDepartment}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите отдел" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="it">IT-отдел</SelectItem>
                          <SelectItem value="hr">HR</SelectItem>
                          <SelectItem value="accounting">
                            Бухгалтерия
                          </SelectItem>
                          <SelectItem value="security">Охрана</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="text-sm text-gray-500">
                        Штрихкод будет присвоен автоматически
                      </div>
                      <Button
                        className="w-full"
                        onClick={addKey}
                        disabled={!newKeyOffice.trim() || !newKeyDepartment}
                      >
                        Добавить ключ
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Поиск по кабинету, отделу или сотруднику..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="available">Доступен</SelectItem>
                <SelectItem value="issued">Выдан</SelectItem>
                <SelectItem value="lost">Утерян</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Кабинет</TableHead>
                <TableHead>Штрихкод</TableHead>
                <TableHead>Отдел</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Выдан</TableHead>
                <TableHead>Дата выдачи</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKeys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium">
                    Каб. {key.office}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {key.barcode || "—"}
                  </TableCell>
                  <TableCell>{key.department}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(key.status) as any}>
                      {getStatusText(key.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{key.issuedTo || "-"}</TableCell>
                  <TableCell>{key.issuedAt || "-"}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {key.status === "available" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedKey(key);
                            setIssueDialogOpen(true);
                          }}
                        >
                          <Icon name="UserPlus" size={14} />
                        </Button>
                      )}
                      {key.status === "issued" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => returnKey(key.id)}
                        >
                          <Icon name="RotateCcw" size={14} />
                        </Button>
                      )}
                      {!finalIsManager && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <Icon name="Trash2" size={14} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Удалить ключ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Это действие нельзя отменить. Ключ от кабинета{" "}
                                {key.office} будет удален навсегда.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Отмена</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteKey(key.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Удалить
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Диалог выдачи ключа */}
          <Dialog open={issueDialogOpen} onOpenChange={setIssueDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Выдать ключ</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {selectedKey && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium">
                      Ключ от кабинета {selectedKey.office}
                    </div>
                    <div className="text-sm text-gray-600">
                      Штрихкод: {selectedKey.barcode}
                    </div>
                    <div className="text-sm text-gray-600">
                      Отдел: {selectedKey.department}
                    </div>
                  </div>
                )}
                <Input
                  placeholder="ФИО получателя"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                />
                <Button
                  className="w-full"
                  onClick={issueKey}
                  disabled={!recipientName.trim()}
                >
                  Выдать ключ
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyManagement;
