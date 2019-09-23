---
title: 特定の Embed の取得
type: apicontent
order: 11.3
external_redirect: /api/#get-specific-embed
---

## 特定の Embed の取得
embed_id を指定して、以前に作成した Embed の HTML フラグメントを取得します。

戻り値: 以下の 8 つの要素を持つ JSON オブジェクト。

* embed_id: Embed のトークン
* graph_title: グラフのタイトル
* dash_name: グラフが表示されるダッシュボードの名前 (ない場合は、null)
* dash_url: グラフが表示されるダッシュボードの URL (ない場合は、null)
* shared_by: Embed を共有するユーザーの ID
* html: Embed の HTML フラグメント (iframe)
* revoked: Embed が無効かどうかを示すブール値フラグ

失敗すると、戻り値はエラーメッセージ {errors: [messages]} を含む JSON になります。

##### 引数

このエンドポイントは、JSON 引数を受け取りません。
