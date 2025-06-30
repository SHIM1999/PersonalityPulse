import {
  testSessions,
  type TestSession,
  type Answers,
  type MBTIResult,
} from "@shared/schema";

export interface IStorage {
  createTestSession(sessionId: string): Promise<TestSession>;
  getTestSession(sessionId: string): Promise<TestSession | undefined>;
  updateTestSessionAnswers(
    sessionId: string,
    answers: Answers,
  ): Promise<TestSession>;
  completeTestSession(
    sessionId: string,
    result: MBTIResult,
  ): Promise<TestSession>;
  // 사진 관련 함수 제거
}

export class MemStorage implements IStorage {
  private sessions: Map<string, TestSession>;
  private currentId: number;

  constructor() {
    this.sessions = new Map();
    this.currentId = 1;
  }

  async createTestSession(sessionId: string): Promise<TestSession> {
    const id = this.currentId++;
    const session: TestSession = {
      id,
      sessionId,
      photoPath: null,
      answers: {},
      result: null,
      completed: false,
      createdAt: new Date(),
    };
    this.sessions.set(sessionId, session);
    return session;
  }

  async getTestSession(sessionId: string): Promise<TestSession | undefined> {
    return this.sessions.get(sessionId);
  }

  async updateTestSessionAnswers(
    sessionId: string,
    answers: Answers,
  ): Promise<TestSession> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error("Session not found");
    }

    session.answers = answers;
    this.sessions.set(sessionId, session);
    return session;
  }

  async completeTestSession(
    sessionId: string,
    result: MBTIResult,
  ): Promise<TestSession> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error("Session not found");
    }

    session.result = result;
    session.completed = true;
    this.sessions.set(sessionId, session);
    return session;
  }
}

export const storage = new MemStorage();
