---
aliases:
  - /ja/c19-1d0-3b1
disable_edit: true
kind: ドキュメント
rule_category:
  - ログの検出
scope: gcp.service.account
security: コンプライアンス
source: gcp
title: GCP サービスアカウントの作成
type: security_rules
---
### 目標
新しいサービスアカウントが 作成されたことを検出します。

### 戦略
この規則により、GCP 管理アクティビティ監査ログをモニターし、サービスアカウントが作成されたことを判断できます。

### トリアージと対応
1. サービスアカウントを作成したユーザーに連絡し、アカウントの必要性とロールの範囲が適切であることを確認します。