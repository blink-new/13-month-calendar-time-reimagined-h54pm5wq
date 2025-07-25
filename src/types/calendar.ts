export interface Month {
  id: number
  name: string
  theme: string
  affirmation: string
  colors: {
    primary: string
    secondary: string
    background: string
    gradient: string
  }
  symbol: string
  description: string
  artworkUrl?: string
}

export interface DayEntry {
  id: string
  userId: string
  monthId: number
  day: number
  date: string
  journalEntry?: string
  mood?: number
  affirmationCompleted: boolean
  createdAt: string
  updatedAt: string
}

export interface UserProfile {
  id: string
  email: string
  displayName?: string
  birthDate?: string
  numerologyProfile?: any
  currentMonth: number
  streak: number
  totalEntries: number
  createdAt: string
}

export const MONTHS: Month[] = [
  {
    id: 1,
    name: "Origin",
    theme: "New Beginnings",
    affirmation: "I embrace fresh starts and infinite possibilities.",
    colors: {
      primary: "#8B4513",
      secondary: "#D2691E", 
      background: "#FFF8DC",
      gradient: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)"
    },
    symbol: "🌱",
    description: "The first month of transformation, where seeds of intention are planted.",
    artworkUrl: "/month-4.png"
  },
  {
    id: 2,
    name: "Harmony",
    theme: "Balance & Relationships",
    affirmation: "I create harmony within myself and with others.",
    colors: {
      primary: "#FF69B4",
      secondary: "#FFB6C1",
      background: "#FFF0F5",
      gradient: "linear-gradient(135deg, #FF69B4 0%, #FFB6C1 100%)"
    },
    symbol: "⚖️",
    description: "Finding equilibrium between all aspects of life and relationships.",
    artworkUrl: "/month-5.png"
  },
  {
    id: 3,
    name: "Creation",
    theme: "Inspiration & Action",
    affirmation: "I channel divine creativity into meaningful action.",
    colors: {
      primary: "#FF4500",
      secondary: "#FFA500",
      background: "#FFF8DC",
      gradient: "linear-gradient(135deg, #FF4500 0%, #FFA500 100%)"
    },
    symbol: "🎨",
    description: "The month of bringing ideas into reality through inspired action.",
    artworkUrl: "/month-6.png"
  },
  {
    id: 4,
    name: "Foundation",
    theme: "Roots & Security",
    affirmation: "I build my life on a solid ground of strength and purpose.",
    colors: {
      primary: "#8B5A3C",
      secondary: "#CD853F",
      background: "#F5F5DC",
      gradient: "linear-gradient(135deg, #8B5A3C 0%, #5F8A8B 100%)"
    },
    symbol: "🏠",
    description: "Establishing strong foundations for lasting growth and security.",
    artworkUrl: "/month-7.png"
  },
  {
    id: 5,
    name: "Freedom",
    theme: "Exploration & Adventure",
    affirmation: "I soar above limits, embracing endless adventures and liberation.",
    colors: {
      primary: "#87CEEB",
      secondary: "#4682B4",
      background: "#F0F8FF",
      gradient: "linear-gradient(135deg, #87CEEB 0%, #4682B4 100%)"
    },
    symbol: "🕊️",
    description: "Breaking free from limitations and exploring new horizons.",
    artworkUrl: "/month-8.png"
  },
  {
    id: 6,
    name: "Nurture",
    theme: "Care & Growth",
    affirmation: "I lovingly cultivate my growth and honour my inner light.",
    colors: {
      primary: "#98FB98",
      secondary: "#90EE90",
      background: "#F0FFF0",
      gradient: "linear-gradient(135deg, #FFB6C1 0%, #98FB98 100%)"
    },
    symbol: "💚",
    description: "Tending to personal growth with love and compassion.",
    artworkUrl: "/month-6-harmony.png"
  },
  {
    id: 7,
    name: "Wisdom",
    theme: "Learning & Reflection",
    affirmation: "I listen deeply to my inner guide, embracing truth and insight.",
    colors: {
      primary: "#6A5ACD",
      secondary: "#9370DB",
      background: "#F8F8FF",
      gradient: "linear-gradient(135deg, #6A5ACD 0%, #9370DB 100%)"
    },
    symbol: "👁️",
    description: "Deepening understanding through reflection and inner wisdom.",
    artworkUrl: "/month-7-wisdom.png"
  },
  {
    id: 8,
    name: "Abundance",
    theme: "Gratitude & Prosperity",
    affirmation: "I welcome prosperity and let the flow of abundance enrich my life.",
    colors: {
      primary: "#32CD32",
      secondary: "#228B22",
      background: "#F0FFF0",
      gradient: "linear-gradient(135deg, #32CD32 0%, #4682B4 100%)"
    },
    symbol: "∞",
    description: "Opening to the infinite flow of abundance in all forms.",
    artworkUrl: "/month-8-abundance.png"
  },
  {
    id: 9,
    name: "Fulfillment",
    theme: "Satisfaction & Giving",
    affirmation: "I celebrate each moment, knowing my journey is complete and joyful.",
    colors: {
      primary: "#4F46E5",
      secondary: "#C7D2FE",
      background: "#EEF2FF",
      gradient: "linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%)"
    },
    symbol: "⭕",
    description: "Experiencing fulfillment through service and sharing.",
    artworkUrl: "/month-9.png"
  },
  {
    id: 10,
    name: "Renewal",
    theme: "Change & Fresh Starts",
    affirmation: "I rise anew each day, embracing the beauty of constant rebirth.",
    colors: {
      primary: "#EA580C",
      secondary: "#FED7AA",
      background: "#FFF7ED",
      gradient: "linear-gradient(135deg, #EA580C 0%, #FB923C 100%)"
    },
    symbol: "☀️",
    description: "Welcoming transformation and new cycles of growth.",
    artworkUrl: "/month-10.png"
  },
  {
    id: 11,
    name: "Insight",
    theme: "Intuition & Clarity",
    affirmation: "I trust my inner vision as clarity lights the path before me.",
    colors: {
      primary: "#0891B2",
      secondary: "#A5F3FC",
      background: "#ECFEFF",
      gradient: "linear-gradient(135deg, #0891B2 0%, #06B6D4 100%)"
    },
    symbol: "💡",
    description: "Developing deeper intuition and crystal-clear vision.",
    artworkUrl: "/month-11.png"
  },
  {
    id: 12,
    name: "Cosmos",
    theme: "Unity & Universality",
    affirmation: "I am one with the universe, resonating with infinite cosmic rhythm.",
    colors: {
      primary: "#7C3AED",
      secondary: "#C4B5FD",
      background: "#F5F3FF",
      gradient: "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)"
    },
    symbol: "✦",
    description: "Connecting with universal consciousness and cosmic wisdom.",
    artworkUrl: "/month-12.png"
  },
  {
    id: 13,
    name: "Transformation",
    theme: "Transcendence & Metamorphosis",
    affirmation: "I evolve gracefully, transforming every challenge into my highest self.",
    colors: {
      primary: "#059669",
      secondary: "#6EE7B7",
      background: "#ECFDF5",
      gradient: "linear-gradient(135deg, #059669 0%, #10B981 100%)"
    },
    symbol: "🦋",
    description: "The ultimate transformation into your most authentic self.",
    artworkUrl: "/month-13.png"
  }
]

export const YEAR_DAY: Month = {
  id: 14,
  name: "Year Day",
  theme: "Reflection, Rest, Celebration",
  affirmation: "On this sacred Year Day, I honour the cycles of life and welcome a new dawn with gratitude.",
  colors: {
    primary: "#FF8C69",
    secondary: "#87CEEB", 
    background: "#FFF8DC",
    gradient: "linear-gradient(135deg, #FF8C69 0%, #87CEEB 100%)"
  },
  symbol: "AΩ",
  description: "The timeless day of reflection, celebrating the completion of one cycle and the beginning of another.",
  artworkUrl: "/year-day-final.png"
}