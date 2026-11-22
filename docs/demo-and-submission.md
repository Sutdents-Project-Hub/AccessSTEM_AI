# 展示流程與 WAICY 正式交件執行手冊

> 目前所有 demo 網址、真正對話紀錄、測試結果、正式 PDF、表單提交狀態均為**未完成**。本文件是操作／驗收清單。

## A. 三分鐘實際 Demo 建議

### 00:00–00:30｜問題與服務

一句英文說明：「AccessSTEM AI helps students understand mathematical graphs through personalized, accessible dialogue.」簡述單純念圖不足以理解斜率、頂點與變化關係；不是宣稱「已治療／消除視障障礙」。

### 00:30–01:15｜同圖三種使用偏好

使用一張**已核對**的二次函數，先展示全盲情境的完整軸與趨勢文字，再切低視力的 30 秒重點、教師的三題引導。**必須真的由系統產生不同內容**；若切模式沒有生效，不能假裝成果達標。

### 01:15–02:15｜連問與學習引導

學生問「頂點是什麼？」→「我還是不懂」→「只給提示」，展示不只是看圖說話，而是帶著脈絡逐步教學。

### 02:15–02:45｜不確定與風險

切到缺單位／刻度的文字題目，展示 AI 不亂報確切值、會問需補的資訊；承認模型仍可能犯錯並需核對。

### 02:45–03:00｜實驗與迭代證據

顯示**真實跑出**的 Baseline→V3 前後對照、失敗修正案例與一項仍未解的限制；如果未測出改善，不得宣稱有提升。

## B. 備援 Demo（不能冒充真實 AI）

如果網路或 LLM 暫時失效，可開啟**明確標註為錄影、截圖或過往實際執行紀錄**的備援展示。備援素材證明曾經運作，**不等於**當下可互動服務；應清楚向評審說明原因。正式作品連結仍必須在送件前真的可用。

## C. WAICY 2026 第四賽道必備內容

官方提交方式參考：**一份 PDF**，包含具體 AI 服務、至少三種不同需求的使用者、動機、最終版聊天紀錄（官方至少 10 則訊息／為穩健準備 10 輪完整問答）、可操作 chatbot 連結、構想→Prompt→測試→錯誤→改善、限制與倫理、未來、結論與引用。

注意：10 輪完整問答是團隊建議的安全餘裕，不是官方新增門檻；GitHub Repo、影片與訓練模型不是報名時列明必交項目。

## D. 單份英文 PDF（建議章節，不是強制頁數）

| 頁次建議 | 內容 |
|---|---|
| 1 | Project title, student/instructor & track |
| 2 | Motivation & problem: accessible STEM graphs |
| 3 | Specific AI service: what it does and does not do |
| 4 | Three profiles, differences in actual answers |
| 5 | User journey and screenshots from *working* product |
| 6 | Idea and V1: actual Prompt approach |
| 7 | Real test cases, ground truth, scoring criteria |
| 8 | Baseline–V3: true results and limitations of comparison |
| 9 | Failure → analysis → change → re-test |
| 10 | Live chatbot link + final real chat history link |
| 11 | Ethics, accessibility audit, limitations and next steps |
| 12 | Student contribution, conclusion and references |

**不固定 12 頁**，但全部官方要素要齊；正式撰寫時不能把本規劃文複製成「已完成」報告。

## E. 繳件資料夾與對外檢查

- 建議 Google Drive 目錄：`LLM_High_AccessSTEM/`，PDF：`LLM_High_AccessSTEM.pdf`。這是原參賽研究指南的整理建議；交件時以當下官方要求核對。
- 官方表單：https://www.waicy.org/2026-submission/ 。`Project Description` 上限 200 英文字，先統計英文單字。
- 表單應填正確的 High School 分組、英文姓名、年級、聯絡方式與指導者（依實際資料，勿杜撰）。
- PDF 中放入**活的 chatbot URL** 與**最終版本真實對話 URL**，不是本機 localhost、不能存取的私有文件、影片冒充 bot 或臨時過期的連結。
- 用不同瀏覽器無痕模式、非開發者帳戶、手機／桌機及鍵盤親自驗收 **PDF、Drive folder、Chatbot、Transcript 四種入口**。
- 檢查第三方 API 額度與線上負載，避免評審當天一開始就 429。
- 如使用者回報或資料來源顯示涉及隱私與著作權，先確認公開許可再分享。
- 保留官方提交完成的確認畫面或通知；沒完成表單不得標「已送件」。

## F. 應保留的可驗證連結欄位

```text
Live chatbot URL：待建立與匿名驗收
Final real chat history URL：待建立與匿名驗收
Anonymized experiment evidence：待建立
English submission PDF：待產生
Drive folder share URL：待建立
Submission confirmation：尚未提交
```

## G. 決賽問答準備

- Why not just ChatGPT? → 展示三 profile、已核對圖表、非視覺導讀、提示策略及**真實 Baseline 比較**。
- What did you change? → 舉 1 個真實失敗、改 Prompt 和重測紀錄。
- What if the AI misreads a chart? → 清楚承認未知，要求人類確認，不猜刻度。
- Was it tested with blind students? → 有才說有；若只有 VoiceOver 模擬測試就照實說。
- What did the student contribute? → 提供貢獻表和實際能解釋的方法。

## H. 截止時間

官方全球提交預定 **2026/11/29（日）17:00 美國東部時間（EST）＝台灣 2026/11/30（一）06:00**。內部目標設在 **11/29 台灣晚間之前**送出。需再次核對官網與所屬地區主辦通知；不要把資料夾分享當成已完成線上提交。
