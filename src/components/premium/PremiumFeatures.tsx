import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Crown, 
  Mic, 
  BarChart3, 
  Download, 
  Lock, 
  Sparkles, 
  Eye, 
  Share2,
  FileText,
  Palette,
  Brain,
  Heart,
  Moon,
  Sun,
  Star,
  Zap
} from 'lucide-react'

interface PremiumFeaturesProps {
  onUpgrade: () => void
}

export const PremiumFeatures: React.FC<PremiumFeaturesProps> = ({ onUpgrade }) => {
  const [activeTab, setActiveTab] = useState('overview')

  const premiumFeatures = [
    {
      icon: <Mic className="w-6 h-6" />,
      title: 'Voice Journal & Playback',
      description: 'Record your thoughts and reflections with voice notes',
      demo: 'Record unlimited voice entries and play them back anytime'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'AI Mood Charts & Analytics',
      description: 'Deep insights into your emotional patterns and growth',
      demo: 'Track mood trends, energy levels, and spiritual progress'
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Custom PDF Art Upload',
      description: 'Personalize your calendar with your own sacred artwork',
      demo: 'Upload and integrate your personal spiritual imagery'
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Unlimited AI Prompts',
      description: 'Endless personalized spiritual guidance and prompts',
      demo: 'Get unlimited AI-generated journal prompts and insights'
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Mirror Mode & Shadow Work',
      description: 'Deep psychological exploration and self-reflection',
      demo: 'Advanced shadow work exercises and mirror affirmations'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Tarot-Style Cards',
      description: 'Daily wisdom cards with spiritual guidance',
      demo: 'Draw personalized wisdom cards for daily inspiration'
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: 'Export & Share',
      description: 'Export your journey as beautiful PDFs and quote cards',
      demo: 'Create shareable content from your spiritual insights'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Private Lock & Hidden Entries',
      description: 'Keep your most personal reflections completely private',
      demo: 'Secure your deepest thoughts with private journaling'
    }
  ]

  const mockAnalytics = {
    moodTrend: [65, 70, 68, 75, 80, 78, 85],
    energyLevels: [60, 65, 70, 75, 80, 85, 90],
    spiritualGrowth: [40, 50, 60, 70, 75, 80, 85]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Premium Experience
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock the full potential of your spiritual journey with advanced features, 
            unlimited AI guidance, and deep personal insights.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-2 border-purple-100">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                          {feature.icon}
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-3">{feature.description}</p>
                      <Badge variant="secondary" className="text-xs">
                        {feature.demo}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    Mood Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.moodTrend.map((value, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="text-sm w-16">Day {index + 1}</span>
                        <Progress value={value} className="flex-1" />
                        <span className="text-sm font-medium">{value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    Energy Levels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.energyLevels.map((value, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="text-sm w-16">Day {index + 1}</span>
                        <Progress value={value} className="flex-1" />
                        <span className="text-sm font-medium">{value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Spiritual Growth Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { month: 'Origin', growth: 40, insight: 'Planted seeds of intention' },
                      { month: 'Harmony', growth: 55, insight: 'Found balance in relationships' },
                      { month: 'Creation', growth: 70, insight: 'Manifested creative projects' },
                      { month: 'Foundation', growth: 85, insight: 'Built strong spiritual foundation' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-20 text-sm font-medium">{item.month}</div>
                        <Progress value={item.growth} className="flex-1" />
                        <div className="text-sm text-gray-600 flex-1">{item.insight}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Daily Wisdom Cards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-lg text-center">
                    <div className="text-4xl mb-4">🔮</div>
                    <h3 className="font-semibold mb-2">Today's Guidance</h3>
                    <p className="text-sm text-gray-600">
                      "Trust in the process of transformation. Every challenge is a doorway to growth."
                    </p>
                    <Button size="sm" className="mt-4">Draw New Card</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-indigo-500" />
                    Mirror Mode
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-6 rounded-lg">
                    <div className="text-4xl mb-4 text-center">🪞</div>
                    <h3 className="font-semibold mb-2">Shadow Work Prompt</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      "What aspect of yourself are you avoiding? How can you embrace it with compassion?"
                    </p>
                    <Button size="sm" variant="outline">Begin Shadow Work</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mic className="w-5 h-5 text-green-500" />
                    Voice Journal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white"
                      >
                        <Mic className="w-8 h-8" />
                      </motion.div>
                    </div>
                    <p className="text-center text-sm text-gray-600">
                      Record your thoughts and reflections
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">Start Recording</Button>
                      <Button size="sm" variant="outline">Playback</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-500" />
                    AI Future Self
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-6 rounded-lg">
                    <div className="text-4xl mb-4 text-center">🔮</div>
                    <h3 className="font-semibold mb-2">Speak to Future Self</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Connect with your future self for guidance and wisdom
                    </p>
                    <Button size="sm">Start Conversation</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    PDF Export
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Export your complete journey as a beautiful PDF book
                  </p>
                  <div className="space-y-2">
                    <Button size="sm" className="w-full">Export Month</Button>
                    <Button size="sm" variant="outline" className="w-full">Export Year</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-green-500" />
                    Quote Cards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Create beautiful shareable quote cards from your insights
                  </p>
                  <div className="bg-gradient-to-br from-green-100 to-blue-100 p-4 rounded-lg text-center mb-4">
                    <p className="text-sm font-medium">"I am becoming who I was meant to be"</p>
                  </div>
                  <Button size="sm" className="w-full">Create Quote Card</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-purple-500" />
                    Data Export
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Download all your data in various formats
                  </p>
                  <div className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full">Export JSON</Button>
                    <Button size="sm" variant="outline" className="w-full">Export CSV</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Upgrade CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-center"
        >
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <CardContent className="p-8">
              <Crown className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h2 className="text-2xl font-bold mb-2">Unlock Your Full Potential</h2>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Transform your spiritual journey with unlimited AI guidance, advanced analytics, 
                voice journaling, and exclusive tools designed for deep personal growth.
              </p>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">$4.99</div>
                  <div className="text-sm text-purple-200">per month</div>
                </div>
                <div className="text-purple-200">or</div>
                <div className="text-center">
                  <div className="text-3xl font-bold">$49.99</div>
                  <div className="text-sm text-purple-200">per year</div>
                  <Badge className="bg-yellow-400 text-yellow-900 text-xs">Save 17%</Badge>
                </div>
              </div>
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-purple-50"
                onClick={onUpgrade}
              >
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}