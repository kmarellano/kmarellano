import React from 'react';
import { UserButton } from '@clerk/nextjs';

export default function AdminLayout({ children }) {
  return (
    <div>
      {children}
      <div className="absolute bottom-16 right-4 z-50">
        <UserButton />
      </div>
    </div>
  );
}
