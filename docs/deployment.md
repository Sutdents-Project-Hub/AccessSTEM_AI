# 公開 Demo 部署規劃（未部署）

> 目前狀態：`planned`。**未選 Hosting、未取得網域、未部署、未驗證公開 URL、未設定 OpenAI 金鑰。** 本文件不含虛構的 port、healthcheck 或實際指令。

## Demo 的必要條件

1. 外部評審可用不認識的裝置與無痕視窗直接開啟、使用真正 LLM 問答（若有存取限制需先與主辦確認）。
2. 服務端安全保管 AI Provider 金鑰，前端沒有直接暴露 Key 或私有 API。
3. 支援至少兩個經核對圖表、三種教學偏好、連續追問與明確錯誤。
4. 另有一個**唯讀、匿名化、真正最終版**的聊天紀錄公開連結。
5. 文字內容可被螢幕閱讀器操作；不能用只有影片的頁面冒充可用 Chatbot。
6. 有流量限制、API 額度、服務失效時明確的使用者提示。
7. 從 Git commit 至部署版、Prompt 版本、模型 ID 可查到對應，不同環境不得偷偷使用不同 Prompt。

## 平台候選（**僅選項，不是既定部署**）

- **Next.js 相容的平台**：選擇能執行 Server Route Handler 和管理 Secret 的服務，例如 Vercel 或其他相容 Node.js hosting；需實測 AI API 連線、區域、費用與 timeout。
- **Coolify（若日後明確選用）**：只有 `web/` 一個有部署生命週期的元件，獨立 Dockerfile Application，base directory `web/`。需要實際核對 Node、啟動指令、port、healthcheck、域名、環境 Secret、log 與回滾，不能套用別的專案 Dockerfile。
- 目前不建立 PostgreSQL／S3／Redis，沒有資料要做持久化 migration。

## 本機 Compose 與 production 分界

此專案**目前沒有** Compose。若未來因需要本機整合而建立根目錄 `compose.yaml`，頂層 `name: accessstem_ai`，service key 用 `web` 等責任角色，不加不必要的 `container_name`。根 Compose 僅供**本機整合**，不直接拿來當 Coolify Production 入口。任何 production Compose 例外要有明確批准、服務／Secrets／Volumes／備份與 rollback 方案。

## 上線前先記錄的事實（實作時再填）

```text
Platform：
Owner：
Repository / commit：
Base directory：web/
Build/runtime commands（實際測過）：
Node / pnpm / Next 版本：
Entry and port / protocol：
Healthcheck（實測成功與失敗）：
Public URL：
Server environment variable names：
Provider／model ID／prompt version：
API budget／rate-limit／logging policy：
Preview vs live boundary：
Deployment date：
Rollback procedure（已測試才寫 verified）：
```

## 驗收與復原

- 使用無痕視窗／非開發者機器測 Chatbot、對話紀錄、PDF、Drive 連結。
- 模擬 Provider 429、斷網、單題太長、API token 超支，檢查是否顯示真實失敗而不是空白成功。
- 觀察 Web logs 不應包含金鑰或可識別學生對話。
- 若失敗，恢復前一個**已確認可用**的版本；沒有做過 rollback 就不能標示演練通過。
- 交件後確保 Demo 於評審時段仍可用；具體保存期限、成本責任與關閉時間需與團隊確認。

## 不屬本次初始化授權的動作

建立 Vercel/Coolify 專案、DNS、Bucket、資料庫、API Key、變更雲端帳單、GitHub repository、Git push、release 或 Production 部署；待使用者明確要求後才執行。
