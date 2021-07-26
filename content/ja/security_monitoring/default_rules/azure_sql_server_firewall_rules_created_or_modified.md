---
aliases:
  - /ja/aoc-jdx-q3d
disable_edit: true
kind: documentation
rule_category:
  - ログの検出
security: コンプライアンス
source: azure
title: 作成または変更された Azure SQL Server ファイアーウォールルール
type: security_rules
---
## 目標

Azure ネットワークセキュリティルールが作成、変更、または削除されたことを検出します。

## 戦略

Azure アクティビティログを監視し、`@evt.name` が次の名前のいずれかに等しい場合を検出します。
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/WRITE` 
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/DELETE`

および `@evt.outcome` が `Success` に等しい場合。

## トリアージと対応

1. セキュリティルールを調べて、公開してはならない Azure リソースが公開されているかどうかを確認します。