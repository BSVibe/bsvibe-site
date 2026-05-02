import { redirect } from 'next/navigation';

// Root → default Korean locale.
// Nextra i18n requires explicit locale prefix.
export default function Root() {
  redirect('/ko');
}
