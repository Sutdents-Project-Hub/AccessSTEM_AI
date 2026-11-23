# AccessSTEM AI Web

學習室使用 Next.js App Router、React、TypeScript 與 Zod。使用 Node.js 24 LTS 和 pnpm 10.33.0。

## 本機開發

從 repo 根目錄執行：

```sh
cd web
pnpm install --frozen-lockfile
pnpm dev
```

預設網址為 `http://localhost:3000`。三張自製圖表均標示待教師核對，另可貼上文字題目。學習方式、解說深度、解題方式與數學程度可在同一份教材中切換。頁首的 English 可切換教材、介面與後續模型回覆。以 `/?lang=en` 開啟會在首次伺服器渲染提供英文教材和介面。

## OpenAI API

把 `.env.example` 複製成 `.env.local`，在本機填入 `OPENAI_API_KEY` 並重啟服務。`OPENAI_MODEL` 預設為 `gpt-6.1-terra`，以 `low` 推理模式運作。改用 `gpt-6-luna` 也固定使用 `low`。其他覆寫模型須支援 Responses API Structured Outputs，並使用各自的預設推理設定。金鑰只供伺服器使用。

`POST /api/chat` 會驗證教材、問題和近期對話，再呼叫 OpenAI。沒有金鑰時回傳 503，教材與問題仍可留在畫面上。對話只保留於目前瀏覽器頁面，切換教材或重新整理會清除。

## 品質檢查

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

已驗證本機真實 OpenAI 回覆。重跑合成案例可用 `pnpm eval:waicy`，此指令會使用 API 額度。教師核對、VoiceOver 和公開環境驗收見 [評估計畫](../docs/evaluation-plan.md) 與 [部署規劃](../docs/deployment.md)。
