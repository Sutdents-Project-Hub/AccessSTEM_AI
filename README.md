# AccessSTEM AI｜視障學生的個人化 STEM 圖表學習助理

> WAICY 2026｜第 4 賽道 LLM & AI Agent（AI as a Service）
> 專案狀態：**本機 MVP 已接通 OpenAI。教材教師核對、VoiceOver 與公開交件仍待完成**。
> 企劃、實作、研究與評測依學生、指導者和協作工具的實際貢獻記錄。

## 專案目標

讓全盲學生、低視力學生與教師，能依各自需要逐步理解高中數學函數圖表，而不是只聽到固定的圖片替代文字。核心服務是可持續追問、按理解程度調整的 **AI STEM 學習顧問**，並能明確區分圖表事實、數學推導與未知資訊。

WAICY 的重點是可操作的專業 AI 服務與真實的 Prompt 迭代證據，**不是網站功能數量或模型訓練規模**。

## MVP 邊界

| 優先序 | 工作 | 驗收方向 |
|---|---|---|
| P0 | 三種使用需求（全盲／低視力／教師），偏好可自行覆寫 | 同一張圖能產生合理且明顯不同的說明 |
| P0 | 經人工核對的線性函數、二次函數範例與文字題目 | 能說出座標軸、重要點、趨勢；來源可回查 |
| P0 | 三層導讀、連續對話、提示式教學與追問 | 不直接搶答，遇到「太難」能換方式解釋 |
| P0 | 資訊不足與錯誤處理 | 不捏造座標刻度或圖中看不到的數字 |
| P0 | 基礎無障礙介面 | 使用鍵盤與 VoiceOver 可完成主要任務（仍須實測） |
| P0 | Baseline／V1／V2／V3 實際比較與交件證據 | 原始紀錄、失敗案例、修正前後對照可追溯 |
| P1 | 上傳圖片、圖像理解與人工確認 | 需要另外設計圖片隱私與辨識信任機制 |
| P2 | 語音輸入／朗讀、更多 STEM 圖表、登入與雲端進度 | 不影響本次最小交件 |

P0 不需獨立資料庫、登入、教師後台、原生 App 或任何正式學校資料串接。

## 本機啟動

使用 Node.js 24 LTS 與 pnpm 10.33.0。

```sh
cd web
pnpm install --frozen-lockfile
pnpm dev
```

開啟 `http://localhost:3000`。評審英文入口可直接使用 `/?lang=en`。可使用中英介面、圖表、文字導讀、學習偏好與貼題。要啟用 AI 對話，依 [Web 啟動說明](web/README.md) 在 `web/.env.local` 設定伺服器端 `OPENAI_API_KEY`，可選填 `OPENAI_MODEL`。預設模型為 `gpt-6.1-terra`，推理深度為 `low`。

```sh
pnpm lint
pnpm typecheck
pnpm build
```

## 結構與目前功能

- `web/src/app/` 使用 Next.js App Router，提供學習室及 `POST /api/chat`。
- `web/src/components/` 提供鍵盤操作、三種學習方式、高對比、文字導讀和多輪問答介面。
- `web/src/lib/` 收錄三張待教師核對的自製函數圖表、資料型別與 Zod 契約。
- `web/src/server/agent/` 以 OpenAI Responses API 產生結構化教學回覆。瀏覽器只在目前頁面保留對話與偏好。
- `docs/` 保留產品、架構、驗收與競賽規格。

GitHub 遠端為 [Sutdents-Project-Hub/AccessSTEM_AI](https://github.com/Sutdents-Project-Hub/AccessSTEM_AI)。公開 Demo 的平台與網址待定。

## 文件導航

| 文件 | 內容 |
|---|---|
| [專案設定](docs/project-profile.md) | 初始化 Profile、名稱與未決事項 |
| [需求與驗收](docs/project-overview.md) | 人物誌、P0／P1、Acceptance Criteria |
| [系統架構](docs/architecture.md) | 邊界、資料流、建議檔案結構 |
| [AI 學習顧問規格](docs/agent-design.md) | 提示詞、狀態、推論誠實性 |
| [API 與資料契約](docs/api-and-data-contracts.md) | ChartFacts、對話介面與錯誤契約 |
| [介面與無障礙](docs/ux-accessibility.md) | 畫面、互動、VoiceOver／鍵盤測試 |
| [測試與評估](docs/evaluation-plan.md) | Baseline／V1–V3、評分、資料集 |
| [WAICY 迭代開發紀錄](docs/waicy-iteration-log.md) | Prompt 設計、實測、錯誤、修正與原始證據索引 |
| [實作計畫](docs/implementation-plan.md) | 分階段任務、依賴、完成定義 |
| [競賽要求](docs/competition.md) | WAICY 評分、必備交件與時間 |
| [展示與交件](docs/demo-and-submission.md) | 公開 Demo、對話佐證、英文 PDF |
| [證據紀錄模板](docs/evidence-templates.md) | 可追溯測試與學生貢獻表 |
| [安全與隱私](docs/security-and-privacy.md) | 未成年人、API 金鑰與公開分享 |
| [資料與儲存](docs/data-and-storage.md) | 保存策略、輸入來源與授權 |
| [AI 外部整合](docs/integrations.md) | LLM 供應商、成本與故障應對 |
| [部署規劃](docs/deployment.md) | Demo 上線條件與回退 |
| [來源與決策](docs/decisions-and-sources.md) | 取捨、已核對官方來源與問題 |
| [AI 工程交接](docs/agent-handoff.md) | 下一個 Codex／Claude Code 可直接承接的工作 |

## 驗收狀態

- 已實作圖表學習室、文字題目輸入、學習偏好、伺服器端 OpenAI 路由與安全錯誤回復。
- 已跑真實 OpenAI、Baseline／V1–V3 同題試驗和模型比較。細節見 [評估計畫](docs/evaluation-plan.md)。三張圖表待教師核對。
- VoiceOver、真人使用者研究、公開 Demo、匿名對話連結與英文 PDF 仍待完成。

**來源**：使用者提供的《02_AccessSTEM_AI_企劃發想書.md》與《WAICY_2026_第4賽道_LLM_AI_Agent_完整參賽研究指南(1).md》，以及 [WAICY 官方資訊](https://www.waicy.org/waicy-2026/)、[官方評分](https://www.waicy.org/rubrics/)；詳細來源與尚待確認事項參見 [來源與決策](docs/decisions-and-sources.md)。
