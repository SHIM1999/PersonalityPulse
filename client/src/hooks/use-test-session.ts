import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { TestSession, Answers, MBTIResult } from '@shared/schema';

export function useTestSession() {
  const [sessionId, setSessionId] = useState<string | null>(
    localStorage.getItem('mbti-session-id')
  );
  const queryClient = useQueryClient();

  // Get current session
  const { data: session, isLoading } = useQuery<TestSession | null>({
    queryKey: [`/api/test-session/${sessionId}`],
    enabled: !!sessionId,
    select: (data) => data,
  });

  // Create new session
  const createSessionMutation = useMutation({
    mutationFn: async (): Promise<TestSession> => {
      const res = await apiRequest('POST', '/api/test-session');
      return res.json();
    },
    onSuccess: (data) => {
      setSessionId(data.sessionId);
      localStorage.setItem('mbti-session-id', data.sessionId);
      queryClient.setQueryData([`/api/test-session/${data.sessionId}`], data);
    },
  });

  // Upload photo
  const uploadPhotoMutation = useMutation({
    mutationFn: async (file: File): Promise<TestSession> => {
      if (!sessionId) throw new Error('No session ID');
      
      const formData = new FormData();
      formData.append('photo', file);
      
      const res = await fetch(`/api/test-session/${sessionId}/photo`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      
      if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
      }
      
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData([`/api/test-session/${sessionId}`], data);
    },
  });

  // Update answers
  const updateAnswersMutation = useMutation({
    mutationFn: async (answers: Answers): Promise<TestSession> => {
      if (!sessionId) throw new Error('No session ID');
      
      const res = await apiRequest('POST', `/api/test-session/${sessionId}/answers`, {
        answers,
      });
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData([`/api/test-session/${sessionId}`], data);
    },
  });

  // Complete test
  const completeTestMutation = useMutation({
    mutationFn: async (): Promise<TestSession> => {
      if (!sessionId) throw new Error('No session ID');
      
      const res = await apiRequest('POST', `/api/test-session/${sessionId}/complete`);
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData([`/api/test-session/${sessionId}`], data);
    },
  });

  const startNewSession = useCallback(() => {
    createSessionMutation.mutate();
  }, [createSessionMutation]);

  const uploadPhoto = useCallback((file: File) => {
    uploadPhotoMutation.mutate(file);
  }, [uploadPhotoMutation]);

  const updateAnswers = useCallback((answers: Answers) => {
    updateAnswersMutation.mutate(answers);
  }, [updateAnswersMutation]);

  const completeTest = useCallback(() => {
    completeTestMutation.mutate();
  }, [completeTestMutation]);

  return {
    session,
    isLoading,
    sessionId,
    startNewSession,
    uploadPhoto,
    updateAnswers,
    completeTest,
    isCreatingSession: createSessionMutation.isPending,
    isUploadingPhoto: uploadPhotoMutation.isPending,
    isUpdatingAnswers: updateAnswersMutation.isPending,
    isCompletingTest: completeTestMutation.isPending,
  };
}
