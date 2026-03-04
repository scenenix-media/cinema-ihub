// app/admin/users/AddCreditsButton.tsx

'use client'

import { useState } from 'react'

export default function AddCreditsButton({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [amount, setAmount] = useState(50)
  const [loading, setLoading] = useState(false)

  async function handleAddCredits() {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/add-credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, amount })
      })
      
      if (response.ok) {
        alert(`Added ${amount} credits successfully!`)
        setIsOpen(false)
        window.location.reload()
      } else {
        alert('Failed to add credits')
      }
    } catch (error) {
      alert('Error adding credits')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-yellow-600 text-xs hover:text-yellow-500"
      >
        + Credits
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-16 bg-zinc-800 text-white text-xs px-2 py-1 rounded-sm"
        min="1"
      />
      <button
        onClick={handleAddCredits}
        disabled={loading}
        className="text-green-600 text-xs hover:text-green-500 disabled:opacity-50"
      >
        {loading ? '...' : '✓'}
      </button>
      <button
        onClick={() => setIsOpen(false)}
        className="text-red-600 text-xs hover:text-red-500"
      >
        ✕
      </button>
    </div>
  )
}