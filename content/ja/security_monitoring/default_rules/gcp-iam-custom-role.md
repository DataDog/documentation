---
aliases:
  - /ja/d24-0f0-62d
disable_edit: true
kind: ドキュメント
rule_category:
  - ログの検出
scope: gcp.iam.role
security: コンプライアンス
source: gcp
title: GCP IAM カスタムロールの作成または変更
type: security_rules
---
### 目標
カスタムロールが作成または変更されたことを検出します。

### 戦略
GCP IAM アクティビティ監査ログをモニターし、以下のメソッドがいつ呼び出されたかを判断します。

* `google.iam.admin.v1.CreateRole`
* `google.iam.admin.v1.UpdateRole` 

### トリアージと対応
1. ログとロールをチェックし、アクセス許可の範囲が正しいことを確認します。
2. ロールに関連付けられたユーザーをチェックし、ロールにアタッチしたアクセス許可を持っていることを確認します。