# 外部研究紀錄與引用核對

> 查核日期：2026-11-23。以下標明每個數字「從哪裡來」與「核對到什麼程度」。簡報只使用已核對的內容。

## 簡報使用的外部事實

| 簡報頁 | 數字或主張 | 來源 | 核對程度 |
|---|---|---|---|
| 3 | 至少 22 億人有視力損傷或失明 | WHO（2019）*World report on vision* 新聞稿 | 搜尋摘要確認；基準為 2015 年估計 |
| 3 | 2020 年 4,330 萬人失明；2050 年預測 6,100 萬 | Bourne 等人／GBD 2019（*Lancet Glob Health* 2021） | 搜尋摘要確認；**書目細節（作者列）交件前再核對** |
| 3 | 547,000 名美國 18 歲以下兒童有嚴重視覺困難（Census 2020） | Doore et al.（2023）*Frontiers in Education* 引用 US Census | **已讀原文導言**，簡報照其說法標示「as cited in」 |
| 3 | 94.8% 首頁有可偵測 WCAG 2 失敗 | WebAIM Million 2025 | 搜尋摘要；次級來源有 53–55% 等 alt 文字差異，簡報只用 94.8% |
| 3, 4 | 「literalized modes（braille、verbal description）」「do not directly convey spatial information」 | Doore et al.（2023）摘要 | **已讀原文摘要** |
| 4 | 觸控螢幕圖形在資訊定向上優於印刷，N = 20 | Tennison et al.（*JVIB* 117(6)，DOI 10.1177/0145482X231217496） | 已讀摘要；年份依 DOI／卷期為 2023（PAR 頁顯示 2025-01-08） |
| 4, 12, 27 | GPT Base 練習成績 +48%、GPT Tutor +127%；移除後 GPT Base 考試 −17%；近 1,000 名高中生 | Bastani et al.（2025）*PNAS* 122(26) e2422633122 | 讀到 RePEc 摘要鏡像（PNAS 與 SSRN 回 403）；**樣本國家與確切人數未核對，簡報未寫** |
| 4, 27 | 「verification disability」「compelled reliance」 | Elavsky & Xiong Bearfield（2025）arXiv:2508.12192 | 已讀摘要與全文；為立場論文，不是量化研究，簡報只引概念 |
| 29 | VizAbility：LLM 圖表問答、盲與低視力使用者 | Gorniak et al.（UIST ’24） | 已讀摘要；**不同來源對樣本數與比例描述不一致**，簡報只當相關研究，不引數字 |
| 4 | 複雜圖建議短描述＋長描述 | W3C WAI Complex Images tutorial | 沿用專案文件的來源，本次未重新開啟 |

## 刻意**沒有**使用的內容

- 547,000 不是 Tennison 的數字（曾被搜尋摘要混淆），已改為 Doore et al.。
- 搜尋摘要提到 Be My AI 幻覺研究，未找到直接證據，沒有引用。
- Bastani 的樣本地點在摘要中未出現，沒有寫「土耳其」。

## 官方規則核對

- Rubrics（頁面日期 2026-09-14）、提交表單（2026-09-25）、活動首頁（2026-10-28）已逐頁讀取；Guidebook 兩份 PDF 的 LLM 賽道頁（提交項目、命名規則）已解析。
- 決賽格式：Guidebook 提到 3 分鐘簡報、3 分鐘 Demo、4 分鐘 Q&A（本次不製作）。
- 差異紀錄見 `submission-todo.md` 的 D 節。

## 專案內部證據對照

| 簡報內容 | 專案檔案 |
|---|---|
| 40 筆最終回覆、Prompt、參數、時間 | `evidence/raw/waicy-2026-11-23T05-56-58.032Z-MpBQBk/`（Git 忽略） |
| 36 筆首輪試點、V3 兩次改寫、模型比較 | `evidence/raw/waicy-2026-11-23T05-37-25…` 至 `05-52-16…` |
| 逐格評分與理由、限制 | `evidence/raw/waicy-closeout-pilot-grades.json` |
| 六輪英文對話 | `evidence/raw/waicy-final-english-browser.md` |
| Prompt 原文 | `web/src/server/agent/prompts.ts` |
| 評測腳本與案例 | `web/scripts/evaluate-waicy.mts`、`web/scripts/evaluation-cases.ts` |
| 截圖與圖說 | `docs/assets/waicy-screenshots/` |

簡報時間線使用的是原始檔案的 UTC 時間戳記換算為台北時間（UTC+8）。
