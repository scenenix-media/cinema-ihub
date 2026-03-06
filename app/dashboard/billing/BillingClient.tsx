// app/dashboard/billing/BillingClient.tsx

'use client'

import { useState } from 'react'
import Link from 'next/link'

type Plan = 'free' | 'studio' | 'director' | 'enterprise'

const PLANS = {
  free: {
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    currency: '₹',
    features: ['10 credits/month', '720p', 'Pika engine', '3 projects']
  },
  studio: {
    name: 'Studio',
    monthlyPrice: 2999,
    annualPrice: 2249,
    currency: '₹',
    features: ['100 credits/month', '1080p', 'Runway + Pika', 'Unlimited projects', 'Email support']
  },
  director: {
    name: 'Director',
    monthlyPrice: 7999,
    annualPrice: 5999,
    currency: '₹',
    features: ['500 credits/month', '4K', 'All engines', 'API access', 'Priority support']
  },
  enterprise: {
    name: 'Enterprise',
    monthlyPrice: null,
    annualPrice: null,
    currency: '₹',
    features: ['Unlimited', '8K+', 'Custom training', 'White-label', 'Dedicated support']
  }
}

export default function BillingClient({ user }: any) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [upgrading, setUpgrading] = useState(false)

  const currentPlan = user.plan as Plan
  const subscriptionActive = user.subscriptionStatus === 'active'
  const daysUntilRenewal = user.subscriptionEnd 
    ? Math.ceil((new Date(user.subscriptionEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null

  async function handleUpgrade(plan: Plan) {
    if (plan === 'enterprise') {
      window.location.href = '/contact?subject=enterprise'
      return
    }

    setUpgrading(true)

    try {
      const response = await fetch('/api/billing/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          billingCycle
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order')
      }

      // Redirect to Cashfree payment page
      window.location.href = data.paymentLink

    } catch (error: any) {
      alert(error.message || 'Payment failed')
      setUpgrading(false)
    }
  }

  return (
    <div className="p-8">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white text-3xl font-light mb-2">Billing & Subscription</h1>
        <p className="text-zinc-500">Manage your plan, payment methods, and billing history</p>
      </div>

      {/* Current Plan Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-white text-xl font-medium mb-2">Current Plan</h2>
            <div className="flex items-center gap-3">
              <span className="text-yellow-600 text-3xl font-light">
                {PLANS[currentPlan].name}
              </span>
              {currentPlan !== 'free' && (
                <span className={`px-2 py-1 text-xs rounded-sm ${
                  subscriptionActive 
                    ? 'bg-green-900/20 border border-green-800 text-green-400'
                    : 'bg-red-900/20 border border-red-800 text-red-400'
                }`}>
                  {subscriptionActive ? 'Active' : 'Inactive'}
                </span>
              )}
            </div>
          </div>
          
          {currentPlan !== 'free' && subscriptionActive && (
            <div className="text-right">
              <p className="text-zinc-500 text-sm">Next billing date</p>
              <p className="text-white text-lg">
                {user.subscriptionEnd 
                  ? new Date(user.subscriptionEnd).toLocaleDateString()
                  : 'N/A'
                }
              </p>
              <p className="text-zinc-600 text-xs mt-1">
                {daysUntilRenewal} days remaining
              </p>
            </div>
          )}
        </div>

        {/* Usage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-zinc-800 rounded-sm p-4">
            <p className="text-zinc-500 text-xs mb-1">Credits Remaining</p>
            <p className="text-white text-2xl font-light">{user.credits}</p>
            <p className="text-zinc-600 text-xs mt-1">of {user.monthlyLimit} this month</p>
          </div>
          
          <div className="bg-zinc-800 rounded-sm p-4">
            <p className="text-zinc-500 text-xs mb-1">Storage Used</p>
            <p className="text-white text-2xl font-light">
              {(user.storageUsed / 1000).toFixed(1)} GB
            </p>
            <p className="text-zinc-600 text-xs mt-1">
              of {(user.storageLimit / 1000).toFixed(0)} GB limit
            </p>
          </div>
          
          <div className="bg-zinc-800 rounded-sm p-4">
            <p className="text-zinc-500 text-xs mb-1">Generations</p>
            <p className="text-white text-2xl font-light">{user._count?.generations || 0}</p>
            <p className="text-zinc-600 text-xs mt-1">total videos created</p>
          </div>
        </div>

        {/* Plan Features */}
        <div className="space-y-2 mb-6">
          <p className="text-zinc-500 text-sm">Your plan includes:</p>
          {PLANS[currentPlan].features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-yellow-600 text-sm">✓</span>
              <span className="text-zinc-400 text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {currentPlan === 'free' && (
          <button
            onClick={() => handleUpgrade('studio')}
            className="w-full bg-yellow-600 text-black text-sm tracking-widest uppercase py-3 rounded-sm font-medium hover:bg-yellow-500 transition-colors"
          >
            Upgrade to Studio
          </button>
        )}
      </div>

      {/* Available Plans */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-light">Available Plans</h2>
          
          {/* Billing Cycle Toggle */}
          <div className="flex items-center gap-4">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white' : 'text-zinc-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="relative w-14 h-7 bg-zinc-800 rounded-full border border-zinc-700"
            >
              <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-yellow-600 rounded-full transition-transform ${
                billingCycle === 'annual' ? 'translate-x-7' : ''
              }`} />
            </button>
            <span className={`text-sm ${billingCycle === 'annual' ? 'text-white' : 'text-zinc-500'}`}>
              Annual
              <span className="ml-2 px-2 py-0.5 bg-yellow-600 text-black text-xs rounded-sm">-25%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['studio', 'director', 'enterprise'] as Plan[]).map(planKey => {
            const plan = PLANS[planKey]
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice
            const isCurrentPlan = currentPlan === planKey

            return (
              <div
                key={planKey}
                className={`bg-zinc-900 border rounded-sm p-6 ${
                  planKey === 'director' 
                    ? 'border-yellow-600'
                    : 'border-zinc-800'
                }`}
              >
                <h3 className="text-zinc-500 text-xs tracking-widest uppercase mb-2">
                  {plan.name}
                </h3>
                
                <div className="mb-6">
                  {price === null ? (
                    <span className="text-white text-3xl font-light">Custom</span>
                  ) : (
                    <>
                      <span className="text-white text-3xl font-light">₹{price.toLocaleString('en-IN')}</span>
                      <span className="text-zinc-500 text-sm">/mo</span>
                    </>
                  )}
                </div>

                <div className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-yellow-600 text-sm mt-0.5">✦</span>
                      <span className="text-zinc-400 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleUpgrade(planKey)}
                  disabled={isCurrentPlan || upgrading}
                  className={`w-full text-sm tracking-widest uppercase py-3 rounded-sm font-medium transition-colors ${
                    isCurrentPlan
                      ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                      : planKey === 'director'
                      ? 'bg-yellow-600 text-black hover:bg-yellow-500'
                      : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'
                  }`}
                >
                  {isCurrentPlan ? 'Current Plan' : upgrading ? 'Processing...' : planKey === 'enterprise' ? 'Contact Sales' : 'Upgrade'}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Invoice History */}
      <div>
        <h2 className="text-white text-2xl font-light mb-6">Billing History</h2>
        
        {user.invoices && user.invoices.length > 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-zinc-800/50 border-b border-zinc-800">
                <tr>
                  <th className="px-6 py-3 text-left text-zinc-500 text-xs tracking-wider uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-zinc-500 text-xs tracking-wider uppercase">Plan</th>
                  <th className="px-6 py-3 text-left text-zinc-500 text-xs tracking-wider uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-zinc-500 text-xs tracking-wider uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-zinc-500 text-xs tracking-wider uppercase">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {user.invoices.map((invoice: any) => (
                  <tr key={invoice.id} className="hover:bg-zinc-800/30">
                    <td className="px-6 py-4 text-white text-sm">
                      {new Date(invoice.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-zinc-400 text-sm capitalize">
                      {invoice.plan} - {invoice.billingCycle}
                    </td>
                    <td className="px-6 py-4 text-white text-sm">
                      ₹{(invoice.amount / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-sm ${
                        invoice.status === 'paid'
                          ? 'bg-green-900/20 border border-green-800 text-green-400'
                          : invoice.status === 'failed'
                          ? 'bg-red-900/20 border border-red-800 text-red-400'
                          : 'bg-yellow-900/20 border border-yellow-800 text-yellow-400'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {invoice.status === 'paid' && (
                        
                         <a href={`/api/billing/invoice/${invoice.id}`}
                          className="text-yellow-600 hover:text-yellow-500 text-sm"
                          target="_blank"
                        >
                          Download
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-12 text-center">
            <p className="text-zinc-500 mb-4">No billing history yet</p>
            <p className="text-zinc-600 text-sm">
              Your invoices will appear here after your first payment
            </p>
          </div>
        )}
      </div>

    </div>
  )
}