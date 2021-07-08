---
aliases:
  - /ja/4ec-343-f90
  - /ja/security_monitoring/default_rules/4ec-343-f90
  - /ja/security_monitoring/default_rules/signalsciences-ip-flagged
disable_edit: true
integration_id: signal_sciences
kind: documentation
rule_category:
  - ログの検出
scope: signal_sciences
source: signal_sciences
title: Signal Sciences が IP にフラグを立てます
type: security_rules
---
### 目標
Signal Sciences により IP にフラグが立てられたことを検出します。

### 戦略
この規則により、Signal Sciences [インテグレーション][1] を介して送信された Signal Sciences イベントをモニターし、IP にフラグが立てられたことを検出できます。

### トリアージと対応
1. 攻撃が誤検知かを判断します。
2. 攻撃が成功したかを判断します。
3. 攻撃がアプリケーションの脆弱性を悪用する場合、脆弱性のトリアージを行います。

[1]: https://app.datadoghq.com/account/settings#integrations/sigsci