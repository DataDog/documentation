---
aliases:
  - /ja/7d8-c83-6fd
disable_edit: true
kind: ドキュメント
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