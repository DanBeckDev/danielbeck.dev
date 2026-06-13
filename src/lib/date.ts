const LONG = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const SHORT = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

export const formatDate = (date: Date): string => LONG.format(date);
export const formatDateShort = (date: Date): string => SHORT.format(date);
export const isoDate = (date: Date): string => date.toISOString();
