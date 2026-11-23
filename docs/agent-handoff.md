# 工程交接指引

本機 Web MVP 已實作，本機 OpenAI 已接通。後續重點是教材教師核對、人工評分、VoiceOver 與公開交件驗收。

1. 按 [Web 說明](../web/README.md) 啟動單一 `web/` 元件，執行 lint、typecheck、build。
2. 請教師核對 `web/src/lib/charts.ts` 的公式、座標、圖表及文字。確認可公開的來源與日期後更新教材資料。
3. 在有權限的環境以 `OPENAI_API_KEY` 驗證真實多輪對話。照 [Agent 行為契約](agent-design.md) 驗證提示模式、分層導讀、教師草稿和缺值處理。
4. 按 [評估計畫](evaluation-plan.md) 執行同題 Baseline／V1–V3 比較，保存原始回覆、失敗和重測。先讀當前的試點證據，再使用 VoiceOver 實際操作主要流程。
5. 依 [部署規劃](deployment.md) 與 [展示手冊](demo-and-submission.md) 處理公開 Demo、匿名化對話和英文 PDF。

Git 與外部操作遵循根目錄 [AGENTS.md](../AGENTS.md)。工作包完成後更新權威文件和實測狀態。
