import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MONTHS, YEAR_DAY, Month } from '../../types/calendar'
import MonthCard from './MonthCard'
import MonthDetail from './MonthDetail'
import { PremiumFeatures } from '../premium/PremiumFeatures'
import { Button } from '../ui/button'
import { Sparkles, Calendar, TrendingUp, Crown } from 'lucide-react'
import { blink } from '../../blink/client'

export function CalendarOverview() {
  const [selectedMonth, setSelectedMonth] = useState<Month | null>(null)
  const [completedDays, setCompletedDays] = useState<Record<number, number>>({})
  const [loading, setLoading] = useState(true)
  const [showPremium, setShowPremium] = useState(false)

  const loadUserProgress = async () => {
    try {
      const user = await blink.auth.me()
      const progressData = await blink.db.userProgress.list({
        where: { userId: user.id }
      })

      const progressMap: Record<number, number> = {}
      progressData.forEach(progress => {
        progressMap[Number(progress.monthNumber)] = Number(progress.daysCompleted) || 0
      })
      
      setCompletedDays(progressMap)
    } catch (error) {
      console.error('Error loading user progress:', error)
      // Set default values if error
      const defaultProgress: Record<number, number> = {}
      MONTHS.forEach(month => {
        defaultProgress[month.id] = 0
      })
      setCompletedDays(defaultProgress)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUserProgress()
  }, [])

  const totalCompleted = Object.values(completedDays).reduce((sum, days) => sum + days, 0)
  const totalPossible = MONTHS.length * 28
  const overallProgress = totalPossible > 0 ? (totalCompleted / totalPossible) * 100 : 0

  const handleMonthClick = (month: Month) => {
    setSelectedMonth(month)
  }

  const handleBackToOverview = () => {
    setSelectedMonth(null)
    loadUserProgress() // Refresh progress when returning
  }

  if (selectedMonth) {
    return (
      <MonthDetail 
        month={selectedMonth} 
        onBack={handleBackToOverview}
      />
    )
  }

  if (showPremium) {
    return (
      <PremiumFeatures 
        onUpgrade={() => {
          // Handle upgrade logic here
          console.log('Upgrade to premium')
          setShowPremium(false)
        }}
      />
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Brand Cover Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* Brand Cover Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <img
              src="/brand-cover.png"
              alt="The 13-Month Calendar: Time Reimagined"
              className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
            />
          </motion.div>

          {/* Dashboard Explanation Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <img
              src="/month-2.png"
              alt="How the 13-Month Calendar Works"
              className="w-full max-w-2xl mx-auto rounded-xl shadow-lg"
            />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent mb-4">
            Your Sacred Journey
          </h1>
          <p className="text-xl text-amber-700/80 mb-8 max-w-2xl mx-auto">
            Embark on a transformative year-long adventure through 13 months of spiritual growth and self-discovery
          </p>
          
          {/* Progress Stats */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">{totalCompleted}</div>
              <div className="text-sm text-amber-600/70">Days Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{overallProgress.toFixed(1)}%</div>
              <div className="text-sm text-orange-600/70">Overall Progress</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-rose-600">13</div>
              <div className="text-sm text-rose-600/70">Sacred Months</div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button 
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
              onClick={() => {
                // Find current month or first incomplete month
                const currentMonth = MONTHS.find(m => (completedDays[m.id] || 0) < 28) || MONTHS[0]
                handleMonthClick(currentMonth)
              }}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Continue Journey
            </Button>
            <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Progress
            </Button>
            <Button 
              onClick={() => setShowPremium(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Crown className="w-4 h-4 mr-2" />
              Premium Features
            </Button>
          </div>
        </motion.div>

        {/* Months Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
        >
          {MONTHS.map((month, index) => (
            <motion.div
              key={month.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <MonthCard
                month={month}
                completedDays={completedDays[month.id] || 0}
                onClick={() => handleMonthClick(month)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Year Day Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-orange-400 via-pink-400 to-blue-400 rounded-3xl p-8 text-white text-center relative overflow-hidden">
            {/* Year Day Artwork Background */}
            <div className="absolute inset-0 opacity-20">
              <img
                src={YEAR_DAY.artworkUrl}
                alt="Year Day"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="text-6xl font-bold mb-2">{YEAR_DAY.symbol}</div>
              <h3 className="text-4xl font-bold mb-2">{YEAR_DAY.name}</h3>
              <p className="text-xl opacity-90 mb-4">{YEAR_DAY.theme}</p>
              <p className="text-lg opacity-80 mb-6 max-w-2xl mx-auto">
                {YEAR_DAY.description}
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6 max-w-3xl mx-auto">
                <p className="text-lg font-medium italic">
                  "{YEAR_DAY.affirmation}"
                </p>
              </div>
              <Button 
                variant="secondary" 
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-lg px-8 py-3"
                onClick={() => handleMonthClick(YEAR_DAY)}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Explore Year Day
              </Button>
            </div>
          </div>
        </motion.div>
      </div>


    </div>
  )
}