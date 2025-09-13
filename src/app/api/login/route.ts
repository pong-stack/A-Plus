import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const cookieStore = await cookies();
    const supabase = await createServerSupabaseClient(cookieStore);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 401 });
    }

    // Verify if the user is an admin based on the role column
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('id, email, role')
      .eq('id', data.user.id)
      .single();

    if (adminError || !adminUser || adminUser.role !== 1) {
      await supabase.auth.signOut(); // Sign out if not an admin
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    return NextResponse.json({ message: 'Login successful', user: adminUser }, { status: 200 });
  } catch (err) {
    console.error('API Login error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}