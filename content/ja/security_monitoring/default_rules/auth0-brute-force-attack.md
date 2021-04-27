---
aliases:
  - /ja/154-6ed-00d
disable_edit: true
kind: ドキュメント
rule_category:
  - ログの検出
security: attack
source: auth0
tactic: TA0006-credential-access
technique: T1110-brute-force
title: Auth0 ユーザーへの総当たり攻撃
type: security_rules
---
## **目的:**
ユーザーへの総当たり攻撃を検出。

## **戦略:**
**試行の成功:** 同一ユーザーがログインに 5 回失敗した後成功した場合に攻撃として検出し、重大度シグナル `MEDIUM` を生成します。

**試行の失敗:** 同一ユーザーがログインに 5 回失敗した場合に検出され、重大度シグナル `INFO` を生成します。

## **トリアージと対応:**
1. ログを調べ、これが有効なログイン試行かを確認します。
2. 2FA が認証されたかを確認します。
3. ユーザーに対するセキュリティ侵害が認められる場合、ユーザーの認証情報をローテーションします。