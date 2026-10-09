import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { amount, currency = 'XOF', paymentMethod, customerPhone, orderId } = await request.json();

    // Example payload structure matching CinetPay / Orange Money gateway specifications
    const transactionId = `TX-GW-${Date.now()}`;

    return NextResponse.json({
      success: true,
      transactionId,
      amount,
      currency,
      paymentMethod,
      customerPhone,
      orderId,
      ussdPrompt: paymentMethod === 'orange_money' ? '#144#' : '*144#',
      status: 'PENDING_CUSTOMER_APPROVAL',
      message: 'Mobile money request initiated. Push prompt dispatched to customer in Bissau.',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Payment initialization error' },
      { status: 500 }
    );
  }
}
