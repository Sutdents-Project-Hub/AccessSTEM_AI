# AccessSTEM AI 系統架構

使用一個 `web/` Next.js App Router 元件。瀏覽器負責教材與學習流程，Route Handler 負責驗證、資料來源判斷和 OpenAI 呼叫。資料庫、登入、圖片上傳與語音保留為後續階段。

## 主要檔案

| 路徑 | 責任 |
|---|---|
| `web/src/app/page.tsx` | 學習室入口 |
| `web/src/components/` | 教材、Canvas 圖表與等值文字、學習偏好、問答 |
| `web/src/lib/charts.ts` | 內建候選教材及查詢 |
| `web/src/lib/chat-contract.ts` | Zod 輸入、輸出契約與長度限制 |
| `web/src/app/api/chat/route.ts` | 來源與內容驗證、請求限制、安全錯誤 |
| `web/src/server/agent/` | OpenAI SDK、教學指令與結構化回覆 |

## 資料流

1. 使用者選圖或確認自訂文字，偏好保留於當頁。
2. 瀏覽器送出教材 ID 或自訂描述、偏好、最近問答及當輪問題。切換教材重新開始對話。
3. 伺服器驗證資料，從自身目錄查圖表，標明尚待核對的來源。
4. OpenAI Responses API 使用固定教學指令，將教材與對話當成使用者資料，回傳 Structured Outputs。
5. 伺服器驗證答案形狀、保留待核對狀態，瀏覽器按摘要、細節、證據、理解題呈現。如果呼叫失敗，使用者可重試，教材仍可閱讀。

## 執行責任

首頁由伺服器解析 `?lang=en` 決定初始語言，預設繁中。頁面載入後可直接使用靜態教材。`/api/chat` 需要 Node.js 與有效的 OpenAI 伺服器端憑證。程序內的請求限制以單實例為作用範圍，公開部署前依 Hosting 補足跨實例費用控制。詳見 [資料契約](api-and-data-contracts.md)、[外部整合](integrations.md) 與 [安全與隱私](security-and-privacy.md)。
