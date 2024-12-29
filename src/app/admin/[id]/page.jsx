'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProjectManagement } from '../_components/project-section';
import { RoleManagement } from '../_components/role-section';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function ProjectAndRoleManagement() {
  const { id } = useParams();
  const router = useRouter();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetchCompany();
  }, [id]);

  const fetchCompany = async () => {
    try {
      const companyResponse = await fetch(`/api/admin/work/${id}`);
      if (!companyResponse.ok) {
        router.replace('/404');
      }
      const companyData = await companyResponse.json();
      setCompany(companyData);
    } catch (error) {
      console.error('Failed to fetch company', error);
    }
  };

  if (!company) return <div>Loading...</div>;
  return (
    <div className="my-8 mx-12">
      <Button onClick={() => router.back()} className="mb-4 px-4 py-2">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <h2 className="text-2xl font-bold">{company?.company}</h2>

      <ProjectManagement />
      <RoleManagement />
    </div>
  );
}
