# 展示流程與 WAICY 正式交件執行手冊

> 本機已完成真實模型試點與缺陷重測。英文 PDF 和表單短介已整理成待審草稿。正式公開 Demo 網址、經審核的對話連結與表單提交仍待完成。

## A. 三分鐘實際 Demo 建議

公開入口就緒後，評審可從 `/?lang=en` 直接打開英文介面。以下是操作演練稿，時間需由實際講述與操作確認。

| 時間 | 操作 | 英文講稿 |
|---|---|---|
| 00:00–00:25 | 進入英文學習室，展開座標軸與關鍵點。 | “A graph exercise often assumes that you can see the axes and the curve. AccessSTEM AI gives you a way to read the facts and ask your own questions.” |
| 00:25–01:15 | 保持同一張二次函數圖。依序選 Full guide、Quick summary、Teacher guide，問 “Give me an overview of the graph.” 三次。 | “The full guide reads the axes and trend in order. The quick summary starts with the takeaway. The teacher guide offers a reviewable lesson and guiding questions.” |
| 01:15–02:05 | 改選 Paste a problem，貼上 `For the function y = (x - 3)^2 + 2, find its minimum value.`。按 Use this problem，從 Learning preferences 選 Hints only，再按鍵盤送出 “Give me one first hint without telling me the minimum value or its location.” | “The learner controls when to see a solution. This first hint asks them to think about the squared term and leaves the result for them to work out.” |
| 02:05–02:40 | 展示已保存的 `mode-override` Baseline／V3 同題結果，若有餘裕再展示速率案例。 | “The baseline revealed the result in hint mode. Our first rewrite still leaked it in a detail and a claim. The final instruction covers every field, and the interface shows how to switch modes.” |
| 02:40–03:00 | 指出教材核對標籤以及後續驗證。 | “Our evidence comes from controlled tests. We are checking the lessons and the screen-reader experience before claiming broader classroom usefulness.” |

在候選教材尚待教師核對時，照實說明其狀態。圖片或 API 出錯時，使用已標記為歷史實測的備援素材。

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
- [官方表單](https://www.waicy.org/2026-submission/) 的 `Project Description` 上限 200 英文字。若已透過官方地區主辦報名，依主辦說明確認送件方式。
- 表單應填正確的 High School 分組、英文姓名、年級、聯絡方式與指導者（依實際資料，勿杜撰）。
- PDF 中放入**活的 chatbot URL** 與**最終版本真實對話 URL**，不是本機 localhost、不能存取的私有文件、影片冒充 bot 或臨時過期的連結。
- 用不同瀏覽器無痕模式、非開發者帳戶、手機／桌機及鍵盤親自驗收 **PDF、Drive folder、Chatbot、Transcript 四種入口**。
- 檢查第三方 API 額度與線上負載，避免評審當天一開始就 429。
- 如使用者回報或資料來源顯示涉及隱私與著作權，先確認公開許可再分享。
- 保留官方提交完成的確認畫面或通知；沒完成表單不得標「已送件」。

## F. 應保留的可驗證連結欄位

本機已有六輪英文合成操作的真實回覆，保留於 `evidence/raw/waicy-final-english-browser.md`。可用來準備學生實機對話與英文展示，發布前須審核。

本機待審材料位於 `evidence/raw/waicy-submission-draft/`，包含六頁英文 PDF 與可編修 HTML、167 字的表單短介、教材核對單、英文入口實機驗收證據。正式 PDF 需要確認團隊貢獻、公開 Demo 與對話網址，再重印並逐個開啟兩條外部連結。

有八張可放入英文 PDF 的實拍截圖，包含六張顯示真實 OpenAI 回覆的畫面。[逐張截圖與英文圖說](assets/waicy-screenshots/WAICY-screenshot-index.md) · [整包下載（ZIP）](assets/waicy-screenshots/AccessSTEM_AI-WAICY-screenshots-2026-11-23.zip)

```text
Live chatbot URL：待建立與匿名驗收
Final real chat history URL：待建立與匿名驗收
Anonymized experiment evidence：待建立
English submission PDF：已有待審草稿，等團隊資料與兩個公開連結
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

## I. WAICY 參賽簡報視覺風格

簡報主題與頁綱待確認。以下保留原始風格提示詞，日後製作時套用到每一頁。

```text
Create a presentation in the 'Collage' theme, a cut-paper collage. Background: warm paper (#EFEBE3); ink text #2B2722. Typography: headlines in bold 'Bricolage Grotesque' with body copy in 'Work Sans' (both Google Fonts); each headline word sits on its own paper strip, rotated between -3 and 3 degrees, stacked with slight overlaps and staggered indents. Paper shapes: blocks in muted brights (red #E2574C, teal #2A9D8F, mustard #E9C46A, ink blue #264653) with torn edges drawn as jagged CSS clip-path polygons, never clean rectangles. Signature motifs: translucent white tape strips (about 84x22px, rotated near 40 degrees, 50% opacity) pinning pieces at corners; one halftone patch per slide made of small ink dots (radial-gradient, 11px grid, 22% opacity). Text on mustard is ink #2B2722, on every other color it is white. Body copy sits in ink on the paper background or on white torn sheets. Strictly avoid: gradients, drop shadows, clean rectangles for colored shapes, photographs, a fifth accent color, perfectly straight alignment.

Use this theme for my slides. Ask me what the presentation is about first, then apply the theme to every slide.
```
