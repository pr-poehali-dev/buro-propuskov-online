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
import Icon from "@/components/ui/icon";

interface Office {
  id: string;
  number: string;
  floor: number;
  department: string;
  capacity: number;
  currentOccupancy: number;
  keyStatus: "available" | "issued" | "lost";
  assignedTo?: string;
}

const Offices = () => {
  const [offices, setOffices] = useState<Office[]>([
    {
      id: "1",
      number: "301",
      floor: 3,
      department: "IT",
      capacity: 4,
      currentOccupancy: 3,
      keyStatus: "issued",
      assignedTo: "Иванов И.И.",
    },
    {
      id: "2",
      number: "302",
      floor: 3,
      department: "IT",
      capacity: 2,
      currentOccupancy: 2,
      keyStatus: "available",
    },
    {
      id: "3",
      number: "205",
      floor: 2,
      department: "Бухгалтерия",
      capacity: 1,
      currentOccupancy: 1,
      keyStatus: "issued",
      assignedTo: "Петрова А.С.",
    },
    {
      id: "4",
      number: "410",
      floor: 4,
      department: "HR",
      capacity: 3,
      currentOccupancy: 1,
      keyStatus: "available",
    },
    {
      id: "5",
      number: "101",
      floor: 1,
      department: "Охрана",
      capacity: 2,
      currentOccupancy: 2,
      keyStatus: "lost",
    },
  ]);

  const getKeyStatusColor = (status: string) => {
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

  const getKeyStatusText = (status: string) => {
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

  const getOccupancyColor = (current: number, capacity: number) => {
    const ratio = current / capacity;
    if (ratio >= 1) return "text-red-600";
    if (ratio >= 0.8) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Управление кабинетами
            </h1>
            <p className="text-gray-600">Учет помещений и их занятости</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Icon name="Plus" size={16} />
                <span>Добавить кабинет</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Добавить новый кабинет</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Номер кабинета" />
                <Input type="number" placeholder="Этаж" />
                <Input placeholder="Отдел" />
                <Input type="number" placeholder="Вместимость" />
                <Button className="w-full">Добавить кабинет</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Статистика по этажам */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((floor) => {
            const floorOffices = offices.filter((o) => o.floor === floor);
            const occupied = floorOffices.filter(
              (o) => o.currentOccupancy > 0,
            ).length;
            return (
              <Card key={floor}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {occupied}/{floorOffices.length}
                    </div>
                    <div className="text-sm text-gray-600">{floor} этаж</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="Building" size={20} />
              <span>Список кабинетов</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input placeholder="Поиск кабинетов..." className="max-w-sm" />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Кабинет</TableHead>
                  <TableHead>Этаж</TableHead>
                  <TableHead>Отдел</TableHead>
                  <TableHead>Занятость</TableHead>
                  <TableHead>Статус ключа</TableHead>
                  <TableHead>Ключ выдан</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {offices.map((office) => (
                  <TableRow key={office.id}>
                    <TableCell className="font-medium">
                      Каб. {office.number}
                    </TableCell>
                    <TableCell>{office.floor}</TableCell>
                    <TableCell>{office.department}</TableCell>
                    <TableCell>
                      <span
                        className={getOccupancyColor(
                          office.currentOccupancy,
                          office.capacity,
                        )}
                      >
                        {office.currentOccupancy}/{office.capacity}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getKeyStatusColor(office.keyStatus) as any}
                      >
                        {getKeyStatusText(office.keyStatus)}
                      </Badge>
                    </TableCell>
                    <TableCell>{office.assignedTo || "-"}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Icon name="Edit" size={14} />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Icon name="MoreHorizontal" size={14} />
                        </Button>
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

export default Offices;
