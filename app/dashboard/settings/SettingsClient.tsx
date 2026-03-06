// app/dashboard/settings/SettingsClient.tsx

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type SettingsTab = 'profile' | 'security' | 'api' | 'preferences' | 'danger'

export default function SettingsClient({ user }: any) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user.name || '',
    email: user.email,
    phone: user.phone || ''
  })

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // API key state
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [generatingKey, setGeneratingKey] = useState(false)

  async function handleProfileUpdate(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/settings/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile')
      }

      setMessage({ type: 'success', text: 'Profile updated successfully' })
      router.refresh()

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setSaving(false)
    }
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' })
      return
    }

    if (passwordData.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters' })
      return
    }

    setSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/settings/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to change password')
      }

      setMessage({ type: 'success', text: 'Password changed successfully' })
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setSaving(false)
    }
  }

  async function generateApiKey() {
    if (!confirm('Generate new API key? This will invalidate your previous key.')) {
      return
    }

    setGeneratingKey(true)

    try {
      const response = await fetch('/api/settings/api-key', {
        method: 'POST'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate API key')
      }

      setApiKey(data.apiKey)
      setMessage({ type: 'success', text: 'API key generated successfully' })

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setGeneratingKey(false)
    }
  }

  async function handleDeleteAccount() {
    const confirmation = prompt('Type "DELETE" to confirm account deletion')
    
    if (confirmation !== 'DELETE') {
      return
    }

    setSaving(true)

    try {
      const response = await fetch('/api/settings/delete-account', {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete account')
      }

      window.location.href = '/sign-in?deleted=true'

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message })
      setSaving(false)
    }
  }

  const tabs: { id: SettingsTab; label: string; icon: string }[] = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'api', label: 'API Keys', icon: '🔑' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    { id: 'danger', label: 'Danger Zone', icon: '⚠️' }
  ]

  return (
    <div className="p-8">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white text-3xl font-light mb-2">Settings</h1>
        <p className="text-zinc-500">Manage your account settings and preferences</p>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-6 px-4 py-3 rounded-sm border ${
          message.type === 'success'
            ? 'bg-green-900/20 border-green-800 text-green-400'
            : 'bg-red-900/20 border-red-800 text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      <div className="flex gap-8">
        
        {/* Sidebar */}
        <div className="w-64 shrink-0">
          <div className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-zinc-800 text-white border-l-2 border-yellow-600'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-8">
              <h2 className="text-white text-xl font-medium mb-6">Profile Information</h2>
              
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                
                <div>
                  <label className="text-zinc-400 text-sm mb-2 block">Full Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-yellow-600"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 text-sm mb-2 block">Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    disabled
                    className="w-full bg-zinc-800 border border-zinc-700 text-zinc-500 px-4 py-3 rounded-sm cursor-not-allowed"
                  />
                  <p className="text-zinc-600 text-xs mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="text-zinc-400 text-sm mb-2 block">Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-yellow-600"
                    placeholder="+91 9999999999"
                  />
                  <p className="text-zinc-600 text-xs mt-1">Used for billing and support</p>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-yellow-600 text-black text-sm tracking-widest uppercase px-8 py-3 rounded-sm font-medium hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-8">
              <h2 className="text-white text-xl font-medium mb-6">Change Password</h2>
              
              <form onSubmit={handlePasswordChange} className="space-y-6">
                
                <div>
                  <label className="text-zinc-400 text-sm mb-2 block">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-yellow-600"
                    placeholder="Enter current password"
                    required
                  />
                </div>

                <div>
                  <label className="text-zinc-400 text-sm mb-2 block">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-yellow-600"
                    placeholder="Enter new password (min 8 characters)"
                    required
                  />
                </div>

                <div>
                  <label className="text-zinc-400 text-sm mb-2 block">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-yellow-600"
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-yellow-600 text-black text-sm tracking-widest uppercase px-8 py-3 rounded-sm font-medium hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Updating...' : 'Update Password'}
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* API KEYS TAB */}
          {activeTab === 'api' && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-8">
              <h2 className="text-white text-xl font-medium mb-2">API Keys</h2>
              <p className="text-zinc-500 text-sm mb-6">
                API access is available on Director plan and above
              </p>

              {user.apiAccess ? (
                <>
                  {apiKey && (
                    <div className="bg-zinc-800 border border-zinc-700 rounded-sm p-4 mb-6">
                      <p className="text-zinc-400 text-xs mb-2">Your API Key (save this now, it won't be shown again)</p>
                      <div className="flex items-center gap-3">
                        <code className="flex-1 bg-black px-4 py-2 rounded-sm text-yellow-600 text-sm font-mono">
                          {apiKey}
                        </code>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(apiKey)
                            setMessage({ type: 'success', text: 'API key copied!' })
                          }}
                          className="px-4 py-2 bg-zinc-700 text-white text-sm rounded-sm hover:bg-zinc-600"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={generateApiKey}
                    disabled={generatingKey}
                    className="bg-yellow-600 text-black text-sm tracking-widest uppercase px-8 py-3 rounded-sm font-medium hover:bg-yellow-500 transition-colors disabled:opacity-50"
                  >
                    {generatingKey ? 'Generating...' : 'Generate New API Key'}
                  </button>

                  <div className="mt-8 p-4 bg-zinc-800 rounded-sm">
                    <p className="text-white text-sm font-medium mb-2">API Documentation</p>
                    <p className="text-zinc-400 text-sm mb-3">
                      Use your API key to programmatically generate videos from your applications.
                    </p>
                    
                      <a href="/docs/api"
                      className="text-yellow-600 hover:text-yellow-500 text-sm"
                    >
                      View API Documentation →
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-zinc-500 mb-6">
                    Upgrade to Director plan to access API features
                  </p>
                  <a href="/dashboard/billing">
                    <button className="bg-yellow-600 text-black text-sm tracking-widest uppercase px-8 py-3 rounded-sm font-medium hover:bg-yellow-500">
                      Upgrade Plan
                    </button>
                  </a>
                </div>
              )}
            </div>
          )}

          {/* PREFERENCES TAB */}
          {activeTab === 'preferences' && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-8">
              <h2 className="text-white text-xl font-medium mb-6">Preferences</h2>
              
              <div className="space-y-6">
                
                <div className="flex items-center justify-between py-4 border-b border-zinc-800">
                  <div>
                    <p className="text-white text-sm font-medium">Email Notifications</p>
                    <p className="text-zinc-500 text-xs">Receive email when generations complete</p>
                  </div>
                  <label className="relative inline-block w-12 h-6">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-12 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-4 border-b border-zinc-800">
                  <div>
                    <p className="text-white text-sm font-medium">Marketing Emails</p>
                    <p className="text-zinc-500 text-xs">Product updates and offers</p>
                  </div>
                  <label className="relative inline-block w-12 h-6">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-12 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-white text-sm font-medium">Auto-download Videos</p>
                    <p className="text-zinc-500 text-xs">Automatically download completed videos</p>
                  </div>
                  <label className="relative inline-block w-12 h-6">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-12 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                  </label>
                </div>

              </div>
            </div>
          )}

          {/* DANGER ZONE TAB */}
          {activeTab === 'danger' && (
            <div className="bg-zinc-900 border border-red-900 rounded-sm p-8">
              <h2 className="text-red-400 text-xl font-medium mb-6">Danger Zone</h2>
              
              <div className="space-y-6">
                
                <div className="p-6 bg-red-900/10 border border-red-900 rounded-sm">
                  <h3 className="text-white text-sm font-medium mb-2">Delete Account</h3>
                  <p className="text-zinc-400 text-sm mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={saving}
                    className="bg-red-600 text-white text-sm tracking-widest uppercase px-6 py-2 rounded-sm font-medium hover:bg-red-500 transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Deleting...' : 'Delete Account'}
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}