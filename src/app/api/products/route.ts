import { NextResponse } from 'next/server';
import { INITIAL_PRODUCTS } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: INITIAL_PRODUCTS,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      data: body,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
