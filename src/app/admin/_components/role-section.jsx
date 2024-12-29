'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Edit, Trash } from 'lucide-react';

export function RoleManagement() {
  const { id } = useParams();
  const [roles, setRoles] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  const { toast } = useToast();

  useEffect(() => {
    fetchRoles();
  }, [id]);

  const fetchRoles = async () => {
    try {
      const rolesResponse = await fetch(`/api/admin/work/${id}/role`);
      if (!rolesResponse.ok) {
        throw new Error('Failed to fetch roles');
      }

      const rolesData = await rolesResponse.json();
      setRoles(rolesData);
    } catch (error) {
      console.error('Failed to fetch roles:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      data.isPromotion = formData.get('isPromotion') === 'on';

      const response = await fetch(
        editingRole
          ? `/api/admin/work/${id}/role/${editingRole._id}`
          : `/api/admin/work/${id}/role`,
        {
          method: editingRole ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error);
      }

      toast({
        title: 'Success',
        description: `Role ${editingRole ? 'updated' : 'added'} successfully!`,
      });

      await fetchRoles();
      setIsDialogOpen(false);
      setEditingRole(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (role) => {
    setEditingRole(role);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (roleId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this role?'
    );
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/work/${id}/role/${roleId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the role. Please try again.');
      }

      toast({
        title: 'Success',
        description: 'Role deleted successfully!',
      });

      await fetchRoles();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Roles</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingRole(null)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingRole ? 'Edit Role' : 'Add New Role'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Role Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingRole?.title || ''}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  defaultValue={
                    editingRole
                      ? new Date(editingRole.date).toISOString().split('T')[0]
                      : ''
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="isPromotion">Is Promotion</Label>
                <Input
                  id="isPromotion"
                  name="isPromotion"
                  type="checkbox"
                  defaultChecked={editingRole?.isPromotion || false}
                />
              </div>
              <div className="flex flex-wrap justify-end">
                <Button type="submit" disabled={isLoading}>
                  Submit
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border rounded-lg border-accent-foreground/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Is Promotion</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role._id}>
                <TableCell className="font-medium">{role.title}</TableCell>
                <TableCell>
                  {new Date(role.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{role.isPromotion ? 'Yes' : 'No'}</TableCell>
                <TableCell className="flex flex-wrap gap-x-2 mx-auto">
                  <Button onClick={() => handleEditClick(role)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteClick(role._id)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
