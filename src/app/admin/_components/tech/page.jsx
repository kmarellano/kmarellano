'use client';

import { useState } from 'react';
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';

export default function CompaniesClient() {
  const [invoices, setInvoices] = useState([
    {
      invoice: 'INV001',
      paymentStatus: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV002',
      paymentStatus: 'Pending',
      totalAmount: '$150.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV003',
      paymentStatus: 'Unpaid',
      totalAmount: '$350.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV004',
      paymentStatus: 'Paid',
      totalAmount: '$450.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV005',
      paymentStatus: 'Paid',
      totalAmount: '$550.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV006',
      paymentStatus: 'Pending',
      totalAmount: '$200.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV007',
      paymentStatus: 'Unpaid',
      totalAmount: '$300.00',
      paymentMethod: 'Credit Card',
    },
  ]);

  const [newInvoice, setNewInvoice] = useState({
    invoice: '',
    paymentStatus: '',
    totalAmount: '',
    paymentMethod: '',
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setNewInvoice((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInvoices((prev) => [...prev, newInvoice]);
    setNewInvoice({
      invoice: '',
      paymentStatus: '',
      totalAmount: '',
      paymentMethod: '',
    });
    setIsDialogOpen(false);
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
                <Label htmlFor="invoice">Invoice Number</Label>
                <Input
                  id="invoice"
                  name="invoice"
                  value={newInvoice.invoice}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentStatus">Payment Status</Label>
                <Select
                  name="paymentStatus"
                  value={newInvoice.paymentStatus}
                  onValueChange={(value) =>
                    handleSelectChange('paymentStatus', value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Unpaid">Unpaid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalAmount">Total Amount</Label>
                <Input
                  id="totalAmount"
                  name="totalAmount"
                  value={newInvoice.totalAmount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  name="paymentMethod"
                  value={newInvoice.paymentMethod}
                  onValueChange={(value) =>
                    handleSelectChange('paymentMethod', value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="PayPal">PayPal</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Add Invoice</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
