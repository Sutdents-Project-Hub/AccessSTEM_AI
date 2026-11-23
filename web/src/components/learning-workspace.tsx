"use client";

import { BookOpen, ChartNoAxesCombined, ChevronRight, Contrast, MessageCircle, SlidersHorizontal } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { CHAT_LIMITS, type LearnerPreferences } from "@/lib/chat-contract";
import { charts, getChart, type ChartFacts } from "@/lib/charts";
import { ChartPlot } from "./chart-plot";
import { Tutor, type Material } from "./tutor";
import { displayChart, workspaceCopy, type Language } from "./workspace-copy";

const learningModes = [
  { value: "learner-full", readingDepth: "step-by-step", pedagogyMode: "guided" },
  { value: "learner-brief", readingDepth: "brief", pedagogyMode: "guided" },
  { value: "educator", readingDepth: "deep", pedagogyMode: "hint" },
] as const;

const levels = [
  { name: "readingDepth", options: ["brief", "step-by-step", "deep"] },
  { name: "pedagogyMode", options: ["hint", "guided", "full"] },
  { name: "mathLevel", options: ["beginner", "familiar"] },
] as const;

function ChartLesson({ chart, highContrast, language }: { chart: ChartFacts; highContrast: boolean; language: Language }) {
  const copy = workspaceCopy[language];
  const verified = chart.source.kind === "curated_verified";

  return <>
    <div className="chart-title">
      <h3>{chart.title}</h3>
      <span className="formula">
        <span aria-hidden="true">{chart.formulaDisplay}</span>
        <span className="sr-only">{chart.formulaReading}</span>
      </span>
    </div>
    <p className="source-note">{chart.source.title} · {verified ? copy.reviewed : copy.unreviewed}</p>
    <figure className="chart-figure">
      <ChartPlot chart={chart} highContrast={highContrast} />
      <figcaption><strong>{copy.overview}</strong><span>{chart.shortDescription}</span></figcaption>
    </figure>
    <div className="lesson-notes">
      <details>
        <summary><ChevronRight aria-hidden="true" />{copy.axes}</summary>
        <p>{copy.axesIntro} {chart.unknowns.join(" ")}</p>
        <table>
          <caption className="sr-only">{copy.keyPoint} · {chart.title}</caption>
          <thead><tr><th scope="col">{copy.keyPoint}</th><th scope="col">x</th><th scope="col">y</th></tr></thead>
          <tbody>{chart.facts.keyPoints.map((point) => (
            <tr key={point.name}><th scope="row">{point.name}</th><td>{point.x}</td><td>{point.y}</td></tr>
          ))}</tbody>
        </table>
      </details>
      <details>
        <summary><ChevronRight aria-hidden="true" />{copy.concepts}</summary>
        <p>{chart.longDescription}</p>
        <ul>{chart.facts.trends.map((trend) => <li key={trend}>{trend}</li>)}</ul>
      </details>
    </div>
  </>;
}

export function LearningWorkspace({ initialLanguage = "en" }: { initialLanguage?: Language }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const copy = workspaceCopy[language];
  const [source, setSource] = useState<"chart" | "custom">("chart");
  const [chartId, setChartId] = useState(charts[0].id);
  const [description, setDescription] = useState("");
  const [descriptionInUse, setDescriptionInUse] = useState("");
  const [contextVersion, setContextVersion] = useState(0);
  const [highContrast, setHighContrast] = useState(false);
  const [preferences, setPreferences] = useState<LearnerPreferences>({
    profile: "learner-full", readingDepth: "step-by-step", pedagogyMode: "guided", mathLevel: "beginner",
  });
  const chart = source === "chart" ? getChart(chartId) : undefined;
  const material: Material | null = chart
    ? { chartId: chart.id, userDescription: null }
    : descriptionInUse ? { chartId: null, userDescription: descriptionInUse } : null;

  useEffect(() => {
    document.documentElement.lang = language === "en" ? "en" : "zh-Hant-TW";
  }, [language]);

  function applyDescription(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = description.trim();
    if (!next || next === descriptionInUse) return;
    setDescriptionInUse(next);
    setContextVersion((version) => version + 1);
  }

  function changeSource(next: typeof source) {
    if (source === next) return;
    setSource(next);
    setContextVersion((version) => version + 1);
  }

  function changeLanguage() {
    const next = language === "en" ? "zh-Hant" : "en";
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(null, "", url);
    setLanguage(next);
  }

  return (
    <div className="workspace" lang={language} data-contrast={highContrast ? "high" : undefined}>
      <a className="skip-link" href="#main">{copy.skip}</a>
      <header className="header">
        <div className="shell header-inner">
          <a href="#main" className="wordmark">
            <span className="mark"><ChartNoAxesCombined aria-hidden="true" size={22} /></span>
            <span>AccessSTEM <span className="brand-ai">AI</span></span>
          </a>
          <nav aria-label={copy.nav}>
            <a href="#material">{copy.material}</a>
            <a href="#tutor">{copy.chat}</a>
          </nav>
          <div className="header-actions">
            <button className="contrast-toggle" type="button" lang={language === "en" ? "zh-Hant" : "en"}
              onClick={changeLanguage}>
              {language === "en" ? "繁體中文" : "English"}
            </button>
            <button className="contrast-toggle" type="button" aria-pressed={highContrast} onClick={() => setHighContrast(!highContrast)}>
              <Contrast aria-hidden="true" size={18} />{copy.contrast}
            </button>
          </div>
        </div>
      </header>

      <main className="shell main" id="main" tabIndex={-1}>
        <div className="intro">
          <h1>
            <span className="sr-only">{copy.title}</span>
            <span className="title-strips" aria-hidden="true">
              <span className="title-strip title-reading">{copy.titleParts[0]}</span>
              <span className="title-strip title-graph">{copy.titleParts[1]}</span>
            </span>
          </h1>
          <p>{copy.intro}</p>
        </div>
        <div className="learning-grid">
          <section className="panel material" id="material" aria-labelledby="material-heading" tabIndex={-1}>
            <div className="panel-heading">
              <BookOpen aria-hidden="true" />
              <h2 id="material-heading">{copy.material}</h2>
            </div>
            <fieldset className="source-picker" aria-describedby="source-help">
              <legend className="sr-only">{copy.source}</legend>
              <label className="source-option">
                <input className="sr-only" type="radio" name="source" checked={source === "chart"} onChange={() => changeSource("chart")} />
                <span>{copy.sample}</span>
              </label>
              <label className="source-option">
                <input className="sr-only" type="radio" name="source" checked={source === "custom"} onChange={() => changeSource("custom")} />
                <span>{copy.custom}</span>
              </label>
            </fieldset>
            <p className="selection-note" id="source-help">{copy.sourceHelp}</p>
            {chart ? <>
              <div className="chart-picker">
                <label htmlFor="chart-picker">{copy.chart}</label>
                <select id="chart-picker" value={chartId} aria-describedby="source-help" onChange={(event) => {
                  setChartId(event.target.value);
                  setContextVersion((version) => version + 1);
                }}>
                  {charts.map((item) => <option key={item.id} value={item.id}>{displayChart(item, language).title}</option>)}
                </select>
              </div>
              <ChartLesson chart={displayChart(chart, language)} highContrast={highContrast} language={language} />
            </> : (
              <form className="custom-lesson" onSubmit={applyDescription}>
                <label htmlFor="description">{copy.description}</label>
                <textarea
                  id="description"
                  value={description}
                  rows={6}
                  maxLength={CHAT_LIMITS.descriptionCharacters}
                  aria-describedby="description-help"
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />
                <p id="description-help" className="muted">{copy.descriptionHelp}</p>
                <button className="secondary-button" type="submit" disabled={!description.trim() || description.trim() === descriptionInUse}>
                  {copy.useDescription}
                </button>
                <span className="sr-only" role="status">{descriptionInUse ? copy.descriptionReady : ""}</span>
                {descriptionInUse && <div className="used-description">
                  <strong>{copy.descriptionLabel}</strong>
                  <p>{descriptionInUse}</p>
                  {description.trim() !== descriptionInUse && <p>{copy.descriptionChanged}</p>}
                </div>}
              </form>
            )}
          </section>
          <section className="panel tutor-panel" id="tutor" aria-labelledby="tutor-heading" tabIndex={-1}>
            <div className="panel-heading">
              <MessageCircle aria-hidden="true" />
              <h2 id="tutor-heading">{copy.tutor}</h2>
            </div>
            <fieldset className="mode-picker">
              <legend>{copy.modes}</legend>
              <div className="mode-options">
                {learningModes.map(({ value, readingDepth, pedagogyMode }, index) => (
                  <label key={value} className="mode-option">
                    <input className="sr-only" type="radio" name="profile" value={value}
                      checked={preferences.profile === value}
                      onChange={() => setPreferences({ ...preferences, profile: value, readingDepth, pedagogyMode })} />
                    <span><strong>{copy.modeCopy[index][0]}</strong><small>{copy.modeCopy[index][1]}</small></span>
                  </label>
                ))}
              </div>
            </fieldset>
            <details className="preferences">
              <summary>
                <SlidersHorizontal aria-hidden="true" />{copy.preferences}
                <span className="current-style">{copy.optionLabels[1][levels[1].options.indexOf(preferences.pedagogyMode)]}</span>
              </summary>
              <div className="preference-fields">
                {levels.map(({ name, options }, index) => (
                  <label key={name}>{copy.fieldLabels[index]}
                    <select name={name} value={preferences[name]} onChange={(event) => {
                      setPreferences({ ...preferences, [name]: event.target.value });
                    }}>
                      {options.map((value, option) => <option key={value} value={value}>{copy.optionLabels[index][option]}</option>)}
                    </select>
                  </label>
                ))}
              </div>
            </details>
            <Tutor key={contextVersion} material={material} preferences={preferences} language={language} />
          </section>
        </div>
      </main>
    </div>
  );
}
