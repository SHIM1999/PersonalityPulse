import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProgressBar } from '@/components/progress-bar';
import { mbtiQuestions } from '@/lib/mbti-questions';
import { useTestSession } from '@/hooks/use-test-session';

interface QuestionnaireProps {
  onNext: () => void;
  onBack: () => void;
}

export default function Questionnaire({ onNext, onBack }: QuestionnaireProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const { updateAnswers, completeTest, isUpdatingAnswers, isCompletingTest } = useTestSession();

  const question = mbtiQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === mbtiQuestions.length - 1;

  const handleAnswerSelect = useCallback((answer: string) => {
    setSelectedAnswer(answer);
    setIsFlipped(true);
    
    const newAnswers = {
      ...answers,
      [question.id]: answer
    };
    setAnswers(newAnswers);
    updateAnswers(newAnswers);

    // Reset flip after animation
    setTimeout(() => {
      setIsFlipped(false);
    }, 1000);
  }, [answers, question.id, updateAnswers]);

  const handleNext = useCallback(async () => {
    if (isLastQuestion) {
      await completeTest();
      onNext();
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    }
  }, [isLastQuestion, completeTest, onNext]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(answers[mbtiQuestions[currentQuestion - 1].id] || null);
    } else {
      onBack();
    }
  }, [currentQuestion, answers, onBack]);

  return (
    <section className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto w-full">
        <ProgressBar 
          current={currentQuestion + 1} 
          total={mbtiQuestions.length}
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
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      {question.text}
                    </h3>
                  </div>

                  {/* Answer Options */}
                  <div className="space-y-4">
                    <motion.button
                      onClick={() => handleAnswerSelect('A')}
                      className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 text-left hover:from-blue-100 hover:to-indigo-100 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4">
                          <span className="text-white font-bold">A</span>
                        </div>
                        <span className="text-gray-800">{question.options.A}</span>
                      </div>
                    </motion.button>
                    
                    <motion.button
                      onClick={() => handleAnswerSelect('B')}
                      className="w-full bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 text-left hover:from-purple-100 hover:to-pink-100 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-4">
                          <span className="text-white font-bold">B</span>
                        </div>
                        <span className="text-gray-800">{question.options.B}</span>
                      </div>
                    </motion.button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Answer Confirmation Back */}
              <Card className="card-back bg-gradient-to-r from-accent to-primary">
                <CardContent className="p-8 flex items-center justify-center h-full">
                  <div className="text-center text-white">
                    <CheckCircle size={48} className="mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">답변 완료!</h3>
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
            disabled={!selectedAnswer || isUpdatingAnswers || isCompletingTest}
            className={selectedAnswer 
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
