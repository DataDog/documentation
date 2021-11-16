---
aliases:
  - /ja/7d8-c83-6fd
  - /ja/security_monitoring/default_rules/7d8-c83-6fd
  - /ja/security_monitoring/default_rules/gcp-gce-network-modified
disable_edit: true
integration_id: gcp.gce.route
kind: documentation
rule_category:
  - ログの検出
scope: gcp.gce.route
security: コンプライアンス
source: gcp
title: GCP GCE VPC ネットワークの変更
type: security_rules
---
### 目標
VPC ネットワークが作成されたことを検出します。

### 戦略
この規則により、GCP GCE アクティビティ監査ログをモニターし、新しい VPC ネットワークを作成するために以下のメソッドがいつ呼び出されるかを判断できます。

* `beta.compute.networks.insert`

### トリアージと対応
1. VPC ネットワークを確認します。