---
aliases:
  - /ja/216-b0c-f83
disable_edit: true
kind: ドキュメント
rule_category:
  - ログの検出
scope: fastly
security: attack
source: fastly
tactic: TA0001-initial-access
technique: T1190-exploit-public-facing-application
title: セキュリティスキャナからの Fastly HTTP リクエスト
type: security_rules
---
### 目標
ウェブアプリケーションがスキャンされていることを検出します。これは、システムへの攻撃を隠そうとしない攻撃者の IP アドレスを識別します。より高度なハッカーは目立たないユーザー エージェントを使用します。

### 戦略
HTTP ヘッダーのユーザーエージェントを調べて、IP がアプリケーションをスキャンしているかどうかを判断し、`INFO` 信号を生成します。

### トリアージと対応
1. この IP がアプリケーションに認証済みのリクエストを行っているかどうかを確認します。
2. IP がアプリケーションに認証済みのリクエストを行っている場合
 * HTTP ログを調査し、ユーザーがアプリケーションを攻撃しているかどうかを判断します。

クエリの HTTP ヘッダーは [darkqusar][1] の [gist][2] からのものです

[1]: https://gist.github.com/darkquasar
[2]: https://gist.github.com/darkquasar/84fb2cec6cc1668795bd97c02302d380