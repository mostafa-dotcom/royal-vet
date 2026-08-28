'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function login(formData: FormData) {
  const password = formData.get('password') as string;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'; // fallback for testing
  
  if (password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set('admin_token', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    
    redirect('/admin');
  }
  
  // Security: Artificial delay to mitigate brute force attacks and timing attacks
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return { error: 'كلمة المرور غير صحيحة' };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
  redirect('/admin/login');
}

export async function getWaitlistData() {
  try {
    const data = await prisma.waitlist.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch waitlist:', error);
    return [];
  }
}

export async function updateStatus(id: number, newStatus: string) {
  try {
    await prisma.waitlist.update({
      where: { id },
      data: { status: newStatus },
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Failed to update status:', error);
    return { error: 'Failed to update status' };
  }
}

export async function deleteEntry(id: number) {
  try {
    await prisma.waitlist.delete({
      where: { id },
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete entry:', error);
    return { error: 'Failed to delete entry' };
  }
}

export async function uploadCatalog(formData: FormData) {
  try {
    const file = formData.get('catalog') as File;
    if (!file) {
      return { error: 'برجاء اختيار ملف' };
    }

    // Dynamic import to avoid client-side issues
    const { supabase } = await import('@/app/utils/supabase');

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure the assets bucket is used, overwrite catalog.pdf if it exists
    const { error } = await supabase.storage
      .from('assets')
      .upload('catalog.pdf', buffer, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return { error: 'فشل في رفع الملف، تأكد من إعدادات مساحة التخزين' };
    }

    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Failed to upload catalog:', error);
    return { error: 'حدث خطأ غير متوقع أثناء الرفع' };
  }
}
