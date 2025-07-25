import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Sparkles, Heart, Mic, MicOff, Loader2, Crown } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { Month } from '../../types/calendar';
import { blink } from '../../blink/client';
import VoiceJournal from '../premium/VoiceJournal';
import TarotCards from '../premium/TarotCards';

interface DailyEntryProps {
  month: Month;
  day: number;
  onClose: () => void;
  onComplete: () => void;
}

const moodEmojis = ['😢', '😕', '😐', '🙂', '😊', '😄', '🤩', '✨', '🌟', '🚀'];

const DailyEntry: React.FC<DailyEntryProps> = ({ month, day, onClose, onComplete }) => {
  const [journalText, setJournalText] = useState('');
  const [moodRating, setMoodRating] = useState([5]);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [existingEntry, setExistingEntry] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);

  const calculateStreak = useCallback((entries: any[]) => {
    const sortedEntries = entries.sort((a, b) => 
      new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime()
    );
    
    let streak = 0;
    const today = new Date();
    
    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.entryDate);
      const daysDiff = Math.floor((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }, []);

  const loadExistingEntry = useCallback(async () => {
    try {
      const user = await blink.auth.me();
      const entries = await blink.db.userEntries.list({
        where: {
          userId: user.id,
          monthNumber: month.id,
          dayNumber: day
        }
      });

      if (entries.length > 0) {
        const entry = entries[0];
        setExistingEntry(entry);
        setJournalText(entry.journalText || '');
        setMoodRating([entry.moodRating || 5]);
        setAiPrompt(entry.aiPrompt || '');
        setAiResponse(entry.aiResponse || '');
      }
    } catch (error) {
      console.error('Error loading existing entry:', error);
    }
  }, [month.id, day]);

  const generateDailyPrompt = useCallback(async () => {
    if (isGeneratingPrompt) return;
    
    setIsGeneratingPrompt(true);
    try {
      const { text } = await blink.ai.generateText({
        prompt: `Generate a thoughtful, spiritual journal prompt for Day ${day} of Month ${month.id} (${month.name}) in a 13-month calendar system. 

Month Theme: ${month.name} - ${month.description}
Month Affirmation: "${month.affirmation}"

Create a prompt that:
- Connects to the month's spiritual theme
- Encourages deep self-reflection
- Is appropriate for day ${day} of the journey
- Helps with personal growth and mindfulness
- Is 1-2 sentences long

Make it inspiring and thought-provoking.`,
        maxTokens: 150
      });

      setAiPrompt(text.trim());
    } catch (error) {
      console.error('Error generating prompt:', error);
      setAiPrompt(`Reflect on your journey through ${month.name}. How are you embodying the energy of "${month.affirmation}" today?`);
    } finally {
      setIsGeneratingPrompt(false);
    }
  }, [isGeneratingPrompt, day, month.id, month.name, month.description, month.affirmation]);

  useEffect(() => {
    loadExistingEntry();
    generateDailyPrompt();
  }, [loadExistingEntry, generateDailyPrompt]);

  const generateAiResponse = async () => {
    if (!journalText.trim() || isGeneratingResponse) return;

    setIsGeneratingResponse(true);
    try {
      const { text } = await blink.ai.generateText({
        prompt: `You are a wise, compassionate spiritual guide helping someone on their personal growth journey. 

Context:
- Month: ${month.name} (${month.description})
- Day: ${day} of 28
- Month Affirmation: "${month.affirmation}"
- Mood Rating: ${moodRating[0]}/10
- Journal Entry: "${journalText}"
- Reflection Prompt: "${aiPrompt}"

Provide a thoughtful, encouraging response that:
- Acknowledges their feelings and experiences
- Offers gentle wisdom and insights
- Connects their entry to the month's spiritual theme
- Provides encouragement for their journey
- Is warm, supportive, and non-judgmental
- Is 2-3 sentences long

Respond as a caring spiritual mentor would.`,
        maxTokens: 200
      });

      setAiResponse(text.trim());
    } catch (error) {
      console.error('Error generating AI response:', error);
      setAiResponse('Thank you for sharing your thoughts. Your journey of growth and self-discovery is beautiful and meaningful.');
    } finally {
      setIsGeneratingResponse(false);
    }
  };

  const handleSave = async () => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      const user = await blink.auth.me();
      const entryData = {
        userId: user.id,
        monthNumber: month.id,
        dayNumber: day,
        entryDate: new Date().toISOString().split('T')[0],
        journalText: journalText.trim(),
        moodRating: moodRating[0],
        aiPrompt,
        aiResponse
      };

      if (existingEntry) {
        await blink.db.userEntries.update(existingEntry.id, entryData);
      } else {
        await blink.db.userEntries.create({
          id: `entry_${user.id}_${month.id}_${day}`,
          ...entryData
        });
      }

      // Update progress
      const progressData = await blink.db.userProgress.list({
        where: { userId: user.id, monthNumber: month.id }
      });

      if (progressData.length > 0) {
        const progress = progressData[0];
        const completedEntries = await blink.db.userEntries.list({
          where: { userId: user.id, monthNumber: month.id }
        });

        await blink.db.userProgress.update(progress.id, {
          daysCompleted: completedEntries.length,
          lastEntryDate: new Date().toISOString().split('T')[0],
          streakCount: calculateStreak(completedEntries)
        });
      }

      onComplete();
    } catch (error) {
      console.error('Error saving entry:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        
        try {
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const dataUrl = reader.result as string;
              const base64Data = dataUrl.split(',')[1];
              resolve(base64Data);
            };
            reader.onerror = reject;
            reader.readAsDataURL(audioBlob);
          });

          const { text } = await blink.ai.transcribeAudio({
            audio: base64,
            language: 'en'
          });

          setJournalText(prev => prev + (prev ? '\n\n' : '') + text);
        } catch (error) {
          console.error('Error transcribing audio:', error);
        }

        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
      };

      setIsRecording(true);
      mediaRecorder.start();

      // Stop recording after 60 seconds max
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
      }, 60000);

      // Store recorder reference for manual stop
      (window as any).currentRecorder = mediaRecorder;
    } catch (error) {
      console.error('Error starting voice recording:', error);
      setIsRecording(false);
    }
  };

  const stopVoiceRecording = () => {
    const recorder = (window as any).currentRecorder;
    if (recorder && recorder.state === 'recording') {
      recorder.stop();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Day {day} - {month.name}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Mood Check-in */}
          <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500" />
              How are you feeling today?
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Mood Rating</span>
                <span className="text-2xl">{moodEmojis[moodRating[0] - 1]}</span>
              </div>
              <Slider
                value={moodRating}
                onValueChange={setMoodRating}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </Card>

          {/* AI Prompt */}
          <Card className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Today's Reflection Prompt
            </h3>
            {isGeneratingPrompt ? (
              <div className="flex items-center gap-2 text-gray-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating your personalized prompt...</span>
              </div>
            ) : (
              <p className="text-gray-700 italic leading-relaxed">
                "{aiPrompt}"
              </p>
            )}
          </Card>

          {/* Journal Entry */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Your Journal Entry</h3>
              <div className="flex gap-2">
                <Button
                  onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                  variant="outline"
                  size="sm"
                  className={`${isRecording ? 'bg-red-50 border-red-300 text-red-700' : 'border-gray-300'}`}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-4 h-4 mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4 mr-2" />
                      Voice Entry
                    </>
                  )}
                </Button>
              </div>
            </div>
            <Textarea
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Share your thoughts, feelings, and reflections for today..."
              className="min-h-[200px] resize-none border-gray-300 focus:border-amber-400 focus:ring-amber-400"
            />
          </div>

          {/* AI Response */}
          {journalText.trim() && (
            <Card className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  AI Guidance
                </h3>
                {!aiResponse && (
                  <Button
                    onClick={generateAiResponse}
                    variant="outline"
                    size="sm"
                    disabled={isGeneratingResponse}
                    className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  >
                    {isGeneratingResponse ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Get Guidance
                      </>
                    )}
                  </Button>
                )}
              </div>
              {aiResponse && (
                <p className="text-gray-700 leading-relaxed italic">
                  "{aiResponse}"
                </p>
              )}
            </Card>
          )}

          {/* Premium Features */}
          <div className="space-y-6 border-t border-gray-200 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-800">Premium Features</h3>
              <Badge className="bg-purple-500 text-white text-xs">Upgrade to unlock</Badge>
            </div>
            
            {/* Voice Journal */}
            <VoiceJournal 
              onSave={(audioBlob, transcript) => {
                console.log('Voice journal saved:', { audioBlob, transcript });
                // In real app, this would save to database
              }}
            />
            
            {/* Tarot Cards */}
            <TarotCards 
              onCardDrawn={(card) => {
                console.log('Card drawn:', card);
                // In real app, this would save to database
              }}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSave}
              disabled={isSaving || !journalText.trim()}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Entry
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DailyEntry;