import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UseFormReturn } from "react-hook-form";
import { User } from "@/hooks/useSaveData";
import UserForm from "./UserForm";

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  submitText: string;
  defaultValues?: User;
}

const UserFormDialog: React.FC<UserFormDialogProps> = ({
  open,
  onOpenChange,
  title,
  form,
  onSubmit,
  submitText,
  defaultValues,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <UserForm
          form={form}
          onSubmit={onSubmit}
          submitText={submitText}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
