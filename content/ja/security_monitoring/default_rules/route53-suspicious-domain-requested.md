---
aliases:
  - /ja/c07-f8e-051
disable_edit: true
kind: documentation
rule_category:
  - ログの検出
security: attack
source: route53
title: EC2 インスタンスが疑わしいドメインをリクエスト
type: security_rules
---
### 目標
リクエストされたドメインに疑わしい TLD があるかを検知します。

### 戦略
Route 53 ログを調査して、DNS 質問 (`@dns.question.name`) の TLD が [Spamhaus の最も悪用されたトップレベルドメインリスト][1]にある上位 5 つの TLD のいずれかに一致しているかどうかを特定します。

### トリアージと対応
1. どのインスタンスが DNS リクエストに関連付けられているかを判別します。
2. リクエストされたドメイン名 (`dns.question.name`) を許可するかどうかを決定します。許可しない場合は、調査を実施して、ドメインをリクエストしたものを特定し、AWS メタデータ認証情報が攻撃者によってアクセスされたかどうかを判断します。

[1]: https://www.spamhaus.org/statistics/tlds/