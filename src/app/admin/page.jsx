import React from 'react';
import { CompanyManagement } from './_components/company-section';

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-muted h-screen snap-y snap-mandatory overflow-y-scroll">
      <CompanyManagement />
    </main>
  );
}
