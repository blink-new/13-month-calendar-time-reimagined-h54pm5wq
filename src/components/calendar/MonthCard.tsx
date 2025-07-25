import { motion } from 'framer-motion'
import { Month } from '../../types/calendar'
import { Card } from '../ui/card'

interface MonthCardProps {
  month: Month
  onClick: () => void
  completedDays: number
}

const MonthCard: React.FC<MonthCardProps> = ({ month, onClick, completedDays }) => {
  const progressPercentage = (completedDays / 28) * 100

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card 
        className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
        onClick={onClick}
      >
        <div 
          className="p-6 text-white relative"
          style={{ background: month.colors.gradient }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.2) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)`
            }} />
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold mb-1">{month.name}</h3>
                <p className="text-sm opacity-90">Month {month.id}</p>
              </div>
              <div className="text-3xl">{month.symbol}</div>
            </div>

            <p className="text-sm opacity-90 mb-4 line-clamp-2">{month.theme}</p>

            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-2 mb-4">
              <motion.div
                className="bg-white rounded-full h-2"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </div>

            <div className="flex justify-between items-center">
              <p className="text-xs opacity-80">
                {completedDays}/28 days completed
              </p>
              <div className="text-xs opacity-80">
                {progressPercentage.toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default MonthCard