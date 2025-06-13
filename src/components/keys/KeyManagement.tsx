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

const KeyManagement: React.FC = () => {
  const [keys, setKeys] = useState<KeyRecord[]>([
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
  ]);

  const { isSaving, lastSaved, saveKeys } = useSaveData();

  const deleteKey = (keyId: string) => {
    const updatedKeys = keys.filter((key) => key.id !== keyId);
    setKeys(updatedKeys);
    // Также удаляем из localStorage
    const { deleteKey: deleteKeyFromStorage } = useSaveData();
    deleteKeyFromStorage(keyId);
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

    const newKey: KeyRecord = {
      id: Date.now().toString(),
      office: newKeyOffice.trim(),
      status: "available",
      department: departmentLabels[newKeyDepartment],
    };

    setKeys((prev) => [...prev, newKey]);
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

  const stats = {
    total: keys.length,
    available: keys.filter((k) => k.status === "available").length,
    issued: keys.filter((k) => k.status === "issued").length,
    lost: keys.filter((k) => k.status === "lost").length,
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
              <span>Управление ключами</span>
            </CardTitle>
            <div className="flex items-center space-x-4">
              <SaveButton
                onSave={() => saveKeys(keys)}
                isSaving={isSaving}
                lastSaved={lastSaved}
              />
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
                        <SelectItem value="accounting">Бухгалтерия</SelectItem>
                        <SelectItem value="security">Охрана</SelectItem>
                      </SelectContent>
                    </Select>
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
                        <Button size="sm" variant="outline">
                          <Icon name="UserPlus" size={14} />
                        </Button>
                      )}
                      {key.status === "issued" && (
                        <Button size="sm" variant="outline">
                          <Icon name="RotateCcw" size={14} />
                        </Button>
                      )}
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
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyManagement;
