import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://addlynusetvlnhggzwnj.supabase.co';
  const fileUrl = `${supabaseUrl}/storage/v1/object/public/assets/catalog.pdf`;
  
  return NextResponse.redirect(fileUrl);
}
