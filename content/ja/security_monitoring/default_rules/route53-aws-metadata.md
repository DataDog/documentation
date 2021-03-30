---
aliases:
  - /ja/8c5-34f-fa2
disable_edit: true
kind: documentation
rule_category:
  - ログの検出
security: attack
source: route53
tactic: TA0006-credential-access
technique: T1552-unsecured-credentials
title: EC2 インスタンスは、疑わしい AWS メタデータ DNS クエリを解決しました
type: security_rules
---
### 目標
リクエストされたドメインが AWS メタデータ IP (169.254.169.254) に解決されるタイミングを検出します。

### 戦略
Route 53 ログを調べて、DNS リクエストのレスポンスデータが AWS メタデータ IP (169.254.169.254) と一致するかどうかを確認します。これは、攻撃者が AWS メタデータサービスから認証情報を盗もうとしていることを示している可能性があります。

### トリアージと対応
1. どのインスタンスが DNS リクエストに関連付けられているかを判別します。
2. リクエストされたドメイン名 (`dns.question.name`) を許可するかどうかを決定します。許可しない場合は、調査を実施して、ドメインをリクエストしたものを特定し、AWS メタデータ認証情報が攻撃者によってアクセスされたかどうかを判断します。