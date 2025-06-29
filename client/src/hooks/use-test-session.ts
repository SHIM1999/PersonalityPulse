import { useState, useCallback } from "react";
import { Answers, MBTIResult } from "@shared/schema";
import { calculateMBTI } from "@/lib/mbti-calculator";
import { useLanguage } from "@/lib/i18n";

interface TestSession {
  sessionId: string;
  answers: Answers;
  result?: MBTIResult;
  completed: boolean;
}

export function useTestSession() {
  const [session, setSession] = useState<TestSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentLanguage } = useLanguage();

  const createSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/test-session", { method: "POST" });
      const newSession = await response.json();
      setSession(newSession);
      return newSession;
    } catch (error) {
      console.error("Failed to create session:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateAnswers = useCallback(async (answers: Answers) => {
    if (!session) return;

    try {
      const response = await fetch(`/api/test-session/${session.sessionId}/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const updatedSession = await response.json();
      setSession(updatedSession);
      return updatedSession;
    } catch (error) {
      console.error("Failed to update answers:", error);
      throw error;
    }
  }, [session]);

  const completeSession = useCallback(async () => {
    if (!session) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/test-session/${session.sessionId}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: currentLanguage }),
      });
      const completedSession = await response.json();
      setSession(completedSession);
      return completedSession;
    } catch (error) {
      console.error("Failed to complete session:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [session, currentLanguage]);

  return {
    session,
    isLoading,
    createSession,
    updateAnswers,
    completeSession,
  };
}

interface LocalTestSession {
  sessionId: string;
  username?: string;
  photoFile?: File;
  answers?: Answers;
  result?: MBTIResult;
  completed: boolean;
}

export function useTestSession() {
  const [sessionId] = useState(
    () => localStorage.getItem("sessionId") || crypto.randomUUID(),
  );

  const [session, setSession] = useState<LocalTestSession>(() => {
    const saved = localStorage.getItem(`session_${sessionId}`);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      sessionId,
      completed: false,
    };
  });

  // Store sessionId in localStorage
  if (!localStorage.getItem("sessionId")) {
    localStorage.setItem("sessionId", sessionId);
  }

  const saveSession = useCallback(
    (updatedSession: LocalTestSession) => {
      setSession(updatedSession);
      localStorage.setItem(
        `session_${sessionId}`,
        JSON.stringify(updatedSession),
      );
    },
    [sessionId],
  );

  const uploadPhoto = useCallback(
    (file: File) => {
      return new Promise<LocalTestSession>((resolve) => {
        const updatedSession = {
          ...session,
          photoFile: file,
        };
        saveSession(updatedSession);
        resolve(updatedSession);
      });
    },
    [session, saveSession],
  );

  const updateAnswers = useCallback(
    (answers: Answers) => {
      return new Promise<LocalTestSession>((resolve) => {
        const updatedSession = {
          ...session,
          answers,
        };
        saveSession(updatedSession);
        resolve(updatedSession);
      });
    },
    [session, saveSession],
  );

  const updateUsername = useCallback(
    (username: string) => {
      return new Promise<LocalTestSession>((resolve) => {
        const updatedSession = {
          ...session,
          username,
        };
        saveSession(updatedSession);
        resolve(updatedSession);
      });
    },
    [session, saveSession],
  );

  const completeTest = useCallback((language: string = 'en') => {
    return new Promise<LocalTestSession>((resolve) => {
      if (!session.answers) {
        throw new Error("No answers provided");
      }

      const result = calculateMBTI(session.answers, language);
      const updatedSession = {
        ...session,
        result,
        completed: true,
      };
      saveSession(updatedSession);
      resolve(updatedSession);
    });
  }, [session, saveSession]);

  const resetSession = useCallback(() => {
    const newSessionId = crypto.randomUUID();
    localStorage.setItem("sessionId", newSessionId);
    localStorage.removeItem(`session_${sessionId}`);

    const newSession = {
      sessionId: newSessionId,
      completed: false,
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
    updateUsername,
    isCreatingSession: false,
    isUploadingPhoto: false,
    isUpdatingAnswers: false,
    isCompletingTest: false,
  };
}