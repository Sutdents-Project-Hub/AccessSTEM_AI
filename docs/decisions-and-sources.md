# 技術決策紀錄、來源與待確認事項

> 建立日期：2026-11-20（台灣）。本頁記錄**規劃上的建議與理由**，不是替學生決定外部付費、公開授權或產品已完成。

## 已採用的初始化選擇（目前為規劃）

| ID | 決策 | 理由 | 何時重新審查 |
|---|---|---|---|
| ADR-001 | Repository `AccessSTEM_AI`；slug `accessstem-ai` | 符合 Students Project Init 命名及 GitHub 後續交接 | 只在使用者明確改名時 |
| ADR-002 | `competition`／`web`／`scaffold` | 本次只初始化與寫規格；截止近、先證明服務 | 準備進入實作／部署 |
| ADR-003 | 單一 `web/`：Next.js + TS + pnpm | 可用 Server Route Handlers 容納外部 AI API；少一個獨立後端的驗證成本 | 真的出現獨立資料／部署責任再考慮 NestJS |
| ADR-004 | P0 先做人工核對文字／ChartFacts，不必圖片辨識 | 模型無法保證辨識所有圖表細節；評分重服務及迭代 | P0 完成、有時間且找到安全的多模態驗證 |
| ADR-005 | 三 Profile 是偏好模板，可自訂 | 真實的使用者需求不是障礙診斷推斷 | 有真實使用者研究時 |
| ADR-006 | P0 不導入 DB 或登入 | 減少未成年人資料風險和截止前複雜度 | 明確需要持久儲存／分享個別對話時 |
| ADR-007 | 真實 Final transcript 去識別後唯讀分享 | 可滿足可開啟的競賽證據，不必先建立完整帳號後台 | 官方改規則／取得授權需求 |
| ADR-008 | OpenAI Responses API，預設 `gpt-4.1-mini`；Hosting 待決 | 使用者指定 OpenAI，需另確認實際模型存取權和費用 | 真實 API 驗證與公開前 |
| ADR-009 | WCAG 2.2 AA 作為目標、非宣稱已達 | 需實際 VoiceOver、鍵盤、對比與真人驗證 | 無障礙測試後按證據更新 |
| ADR-010 | Baseline、V1、V2、V3 預先定義但**不預設數據** | 對準 WAICY 迭代評分，避免事後編造結果 | 每一版本真實跑完時 |

## 原始企劃與對應內容

1. **使用者上傳**《02_AccessSTEM_AI_企劃發想書.md》（2026-11-20）。作為理念、三種角色、分層解說、提示式解題、未確定數值不亂猜與語音未來規劃的**原始需求**。
2. **使用者上傳**《WAICY_2026_第4賽道_LLM_AI_Agent_完整參賽研究指南(1).md》（2026-11-20）。作為規則整理、評分與交件證據方向的**二手整理來源**；與主辦官方文字若不一致，以官方最新資訊與回函為準。
3. **使用者上傳**《封存(1).zip》：`Students Project Init` 技術初始化 Skill。已在電腦 A 對比 `SKILL.md` 及核心 Python 腳本 SHA-256，與已安裝版本一致，並使用其 plan validator／initializer。此 ZIP 是**初始化工具**，不是要推到學生 repo 的產品程式。
4. **本次新增規劃**：單一 Next.js Route Handler 架構、ChartFacts Schema、候選案例 36 題、P0 階段切分與交接任務。屬於基於原企劃與期限的工程選擇，**不是原企劃已決定或官方硬性規定**。

## 官方法規／教學參考（正式引用前重查）

- WAICY 2026 活動：https://www.waicy.org/waicy-2026/ （日期、年齡、遠距參賽與賽道）
- WAICY LLM Rubrics：https://www.waicy.org/rubrics/ （Specific AI Service 25 / Iterative Development 25 + 五項各 10）
- WAICY 正式提交表單：https://www.waicy.org/2026-submission/ （截止與最長 200 字簡介）
- WAICY 2026 Guidebook：https://waicy-cdn.wholeren.cn/wp-content/uploads/2026/09/WAICY-2026-Guidebook.pdf （第 4 賽道提交項目；正式交件前核對）
- W3C WAI Complex Images：https://www.w3.org/WAI/tutorials/images/complex/ （複雜圖需短／長描述）
- W3C WCAG 2.2：https://www.w3.org/TR/WCAG22/ （無障礙設計／測試標準）
- Next.js Route Handlers：https://nextjs.org/docs/app/getting-started/route-handlers （伺服器端 API 設計）

注意官方來源各自有版次與更新時間；需核對而非僅靠本規劃轉述。正式英文 PDF 的引用請整理完整作者、年份、文章名稱、URL 與取用日期。

## 仍待使用者／主辦／學生確認（不阻止文件初始化）

| 決策 | 可能影響 |
|---|---|
| 學生年齡與是否需監護人同意 | 官方資格、訪談與公開使用者證據 |
| OpenAI 帳戶模型權限、金鑰、預算 | 是否可串真實 AI、費用與模型可用性 |
| Hosting 選擇與公開 URL | Demo 是否可被評審操作、secret 與上線時程 |
| 兩至三個圖表的教材內容、實際人工核對者 | 結構化資料是否有正確的真相依據 |
| 是否能有真實視障學生或教學工作者參與 | 研究結論可聲稱的範圍 |
| 最終真實聊天紀錄、引用資料的授權 | 公開 PDF、聊天 URL 與 Git 的合法性 |
| 第 4 賽道實際評審時段與地區提交細節 | 最後交件／答辯準備 |

**尚未決定的項目不能用預設帳號、假的 URL、假的測試結果、臆測個資或憑證補空白**。在後續實作需要外部費用、權限或合法同意時才請使用者作相應決定。
