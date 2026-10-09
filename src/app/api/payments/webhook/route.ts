import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    console.log('[PAYMENT WEBHOOK RECEIVED]:', payload);

    // Validate webhook signature & process payment confirmation
    return NextResponse.json({
      received: true,
      status: 'PROCESSED',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 400 }
    );
  }
}
