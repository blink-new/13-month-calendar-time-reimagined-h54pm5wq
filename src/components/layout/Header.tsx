import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, Settings, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { blink } from '@/blink/client'

interface User {
  id: string
  email: string
  displayName?: string
}

export function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-amber-200 rounded-full animate-pulse" />
              <div className="w-32 h-6 bg-amber-200 rounded animate-pulse" />
            </div>
            <div className="w-24 h-8 bg-amber-200 rounded animate-pulse" />
          </div>
        </div>
      </header>
    )
  }

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center"
            >
              <Calendar className="w-4 h-4 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                13-Month Calendar
              </h1>
              <p className="text-xs text-amber-600/70 font-medium">Time Reimagined</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user && (
              <>
                <Button variant="ghost" size="sm" className="text-amber-700 hover:bg-amber-50">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade
                </Button>
                <Button variant="ghost" size="sm" className="text-amber-700 hover:bg-amber-50">
                  <User className="w-4 h-4 mr-2" />
                  {user.displayName || user.email?.split('@')[0]}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  )
}