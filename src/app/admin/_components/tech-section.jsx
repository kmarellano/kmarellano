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
import { PlusCircle } from 'lucide-react';

export default function CompaniesClient() {
  const [companies, setCompanies] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/api/portfolio/work', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log('Response:', result);

    setIsDialogOpen(false);
    fetchCompanies(); // Refresh the list of companies
  };

  return (
    <div className="space-y-4 my-8 mx-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Companies</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" name="company" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" name="startDate" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" name="endDate" type="date" />
              </div>
              <div className="flex flex-wrap justify-end">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Company</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company._id}>
                <TableCell className="font-medium">{company.company}</TableCell>
                <TableCell>
                  {new Date(company.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {company.endDate
                    ? new Date(company.endDate).toLocaleDateString()
                    : 'Present'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
