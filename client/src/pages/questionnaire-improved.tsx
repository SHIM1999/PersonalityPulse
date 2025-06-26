import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProgressBar } from '@/components/progress-bar';
import { getRandomQuestions } from '@/lib/mbti-questions-pool';
import { useTestSession } from '@/hooks/use-test-session';

interface QuestionnaireImprovedProps {
  onNext: () => void;
  onBack: () => void;
}

type IntensityLevel = 1 | 2 | 3 | 4 | 5;

interface Answer {
  questionId: number;
  option: 'A' | 'B';
  intensity: IntensityLevel;
}

export default function QuestionnaireImproved({ onNext, onBack }: QuestionnaireImprovedProps) {
  const [questions] = useState(() => getRandomQuestions()); // 40개 랜덤 질문
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);
  const [selectedIntensity, setSelectedIntensity] = useState<IntensityLevel | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const { updateAnswers, completeTest, isUpdatingAnswers, isCompletingTest } = useTestSession();

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const currentAnswer = answers[question?.id];

  const intensityLabels = {
    1: '매우 그렇다',
    2: '그렇다', 
    3: '보통',
    4: '아니다',
    5: '매우 아니다'
  };

  const handleOptionSelect = useCallback((option: 'A' | 'B') => {
    setSelectedOption(option);
    setSelectedIntensity(null);
  }, []);

  const handleIntensitySelect = useCallback((intensity: IntensityLevel) => {
    if (!selectedOption) return;
    
    setSelectedIntensity(intensity);
    setIsFlipped(true);
    
    const answer: Answer = {
      questionId: question.id,
      option: selectedOption,
      intensity
    };

    const newAnswers = {
      ...answers,
      [question.id]: answer
    };
    setAnswers(newAnswers);

    // Convert to format expected by backend
    const backendAnswers: Record<string, string> = {};
    Object.entries(newAnswers).forEach(([questionId, answerData]) => {
      // Convert intensity to score (1=강함, 3=보통, 5=약함)
      const score = answerData.intensity <= 2 ? 'strong' : answerData.intensity === 3 ? 'medium' : 'weak';
      backendAnswers[questionId] = `${answerData.option}_${score}`;
    });
    
    updateAnswers(backendAnswers);

    // Auto-advance to next question after animation
    setTimeout(() => {
      setIsFlipped(false);
      
      if (isLastQuestion) {
        // Complete test if it's the last question
        completeTest().then(() => {
          onNext();
        });
      } else {
        // Move to next question
        setCurrentQuestion(prev => prev + 1);
        const nextAnswer = answers[questions[currentQuestion + 1]?.id];
        setSelectedOption(nextAnswer?.option || null);
        setSelectedIntensity(nextAnswer?.intensity || null);
      }
    }, 1200);
  }, [selectedOption, question.id, answers, updateAnswers, isLastQuestion, completeTest, onNext, currentQuestion]);

  const handleNext = useCallback(async () => {
    if (isLastQuestion) {
      await completeTest();
      onNext();
    } else {
      setCurrentQuestion(prev => prev + 1);
      const nextAnswer = answers[questions[currentQuestion + 1]?.id];
      setSelectedOption(nextAnswer?.option || null);
      setSelectedIntensity(nextAnswer?.intensity || null);
    }
  }, [isLastQuestion, completeTest, onNext, currentQuestion, answers]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      const prevAnswer = answers[questions[currentQuestion - 1]?.id];
      setSelectedOption(prevAnswer?.option || null);
      setSelectedIntensity(prevAnswer?.intensity || null);
    } else {
      onBack();
    }
  }, [currentQuestion, answers, onBack]);

  return (
    <section className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto w-full">
        <ProgressBar 
          current={currentQuestion + 1} 
          total={questions.length}
          label="질문 진행률"
        />

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className={`question-card ${isFlipped ? 'flipped' : ''}`}>
            <div className="card-inner">
              {/* Question Front */}
              <Card className="card-front shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-xl font-bold">
                        {currentQuestion + 1}
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                      {question.text}
                    </h3>
                  </div>

                  {/* Option Selection */}
                  <div className="space-y-4 mb-6">
                    <motion.button
                      onClick={() => handleOptionSelect('A')}
                      className={`w-full border-2 rounded-xl p-4 text-left transition-all duration-300 ${
                        selectedOption === 'A' 
                          ? 'border-primary bg-gradient-to-r from-blue-50 to-indigo-50' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                          selectedOption === 'A' ? 'bg-primary text-white' : 'bg-gray-300'
                        }`}>
                          <span className="font-bold">A</span>
                        </div>
                        <span className="text-gray-800">{question.optionA}</span>
                      </div>
                    </motion.button>
                    
                    <motion.button
                      onClick={() => handleOptionSelect('B')}
                      className={`w-full border-2 rounded-xl p-4 text-left transition-all duration-300 ${
                        selectedOption === 'B' 
                          ? 'border-secondary bg-gradient-to-r from-purple-50 to-pink-50' 
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                          selectedOption === 'B' ? 'bg-secondary text-white' : 'bg-gray-300'
                        }`}>
                          <span className="font-bold">B</span>
                        </div>
                        <span className="text-gray-800">{question.optionB}</span>
                      </div>
                    </motion.button>
                  </div>

                  {/* Intensity Selection */}
                  {selectedOption && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="text-lg font-semibold text-center mb-4">얼마나 그렇게 생각하시나요?</h4>
                      <div className="flex justify-between space-x-2">
                        {([1, 2, 3, 4, 5] as IntensityLevel[]).map((intensity) => (
                          <motion.button
                            key={intensity}
                            onClick={() => handleIntensitySelect(intensity)}
                            className={`flex-1 py-3 px-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                              selectedIntensity === intensity
                                ? 'bg-gradient-to-r from-accent to-primary text-white transform scale-105'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            whileHover={{ scale: selectedIntensity === intensity ? 1.05 : 1.02 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {intensityLabels[intensity]}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
              
              {/* Answer Confirmation Back */}
              <Card className="card-back bg-gradient-to-r from-accent to-primary">
                <CardContent className="p-8 flex items-center justify-center h-full">
                  <div className="text-center text-white">
                    <CheckCircle size={48} className="mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">답변 완료!</h3>
                    <p className="text-sm opacity-90 mt-2">
                      {selectedOption}번: {intensityLabels[selectedIntensity!]}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={handlePrevious}
          >
            <ArrowLeft className="mr-2" size={16} />
            이전
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={!selectedIntensity || isUpdatingAnswers || isCompletingTest}
            className={selectedIntensity 
              ? "bg-gradient-to-r from-primary to-secondary" 
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          >
            {isCompletingTest ? (
              "결과 분석 중..."
            ) : isLastQuestion ? (
              "결과 보기"
            ) : (
              "다음"
            )}
            <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}