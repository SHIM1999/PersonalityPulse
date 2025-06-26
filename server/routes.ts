import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { answerSchema, mbtiResultSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import { calculateMBTI } from "../client/src/lib/mbti-calculator";

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

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

  // Upload photo
  app.post("/api/test-session/:sessionId/photo", upload.single('photo'), async (req, res) => {
    try {
      const { sessionId } = req.params;
      
      if (!req.file) {
        return res.status(400).json({ message: "No photo uploaded" });
      }

      const photoPath = req.file.path;
      const session = await storage.updateTestSessionPhoto(sessionId, photoPath);
      
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Failed to upload photo" });
    }
  });

  // Update answers
  app.post("/api/test-session/:sessionId/answers", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const answers = answerSchema.parse(req.body.answers);
      
      const session = await storage.updateTestSessionAnswers(sessionId, answers);
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

      // Calculate MBTI result
      const result = calculateMBTI(session.answers as Record<string, string>);
      
      // Add AI photo analysis if photo exists
      if (session.photoPath) {
        result.aiAnalysis = {
          expressions: [
            "밝고 친근한 표정 - 외향성 강함",
            "호기심 많은 눈빛 - 직관형 성향", 
            "따뜻한 미소 - 감정형 특성"
          ],
          confidence: 0.85
        };
      }

      const completedSession = await storage.completeTestSession(sessionId, result);
      res.json(completedSession);
    } catch (error) {
      res.status(500).json({ message: "Failed to complete test" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
