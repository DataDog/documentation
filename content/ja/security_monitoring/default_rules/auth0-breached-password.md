---
aliases:
  - /ja/6f0-939-666
disable_edit: true
kind: ドキュメント
rule_category:
  - ログの検出
security: attack
source: auth0
tactic: TA0001-initial-access
technique: T1078-valid-accounts
title: セキュリティ侵害を受けたパスワードを使用した Auth0 ユーザーログイン
type: security_rules
---
## **目的:**
セキュリティが侵害されているパスワードでユーザーがログインを試みたことを検出します。

## **戦略:**
データ漏洩によりセキュリティが侵害されたパスワードを使用してユーザーがログインすると、Auth0 でイベントがログに記録されます。このイベントが検出されると、Datadog ではセキュリティシグナルの重要度 `MEDIUM` を発動します。

Auth0 によるパスワード侵害の検出に関する詳細は、こちらの[ドキュメント][1]をご参照ください。

## **トリアージと対応:**
1. ポリシーおよびユーザーの場所を調べ、このログインが承認済みの場所からであることを確認します。
2. 2FA が認証されたかを確認します。
3. ユーザーに対するセキュリティ侵害が認められる場合、ユーザーの認証情報をローテーションします。

[1][https://auth0.com/docs/anomaly-detection/brute-force-protection]