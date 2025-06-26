import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const testSessions = pgTable("test_sessions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  photoPath: text("photo_path"),
  answers: jsonb("answers").notNull().default({}),
  result: jsonb("result"),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertTestSessionSchema = createInsertSchema(testSessions).pick({
  sessionId: true,
  photoPath: true,
  answers: true,
  result: true,
  completed: true,
});

export type InsertTestSession = z.infer<typeof insertTestSessionSchema>;
export type TestSession = typeof testSessions.$inferSelect;

// MBTI Result Schema
export const mbtiResultSchema = z.object({
  type: z.string(),
  title: z.string(),
  subtitle: z.string(),
  dimensions: z.object({
    EI: z.number(),
    SN: z.number(),
    TF: z.number(),
    JP: z.number(),
  }),
  strengths: z.array(z.string()),
  growthAreas: z.array(z.string()),
  aiAnalysis: z.object({
    expressions: z.array(z.string()),
    confidence: z.number(),
  }).optional(),
});

export type MBTIResult = z.infer<typeof mbtiResultSchema>;

// Answer Schema
export const answerSchema = z.record(z.string(), z.string());
export type Answers = z.infer<typeof answerSchema>;
