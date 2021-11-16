---
aliases:
  - /ja/8c6-2a6-515
  - /ja/security_monitoring/default_rules/8c6-2a6-515
  - /ja/security_monitoring/default_rules/okta-mfa-bypass
disable_edit: true
integration_id: okta
kind: documentation
rule_category:
  - ログの検出
source: okta
title: Okta MFA バイパスの試行
type: security_rules
---
### 目標
ユーザーが多要素認証 (MFA) のバイパスを試行したことを検出します。

### 戦略
このルールにより、以下の Okta イベントを監視して、ユーザーが MFA のバイパスを試行したことを検出できます。

* `user.mfa.attempt_bypass`

### トリアージと対応
1. MFA をバイパスしようとしたユーザーに連絡し、このリクエストが正当であることを確認します。