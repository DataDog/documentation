---
aliases:
  - /ja/c6a-b25-2e9
  - /ja/security_monitoring/default_rules/c6a-b25-2e9
  - /ja/security_monitoring/default_rules/twistlock-container-compliance-finding
disable_edit: true
integration_id: twistlock
kind: documentation
rule_category:
  - ログの検出
source: twistlock
title: コンプライアンス基準違反のコンテナ
type: security_rules
---
### 目標
コンテナがコンプライアンス基準内で実行されていないことを検出します。

### 戦略
この規則により、Twistlock ログをモニターして、実行中のコンテナで `Critical` な重大度のコンプライアンス問題が発見されたことを検出できます。

### トリアージと対応
1. コンプライアンス結果の影響を判断します。
2. コンプライアンス結果を修正します。