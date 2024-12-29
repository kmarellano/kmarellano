import { Instagram, Linkedin, Github, Mail } from 'lucide-react';

export const SOCIALS = {
  LINKEDIN_URL: {
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    Icon: Linkedin,
  },
  PERSONAL_EMAIL: {
    href: process.env.NEXT_PUBLIC_PERSONAL_EMAIL,
    Icon: Mail,
    isMail: true,
  },
  GITHUB_URL: {
    href: process.env.NEXT_PUBLIC_GITHUB_URL,
    Icon: Github,
  },
  INSTAGRAM_URL: {
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    Icon: Instagram,
  },
};
