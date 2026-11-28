import type { Metadata } from "next";
import Link from "next/link";
import { tutorCopy, workspaceCopy } from "@/components/workspace-copy";
import type { LearnerPreferences } from "@/lib/chat-contract";
import { fullSolutionLabel } from "@/lib/learning-copy";
import { materialSourceLabel } from "@/lib/material-sources";
import transcript from "./transcript.json";
import styles from "./transcript.module.css";

export const metadata: Metadata = {
  title: "AccessSTEM AI | WAICY chat history",
  description: "A recorded test conversation with the deployed AccessSTEM AI function-graph tutor.",
};

const modes = workspaceCopy.en.modeCopy;
const copy = tutorCopy.en;
const stylesByMode: Record<LearnerPreferences["pedagogyMode"], string> = {
  hint: "Hints only", guided: "Guided", full: fullSolutionLabel.en,
};

export default function ChatHistory() {
  return (
    <div className="workspace">
      <main className={`shell ${styles.main}`}>
        <nav className={styles.links} aria-label="Resources">
          <Link href="/?lang=en">Open the live tutor</Link>
          <a href="/waicy/chat-history.txt">Read the plain-text transcript</a>
        </nav>
        <header className={styles.header}>
          <h1>WAICY chat history</h1>
          <p>{transcript.turns.length * 2} messages from one conversation with the deployed AccessSTEM AI tutor.</p>
          <p>An AI agent operated the public browser interface using scripted questions. The replies are the service’s actual responses.</p>
          <dl className={styles.facts}>
            <div><dt>Recorded</dt><dd><time dateTime={transcript.recordedAt}>{transcript.recordedAt.replace("T", " ").slice(0, 16)} UTC</time></dd></div>
            <div><dt>Tutor release</dt><dd>Prompt {transcript.promptVersion} · <code>{transcript.commit.slice(0, 7)}</code></dd></div>
            <div><dt>Lesson</dt><dd>{transcript.lesson} · Teacher review pending</dd></div>
            <div><dt>Default model</dt><dd>gpt-6.1-terra, low reasoning effort. Individual replies omit the provider model ID.</dd></div>
          </dl>
        </header>
        <ol className={styles.turns} role="list" aria-label="Conversation turns">
          {transcript.turns.map(({ question, preferences, answer }, index) => {
            const { profile, pedagogyMode } = preferences as LearnerPreferences;
            return <li key={index} className={`panel ${styles.turn}`} id={`turn-${index + 1}`}>
              <h2>Turn {index + 1} · {modes[profile][0]}</h2>
              <p className={styles.setting}>{stylesByMode[pedagogyMode]}</p>
              <h3>Test question</h3>
              <p>{question}</p>
              <h3>Tutor reply</h3>
              <p>{answer.summary}</p>
              {answer.sections.map(({ heading, text }, section) => <div key={section}>
                <h4>{heading}</h4>
                <p>{text}</p>
              </div>)}
              {answer.claims.length > 0 && <details>
                <summary>Answer sources</summary>
                <ul>{answer.claims.map(({ kind, text, sourceRef }, claim) => {
                  const source = materialSourceLabel(sourceRef, "en");
                  return <li key={claim}><strong>{copy[kind as "given" | "derived" | "unknown"]}</strong> · {text}{source && <span className="claim-source">{source}</span>}</li>;
                })}</ul>
              </details>}
              {answer.nextQuestion && <><h4>Follow-up question</h4><p>{answer.nextQuestion}</p></>}
              {profile === "educator" ? <p className="verification">{copy.draft}</p>
                : answer.needsHumanVerification && <p className="verification">{copy.needsReview}</p>}
            </li>;
          })}
        </ol>
      </main>
    </div>
  );
}
