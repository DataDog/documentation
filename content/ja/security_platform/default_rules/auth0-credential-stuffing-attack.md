---
aliases:
  - /ja/6a7-df6-9aa
  - /ja/security_monitoring/default_rules/6a7-df6-9aa
  - /ja/security_monitoring/default_rules/auth0-credential-stuffing-attack
disable_edit: true
integration_id: auth0
kind: documentation
rule_category:
  - ログの検出
security: attack
source: auth0
tactic: TA0006-credential-access
technique: T1110-brute-force
title: Auth0 へのクレデンシャルスタッフィング攻撃
type: security_rules
---
## **目的:**
クレデンシャルスタッフィング攻撃によるアカウント乗っ取り（ATO）を検出。

## **戦略:**
**試行の成功:** 10 人以上のユニークユーザーによる多数のログイン失敗があり、うち 1 人のユーザーに 1 回以上のログイン成功があった場合に検出され、重大度シグナル `HIGH` を生成します。

**試行の失敗:** 10 人以上のユニークユーザーによる多数のログイン失敗があった場合に検出され、重大度シグナル `INFO` を生成します。

## **トリアージと対応:**
1. ログを調べ、これが有効なログイン試行かを確認します。
2. 2FA が認証されたかを確認します。
3. ユーザーに対するセキュリティ侵害が認められる場合、ユーザーの認証情報をローテーションします。