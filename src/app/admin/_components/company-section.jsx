'use client';

import { useState, useEffect } from 'react';
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
import { PlusCircle, Edit } from 'lucide-react';
import Link from 'next/link';

export function CompanyManagement() {
  const [companies, setCompanies] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const { toast } = useToast();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('/api/portfolio/work');
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error('Failed to fetch companies:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      const response = await fetch(
        editingCompany
          ? `/api/portfolio/work/${editingCompany._id}`
          : '/api/portfolio/work',
        {
          method: editingCompany ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.');
      }

      toast({
        title: 'Success',
        description: `Company ${
          editingCompany ? 'updated' : 'added'
        } successfully!`,
      });

      await fetchCompanies();
      setIsDialogOpen(false);
      setEditingCompany(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (company) => {
    setEditingCompany(company);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4 my-8 mx-12 h-svh">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Companies</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingCompany(null)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCompany ? 'Edit Company' : 'Add New Company'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  name="company"
                  defaultValue={editingCompany?.company || ''}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  defaultValue={
                    editingCompany
                      ? new Date(editingCompany.startDate)
                          .toISOString()
                          .split('T')[0]
                      : ''
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  defaultValue={
                    editingCompany && editingCompany.endDate
                      ? new Date(editingCompany.endDate)
                          .toISOString()
                          .split('T')[0]
                      : ''
                  }
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
              <TableHead>Company</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="w-28">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company._id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/admin/${company._id}`}
                    className="text-primary underline underline-offset-4"
                  >
                    {company.company}
                  </Link>
                </TableCell>
                <TableCell>
                  {new Date(company.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {company.endDate
                    ? new Date(company.endDate).toLocaleDateString()
                    : '-'}
                </TableCell>
                <TableCell className="mx-auto">
                  <Button onClick={() => handleEditClick(company)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
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
