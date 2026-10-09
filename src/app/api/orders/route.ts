import { NextResponse } from 'next/server';
import { INITIAL_ORDERS } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: INITIAL_ORDERS,
  });
}

export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    return NextResponse.json({
      success: true,
      message: 'Order placed successfully in Guinea-Bissau',
      data: orderData,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process order' },
      { status: 400 }
    );
  }
}
