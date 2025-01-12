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

const FIELD_OPTIONS = [
  'Frontend',
  'Backend',
  'DevOps',
  'Testing & Quality Assurance',
  'Monitoring & Logging',
  'Language',
];

export function CertificationManagement() {
  const [certifications, setCertifications] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingCertification, setEditingCertification] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    image: '',
    link: '',
    date: '',
    field: '',
  });

  const { toast } = useToast();

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const response = await fetch('/api/admin/cert');
      const data = await response.json();
      setCertifications(data);
    } catch (error) {
      console.error('Failed to fetch certifications:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        editingCertification
          ? `/api/admin/cert/${editingCertification._id}`
          : '/api/admin/cert',
        {
          method: editingCertification ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error);
      }

      toast({
        title: 'Success',
        description: `Certification ${
          editingCertification ? 'updated' : 'added'
        } successfully!`,
      });

      await fetchCertifications();
      setIsDialogOpen(false);
      setEditingCertification(null);
      setFormData({
        title: '',
        issuer: '',
        image: '',
        link: '',
        date: '',
        field: '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (certification) => {
    setEditingCertification(certification);
    setFormData({
      title: certification.title || '',
      issuer: certification.issuer || '',
      image: certification.image || '',
      link: certification.link || '',
      date: certification.date || '',
      field: certification.field || '',
    });
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (certificationId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this certification?'
    );
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/cert/${certificationId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(
          'Failed to delete the certification. Please try again.'
        );
      }

      toast({
        title: 'Success',
        description: 'Certification deleted successfully!',
      });

      await fetchCertifications();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-4 my-8 mx-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Certifications</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingCertification(null);
                setFormData({
                  title: '',
                  issuer: '',
                  image: '',
                  link: '',
                  date: '',
                  field: '',
                });
              }}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Certification
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCertification
                  ? 'Edit Certification'
                  : 'Add New Certification'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Certification Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="issuer">Issuer</Label>
                <Input
                  id="issuer"
                  name="issuer"
                  value={formData.issuer}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link">Link</Label>
                <Input
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
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
              <TableHead>Title</TableHead>
              <TableHead>Issuer</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Link</TableHead>
              <TableHead>Date Issued</TableHead>
              <TableHead className="w-28">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certifications.map((certification) => (
              <TableRow key={certification._id}>
                <TableCell className="font-medium">
                  {certification.title}
                </TableCell>
                <TableCell>{certification.issuer}</TableCell>
                <TableCell>{certification.image}</TableCell>
                <TableCell>{certification.link}</TableCell>
                <TableCell>
                  {new Date(certification.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="flex space-x-2">
                  <Button onClick={() => handleEditClick(certification)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteClick(certification._id)}
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
