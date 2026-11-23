# API 與資料契約｜ChartFacts / Profile / Chat

> 以下描述現行 MVP 契約。POST 路由以 TypeScript + Zod 驗證，契約變動需同步 `architecture.md`、`agent-design.md`、測試與 `web/README.md`。

## 1. 可信圖表事實（ChartFacts）

每一份內建圖表需有可回查來源與人工審核紀錄；圖表圖像只是輔助，必須有長描述、表格或公式等真正等值的文字資料。

```json
{
  "id": "quadratic-vertex-demo-01",
  "version": "1.0",
  "title": "二次函數與頂點",
  "topic": "quadratic",
  "source": {
    "kind": "unknown",
    "title": "教學用途自製函數圖（尚待人工核對）",
    "url": null,
    "reviewer": "待老師確認",
    "reviewedAt": null
  },
  "facts": {
    "formula": "y = (x - 2)^2 + 1",
    "xAxis": {"label": "x", "unit": null},
    "yAxis": {"label": "y", "unit": null},
    "keyPoints": [{"name": "頂點", "x": 2, "y": 1}],
    "trends": ["拋物線開口向上；在 x=2 時達到最小 y 值 1"]
  },
  "unknowns": ["題目未提供的實體單位"],
  "shortDescription": "開口向上的二次函數，頂點在 (2,1)。",
  "longDescription": "橫軸是 x，縱軸是 y。曲線從左向右先下降，到 (2,1) 後上升，頂點為最低點。"
}
```

**上方僅是資料格式示例，不是已完成教師核對。** 只有實際核對後 `reviewedAt`、`reviewer` 有合法來源時，系統才可標成 `curated_verified`。實作端不可直接相信瀏覽器傳來的 `source.kind`、`reviewedAt` 或 `verified` 宣稱。

## 2. 信任來源與權限

| 值 | 何時可使用 | AI 能如何表達 |
|---|---|---|
| `curated_verified` | server 自有內建、已完成人工核對 | 「根據已核對的範例」 |
| `teacher_reviewed` | 有可追溯授權與審核工作流（P0 暫不做） | 「根據老師確認的資料」 |
| `user_provided` | 使用者貼文、手動輸入、OCR 草稿 | 「依你提供的內容」，未知處需補問 |
| `unknown` | 無法讀取、來源不清或彼此矛盾 | 「目前無法確認」，不得亂猜 |

前端唯一可送的是 `chartId` 或 `userDescription`；可信來源**由 server 解決**，不能由 request 中 `verified:true` 決定。

## 3. 學習偏好（不等於醫療或障礙診斷）

```typescript
type LearnerProfile = {
  profile: "learner-full" | "learner-brief" | "educator";
  readingDepth: "brief" | "step-by-step" | "deep";
  pedagogyMode: "hint" | "guided" | "full";
  mathLevel: "beginner" | "familiar";
};
```

Profile 只代表使用者選擇的**輸出風格**。系統不需保存全名、學校、診斷證明或出生日期。

## 4. 唯一必要 API：POST /api/chat

### Request（示意）

```json
{
  "sessionId": "c60db851-7d90-45d1-89e0-57743031dbb5",
  "chartId": "quadratic-vertex-demo-01",
  "userDescription": null,
  "message": "頂點為什麼是最低點？先給我一個提示",
  "language": "zh-Hant",
  "history": [
    {"role": "user", "content": "這張圖的大意是什麼？"},
    {"role": "assistant", "content": "根據已知公式，這是一條開口向上的拋物線。"}
  ],
  "preferences": {
    "profile": "learner-full",
    "readingDepth": "step-by-step",
    "pedagogyMode": "hint",
    "mathLevel": "beginner"
  }
}
```

Server 會檢查 `chartId` 合法、`history` 僅允許 user/assistant、每筆長度與總量受限、`message` 不可為空、`userDescription` 不可冒充可信資源；`sessionId` 為 UUID，僅表示當前對話。請求 body 上限 96,000 bytes；問題 2,000 字元、題目描述 6,000 字元、歷史 12 則且每則 4,000 字元。問題、題目描述與歷史合計至多 20,000 字元。錯誤回傳 requestId、status、code 和 message。可選的 language 為 zh-Hant 或 en。答案的 nextQuestion 與 sourceRef 可為 null。

### Response（示意）

```json
{
  "requestId": "opaque-request-id",
  "status": "ok",
  "answer": {
    "summary": "先想一想：平方數可能小於零嗎？",
    "sections": [{"heading": "提示", "text": "(x-2)^2 的最小值是 0。"}],
    "claims": [
      {"kind": "given", "text": "函數是 y=(x-2)^2+1。", "sourceRef": "formula"},
      {"kind": "derived", "text": "平方部分不會小於 0。", "sourceRef": "formula"}
    ],
    "nextQuestion": "當 x=2 時，y 會是多少？",
    "needsHumanVerification": false
  }
}
```

**回覆只是欄位示例，並非真實 AI 實測輸出。** 若求得的事實涉及未核對資料，`needsHumanVerification` 不得擅自為 false。模型輸出用 schema 驗證。來源 ID 依題目類型確認，未辨識到的參照回傳 null。可用 ID 包含 formula、x-axis、y-axis、key-points、trends、missing-data、user-description、question。來源標籤不等於數學正確性已驗證。

## 5. HTTP 錯誤與 UI 表現

| HTTP | 類型 | 顯示給使用者的話 | 操作 |
|---|---|---|---|
| 400 | 無效資料、超長訊息、缺題目 | 「這份題目資料不完整，請選範例或補上描述。」 | 保留輸入、不發送無意義請求 |
| 413 | 圖片或文字超額（如果支援圖片） | 「資料太大，請縮小後重試。」 | 不保存失敗的資料 |
| 403 | 網頁請求來源不符 | 「請在 AccessSTEM AI 頁面送出問題。」 | 返回學習室 |
| 429 | 頻率／額度限制 | 「目前請求較多，請稍後重試。」 | 明確限制，不能偽裝成功 |
| 502/503 | LLM provider 失敗 | 「AI 回應暫時無法取得。可以先閱讀已知圖表資料。」 | 保留題目與歷史，可重試 |
| 504 | 逾時 | 「這次回答逾時，沒有取得可靠結果。」 | 可重試且避免重複計費 |
| 500 | 服務端其他錯誤 | 「服務發生問題，請稍後重試。」 | 不洩露 key、stack trace、個資 |

不把 `error.message` 中的 Provider 內部資訊回傳給使用者。所有錯誤碼都需有可被螢幕閱讀器理解的文字，不以顏色作唯一提示。

## 6. 評測資料格式（只存去識別的測試證據）

```json
{
  "caseId": "AS-001",
  "variant": "V2",
  "model": "待記錄",
  "promptVersion": "待記錄",
  "chartId": "quadratic-vertex-demo-01",
  "profile": "learner-full",
  "input": "請從座標軸開始描述",
  "rawResponse": "實測完成後填入，不得預填理想答案",
  "scores": {"grounding": null, "personalization": null, "pedagogy": null, "uncertainty": null, "accessibility": null},
  "reviewer": "待記錄",
  "reviewedAt": null,
  "notes": "待實測"
}
```

不得把真實姓名、未同意公開的對話或照片放進 version control；公開的最終聊天紀錄需另外去識別化與確認授權。

## 7. 版本變更原則

資料契約需版本化；修改 UI、資料模型、API、Prompt 或測試標準時，對照驗收案例，保持 schema、docs、測試一致。若拆分後端、加入 DB 或圖片儲存，須先作新的架構／隱私決策，不在本 scaffold 直接實作。
