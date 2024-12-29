'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from '@/components/ui/select';
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
import Link from 'next/link';

const FIELD_OPTIONS = [
  'Frontend',
  'Backend',
  'DevOps',
  'Testing & Quality Assurance',
  'Monitoring & Logging',
  'Language',
];

export function TechManagement() {
  const [techs, setTechs] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingTech, setEditingTech] = useState(null);
  const [field, setField] = useState('');

  const { toast } = useToast();

  useEffect(() => {
    fetchTechs();
  }, []);

  const fetchTechs = async () => {
    try {
      const response = await fetch('/api/admin/tech');
      const data = await response.json();
      setTechs(data);
    } catch (error) {
      console.error('Failed to fetch techs:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      data.field = field;

      const response = await fetch(
        editingTech ? `/api/admin/tech/${editingTech._id}` : '/api/admin/tech',
        {
          method: editingTech ? 'PUT' : 'POST',
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
        description: `Tech ${editingTech ? 'updated' : 'added'} successfully!`,
      });

      await fetchTechs();
      setIsDialogOpen(false);
      setEditingTech(null);
      setField('');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (tech) => {
    setEditingTech(tech);
    setField(tech.field);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (techId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this tech?'
    );
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/tech/${techId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the tech. Please try again.');
      }

      toast({
        title: 'Success',
        description: 'Tech deleted successfully!',
      });

      await fetchTechs();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
      });
    }
  };

  return (
    <div className="space-y-4 my-8 mx-12 h-svh">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Techs</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingTech(null);
                setField('');
              }}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Tech
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTech ? 'Edit Tech' : 'Add New Tech'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tech">Technology Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingTech?.name || ''}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="field">Field</Label>
                <Select value={field} onValueChange={setField} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a field" />
                  </SelectTrigger>
                  <SelectContent>
                    {FIELD_OPTIONS.map((item) => (
                      <SelectItem value={item} key={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              <TableHead>Name</TableHead>
              <TableHead>Field</TableHead>
              <TableHead className="w-28">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {techs.map((tech) => (
              <TableRow key={tech._id}>
                <TableCell className="font-medium">{tech.name}</TableCell>
                <TableCell>{tech.field}</TableCell>
                <TableCell className="flex space-x-2">
                  <Button onClick={() => handleEditClick(tech)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteClick(tech._id)}
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
