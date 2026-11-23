"use client";

import { useEffect, useRef } from "react";
import type { ChartFacts } from "@/lib/charts";

export function ChartPlot({ chart, highContrast }: { chart: ChartFacts; highContrast: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    function draw(element: HTMLCanvasElement, pen: CanvasRenderingContext2D) {
      const { width, height } = element.getBoundingClientRect();
      if (!width || !height) return;

      const scale = window.devicePixelRatio || 1;
      element.width = Math.round(width * scale);
      element.height = Math.round(height * scale);
      pen.setTransform(scale, 0, 0, scale, 0, 0);

      const colors = getComputedStyle(element);
      const ink = colors.getPropertyValue("--ink");
      const muted = colors.getPropertyValue("--muted");
      const line = colors.getPropertyValue("--grid-line");
      const accent = colors.getPropertyValue("--accent");
      const pointFill = colors.getPropertyValue("--point");
      const paper = colors.getPropertyValue("--plot");
      const [a, b, c] = chart.plot.coefficients;
      const [xMin, xMax] = chart.plot.x;
      const [yMin, yMax] = chart.plot.y;
      const frame = { left: 32, right: width - 34, top: 26, bottom: height - 26 };
      const x = (value: number) => frame.left + (value - xMin) * (frame.right - frame.left) / (xMax - xMin);
      const y = (value: number) => frame.bottom - (value - yMin) * (frame.bottom - frame.top) / (yMax - yMin);

      function segment(x1: number, y1: number, x2: number, y2: number, color: string, weight = 1) {
        pen.strokeStyle = color;
        pen.lineWidth = weight;
        pen.beginPath();
        pen.moveTo(x1, y1);
        pen.lineTo(x2, y2);
        pen.stroke();
      }

      pen.font = "12px ui-monospace, monospace";
      pen.fillStyle = muted;
      pen.textAlign = "center";
      const xStep = width < 400 ? 2 : 1;
      for (let tick = xMin; tick <= xMax; tick += 1) {
        segment(x(tick), frame.top, x(tick), frame.bottom, line);
        if (tick % xStep === 0) pen.fillText(String(tick), x(tick), y(0) + 16);
      }
      pen.textAlign = "right";
      for (let tick = yMin; tick <= yMax; tick += 1) {
        segment(frame.left, y(tick), frame.right, y(tick), line);
        if (tick !== 0 && tick % 2 === 0) pen.fillText(String(tick), x(0) - 8, y(tick) + 4);
      }
      segment(frame.left, y(0), frame.right + 10, y(0), ink, 1.5);
      segment(x(0), frame.bottom, x(0), frame.top - 10, ink, 1.5);
      segment(frame.right + 5, y(0) - 4, frame.right + 10, y(0), ink, 1.5);
      segment(frame.right + 5, y(0) + 4, frame.right + 10, y(0), ink, 1.5);
      segment(x(0) - 4, frame.top - 5, x(0), frame.top - 10, ink, 1.5);
      segment(x(0) + 4, frame.top - 5, x(0), frame.top - 10, ink, 1.5);
      pen.fillStyle = ink;
      pen.textAlign = "left";
      pen.fillText("x", frame.right + 16, y(0) + 4);
      pen.fillText("y", x(0) + 9, frame.top - 7);

      pen.save();
      pen.beginPath();
      pen.rect(frame.left, frame.top, frame.right - frame.left, frame.bottom - frame.top);
      pen.clip();
      pen.strokeStyle = accent;
      pen.lineWidth = 3;
      pen.beginPath();
      for (let index = 0; index <= 240; index++) {
        const value = xMin + (xMax - xMin) * index / 240;
        const position = y(a * value * value + b * value + c);
        if (index === 0) pen.moveTo(x(value), position);
        else pen.lineTo(x(value), position);
      }
      pen.stroke();
      pen.restore();

      for (const [index, point] of chart.facts.keyPoints.entries()) {
        pen.beginPath();
        pen.arc(x(point.x), y(point.y), index === 0 ? 5.5 : 3.5, 0, Math.PI * 2);
        pen.fillStyle = index === 0 ? pointFill : accent;
        pen.fill();
        pen.lineWidth = 2;
        pen.strokeStyle = index === 0 ? ink : paper;
        pen.stroke();
        if (index === 0) {
          pen.font = "600 13px ui-monospace, monospace";
          pen.fillStyle = ink;
          const label = `(${point.x}, ${point.y})`;
          pen.strokeStyle = paper;
          pen.lineJoin = "round";
          pen.lineWidth = 4;
          pen.strokeText(label, x(point.x) + 10, y(point.y) - 10);
          pen.fillText(label, x(point.x) + 10, y(point.y) - 10);
        }
      }
    }

    const observer = new ResizeObserver(() => draw(canvas, context));
    observer.observe(canvas);
    const forcedColors = window.matchMedia("(forced-colors: active)");
    const redraw = () => draw(canvas, context);
    forcedColors.addEventListener("change", redraw);
    redraw();
    return () => {
      observer.disconnect();
      forcedColors.removeEventListener("change", redraw);
    };
  }, [chart, highContrast]);

  return <canvas ref={canvasRef} className="chart-canvas" aria-hidden="true" />;
}
