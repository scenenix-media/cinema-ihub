// app/api/billing/invoice/[id]/route.ts

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const params = await context.params
    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id }
    })

    if (!invoice || invoice.userId !== user.id) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
    }

    // Generate simple HTML invoice
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Invoice ${invoice.orderId}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            color: #333;
          }
          .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #000;
          }
          .company { font-size: 24px; font-weight: bold; }
          .invoice-info { text-align: right; }
          .details { margin-bottom: 30px; }
          .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .table th, .table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          .table th { background-color: #f8f8f8; font-weight: 600; }
          .total { text-align: right; font-size: 20px; font-weight: bold; margin-top: 20px; }
          .status {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            background-color: ${invoice.status === 'paid' ? '#d4edda' : '#f8d7da'};
            color: ${invoice.status === 'paid' ? '#155724' : '#721c24'};
          }
          .footer {
            margin-top: 60px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            color: #666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="company">Cinema iHub</div>
            <div>Scenenix Media Broadcasting Pvt Ltd</div>
            <div>Hyderabad, Telangana, India</div>
          </div>
          <div class="invoice-info">
            <div style="font-size: 20px; font-weight: bold;">INVOICE</div>
            <div>Order ID: ${invoice.orderId}</div>
            <div>Date: ${new Date(invoice.createdAt).toLocaleDateString()}</div>
            <div style="margin-top: 8px;">
              <span class="status">${invoice.status.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div class="details">
          <h3>Bill To:</h3>
          <div>${user.name || 'Customer'}</div>
          <div>${user.email}</div>
          ${user.phone ? `<div>${user.phone}</div>` : ''}
        </div>

        <table class="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Billing Cycle</th>
              <th style="text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>${invoice.plan.charAt(0).toUpperCase() + invoice.plan.slice(1)} Plan Subscription</strong>
                <div style="font-size: 12px; color: #666; margin-top: 4px;">
                  AI Video Generation Platform
                </div>
              </td>
              <td>${invoice.billingCycle.charAt(0).toUpperCase() + invoice.billingCycle.slice(1)}</td>
              <td style="text-align: right;">₹${(invoice.amount / 100).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div class="total">
          <div>Total: ₹${(invoice.amount / 100).toFixed(2)}</div>
          ${invoice.paidAt ? `<div style="font-size: 14px; color: #28a745; margin-top: 8px;">Paid on ${new Date(invoice.paidAt).toLocaleDateString()}</div>` : ''}
        </div>

        <div class="footer">
          <p>Thank you for your business!</p>
          <p>Questions? Contact us at support@cinemaihub.com</p>
          <p style="margin-top: 20px;">Cinema iHub - Where Vision Becomes Cinema</p>
        </div>
      </body>
      </html>
    `

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `inline; filename="invoice-${invoice.orderId}.html"`
      }
    })

  } catch (error) {
    console.error('Invoice generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate invoice' },
      { status: 500 }
    )
  }
}