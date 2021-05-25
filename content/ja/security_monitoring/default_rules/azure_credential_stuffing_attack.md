---
aliases:
  - /ja/ljt-3f4-8ty
disable_edit: true
kind: documentation
rule_category:
  - ログの検出
security: attack
source: azure
tactic: TA0006-credential-access
technique: T1110-brute-force
title: Azure へのクレデンシャルスタッフィング攻撃
type: security_rules
---
## 目標

複数のユーザーアカウントにログイン試行アクティビティが記録されたときに、ネットワーク IP アドレスを検出し特定します。

## 戦略

Azure Active Directory を監視し、`@evt.category` が `SignInLogs` と等しく、1 つ以上の `@evt.outcome` が `false` と等しくて、かつ同じネットワーク IP アドレスにより開始されたことを検出します。

同じネットワーク IP アドレスにより開始された複数のログインが失敗した後、`@evt.outcome` に `success` の値があった場合、セキュリティシグナルが **HIGH** を返します。

## トリアージと対応

1. ログを調べ、これが有効なログイン試行かを確認します。
2. ユーザーに対するセキュリティ侵害が認められる場合、ユーザーの認証情報をローテーションします。