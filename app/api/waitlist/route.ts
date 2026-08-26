import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { name, phone } = await request.json();

    if (!phone || typeof phone !== 'string' || phone.trim() === '') {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // Security: Strict Phone Validation (Only numbers and +, max 15 chars)
    const phoneRegex = /^\+?[0-9]{8,15}$/;
    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
      return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 });
    }

    // Security: Name Length Validation (Prevent payload flooding)
    if (name && (typeof name !== 'string' || name.length > 100)) {
      return NextResponse.json({ error: 'Name is too long or invalid' }, { status: 400 });
    }

    // Check if phone already exists
    const existing = await prisma.waitlist.findUnique({
      where: { phone },
    });

    if (existing) {
      return NextResponse.json({ error: 'Phone number already registered' }, { status: 409 });
    }

    const waitlist = await prisma.waitlist.create({
      data: {
        name: name || null,
        phone,
      },
    });

    return NextResponse.json({ success: true, data: waitlist }, { status: 201 });
  } catch (error) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
