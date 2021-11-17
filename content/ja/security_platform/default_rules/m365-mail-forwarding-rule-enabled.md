---
aliases:
  - /ja/lw7-2vm-4tl
  - /ja/security_monitoring/default_rules/lw7-2vm-4tl
  - /ja/security_monitoring/default_rules/m365-mail-forwarding-rule-enabled
disable_edit: true
integration_id: microsoft-365
kind: documentation
rule_category:
  - ログの検出
scope: microsoft-365
security: attack
source: microsoft-365
tactic: TA0003-persistence
title: メールの転送ルールのオンライン交換が有効
type: security_rules
---
### 目標
ユーザーがメール転送ルールを別のメールアドレスに設定したことを検知します。攻撃者または内部関係者による脅威により、すべてのメールを外部のメールアドレスに転送するメール転送ルールを設定される恐れがあります。

### 戦略
Monitor Microsoft 365 監査ログを監視し、`Set-Mailbox` の `@evt.name` 値が `@Parameters.ForwardingSmtpAddress`、`@evt.outcome` が `True` い設定されたイベントを検出します。

### トリアージと対応
1. `{{@evt.id}}` の `@Parameters.ForwardingSmtpAddress` を調査し、会社所有以外の外部ドメインにメールが送信されていないか確認します。
2. メール転送ルールに正当なユースケースがあるかどうかを確認します。
3. `{{@evt.id}}` がメール転送ルールに気づいていない場合は、すべての `{{@evt.id}}` アカウントで異常なアクティビティがないか調査します。