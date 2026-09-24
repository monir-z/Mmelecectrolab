export const ADMIN_EMAILS: string[] = [
  'mmeletronicsservicingcenter@gmail.com',
  'primemonir45@gmail.com'
];

export const isAdminEmail = (email?: string | null): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.some((adm) => adm.toLowerCase() === email.trim().toLowerCase());
};
