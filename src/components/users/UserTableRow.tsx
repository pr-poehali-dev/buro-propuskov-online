import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
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
import Icon from "@/components/ui/icon";
import { User } from "@/hooks/useSaveData";
import {
  getRoleColor,
  getRoleText,
  getStatusColor,
  getStatusText,
} from "@/utils/userUtils";

interface UserTableRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  onEdit,
  onDelete,
}) => {
  return (
    <TableRow key={user.id}>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell className="text-gray-600">{user.email}</TableCell>
      <TableCell>{user.department}</TableCell>
      <TableCell>
        <Badge variant={getRoleColor(user.role) as any}>
          {getRoleText(user.role)}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant={getStatusColor(user.status) as any}>
          {getStatusText(user.status)}
        </Badge>
      </TableCell>
      <TableCell>
        <span className="text-sm">{user.keysIssued}</span>
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => onEdit(user)}>
            <Icon name="Edit" size={14} />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="destructive">
                <Icon name="Trash2" size={14} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Удалить пользователя?</AlertDialogTitle>
                <AlertDialogDescription>
                  Это действие нельзя отменить. Пользователь {user.name} будет
                  удален навсегда.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(user.id)}
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
  );
};

export default UserTableRow;
