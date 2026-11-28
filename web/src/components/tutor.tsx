"use client";

import { ArrowRight, ArrowUp, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { materialSourceLabel } from "@/lib/material-sources";
import { englishErrors, tutorCopy, workspaceCopy, type Language } from "./workspace-copy";
import { CHAT_LIMITS, type ChatAnswer, type ChatMessage, type ChatRequest, type ChatResponse, type LearnerPreferences } from "@/lib/chat-contract";

export type Material =
  | { chartId: string; userDescription: null }
  | { chartId: null; userDescription: string };

type Round = { id: string; question: string; answer: ChatAnswer; preferences: LearnerPreferences; language: Language };

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

function TutorAnswer({ round, language, onFollowUp }: {
  round: Round;
  language: Language;
  onFollowUp?: (question: string) => void;
}) {
  const copy = tutorCopy[language];
  const [copyMessage, setCopyMessage] = useState("");
  const { answer } = round;
  const nextQuestion = answer.nextQuestion;
  const { profile, readingDepth, pedagogyMode } = round.preferences;
  const educator = profile === "educator";
  const showHint = !educator && pedagogyMode === "hint";
  const openFirstSection = !educator && readingDepth !== "brief";

  async function copyDraft() {
    const draft = [
      tutorCopy[round.language].draft,
      answer.summary,
      ...answer.sections.map(({ heading, text }) => `${heading}\n${text}`),
      answer.nextQuestion,
    ].filter(Boolean).join("\n\n");
    try {
      await navigator.clipboard.writeText(draft);
      setCopyMessage(copy.copied);
    } catch {
      setCopyMessage(copy.copyFailed);
    }
  }

  return (
    <article className="answer" id={`reply-${round.id}`} aria-labelledby={`reply-label-${round.id}`} tabIndex={-1}>
      <h3 id={`reply-label-${round.id}`}>{copy.tutor} · {workspaceCopy[language].modeCopy[profile][0]}</h3>
      {educator && <p className="verification">{copy.draft}</p>}
      <p className="answer-summary" lang={round.language}>{answer.summary}</p>
      {answer.sections.map(({ heading, text }, index) => showHint && index === 0
        ? <div className="answer-step" lang={round.language} key={index}><h4>{heading}</h4><p>{text}</p></div>
        : <details lang={round.language} key={index} open={openFirstSection && index === 0}>
          <summary><ChevronRight aria-hidden="true" />{heading}</summary><p>{text}</p>
        </details>)}
      {answer.claims.length > 0 && <details>
        <summary><ChevronRight aria-hidden="true" />{copy.notes}</summary>
        <ul className="answer-claims">{answer.claims.map((claim, index) => {
          const source = materialSourceLabel(claim.sourceRef, language);
          return <li key={index}>
            <strong>{copy[claim.kind]}{language === "en" ? ": " : "："}</strong>
            <span lang={round.language}>{claim.text}</span>
            {source && <span className="claim-source">{copy.source} · {source}</span>}
          </li>;
        })}</ul>
      </details>}
      {nextQuestion && <div className="next-question">
        <p lang={round.language}>{nextQuestion}</p>
        <button type="button" className="secondary-button" disabled={!onFollowUp}
          onClick={() => onFollowUp?.(`${copy.replyPrefix}「${nextQuestion}」\n`)}>{copy.reply}</button>
      </div>}
      {!educator && answer.needsHumanVerification && <p className="verification">{copy.needsReview}</p>}
      {educator && <div className="copy-row">
        <button type="button" className="secondary-button" onClick={copyDraft}>{copy.copyDraft}</button>
        <span role="status">{copyMessage}</span>
      </div>}
    </article>
  );
}

export function Tutor({ material, preferences, language }: {
  material: Material | null;
  preferences: LearnerPreferences;
  language: Language;
}) {
  const copy = tutorCopy[language];
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
    setNotice(copy.stopped);
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
    setNotice(copy.waiting);
    setPending(message);

    try {
      const budget = CHAT_LIMITS.totalCharacters - message.length - (material.userDescription?.length ?? 0);
      const request: ChatRequest = {
        ...material,
        sessionId: id,
        message,
        history: tutorHistory(rounds, budget),
        preferences,
        language,
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
        setError(language === "en" ? englishErrors[result.code] ?? copy.networkError : result.message);
      } else if (response.ok && result.status === "ok") {
        setRounds((previous) => [...previous, {
          id: result.requestId,
          question: message,
          answer: result.answer,
          preferences,
          language,
        }]);
        setDraft("");
        setNotice(copy.ready);
      } else {
        throw new Error("Unexpected chat response");
      }
    } catch {
      if (activeRequest.current === controller) {
        setNotice("");
        setError(copy.networkError);
      }
    } finally {
      if (activeRequest.current === controller) {
        activeRequest.current = null;
        setPending(null);
      }
    }
  }

  const suggestions = rounds.length ? copy.followUps : preferences.profile === "educator"
    ? [copy.educator, ...copy.starters.slice(0, 2)]
    : copy.starters;
  const latestRound = rounds.at(-1);

  return (
    <div className="tutor">
      {(latestRound || pending) && <section className="conversation" aria-label={copy.history}>
        {rounds.length > 0 && <ol className="chat-rounds">
          {rounds.map((round) => <li key={round.id}>
            <p className="question"><strong>{copy.you}</strong>{round.question}</p>
            <TutorAnswer round={round} language={language} onFollowUp={pending ? undefined : fillQuestion} />
          </li>)}
        </ol>}
        {pending && <p className="question"><strong>{copy.you}</strong>{pending}</p>}
      </section>}
      <div className="composer">
        {preferences.pedagogyMode === "hint" && <p className="composer-note">{copy.hintGuidance}</p>}
        {material ? <div className="prompt-picker" role="group" aria-labelledby="prompt-heading">
          <h3 id="prompt-heading">{latestRound ? copy.next : copy.start}</h3>
          <div className="suggestions">
            {suggestions.map((question) => (
              <button className="suggestion" key={question} type="button"
                disabled={Boolean(pending)} onClick={() => fillQuestion(question)}>{question}<ArrowRight aria-hidden="true" /></button>
            ))}
          </div>
        </div> : <p className="composer-note">{copy.chooseLesson}</p>}
        <form onSubmit={send}>
          <label htmlFor="question">{copy.yourQuestion}</label>
          <div className="question-input">
            <textarea id="question" ref={textarea} rows={2} maxLength={CHAT_LIMITS.messageCharacters} required
              value={draft} onChange={(event) => setDraft(event.target.value)}
              readOnly={Boolean(pending)} disabled={!material}
              aria-describedby={error ? "tutor-error tutor-privacy" : "tutor-privacy"} />
            <div className="submit-row">
              {latestRound && <a className="latest-reply" href={`#reply-${latestRound.id}`}><ArrowUp aria-hidden="true" />{copy.latest}</a>}
              {pending ? <button className="secondary-button" type="button" onClick={cancel}>{copy.stop}</button> : null}
              <button className="send" type="submit" aria-disabled={!material || !draft.trim() || Boolean(pending)}>
                {error ? copy.retry : copy.send}<ArrowUp aria-hidden="true" size={18} />
              </button>
            </div>
          </div>
          {error && <p role="alert" className="error" id="tutor-error">{error}</p>}
          <p className={pending ? "pending-status" : "sr-only"} role="status">{notice}</p>
          <p className="privacy-note" id="tutor-privacy">{copy.privacy}</p>
        </form>
      </div>
    </div>
  );
}
