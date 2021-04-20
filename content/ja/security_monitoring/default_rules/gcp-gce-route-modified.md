---
aliases:
  - /ja/3b3-32c-73c
disable_edit: true
kind: ドキュメント
rule_category:
  - ログの検出
scope: gcp.gce.route
security: コンプライアンス
source: gcp
title: GCP GCE ネットワークルートの作成または変更
type: security_rules
---
### 目標
ファイアーウォール規則の作成または変更を検出します。

### 戦略
この規則により、GCP GCE アクティビティ監査ログをモニターし、以下のメソッドがいつ呼び出されたかを表示することで、ファイアーウォールが調整されたかを判断できます。

* `beta.compute.routes.insert`
* `beta.compute.routes.patch`

### トリアージと対応
1. GCP ルートが適切に構成されていることと、ユーザーがファイアーウォールを変更するつもりであることを確認します。