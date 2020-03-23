---
title: レート制限
type: apicode
order: 4
external_redirect: /api/#rate-limiting
---
**レート制限ヘッダー**:

* `X-RateLimit-Limit` 期間内に許可されるリクエスト数
* `X-RateLimit-Period` リセット期間 (秒)。カレンダーと連携
* `X-RateLimit-Remaining` 現在の期間内で許可される残りのリクエスト数
* `X-RateLimit-Reset` 次のリセットまでの時間 (秒)
