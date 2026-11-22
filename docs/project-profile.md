# 學生專案 Profile

## 基本資訊

- Project name：AccessSTEM AI｜視障學生的個人化 STEM 圖表學習助理
- Repository name：`AccessSTEM_AI`
- Project slug：`accessstem-ai`
- Local Docker Compose project：`accessstem_ai`
- Stage：`competition`
- Product type：`web`
- Bootstrap mode：`scaffold`
- Deployment：`planned`
- Team collaboration：`true`
- Technology policy：未指定時採公司技術基線
- Structure exception：無；使用固定 component root

## 摘要

為全盲學生、低視力學生與教師提供有依據、可持續追問、可調整解說深度的高中數學圖表 AI 學習服務，以 WAICY 2026 第 4 賽道 LLM & AI Agent 參賽為目標。

## 元件

- `web`：path=`web`，kind=`web`，framework=`Next.js`，package_manager=`pnpm`，quality=lint, typecheck, build，technology_source=`specified`

## 功能領域

- 三種使用者需求與可自行調整的學習偏好：完整導讀、重點短述與教師引導
- 經人工核對之高中線性函數與二次函數圖表事實資料及題目輸入
- 圖表全貌、座標軸與單位、趨勢及關鍵數學關係的分層描述
- 持續追問、舉例、理解檢查與提示式解題，不強迫直接公布答案
- 已知事實、推導結論、不確定資訊分級與缺資料先詢問
- 以語意化 Web、鍵盤操作與螢幕閱讀器為核心的無障礙介面
- Baseline、V1、V2、V3 真實 AI 回覆比較、錯誤分析與匿名化競賽證據
- 可供評審操作的公開 Demo、可存取之最終 AI 真實對話紀錄與英文單份 PDF 交件

## 專案限制

- 已建置本機 Next.js MVP。圖表人工核對、真實對話驗證與公開 Demo 待完成
- 2026-11-29 17:00 美東時間為 WAICY 預定截止；於台灣時間 2026-11-29 晚間前完成交件前檢查
- 優先採用單一 Next.js App Router Web 元件，其伺服器端 Route Handlers 負責 AI 呼叫，不先分離 NestJS 或資料庫
- MVP 由人工確認的結構化圖表資料或文字描述輸入，圖片辨識與語音功能屬於延伸階段且不得冒稱已完成
- 不要求學生輸入可識別個資、健康診斷或真實學校帳號，聊天內容原則上只保留於當次會話
- 所有 LLM API 金鑰僅置於伺服器環境，前端及 Git 不可暴露憑證
- 不可將推測圖表刻度、數字或數學結論當成已知事實，教師應核對教材
- 無障礙以 WCAG 2.2 AA 作為設計與測試目標，未實測不得宣稱通過
- 正式交件需實際可操作 AI 連結、最終版真實對話紀錄連結、可追溯迭代證據及單份英文 PDF
- GitHub 遠端為 `Sutdents-Project-Hub/AccessSTEM_AI`，LLM 供應商為 OpenAI。網域與部署環境待定

## 關注事項

- ai
- external-api
- personal-data
- uploads

## 假設

- 優先採 Node.js 24 LTS、TypeScript、pnpm、Next.js App Router 與語意化 HTML，實作時再依相容性核驗版本
- MVP 不建立資料庫、登入、教師後台或保存原始圖表上傳檔；去識別化賽事證據在審核後另行公開
- 圖片上傳如加入，採先辨識後人工確認的兩階段流程；若無確認資料，不生成肯定數值
- OpenAI Responses API 預設 `gpt-4.1-mini`，可在伺服器端覆寫模型。公開流量額度與使用條款需確認
- 由參賽學生 負責題目理解、使用者研究、Prompt 迭代與結果解釋；指導者及工具協作內容如實揭露
- 部署平臺僅有參賽 Demo 的規劃需求，尚未決定 Vercel、Coolify 或其他服務

## 未決定事項

- 確認參賽學生 的報名年齡與授權同意，是否需主辦進一步確認
- 確認 OpenAI 金鑰、模型權限、API 額度、付款責任與公開 Demo 流量預算
- 確認最終 Demo 部署方案、公開網址與連結權限；不預填不存在的 URL
- 確認使用者研究是否能招募視障參與者；若不能，需明確揭露僅完成 VoiceOver／鍵盤模擬測試
- 確認圖片上傳是否列入截止日前的實作範圍，預設不列 P0
- 確認教材與圖表來源可公開引用、展示與重製的權利
- 確認公開最終對話紀錄前的匿名化、審閱與同意
