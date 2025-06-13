import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { BrowserMultiFormatReader } from "@zxing/library";

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
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef<BrowserMultiFormatReader | null>(null);

  // База данных сотрудников
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
    "1234567890": {
      id: "1",
      name: "Иванов Иван Иванович",
      department: "IT",
      position: "Администратор",
      issuedKeys: ["101", "102"],
    },
    "0987654321": {
      id: "2",
      name: "Петрова Анна Сергеевна",
      department: "Бухгалтерия",
      position: "Менеджер",
      issuedKeys: ["201"],
    },
  };

  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();

    return () => {
      stopScanning();
    };
  }, []);

  const startCamera = async () => {
    try {
      setError(null);
      setIsScanning(true);
      setIsCameraActive(true);

      if (!videoRef.current || !codeReader.current) return;

      // Получаем список камер
      const videoInputDevices =
        await codeReader.current.listVideoInputDevices();

      if (videoInputDevices.length === 0) {
        throw new Error("Камера не найдена");
      }

      // Выбираем заднюю камеру для мобильных устройств
      const selectedDeviceId =
        videoInputDevices.find(
          (device) =>
            device.label.toLowerCase().includes("back") ||
            device.label.toLowerCase().includes("rear"),
        )?.deviceId || videoInputDevices[0].deviceId;

      // Запускаем сканирование
      await codeReader.current.decodeFromVideoDevice(
        selectedDeviceId,
        videoRef.current,
        (result, error) => {
          if (result) {
            const code = result.getText();
            setScannedCode(code);
            handleCodeScanned(code);
            stopScanning();
          }
        },
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка доступа к камере");
      setIsScanning(false);
      setIsCameraActive(false);
    }
  };

  const stopScanning = () => {
    if (codeReader.current) {
      codeReader.current.reset();
    }
    setIsScanning(false);
    setIsCameraActive(false);
  };

  const handleCodeScanned = (code: string) => {
    const emp = mockEmployees[code];
    setEmployee(emp || null);
    setIsScanning(false);
  };

  const handleManualInput = (code: string) => {
    setScannedCode(code);
    if (code.length >= 3) {
      const emp = mockEmployees[code];
      setEmployee(emp || null);
    } else {
      setEmployee(null);
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
                placeholder="Введите код сотрудника"
                value={scannedCode}
                onChange={(e) => handleManualInput(e.target.value)}
              />
            </div>
            <Button
              onClick={isCameraActive ? stopScanning : startCamera}
              className="flex items-center space-x-2"
            >
              {isScanning ? (
                <Icon name="Loader2" size={16} className="animate-spin" />
              ) : (
                <Icon
                  name={isCameraActive ? "StopCircle" : "Camera"}
                  size={16}
                />
              )}
              <span>{isCameraActive ? "Остановить" : "Сканировать"}</span>
            </Button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="relative">
            {isCameraActive ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  className="w-full h-64 object-cover rounded-lg border-2 border-blue-500"
                  style={{ transform: "scaleX(-1)" }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="border-2 border-red-500 w-48 h-32 rounded-lg bg-transparent"></div>
                </div>
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  Наведите на штрихкод
                </div>
              </div>
            ) : (
              <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <Icon
                  name="Camera"
                  size={48}
                  className="mx-auto text-gray-400 mb-2"
                />
                <p className="text-gray-500">
                  Нажмите "Сканировать" для запуска камеры
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  или введите код вручную
                </p>
              </div>
            )}
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
