---
aliases:
  - /ja/pgl-8ie-264
  - /ja/security_monitoring/default_rules/pgl-8ie-264
  - /ja/security_monitoring/default_rules/gcp-anomalous-api-requests
disable_edit: true
integration_id: gcp
kind: documentation
rule_category:
  - ログの検出
security: attack
source: gcp
tactic: TA0007-discovery
technique: T1850-cloud-infrastructure-discovery
title: GCP サービスアカウントが異常な数の GCP API にアクセスしている
type: security_rules
---
### 目標
GCP サービスアカウントが侵害されたことを検出します。

### 戦略
GCP 管理者のアクティビティログ (`@data.logName:*%2Factivity`) を検査し、GCP サービスアカウント (`@usr.id:*.iam.gserviceaccount.com`) のみをフィルタリングします。その後、各サービスアカウント (`@usr.id`) に対して行われている GCP API コール (`@evt.name`) のユニーク数を数えます。異常検知では、各サービスアカウントをベースラインとして、サービスアカウントがベースラインから逸脱した場合にセキュリティ信号を生成します。

GCP 監査ログについての詳細は、[こちら][1]のブログ記事をご覧ください。

### トリアージと対応
ログを調査し、GCP サービスアカウントが侵害されているかどうかを判断します。

[1]: https://www.datadoghq.com/blog/monitoring-gcp-audit-logs/