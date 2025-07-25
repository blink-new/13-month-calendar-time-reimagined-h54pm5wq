import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Heart, Star, Sun, Moon } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface TarotCard {
  id: string;
  name: string;
  meaning: string;
  guidance: string;
  symbol: string;
  color: string;
  element: string;
}

const tarotDeck: TarotCard[] = [
  {
    id: 'wisdom',
    name: 'The Wisdom Keeper',
    meaning: 'Inner knowing and spiritual insight',
    guidance: 'Trust your intuition today. The answers you seek are already within you.',
    symbol: '👁️',
    color: 'from-purple-500 to-indigo-600',
    element: 'Spirit'
  },
  {
    id: 'transformation',
    name: 'The Butterfly',
    meaning: 'Change and personal growth',
    guidance: 'Embrace the changes happening in your life. You are becoming who you are meant to be.',
    symbol: '🦋',
    color: 'from-emerald-500 to-teal-600',
    element: 'Air'
  },
  {
    id: 'abundance',
    name: 'The Flowing River',
    meaning: 'Prosperity and infinite possibilities',
    guidance: 'Open yourself to receive. Abundance flows to you in unexpected ways.',
    symbol: '♾️',
    color: 'from-blue-500 to-cyan-600',
    element: 'Water'
  },
  {
    id: 'foundation',
    name: 'The Ancient Tree',
    meaning: 'Stability and deep roots',
    guidance: 'Ground yourself in what truly matters. Your foundation is stronger than you know.',
    symbol: '🌳',
    color: 'from-amber-500 to-orange-600',
    element: 'Earth'
  },
  {
    id: 'illumination',
    name: 'The Inner Sun',
    meaning: 'Clarity and enlightenment',
    guidance: 'Let your inner light shine brightly. You have the power to illuminate any darkness.',
    symbol: '☀️',
    color: 'from-yellow-500 to-orange-500',
    element: 'Fire'
  },
  {
    id: 'harmony',
    name: 'The Sacred Balance',
    meaning: 'Peace and equilibrium',
    guidance: 'Find balance in all things. Harmony comes from accepting both light and shadow.',
    symbol: '⚖️',
    color: 'from-pink-500 to-rose-600',
    element: 'Air'
  },
  {
    id: 'mystery',
    name: 'The Moonlit Path',
    meaning: 'Intuition and hidden knowledge',
    guidance: 'Trust the journey even when you cannot see the destination. The path will reveal itself.',
    symbol: '🌙',
    color: 'from-slate-500 to-gray-600',
    element: 'Water'
  },
  {
    id: 'passion',
    name: 'The Sacred Flame',
    meaning: 'Creative energy and inspiration',
    guidance: 'Follow your passion with courage. Your creative fire is meant to be shared with the world.',
    symbol: '🔥',
    color: 'from-red-500 to-pink-600',
    element: 'Fire'
  }
];

interface TarotCardsProps {
  onCardDrawn: (card: TarotCard) => void;
}

const TarotCards: React.FC<TarotCardsProps> = ({ onCardDrawn }) => {
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [hasDrawnToday, setHasDrawnToday] = useState(false);

  const shuffleAndDraw = () => {
    setIsShuffling(true);
    setSelectedCard(null);

    // Simulate shuffling animation
    setTimeout(() => {
      const randomCard = tarotDeck[Math.floor(Math.random() * tarotDeck.length)];
      setSelectedCard(randomCard);
      setIsShuffling(false);
      setHasDrawnToday(true);
      onCardDrawn(randomCard);
    }, 2000);
  };

  const resetDraw = () => {
    setSelectedCard(null);
    setHasDrawnToday(false);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-800">Daily Wisdom Cards</h3>
        <Badge className="bg-indigo-500 text-white text-xs">Premium</Badge>
      </div>

      <div className="text-center space-y-6">
        {/* Card Display Area */}
        <div className="relative h-80 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isShuffling && (
              <motion.div
                key="shuffling"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-12 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg shadow-lg"
                      animate={{
                        rotateY: [0, 180, 360],
                        scale: [1, 0.8, 1],
                      }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.1,
                        repeat: 2,
                      }}
                    />
                  ))}
                </div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, ease: "linear" }}
                >
                  <Sparkles className="w-8 h-8 text-indigo-600" />
                </motion.div>
              </motion.div>
            )}

            {!isShuffling && !selectedCard && (
              <motion.div
                key="deck"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative"
              >
                {/* Card Stack */}
                <div className="relative">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-32 h-48 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-xl border-2 border-white/20"
                      style={{
                        transform: `translate(${i * 2}px, ${i * -2}px) rotate(${i * 2}deg)`,
                        zIndex: 3 - i,
                      }}
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-white/80" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {selectedCard && (
              <motion.div
                key="selected-card"
                initial={{ opacity: 0, rotateY: 180, scale: 0.8 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: -180, scale: 0.8 }}
                transition={{ duration: 0.8 }}
                className="w-64 h-80"
              >
                <div className={`w-full h-full bg-gradient-to-br ${selectedCard.color} rounded-xl shadow-2xl border-2 border-white/20 p-6 text-white relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full" style={{
                      backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
                                       radial-gradient(circle at 70% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)`
                    }} />
                  </div>

                  <div className="relative z-10 h-full flex flex-col">
                    {/* Card Symbol */}
                    <div className="text-center mb-4">
                      <div className="text-6xl mb-2">{selectedCard.symbol}</div>
                      <div className="text-xs opacity-80 uppercase tracking-wider">
                        {selectedCard.element}
                      </div>
                    </div>

                    {/* Card Name */}
                    <h4 className="text-xl font-bold text-center mb-4">
                      {selectedCard.name}
                    </h4>

                    {/* Card Meaning */}
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="text-sm opacity-90 text-center mb-4 italic">
                        {selectedCard.meaning}
                      </p>
                      
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                        <p className="text-sm leading-relaxed">
                          {selectedCard.guidance}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Instructions */}
        <div className="text-center">
          {!hasDrawnToday && !isShuffling && (
            <p className="text-gray-600 mb-4">
              Take a deep breath and focus on your question. Draw a card for today's guidance.
            </p>
          )}
          
          {selectedCard && (
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700">
                Reflect on this message throughout your day. How does it apply to your current situation?
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4">
          {!hasDrawnToday && !isShuffling && (
            <Button
              onClick={shuffleAndDraw}
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Draw Your Card
            </Button>
          )}

          {hasDrawnToday && selectedCard && (
            <Button
              onClick={resetDraw}
              variant="outline"
              className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Draw Again
            </Button>
          )}
        </div>

        {hasDrawnToday && (
          <p className="text-xs text-gray-500">
            You can draw multiple cards throughout the day for different questions or situations.
          </p>
        )}
      </div>
    </Card>
  );
};

export default TarotCards;