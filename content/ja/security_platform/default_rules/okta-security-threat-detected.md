---
aliases:
  - /ja/b73-5bc-c0b
  - /ja/security_monitoring/default_rules/b73-5bc-c0b
  - /ja/security_monitoring/default_rules/okta-security-threat-detected
disable_edit: true
integration_id: okta
kind: documentation
rule_category:
  - ログの検出
source: okta
title: Okta と通信する悪意のある IP
type: security_rules
---
### 目標
Okta の ThreatInsight によって悪意があると識別された IP アドレスが Okta アカウントと通信するタイミングを検出します。

### 戦略
このルールを使用すると、次の Okta イベントを監視して、悪意のある IP アドレスが Okta アカウントと通信するタイミングを検出できます。

* `security.threat.detected`

### トリアージと対応
1. `@usr.email` が `Unknown` であるか、認証されたユーザーであるかを判別します。
2. ユーザーが認証されている場合は、調査を行って、Okta と通信している IP アドレスがユーザーの IP アドレスであるかどうか、またはアカウントが侵害されているかどうかを判断します。
3. ThreatInsight を `log mode` から `log and block mode` に切り替えて、ThreatInsight 脅威インテリジェンスリストの IP アドレスからの今後のリクエストをブロックすることを検討します。