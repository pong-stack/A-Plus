import { cookies } from 'next/headers';
import { createServerSupabaseClient } from './supabase-server';

export async function getAdminUser() {
  const cookieStore = await cookies();
  const supabase = await createServerSupabaseClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Check if user is an admin
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('id, username, email')
    .eq('id', user.id)
    .single();

  return adminUser;
}

export async function requireAdmin() {
  const adminUser = await getAdminUser();

  if (!adminUser) {
    throw new Error('Unauthorized: Admin access required');
  }

  return adminUser;
}