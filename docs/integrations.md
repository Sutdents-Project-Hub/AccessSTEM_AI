# OpenAI 外部整合

AccessSTEM AI 使用 OpenAI JavaScript SDK 的 Responses API。預設模型為 `gpt-6.1-terra`，固定指定 `reasoning.effort: low`。`OPENAI_MODEL=gpt-6-luna` 同樣固定使用 `low`。其他覆寫模型採各自的預設推理設定。模型須支援 Structured Outputs，本機金鑰已完成真實對話測試，公開部署的配額與費用待驗。

## 呼叫流程

- `web/src/server/agent/openai.ts` 將教學指令和圖表、偏好、近期對話分開，呼叫 Responses API。
- 請求設定 `store: false`、25 秒逾時、2,200 個輸出 token、零自動重試。瀏覽器取消等待會透過請求訊號嘗試停止上游操作。
- 使用 Structured Outputs 與 Zod 驗證回覆。伺服器核對來源參照 ID 是否屬於本題教材，候選或使用者提供的素材維持待核對狀態。
- `/api/chat` 每程序每分鐘最多 24 次且同時最多 4 次上游呼叫。無金鑰、限流、超時與格式錯誤均顯示可讀狀態。

## 環境設定

| 變數 | 用途 |
|---|---|
| `OPENAI_API_KEY` | 伺服器端憑證，本機放 `web/.env.local`，上線使用平台的 secret store |
| `OPENAI_MODEL` | Responses API 模型 ID，預設 `gpt-6.1-terra` |

真實回覆與模型比較見 [評估計畫](evaluation-plan.md)。公開前須依部署實例數、OpenAI 資料政策與預算驗收。參考 [OpenAI Responses](https://developers.openai.com/api/reference/resources/responses/methods/create) 和 [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs)、[安全與隱私](security-and-privacy.md)。
