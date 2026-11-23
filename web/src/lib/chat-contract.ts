import { z } from "zod";

export const CHAT_LIMITS = {
  messageCharacters: 2_000,
  descriptionCharacters: 6_000,
  historyMessages: 12,
  historyMessageCharacters: 4_000,
  totalCharacters: 20_000,
  bodyBytes: 96_000,
} as const;

export const LearnerPreferencesSchema = z.strictObject({
  profile: z.enum(["learner-full", "learner-brief", "educator"]),
  readingDepth: z.enum(["brief", "step-by-step", "deep"]),
  pedagogyMode: z.enum(["hint", "guided", "full"]),
  mathLevel: z.enum(["beginner", "familiar"]),
});

export const ChatMessageSchema = z.strictObject({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(CHAT_LIMITS.historyMessageCharacters),
});

export const ChatRequestSchema = z.strictObject({
  sessionId: z.uuid(),
  chartId: z.string().regex(/^[a-z0-9][a-z0-9-]{0,79}$/).nullable(),
  userDescription: z.string().trim().min(1).max(CHAT_LIMITS.descriptionCharacters).nullable(),
  message: z.string().trim().min(1).max(CHAT_LIMITS.messageCharacters),
  history: z.array(ChatMessageSchema).max(CHAT_LIMITS.historyMessages),
  preferences: LearnerPreferencesSchema,
  language: z.enum(["zh-Hant", "en"]).optional(),
}).superRefine((request, context) => {
  if (Boolean(request.chartId) === Boolean(request.userDescription)) {
    context.addIssue({ code: "custom", path: ["chartId"], message: "請選擇一份圖表或提供一份描述。" });
  }
  const characters = request.message.length + (request.userDescription?.length ?? 0)
    + request.history.reduce((total, entry) => total + entry.content.length, 0);
  if (characters > CHAT_LIMITS.totalCharacters) {
    context.addIssue({ code: "custom", path: ["history"], message: "本輪對話內容過長。" });
  }
});

// All fields are required, with explicit nulls for optional content, to match
// OpenAI strict Structured Outputs. The browser never receives provider data.
export const ChatAnswerSchema = z.strictObject({
  summary: z.string().min(1).max(2_000),
  sections: z.array(z.strictObject({
    heading: z.string().min(1).max(100),
    text: z.string().min(1).max(4_000),
  })).min(1).max(6),
  claims: z.array(z.strictObject({
    kind: z.enum(["given", "derived", "unknown"]),
    text: z.string().min(1).max(1_000),
    sourceRef: z.string().min(1).max(120).nullable(),
  })).max(16),
  nextQuestion: z.string().min(1).max(500).nullable(),
  needsHumanVerification: z.boolean(),
});

export type LearnerPreferences = z.infer<typeof LearnerPreferencesSchema>;
export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type ChatRequest = z.infer<typeof ChatRequestSchema>;
export type ChatAnswer = z.infer<typeof ChatAnswerSchema>;
export type ChatErrorCode = "INVALID_REQUEST" | "PAYLOAD_TOO_LARGE" | "ORIGIN_REJECTED"
  | "RATE_LIMITED" | "AI_UNAVAILABLE" | "AI_TIMEOUT" | "AI_INVALID_RESPONSE" | "INTERNAL_ERROR";
export type ChatResponse =
  | { requestId: string; status: "ok"; answer: ChatAnswer }
  | { requestId: string; status: "error"; code: ChatErrorCode; message: string };
