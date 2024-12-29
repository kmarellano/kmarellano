import React from 'react';
import { UserButton } from '@clerk/nextjs';

export default function AdminLayout({ children }) {
  return (
    <div>
      {children}
      <div className="fixed bottom-16 right-10 z-50">
        <UserButton />
      </div>
    </div>
  );
}
