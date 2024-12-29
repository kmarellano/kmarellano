import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string) {
  if (!string && typeof string !== 'string') return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function getFullYear(date) {
  return new Date(date).getFullYear();
}

export function formatMonthYY(date) {
  const options = {
    year: 'numeric',
    month: 'long',
  };

  return new Date(date).toLocaleDateString(undefined, options);
}
