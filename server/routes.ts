import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { answerSchema, mbtiResultSchema } from "@shared/schema";
import { calculateMBTIImproved } from "../client/src/lib/mbti-calculator-improved";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create new test session
  app.post("/api/test-session", async (req, res) => {
    try {
      const sessionId = crypto.randomUUID();
      const session = await storage.createTestSession(sessionId);
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Failed to create test session" });
    }
  });

  // Get test session
  app.get("/api/test-session/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const session = await storage.getTestSession(sessionId);

      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }

      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Failed to get test session" });
    }
  });

  // 사진 업로드 API 제거 (백엔드 사진 저장 없음)
  // app.post("/api/test-session/:sessionId/photo", ... ) 삭제

  // Update answers
  app.post("/api/test-session/:sessionId/answers", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const answers = answerSchema.parse(req.body.answers);

      const session = await storage.updateTestSessionAnswers(
        sessionId,
        answers,
      );
      res.json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid answers format" });
      }
      res.status(500).json({ message: "Failed to update answers" });
    }
  });

  // Complete test and get results
  app.post("/api/test-session/:sessionId/complete", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const session = await storage.getTestSession(sessionId);

      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }

      // Calculate MBTI result on backend (선택 사항, 클라이언트로 이동 가능)
      const result = calculateMBTIImproved(
        session.answers as Record<string, string>,
      );

      // 사진 AI 분석 부분 제거 (클라이언트에서 처리 가능)

      const completedSession = await storage.completeTestSession(
        sessionId,
        result,
      );
      res.json(completedSession);
    } catch (error) {
      res.status(500).json({ message: "Failed to complete test" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
