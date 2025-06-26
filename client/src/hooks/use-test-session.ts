import { useState, useCallback } from "react";
import { Answers, MBTIResult } from "@shared/schema";
import { calculateMBTIImproved } from "@/lib/mbti-calculator-improved";

interface LocalTestSession {
  sessionId: string;
  photoFile?: File;
  answers?: Answers;
  result?: MBTIResult;
  completed: boolean;
}

export function useTestSession() {
  const [sessionId] = useState(() => 
    localStorage.getItem('sessionId') || crypto.randomUUID()
  );
  
  const [session, setSession] = useState<LocalTestSession>(() => {
    const saved = localStorage.getItem(`session_${sessionId}`);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      sessionId,
      completed: false
    };
  });

  // Store sessionId in localStorage
  if (!localStorage.getItem('sessionId')) {
    localStorage.setItem('sessionId', sessionId);
  }

  const saveSession = useCallback((updatedSession: LocalTestSession) => {
    setSession(updatedSession);
    localStorage.setItem(`session_${sessionId}`, JSON.stringify(updatedSession));
  }, [sessionId]);

  const uploadPhoto = useCallback((file: File) => {
    return new Promise<LocalTestSession>((resolve) => {
      const updatedSession = {
        ...session,
        photoFile: file
      };
      saveSession(updatedSession);
      resolve(updatedSession);
    });
  }, [session, saveSession]);

  const updateAnswers = useCallback((answers: Answers) => {
    return new Promise<LocalTestSession>((resolve) => {
      const updatedSession = {
        ...session,
        answers
      };
      saveSession(updatedSession);
      resolve(updatedSession);
    });
  }, [session, saveSession]);

  const completeTest = useCallback(() => {
    return new Promise<LocalTestSession>((resolve) => {
      if (!session.answers) {
        throw new Error("No answers provided");
      }
      
      const result = calculateMBTIImproved(session.answers);
      const updatedSession = {
        ...session,
        result,
        completed: true
      };
      saveSession(updatedSession);
      resolve(updatedSession);
    });
  }, [session, saveSession]);

  const resetSession = useCallback(() => {
    const newSessionId = crypto.randomUUID();
    localStorage.setItem('sessionId', newSessionId);
    localStorage.removeItem(`session_${sessionId}`);
    
    const newSession = {
      sessionId: newSessionId,
      completed: false
    };
    setSession(newSession);
    localStorage.setItem(`session_${newSessionId}`, JSON.stringify(newSession));
  }, [sessionId]);

  return {
    sessionId,
    session,
    isLoading: false,
    uploadPhoto,
    updateAnswers,
    completeTest,
    resetSession,
    isCreatingSession: false,
    isUploadingPhoto: false,
    isUpdatingAnswers: false,
    isCompletingTest: false
  };
}
