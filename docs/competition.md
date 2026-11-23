# WAICY 2026 第 4 賽道：評分映射與交件門檻

> 官方名稱：WAICY（World Artificial Intelligence Competition for Youth），網站上也稱 **AI Large Language Model Track**；本專案研究指南稱第 4 賽道 **LLM & AI Agent / AI as a Service**。
> **截止以 2026/11/20 查核資訊為準，交件前需再次查官方**；本文件不是已送件紀錄。

## 截止日期與資格

- 官方 2026 全球作品提交截止：**2026/11/29 17:00 ET**，當日為 EST，換算**台灣 2026/11/30（一）06:00**。
- 團隊目標：**台灣 11/29 晚間前**完成上傳與表單提交，提前檢查連結。
- 官方全球賽網站以 6–18 歲列參賽對象；研究指南提到手冊對 18 歲的文字可能不一致。學生如已滿 18 歲須向主辦確認，**不要假設一定可以參賽**。
- 個人或團隊皆可，依正式報名資料確定人數、學生英文名與學年，不能由此文件猜測。
- 全球賽預定 12/04–12/06 決賽，12/07 公布結果；受邀時段及報告時長以官方通知為準。

## LLM Track 七項評分（官方 Rubrics，滿分 100）

| 官方評分 | 配分 | AccessSTEM 要交的**真實**證據 |
|---|---:|---|
| **Specific AI Service** | **25** | 一個清楚的視障 STEM 圖表學習任務、三種真實不同的對話偏好、可互動服務 |
| **Iterative Development** | **25** | Baseline → V1 → V2 → V3 的完整 Prompt、同題測試、失敗及重測 |
| Motivation & Problem Statement | 10 | 圖表資訊可取得但不等於理解的問題與需求來源 |
| Limitations & Considerations | 10 | 幻覺、未知刻度、人工核對、未成年人、無障礙測試界線 |
| Future Development & Clear Reference | 10 | 真實完成範圍、未完成圖片辨識與語音、文獻與結論 |
| Presentation & Communication | 10 | 學生能親自操作與解釋架構、實驗和限制 |
| Originality & Creativity | 10 | 專業分層導讀、可覆寫個人化、提示式互動與誠實標註的組合 |
| **合計** | **100** | **服務＋迭代占 50 分** |

此表列的是正式交件的證據目標。真實模型回覆、外部操作及實測結果仍須另行取得。

## 正式繳交：一份英文 PDF＋PDF 裡面的兩個核心連結

依官方手冊及使用者提供的賽道研究指南，PDF 需包含：
1. **Specific AI Service**：服務目的、對象與如何使用；
2. **User Profiles**：至少三種需求不同的使用者及具體個人化；
3. **Motivation**：問題來源；
4. **Chat History**：最終版 AI 的**至少 10 則真實交換訊息**及可開啟連結；團隊為避免解讀歧異，預計準備 **10 輪完整問答**；
5. **Chatbot Link**：評審可親自打開並與 AI 對話；
6. **Iterative AI Design**：構想、Prompt 改版、測試、失敗、改善；
7. **Limitations**：已知錯誤、風險與倫理；
8. **Future Development／Conclusion**：後續方向與真實結論；
9. **References**：可追溯的可信來源與正式引用。

正式報告**只能引用當時真正完成的功能與評估**。不把本計畫中的示意答案或候選評分當成成品。

## 評審如何證明「不是普通 ChatGPT」

- 同一張 `Q-01` 圖，切三種 Profile，展示回覆差異由明確的學習偏好驅動。
- 同一問題在 Baseline 與 AccessSTEM V1／V2／V3 下測試，清楚保存相同設定、原始輸出及評分方法。
- 展示一個**真實**錯誤與修正；若改善不顯著就誠實說明。
- 展示缺少刻度、單位或矛盾題目時不亂猜。
- 展示不用滑鼠的完整學習流程，並說明 VoiceOver／真人使用者測試分別做了什麼、沒做什麼。

## 素材與可信性

- 使用合法、自製或允許引用的圖表，記錄標準答案、公式、審核者與引用來源。
- 真正的對話紀錄不能用設計過的示意故事代替。
- 原始測試結果保留失敗與不利結果；示意數字不許放入 PDF 當作實測。
- 指導者與 AI Coding 工具的協助必須如實區分與學生貢獻。

## 當前交件狀態

| 項目 | 狀態 |
|---|---|
| 學生企劃與 WAICY 研究指南 | 已收到並讀取 |
| 專案規格與 Web MVP | 本機可執行，內建教材待教師核對 |
| 可操作 AI 助理 | 中英切換及真實 OpenAI 本機對話已驗證 |
| 真實 Baseline／V1–V3 與錯誤修正 | 最終 Terra 低推理已跑 10 個案例 × 4 版，提示、缺單位和平均速率重測見 [迭代紀錄](waicy-iteration-log.md) |
| 聊天紀錄公開連結與外部存取測試 | **未完成** |
| 英文報告 PDF／Google Drive／官方表單提交 | **未完成** |

更完整的交件流程：[demo-and-submission.md](demo-and-submission.md)；測試：[evaluation-plan.md](evaluation-plan.md)。

## 官方及教學來源

- WAICY 2026：https://www.waicy.org/waicy-2026/
- WAICY 2026 Rubrics：https://www.waicy.org/rubrics/
- WAICY 2026 Project Submission：https://www.waicy.org/2026-submission/
- WAICY 2026 Guidebook：https://waicy-cdn.wholeren.cn/wp-content/uploads/2026/09/WAICY-2026-Guidebook.pdf
- W3C WAI Complex Images：https://www.w3.org/WAI/tutorials/images/complex/

正式引用到英文 PDF 時，記錄完整機構、標題、取用日期與網址；若官方更新，先更新本文件再修改報告。
