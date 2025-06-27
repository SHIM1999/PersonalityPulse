import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Brain,
  Sparkles,
  Zap,
  Star,
  Circle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressBar } from "@/components/progress-bar";
import { HomeButton } from "@/components/home-button";
import { useTestSession } from "@/hooks/use-test-session";
import { useLanguage, translations } from "@/lib/i18n";

interface QuestionnaireImprovedProps {
  onNext: () => void;
  onBack: () => void;
  onHome: () => void;
  username: string;
}

type IntensityLevel = 1 | 2 | 3 | 4 | 5;

interface Answer {
  questionId: number;
  option: "A" | "B";
  intensity: IntensityLevel;
}

export default function QuestionnaireImproved({
  onNext,
  onBack,
  onHome,
  username,
}: QuestionnaireImprovedProps) {
  const { t, currentLanguage } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | null>(null);
  const [selectedIntensity, setSelectedIntensity] =
    useState<IntensityLevel | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { updateAnswers, completeTest, isUpdatingAnswers, isCompletingTest } =
    useTestSession();

  // Get questions for the current language
  const questions =
    translations[currentLanguage as keyof typeof translations].questions;
  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 3 + 2,
      opacity: Math.random() * 0.4 + 0.2,
    }));
    setParticles(newParticles);
  }, [currentQuestion]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const intensityLabels = {
    1: t("veryTrue"),
    2: t("true"),
    3: t("neutral"),
    4: t("false"),
    5: t("veryFalse"),
  };

  const handleOptionSelect = useCallback((option: "A" | "B") => {
    setSelectedOption(option);
    setSelectedIntensity(null);
  }, []);

  const handleIntensitySelect = useCallback(
    (intensity: IntensityLevel) => {
      if (!selectedOption) return;
      setSelectedIntensity(intensity);
      setIsFlipped(true);
      const answer: Answer = {
        questionId: question.id,
        option: selectedOption,
        intensity,
      };
      const newAnswers = {
        ...answers,
        [question.id]: answer,
      };
      setAnswers(newAnswers);
      // Convert to format expected by backend
      const backendAnswers: Record<string, string> = {};
      Object.entries(newAnswers).forEach(([questionId, answerData]) => {
        // Convert intensity to score (1=강함, 3=보통, 5=약함)
        const score =
          answerData.intensity <= 2
            ? "strong"
            : answerData.intensity === 3
              ? "medium"
              : "weak";
        backendAnswers[questionId] = `${answerData.option}_${score}`;
      });
      updateAnswers(backendAnswers);
      // Auto-advance to next question after animation
      setTimeout(() => {
        setIsFlipped(false);
        if (isLastQuestion) {
          completeTest().then(() => {
            onNext();
          });
        } else {
          setCurrentQuestion((prev) => prev + 1);
          setSelectedOption(null);
          setSelectedIntensity(null);
        }
      }, 1200);
    },
    [
      selectedOption,
      question.id,
      answers,
      updateAnswers,
      isLastQuestion,
      completeTest,
      onNext,
    ],
  );

  const handleNext = useCallback(async () => {
    if (isLastQuestion) {
      await completeTest();
      onNext();
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setSelectedIntensity(null);
    }
  }, [isLastQuestion, completeTest, onNext]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedOption(null);
      setSelectedIntensity(null);
    } else {
      onBack();
    }
  }, [currentQuestion, onBack]);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `float ${particle.speed + 2}s infinite ease-in-out`,
              animationDelay: `${particle.id * 0.3}s`,
            }}
          />
        ))}
        {/* Geometric Background Shapes */}
        <div className="absolute top-20 left-10 text-purple-400/10 animate-spin-slow">
          <Circle size={80} />
        </div>
        <div className="absolute bottom-40 right-20 text-pink-400/10 animate-bounce-slow">
          <Star size={60} />
        </div>
        <div className="absolute top-1/3 right-10 text-blue-400/10 animate-pulse">
          <Sparkles size={70} />
        </div>
        {/* Interactive Mouse Glow */}
        <div
          className="absolute pointer-events-none transition-all duration-500 ease-out"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-40 h-40 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-2xl" />
        </div>
      </div>
      {/* Home Button */}
      <HomeButton onHome={onHome} />
      {/* Main Content with Independent Padding */}
      <div className="relative z-10 px-6 py-12 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto w-full">
          {/* Header Section */}
          <div className="text-center mb-12">
            {/* Animated Brain Icon */}
            <div className="relative mx-auto mb-6 w-24 h-24">
              <div className="w-full h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center relative overflow-hidden animate-pulse">
                <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" />
                <Brain className="text-white relative z-10" size={32} />
              </div>
              <div className="absolute -top-2 -right-2 text-yellow-400 animate-bounce">
                <Sparkles size={16} />
              </div>
            </div>
            {/* Title */}
            <div className="mb-4">
              <h1 className="text-4xl md:text-5xl font-black mb-2">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  [MBTI]
                </span>
              </h1>
              <p className="text-lg font-semibold text-purple-200">
                안녕하세요, {username}님!
              </p>
            </div>
            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex justify-between text-sm text-gray-300 mb-2">
                <span>{t("questionProgress")}</span>
                <span>
                  {currentQuestion + 1} / {questions.length}
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
              </div>
            </div>
          </div>
          {/* Question Card */}
          <div className="mb-12">
            <div className={`perspective-1000 ${isFlipped ? "flipped" : ""}`}>
              <div className="relative preserve-3d transition-transform duration-700">
                {/* Question Front */}
                <div className="backface-hidden">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
                    {/* Question Number & Text */}
                    <div className="text-center mb-10">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30">
                        <span className="text-white text-2xl font-bold">
                          {currentQuestion + 1}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-relaxed">
                        {question.text}
                      </h3>
                    </div>
                    {/* Options */}
                    <div className="space-y-6 mb-8">
                      {/* Option A */}
                      <button
                        onClick={() => handleOptionSelect("A")}
                        className={`group w-full border-2 rounded-2xl p-6 text-left transition-all duration-500 transform hover:scale-102 ${
                          selectedOption === "A"
                            ? "border-purple-400 bg-gradient-to-r from-purple-500/20 to-blue-500/20 shadow-lg shadow-purple-500/30"
                            : "border-white/20 hover:border-purple-400/50 bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center mr-6 transition-all duration-300 ${
                              selectedOption === "A"
                                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                                : "bg-white/20 text-gray-300 group-hover:bg-white/30"
                            }`}
                          >
                            <span className="font-bold text-lg">A</span>
                          </div>
                          <span className="text-white text-lg font-medium">
                            {question.optionA}
                          </span>
                        </div>
                      </button>
                      {/* Option B */}
                      <button
                        onClick={() => handleOptionSelect("B")}
                        className={`group w-full border-2 rounded-2xl p-6 text-left transition-all duration-500 transform hover:scale-102 ${
                          selectedOption === "B"
                            ? "border-pink-400 bg-gradient-to-r from-pink-500/20 to-purple-500/20 shadow-lg shadow-pink-500/30"
                            : "border-white/20 hover:border-pink-400/50 bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center mr-6 transition-all duration-300 ${
                              selectedOption === "B"
                                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                                : "bg-white/20 text-gray-300 group-hover:bg-white/30"
                            }`}
                          >
                            <span className="font-bold text-lg">B</span>
                          </div>
                          <span className="text-white text-lg font-medium">
                            {question.optionB}
                          </span>
                        </div>
                      </button>
                    </div>
                    {/* Intensity Selection */}
                    {selectedOption && (
                      <div className="animate-slide-up">
                        <h4 className="text-xl font-bold text-center mb-6 text-white">
                          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {t("howMuch")}
                          </span>
                        </h4>
                        <div className="grid grid-cols-5 gap-3">
                          {([1, 2, 3, 4, 5] as IntensityLevel[]).map(
                            (intensity) => (
                              <button
                                key={intensity}
                                onClick={() => handleIntensitySelect(intensity)}
                                className={`group relative py-4 px-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                                  selectedIntensity === intensity
                                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 scale-105"
                                    : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
                                }`}
                              >
                                <div className="relative z-10">
                                  {intensityLabels[intensity]}
                                </div>
                                {selectedIntensity === intensity && (
                                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl blur opacity-30" />
                                )}
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Answer Confirmation Back */}
                <div className="backface-hidden rotate-y-180 absolute inset-0">
                  <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-12 shadow-2xl h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="relative mb-6">
                        <CheckCircle
                          size={80}
                          className="mx-auto animate-pulse"
                        />
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-ping" />
                      </div>
                      <h3 className="text-3xl font-bold mb-4">답변 완료!</h3>
                      <p className="text-xl opacity-90">
                        {selectedOption}번:{" "}
                        {selectedIntensity
                          ? intensityLabels[selectedIntensity]
                          : ""}
                      </p>
                      <div className="mt-6 flex items-center justify-center space-x-2">
                        <Zap className="animate-bounce" size={20} />
                        <span className="text-lg">
                          다음 질문으로 이동 중...
                        </span>
                        <Zap className="animate-bounce" size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              className="group flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-3 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft
                className="group-hover:-translate-x-1 transition-transform duration-300"
                size={20}
              />
              <span className="font-medium">이전</span>
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedIntensity}
              className={`group flex items-center space-x-2 px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
                selectedIntensity
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 hover:scale-105 hover:shadow-xl"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              <span>{isLastQuestion ? "결과 보기" : "다음"}</span>
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform duration-300"
                size={20}
              />
            </button>
          </div>
        </div>
      </div>
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .flipped .preserve-3d {
          transform: rotateY(180deg);
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}
