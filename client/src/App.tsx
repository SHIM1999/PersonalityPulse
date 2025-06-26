import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useTestSession } from "@/hooks/use-test-session";

import LandingPage from "@/pages/landing";
import PhotoUpload from "@/pages/photo-upload";
import QuestionnaireImproved from "@/pages/questionnaire-improved";
import Results from "@/pages/results";

type AppStep = 'landing' | 'photo-upload' | 'questionnaire' | 'results';

function AppContent() {
  const [currentStep, setCurrentStep] = useState<AppStep>('landing');
  const { session, resetSession, sessionId } = useTestSession();

  // Check if user has an existing session and navigate appropriately
  useEffect(() => {
    if (session) {
      if (session.completed) {
        setCurrentStep('results');
      } else if (session.answers && typeof session.answers === 'object' && session.answers !== null && Object.keys(session.answers as Record<string, any>).length > 0) {
        setCurrentStep('questionnaire');
      } else if (session.photoFile) {
        setCurrentStep('questionnaire');
      } else {
        setCurrentStep('photo-upload');
      }
    }
  }, [session]);

  const handleStartTest = () => {
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
    resetSession();
    setCurrentStep('landing');
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
        <QuestionnaireImproved onNext={handleNext} onBack={handleBack} />
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
