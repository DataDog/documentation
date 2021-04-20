---
aliases:
  - /ja/rzw-eru-lnp
disable_edit: true
kind: documentation
rule_category:
  - ログの検出
security: コンプライアンス
source: azure
title: 作成、変更、または削除された Azure ネットワークセキュリティグループまたはルール
type: security_rules
---
## 目標

Azure ネットワークセキュリティグループまたは Azure ネットワークセキュリティルールが作成、変更、または削除されたことを検出します。

## 戦略

Azure アクティビティログを監視し、`@evt.name` が次の名前のいずれかに等しい場合を検出します。
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/WRITE`
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/DELETE`
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/WRITE` 
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/DELETE`

および `@evt.outcome` が `Success` に等しい場合。

## トリアージと対応

1. セキュリティグループまたはセキュリティルールを調べて、公開してはならない Azure リソースが公開されているかどうかを確認します。