import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useTestSession } from "@/hooks/use-test-session";
import { LanguageProvider } from "@/lib/i18n";

import LandingPage from "@/pages/landing";
import QuestionnaireImproved from "@/pages/questionnaire-improved";
import Results from "@/pages/results";

type AppStep = 'landing' | 'questionnaire' | 'results';

function AppContent() {
  const [currentStep, setCurrentStep] = useState<AppStep>('landing');
  const { session, resetSession, sessionId, updateUsername } = useTestSession();
  const [username, setUsername] = useState<string>(session?.username || "");

  // Check if user has an existing session and navigate appropriately
  useEffect(() => {
    if (session) {
      if (session.completed) {
        setCurrentStep('results');
      } else if (session.answers && typeof session.answers === 'object' && session.answers !== null && Object.keys(session.answers as Record<string, any>).length > 0) {
        setCurrentStep('questionnaire');
      } else if (session.username) {
        setCurrentStep('questionnaire');
      } else {
        setCurrentStep('landing');
      }
    }
  }, [session]);

  const handleStartTest = (username: string) => {
    setUsername(username);
    updateUsername(username);
    setCurrentStep('questionnaire');
  };

  const handleNext = () => {
    if (currentStep === 'questionnaire') {
      setCurrentStep('results');
    }
  };

  const handleBack = () => {
    if (currentStep === 'questionnaire') {
      setCurrentStep('landing');
    }
  };

  const handleRetake = () => {
    resetSession();
    setCurrentStep('landing');
  };

  const handleHome = () => {
    resetSession();
    setCurrentStep('landing');
  };

  return (
    <div className="min-h-screen">
      {currentStep === 'landing' && (
        <LandingPage onStartTest={handleStartTest} />
      )}
      {currentStep === 'questionnaire' && (
        <QuestionnaireImproved onNext={handleNext} onBack={handleBack} onHome={handleHome} username={username || session?.username || ""} />
      )}
      {currentStep === 'results' && (
        <Results onRetake={handleRetake} onHome={handleHome} username={username || session?.username || ""} />
      )}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <AppContent />
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App;
