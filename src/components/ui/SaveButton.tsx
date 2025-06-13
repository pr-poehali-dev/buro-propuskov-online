import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface SaveButtonProps {
  onSave: () => void;
  isSaving: boolean;
  lastSaved?: Date | null;
  className?: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  onSave,
  isSaving,
  lastSaved,
  className = "",
}) => {
  const formatLastSaved = (date: Date) => {
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Button
        onClick={onSave}
        disabled={isSaving}
        className="flex items-center space-x-2"
      >
        {isSaving ? (
          <Icon name="Loader2" size={16} className="animate-spin" />
        ) : (
          <Icon name="Save" size={16} />
        )}
        <span>{isSaving ? "Сохранение..." : "Сохранить"}</span>
      </Button>

      {lastSaved && (
        <span className="text-sm text-green-600 flex items-center space-x-1">
          <Icon name="Check" size={14} />
          <span>Сохранено в {formatLastSaved(lastSaved)}</span>
        </span>
      )}
    </div>
  );
};

export default SaveButton;
