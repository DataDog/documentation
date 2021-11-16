---
aliases:
  - /ja/8fc-9c9-c02
  - /ja/security_monitoring/default_rules/8fc-9c9-c02
  - /ja/security_monitoring/default_rules/gcp-unauthorized-sa-activity
disable_edit: true
integration_id: gcp
kind: documentation
rule_category:
  - ログの検出
security: コンプライアンス
source: gcp
title: GCP 不正なサービスアカウントアクティビティ
type: security_rules
---
### 目標
GCP のサービスアカウントにより不正なアクティビティがあるとそれを検出します

### 戦略
GCP ログを監視してサービスアカウントが API リクエストを作成し、そのリクエストがログ属性 `@data.protoPayload.status.code` 内で `7` に等しいステータスコードを返すタイミングを検知します。ステータスコード `7` はサービスアカウントが API コールを行う権限を有していないことを示します。

### トリアージと対応
1. 不正な呼び出しを行ったサービスアカウントを特定します。
2. IAM アクセス許可の構成に誤りがあるか、または攻撃者がサービスアカウントを侵害したかを調査します。