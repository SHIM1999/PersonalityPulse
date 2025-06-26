import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useTestSession } from "@/hooks/use-test-session";

import LandingPage from "@/pages/landing";
import PhotoUpload from "@/pages/photo-upload";
import Questionnaire from "@/pages/questionnaire";
import Results from "@/pages/results";

type AppStep = 'landing' | 'photo-upload' | 'questionnaire' | 'results';

function AppContent() {
  const [currentStep, setCurrentStep] = useState<AppStep>('landing');
  const { session, startNewSession, sessionId } = useTestSession();

  // Check if user has an existing session and navigate appropriately
  useEffect(() => {
    if (session) {
      if (session.completed) {
        setCurrentStep('results');
      } else if (Object.keys(session.answers).length > 0) {
        setCurrentStep('questionnaire');
      } else if (session.photoPath) {
        setCurrentStep('questionnaire');
      } else {
        setCurrentStep('photo-upload');
      }
    }
  }, [session]);

  const handleStartTest = () => {
    if (!sessionId) {
      startNewSession();
    }
    setCurrentStep('photo-upload');
  };

  const handleNext = () => {
    switch (currentStep) {
      case 'photo-upload':
        setCurrentStep('questionnaire');
        break;
      case 'questionnaire':
        setCurrentStep('results');
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'photo-upload':
        setCurrentStep('landing');
        break;
      case 'questionnaire':
        setCurrentStep('photo-upload');
        break;
    }
  };

  const handleRetake = () => {
    // Clear session storage and start fresh
    localStorage.removeItem('mbti-session-id');
    window.location.reload();
  };

  return (
    <div className="min-h-screen">
      {currentStep === 'landing' && (
        <LandingPage onStartTest={handleStartTest} />
      )}
      {currentStep === 'photo-upload' && (
        <PhotoUpload onNext={handleNext} onBack={handleBack} />
      )}
      {currentStep === 'questionnaire' && (
        <Questionnaire onNext={handleNext} onBack={handleBack} />
      )}
      {currentStep === 'results' && (
        <Results onRetake={handleRetake} />
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
