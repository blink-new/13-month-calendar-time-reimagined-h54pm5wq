import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, BookOpen, Sparkles, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Month } from '../../types/calendar';
import { blink } from '../../blink/client';
import DailyEntry from './DailyEntry';

interface MonthDetailProps {
  month: Month;
  onBack: () => void;
}



const MonthDetail: React.FC<MonthDetailProps> = ({ month, onBack }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [userProgress, setUserProgress] = useState<any>(null);
  const [userEntries, setUserEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMonthData = useCallback(async () => {
    try {
      const user = await blink.auth.me();
      
      // Load user progress for this month
      const progressData = await blink.db.userProgress.list({
        where: { 
          userId: user.id, 
          monthNumber: month.id 
        }
      });
      
      if (progressData.length > 0) {
        setUserProgress(progressData[0]);
      } else {
        // Create initial progress record
        const totalDays = month.id === 14 ? 1 : 28; // Year Day has 1 day, others have 28
        const newProgress = await blink.db.userProgress.create({
          id: `progress_${user.id}_${month.id}`,
          userId: user.id,
          monthNumber: month.id,
          daysCompleted: 0,
          totalDays: totalDays,
          streakCount: 0
        });
        setUserProgress(newProgress);
      }

      // Load user entries for this month
      const entriesData = await blink.db.userEntries.list({
        where: { 
          userId: user.id, 
          monthNumber: month.id 
        },
        orderBy: { dayNumber: 'asc' }
      });
      setUserEntries(entriesData);
      
    } catch (error) {
      console.error('Error loading month data:', error);
    } finally {
      setLoading(false);
    }
  }, [month.id]);

  useEffect(() => {
    loadMonthData();
  }, [loadMonthData]);

  const getDayStatus = (dayNumber: number) => {
    const entry = userEntries.find(e => Number(e.dayNumber) === dayNumber);
    return entry ? 'completed' : 'available';
  };

  const handleDayClick = (dayNumber: number) => {
    setSelectedDay(dayNumber);
  };

  const handleEntryComplete = () => {
    loadMonthData(); // Refresh data
    setSelectedDay(null);
  };

  const renderCalendarGrid = () => {
    // Year Day has only 1 day, regular months have 28 days
    const totalDays = month.id === 14 ? 1 : 28;
    const days = Array.from({ length: totalDays }, (_, i) => i + 1);
    
    // For Year Day, use a single centered card instead of grid
    if (month.id === 14) {
      const status = getDayStatus(1);
      const isCompleted = status === 'completed';
      
      return (
        <div className="flex justify-center mb-8">
          <motion.button
            onClick={() => handleDayClick(1)}
            className={`
              w-32 h-32 rounded-2xl border-4 flex flex-col items-center justify-center
              font-bold text-2xl transition-all duration-200 shadow-lg
              ${isCompleted 
                ? 'bg-gradient-to-br from-purple-100 to-pink-200 border-purple-300 text-purple-800' 
                : 'bg-gradient-to-br from-orange-100 to-pink-200 border-orange-300 text-orange-800 hover:border-purple-400 hover:shadow-xl'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-3xl mb-1">{month.symbol}</div>
            <div className="text-sm font-medium">Year Day</div>
            {isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute"
              >
                <Heart className="w-6 h-6 text-purple-600 fill-current" />
              </motion.div>
            )}
          </motion.button>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-7 gap-3 mb-8">
        {days.map((day) => {
          const status = getDayStatus(day);
          const isCompleted = status === 'completed';
          
          return (
            <motion.button
              key={day}
              onClick={() => handleDayClick(day)}
              className={`
                aspect-square rounded-lg border-2 flex items-center justify-center
                font-medium text-lg transition-all duration-200
                ${isCompleted 
                  ? 'bg-gradient-to-br from-amber-100 to-amber-200 border-amber-300 text-amber-800 shadow-md' 
                  : 'bg-white/80 border-gray-200 text-gray-600 hover:border-amber-300 hover:bg-amber-50'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {day}
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Heart className="w-4 h-4 text-amber-600 fill-current" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-warm-50 to-amber-50">
      <AnimatePresence>
        {selectedDay && (
          <DailyEntry
            month={month}
            day={selectedDay}
            onClose={() => setSelectedDay(null)}
            onComplete={handleEntryComplete}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-amber-700 hover:text-amber-800 hover:bg-amber-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Calendar
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Month Artwork & Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Artwork Card */}
            {month.artworkUrl && (
              <Card className="overflow-hidden shadow-xl">
                <img
                  src={month.artworkUrl}
                  alt={`${month.name} artwork`}
                  className="w-full h-auto object-cover"
                />
              </Card>
            )}

            {/* Month Info */}
            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ background: month.colors.gradient }}
                  />
                  <h2 className="text-2xl font-bold text-gray-800">
                    {month.id === 14 ? month.name : `Month ${month.id}: ${month.name}`}
                  </h2>
                </div>
                
                <p className="text-gray-600 leading-relaxed">
                  {month.description}
                </p>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200">
                  <p className="text-amber-800 font-medium italic">
                    "{month.affirmation}"
                  </p>
                </div>

                {/* Progress Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600">
                      {userProgress?.daysCompleted || 0}
                    </div>
                    <div className="text-sm text-gray-600">Days Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">
                      {userProgress?.streakCount || 0}
                    </div>
                    <div className="text-sm text-gray-600">Current Streak</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Calendar Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-5 h-5 text-amber-600" />
                <h3 className="text-xl font-semibold text-gray-800">
                  {month.id === 14 ? 'Sacred Year Day' : '28-Day Journey'}
                </h3>
              </div>
              
              {renderCalendarGrid()}

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-br from-amber-100 to-amber-200 border border-amber-300 rounded" />
                  <span>Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-white border border-gray-200 rounded" />
                  <span>Available</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    const maxDays = month.id === 14 ? 1 : 28;
                    const nextDay = (userProgress?.daysCompleted || 0) + 1;
                    if (nextDay <= maxDays) {
                      handleDayClick(nextDay);
                    }
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                  disabled={(userProgress?.daysCompleted || 0) >= (month.id === 14 ? 1 : 28)}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  {month.id === 14 ? 'Begin Year Day Reflection' : 'Continue Journey'}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    if (month.id === 14) {
                      handleDayClick(1); // Year Day only has day 1
                    } else {
                      const today = new Date().getDate();
                      handleDayClick(Math.min(today, 28));
                    }
                  }}
                  className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  {month.id === 14 ? 'Year Day Entry' : 'Today\'s Entry'}
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MonthDetail;