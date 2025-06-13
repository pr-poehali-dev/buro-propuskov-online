import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  issuedKeys: string[];
}

const BarcodeScanner: React.FC = () => {
  const [scannedCode, setScannedCode] = useState("");
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Имитация базы данных сотрудников
  const mockEmployees: { [key: string]: Employee } = {
    EMP001: {
      id: "EMP001",
      name: "Иванов Иван Иванович",
      department: "IT-отдел",
      position: "Разработчик",
      issuedKeys: ["301", "401"],
    },
    EMP002: {
      id: "EMP002",
      name: "Петрова Анна Сергеевна",
      department: "Бухгалтерия",
      position: "Главный бухгалтер",
      issuedKeys: ["205"],
    },
  };

  const handleScan = () => {
    setIsScanning(true);
    // Имитация сканирования
    setTimeout(() => {
      const emp = mockEmployees[scannedCode];
      setEmployee(emp || null);
      setIsScanning(false);
    }, 1000);
  };

  const handleManualInput = (code: string) => {
    setScannedCode(code);
    if (code.length >= 6) {
      const emp = mockEmployees[code];
      setEmployee(emp || null);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="QrCode" size={20} />
            <span>Сканер штрихкодов</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Введите код сотрудника или отсканируйте"
                value={scannedCode}
                onChange={(e) => handleManualInput(e.target.value)}
              />
            </div>
            <Button
              onClick={handleScan}
              disabled={isScanning || !scannedCode}
              className="flex items-center space-x-2"
            >
              {isScanning ? (
                <Icon name="Loader2" size={16} className="animate-spin" />
              ) : (
                <Icon name="Scan" size={16} />
              )}
              <span>{isScanning ? "Сканирую..." : "Сканировать"}</span>
            </Button>
          </div>

          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <Icon
              name="Camera"
              size={48}
              className="mx-auto text-gray-400 mb-2"
            />
            <p className="text-gray-500">Наведите камеру на штрихкод</p>
            <p className="text-xs text-gray-400 mt-1">
              или введите код вручную
            </p>
          </div>
        </CardContent>
      </Card>

      {employee && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="User" size={20} />
              <span>Информация о сотруднике</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{employee.name}</h3>
                <p className="text-gray-600">{employee.position}</p>
                <p className="text-sm text-gray-500">{employee.department}</p>
              </div>

              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">
                  Выданные ключи:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {employee.issuedKeys.length > 0 ? (
                    employee.issuedKeys.map((key) => (
                      <Badge key={key} variant="secondary">
                        Каб. {key}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">
                      Нет выданных ключей
                    </span>
                  )}
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button className="flex items-center space-x-2">
                  <Icon name="Key" size={16} />
                  <span>Выдать ключ</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Icon name="RotateCcw" size={16} />
                  <span>Принять ключ</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {scannedCode && !employee && (
        <Card className="border-red-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <Icon
                name="AlertCircle"
                size={48}
                className="mx-auto text-red-400 mb-2"
              />
              <h3 className="font-medium text-red-800">Сотрудник не найден</h3>
              <p className="text-sm text-red-600 mt-1">
                Код "{scannedCode}" не найден в базе данных
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BarcodeScanner;
