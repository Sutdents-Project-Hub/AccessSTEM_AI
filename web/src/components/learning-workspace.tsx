"use client";

import { BookOpen, ChartNoAxesCombined, ChevronRight, Contrast, MessageCircle, SlidersHorizontal } from "lucide-react";
import { useState, type FormEvent } from "react";
import { CHAT_LIMITS, type LearnerPreferences } from "@/lib/chat-contract";
import { charts, getChart, type ChartFacts } from "@/lib/charts";
import { ChartPlot } from "./chart-plot";
import { Tutor, type Material } from "./tutor";

const learningModes = [
  { value: "learner-full", label: "完整導讀", readingDepth: "step-by-step", pedagogyMode: "guided" },
  { value: "learner-brief", label: "重點短述", readingDepth: "brief", pedagogyMode: "guided" },
  { value: "educator", label: "教師引導", readingDepth: "deep", pedagogyMode: "hint" },
] as const;

const levels = [
  { label: "解說深度", name: "readingDepth", options: [
    ["brief", "簡短重點"], ["step-by-step", "逐步解說"], ["deep", "深入解析"],
  ] },
  { label: "解題方式", name: "pedagogyMode", options: [
    ["hint", "只給提示"], ["guided", "循序引導"], ["full", "完整解答"],
  ] },
  { label: "數學程度", name: "mathLevel", options: [
    ["beginner", "初次接觸"], ["familiar", "熟悉基本概念"],
  ] },
] as const;

function ChartLesson({ chart, highContrast }: { chart: ChartFacts; highContrast: boolean }) {
  return <>
    <div className="chart-title">
      <h3>{chart.title}</h3>
      <span className="formula"><span aria-hidden="true">{chart.formulaDisplay}</span><span className="sr-only">{chart.formulaReading}</span></span>
    </div>
    <figure className="chart-figure">
      <ChartPlot chart={chart} highContrast={highContrast} />
      <figcaption>{chart.shortDescription}</figcaption>
    </figure>
    <div className="lesson-notes">
      <details>
        <summary><ChevronRight aria-hidden="true" />座標軸、單位與關鍵點</summary>
        <p>橫軸 {chart.facts.xAxis.label}，縱軸 {chart.facts.yAxis.label}。{chart.unknowns.join(" ")}</p>
        <table>
          <caption className="sr-only">{chart.title}的關鍵點</caption>
          <thead><tr><th scope="col">關鍵點</th><th scope="col">x</th><th scope="col">y</th></tr></thead>
          <tbody>{chart.facts.keyPoints.map((point) => (
            <tr key={point.name}><th scope="row">{point.name}</th><td>{point.x}</td><td>{point.y}</td></tr>
          ))}</tbody>
        </table>
      </details>
      <details>
        <summary><ChevronRight aria-hidden="true" />數學概念與趨勢</summary>
        <p>{chart.longDescription}</p>
        <ul>{chart.facts.trends.map((trend) => <li key={trend}>{trend}</li>)}</ul>
      </details>
    </div>
    <p className="source-note">
      <BookOpen aria-hidden="true" />{chart.source.title} · {chart.source.kind === "curated_verified" ? "已經人工核對" : "待教師核對"}
    </p>
  </>;
}

export function LearningWorkspace() {
  const [chartId, setChartId] = useState(charts[0].id);
  const [description, setDescription] = useState("");
  const [descriptionInUse, setDescriptionInUse] = useState("");
  const [contextVersion, setContextVersion] = useState(0);
  const [highContrast, setHighContrast] = useState(false);
  const [preferences, setPreferences] = useState<LearnerPreferences>({
    profile: "learner-full", readingDepth: "step-by-step", pedagogyMode: "guided", mathLevel: "beginner",
  });
  const chart = getChart(chartId);
  const material: Material | null = chart
    ? { chartId: chart.id, userDescription: null }
    : descriptionInUse ? { chartId: null, userDescription: descriptionInUse } : null;

  function applyDescription(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = description.trim();
    if (!next || next === descriptionInUse) return;
    setDescriptionInUse(next);
    setContextVersion((version) => version + 1);
  }

  return (
    <div className="workspace" data-contrast={highContrast ? "high" : undefined}>
      <a className="skip-link" href="#main">跳至主要內容</a>
      <header className="header">
        <div className="shell header-inner">
          <a href="#main" className="wordmark">
            <span className="mark"><ChartNoAxesCombined aria-hidden="true" size={22} /></span>
            <span>AccessSTEM <span className="brand-ai">AI</span></span>
          </a>
          <nav aria-label="學習室導覽">
            <a href="#material">圖表教材</a>
            <a href="#tutor">AI 對話</a>
          </nav>
          <button className="contrast-toggle" type="button" aria-pressed={highContrast} onClick={() => setHighContrast(!highContrast)}>
            <Contrast aria-hidden="true" size={18} />高對比
          </button>
        </div>
      </header>

      <main className="shell main" id="main" tabIndex={-1}>
        <div className="intro">
          <h1>讀懂函數圖表</h1>
          <p>從圖表的全貌、座標到變化趨勢，依自己的步調閱讀和追問。</p>
        </div>
        <div className="learning-grid">
          <section className="panel material" id="material" aria-labelledby="material-heading" tabIndex={-1}>
            <div className="panel-heading">
              <BookOpen aria-hidden="true" />
              <h2 id="material-heading">圖表教材</h2>
            </div>
            <div className="chart-picker">
              <label htmlFor="chart-picker">教材來源</label>
              <select id="chart-picker" value={chartId} onChange={(event) => {
                setChartId(event.target.value);
                setContextVersion((version) => version + 1);
              }}>
                {charts.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
                <option value="custom">貼上自己的題目</option>
              </select>
            </div>
            {chart ? <ChartLesson chart={chart} highContrast={highContrast} /> : (
              <form className="custom-lesson" onSubmit={applyDescription}>
                <label htmlFor="description">圖表描述或文字題目</label>
                <textarea
                  id="description"
                  value={description}
                  rows={6}
                  maxLength={CHAT_LIMITS.descriptionCharacters}
                  aria-describedby="description-help"
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />
                <p id="description-help" className="muted">貼上公式、已知座標或刻度。請勿填寫姓名、學校或其他個人資料。</p>
                <button className="secondary-button" type="submit" disabled={!description.trim() || description.trim() === descriptionInUse}>
                  使用這份題目
                </button>
                {descriptionInUse && <div className="used-description" role="status">
                  <strong>對話中的題目 · 未經教師核對</strong>
                  <p>{descriptionInUse}</p>
                  {description.trim() !== descriptionInUse && <p>要改用新內容，請再選一次「使用這份題目」。</p>}
                </div>}
              </form>
            )}
          </section>
          <section className="panel tutor-panel" id="tutor" aria-labelledby="tutor-heading" tabIndex={-1}>
            <div className="panel-heading">
              <MessageCircle aria-hidden="true" />
              <h2 id="tutor-heading">AI 學習助理</h2>
            </div>
            <fieldset className="mode-picker">
              <legend>學習方式</legend>
              <div className="mode-options">
                {learningModes.map(({ value, label, readingDepth, pedagogyMode }) => (
                  <label key={value} className="mode-option">
                    <input className="sr-only" type="radio" name="profile" value={value}
                      checked={preferences.profile === value}
                      onChange={() => setPreferences({ ...preferences, profile: value, readingDepth, pedagogyMode })} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <details className="preferences">
              <summary><SlidersHorizontal aria-hidden="true" />調整學習偏好</summary>
              <div className="preference-fields">
                {levels.map(({ label, name, options }) => (
                  <label key={name}>{label}
                    <select name={name} value={preferences[name]} onChange={(event) => {
                      setPreferences({ ...preferences, [name]: event.target.value });
                    }}>
                      {options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
                    </select>
                  </label>
                ))}
              </div>
            </details>
            <Tutor key={contextVersion} material={material} preferences={preferences} />
          </section>
        </div>
      </main>
    </div>
  );
}
