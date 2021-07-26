---
aliases:
  - /ja/b58-97e-9f1
disable_edit: true
kind: ドキュメント
rule_category:
  - ログの検出
scope: gcp.project
security: コンプライアンス
source: gcp
title: GCP IAM ポリシーの変更
type: security_rules
---
### 目標
IAM ポリシーの変更を検出します。

### 戦略
この規則により、GCP 管理アクティビティ監査ログをモニターし、`SetIamPolicy` メソッドがいつ呼び出されたかを判断できます。

### トリアージと対応
1. ログをチェックしポリシーの差分 (`@data.protoPayload.serviceData.policyDelta.bindingDeltas`) を調べ、どのアクションも `REMOVE` ではないことを確認します。