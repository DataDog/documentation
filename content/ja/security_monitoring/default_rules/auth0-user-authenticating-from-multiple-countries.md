---
aliases:
  - /ja/820-088-db1
disable_edit: true
kind: ドキュメント
rule_category:
  - ログの検出
security: attack
source: auth0
tactic: TA0006-credential-access
title: 複数国からの Auth0 ユーザー認証
type: security_rules
---
## **目的:**
短期間に複数の国から同一ユーザーがアクセスしたログインを検出。

## **戦略:**
Geo-IP データを使用して、短期間に異なる 2 つの国に存在する 2 つの IP アドレスからログインしたユーザーを検出します。

## **トリアージと対応:**
1. 認証に 2FA が使用されたかを確認します。
2. ユーザーに連絡して、この動作が予期されたものであるかを確認します。
3. ユーザーに対するセキュリティ侵害が認められる場合、ユーザーの認証情報をローテーションします。