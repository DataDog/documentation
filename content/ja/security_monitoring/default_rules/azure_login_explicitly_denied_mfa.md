---
aliases:
  - /ja/w6m-rmy-hra
disable_edit: true
kind: documentation
rule_category:
  - ログの検出
security: attack
source: azure
tactic: TA0006-credential-access
technique: T1110-brute-force
title: Azure ログインが MFA を明示的に拒否
type: security_rules
---
## 目標

複数のユーザーアカウントが MFA プロセスの完了に失敗したときに、ネットワーク IP アドレスを検出し特定します。

## 戦略

Azure Active Directory Sign-in ログを監視し、`@evt.category` が `SignInLogs` と等しく、`@properties.authenticationRequirement`  が `multiFactorAuthentication` と等しくて、`@evt.outcome` が `failure` と等しいことを検出します。

## トリアージと対応

1. ログを調べ、これが有効なログイン試行かを確認します。
2. ユーザーに対するセキュリティ侵害が認められる場合、ユーザーの認証情報をローテーションします。