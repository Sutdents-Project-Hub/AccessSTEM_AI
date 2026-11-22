"use client";

import { ArrowUp, BookOpen, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CHAT_LIMITS, type ChatAnswer, type ChatMessage, type ChatRequest, type ChatResponse, type LearnerPreferences } from "@/lib/chat-contract";

export type Material =
  | { chartId: string; userDescription: null }
  | { chartId: null; userDescription: string };

type Round = { id: string; question: string; answer: ChatAnswer; educator: boolean };

const starterQuestions = [
  "先說圖表的全貌",
  "從座標軸說起",
  "只給我一個提示",
];
const followUps = ["換一種方式解釋", "只給我下一步提示", "出一題讓我試答"];
const claimLabels = { given: "已知資料", derived: "數學推導", unknown: "待確認" };

function tutorHistory(rounds: Round[], characterBudget: number): ChatMessage[] {
  const history: ChatMessage[] = [];
  for (const round of rounds.slice(-(CHAT_LIMITS.historyMessages / 2)).reverse()) {
    const answer = [round.answer.summary, ...round.answer.sections.map((section) => section.text), round.answer.nextQuestion]
      .filter(Boolean).join("\n").slice(0, CHAT_LIMITS.historyMessageCharacters);
    characterBudget -= answer.length + round.question.length;
    if (characterBudget < 0) break;
    history.unshift({ role: "user", content: round.question }, { role: "assistant", content: answer });
  }
  return history;
}

function TutorAnswer({ round }: { round: Round }) {
  const [copyMessage, setCopyMessage] = useState("");
  const { answer } = round;

  async function copyDraft() {
    const draft = [
      "AI 教學草稿，使用前請核對",
      answer.summary,
      ...answer.sections.map(({ heading, text }) => `${heading}\n${text}`),
      answer.nextQuestion,
    ].filter(Boolean).join("\n\n");
    try {
      await navigator.clipboard.writeText(draft);
      setCopyMessage("已複製草稿");
    } catch {
      setCopyMessage("無法複製，請直接選取回答文字。");
    }
  }

  return (
    <div className="answer">
      <h3>AI 學習助理</h3>
      {round.educator && <p className="verification">AI 教學草稿，使用前請核對。</p>}
      <p className="answer-summary">{answer.summary}</p>
      {answer.sections.map(({ heading, text }, index) => <details key={index}>
        <summary><ChevronRight aria-hidden="true" />{heading}</summary><p>{text}</p>
      </details>)}
      {answer.claims.length > 0 && <details>
        <summary><ChevronRight aria-hidden="true" />查看回答依據</summary>
        <ul>{answer.claims.map((claim, index) => (
          <li key={index}><strong>{claimLabels[claim.kind]}：</strong>{claim.text}</li>
        ))}</ul>
      </details>}
      {answer.nextQuestion && <p className="next-question">{answer.nextQuestion}</p>}
      {!round.educator && answer.needsHumanVerification && <p className="verification">教材或回答中的部分內容仍待核對。</p>}
      {round.educator && <div className="copy-row">
        <button type="button" className="secondary-button" onClick={copyDraft}>複製教學草稿</button>
        <span role="status">{copyMessage}</span>
      </div>}
    </div>
  );
}

export function Tutor({ material, preferences }: { material: Material | null; preferences: LearnerPreferences }) {
  const [rounds, setRounds] = useState<Round[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const textarea = useRef<HTMLTextAreaElement>(null);
  const activeRequest = useRef<AbortController | null>(null);
  const sessionId = useRef<string | null>(null);

  useEffect(() => () => {
    activeRequest.current?.abort();
    activeRequest.current = null;
  }, []);

  function fillQuestion(question: string) {
    setDraft(question);
    setError("");
    textarea.current?.focus();
  }

  function cancel() {
    activeRequest.current?.abort();
    activeRequest.current = null;
    setPending(null);
    setNotice("已停止等待，問題仍保留。");
    textarea.current?.focus();
  }

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = draft.trim();
    if (!message || activeRequest.current || !material) return;
    const id = sessionId.current ?? crypto.randomUUID();
    sessionId.current = id;
    const controller = new AbortController();
    activeRequest.current = controller;
    setError("");
    setNotice("正在取得 AI 回答。");
    setPending(message);

    try {
      const budget = CHAT_LIMITS.totalCharacters - message.length - (material.userDescription?.length ?? 0);
      const request: ChatRequest = {
        ...material,
        sessionId: id,
        message,
        history: tutorHistory(rounds, budget),
        preferences,
      };
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
        signal: controller.signal,
      });
      const result: ChatResponse = await response.json();
      if (activeRequest.current !== controller) return;
      if (result.status === "error") {
        setNotice("");
        setError(result.message);
      } else if (response.ok && result.status === "ok") {
        setRounds((previous) => [...previous, {
          id: result.requestId,
          question: message,
          answer: result.answer,
          educator: preferences.profile === "educator",
        }]);
        setDraft("");
        setNotice("AI 回答已就緒，可到對話紀錄閱讀。");
      } else {
        throw new Error("Unexpected chat response");
      }
    } catch {
      if (activeRequest.current === controller) {
        setNotice("");
        setError("暫時無法連線。問題已保留，可再送出一次。");
      }
    } finally {
      if (activeRequest.current === controller) {
        activeRequest.current = null;
        setPending(null);
      }
    }
  }

  const suggestions = rounds.length ? followUps : preferences.profile === "educator"
    ? ["產生高中函數導讀草稿，附三道引導題", ...starterQuestions.slice(0, 2)]
    : starterQuestions;

  return (
    <div className="tutor">
      <div className="conversation" aria-label="對話紀錄">
        {!rounds.length && !pending && <div className="conversation-empty">
          <BookOpen aria-hidden="true" />
          <h3>想先了解哪一部分？</h3>
          <p>{material ? "選一個問題開始，也可以寫下你想問的內容。" : "選擇範例，或先在教材區貼上題目。"}</p>
        </div>}
        {rounds.length > 0 && <ol className="chat-rounds">
          {rounds.map((round) => <li key={round.id}>
            <p className="question"><strong>你</strong>{round.question}</p>
            <TutorAnswer round={round} />
          </li>)}
        </ol>}
        {pending && <p className="question"><strong>你</strong>{pending}</p>}
      </div>
      <div className="composer">
        <div className="suggestions" aria-label="可用的提問示例">
          {suggestions.map((question) => (
            <button className="suggestion" key={question} type="button"
              disabled={!material || Boolean(pending)} onClick={() => fillQuestion(question)}>{question}</button>
          ))}
        </div>
        <form onSubmit={send}>
          <label htmlFor="question">你的問題</label>
          <div className="question-input">
            <textarea id="question" ref={textarea} rows={2} maxLength={CHAT_LIMITS.messageCharacters} required
              value={draft} onChange={(event) => setDraft(event.target.value)}
              readOnly={Boolean(pending)} disabled={!material}
              aria-describedby={error ? "tutor-error tutor-privacy" : "tutor-privacy"} />
            <div className="submit-row">
              {pending ? <button className="secondary-button" type="button" onClick={cancel}>停止等待</button> : null}
              <button className="send" type="submit" aria-disabled={!material || !draft.trim() || Boolean(pending)}>
                {error ? "重試" : "送出"}<ArrowUp aria-hidden="true" size={18} />
              </button>
            </div>
          </div>
          {error && <p role="alert" className="error" id="tutor-error">{error}</p>}
          <p className={pending ? "pending-status" : "sr-only"} role="status">{notice}</p>
          <p className="privacy-note" id="tutor-privacy">問題會送至 OpenAI。請勿填寫個人資料。</p>
        </form>
      </div>
    </div>
  );
}
