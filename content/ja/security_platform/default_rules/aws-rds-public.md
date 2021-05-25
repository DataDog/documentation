---
aliases:
  - /ja/fu0-rtv-2rb
  - /ja/security_monitoring/default_rules/fu0-rtv-2rb
  - /ja/security_monitoring/default_rules/aws-rds-public
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: rds
security: コンプライアンス
source: rds
title: RDS インスタンスは公開されていません
type: security_rules
---
## 説明

RDS インスタンスを保護し、公開しないよう設定します。

## 根拠

RDS インスタンスのアクセス制限がない状態だと、インターネットに接続できるすべての人がデータベースへの接続を確立することができます。これは、ブルートフォース攻撃、DoS/DDoS、SQL インジェクションなどの攻撃を招く可能性があります。

## 修復

### コンソール

[Amazon RDS DB インスタンスの変更 (コンソール)][2] ドキュメントに従って、AWS コンソールの RDS インスタンスを変更する方法を確認してください。

### CLI

[Amazon RDS DB インスタンスの変更 (AWS CLI)][2] ドキュメントに従って、RDS インスタンスの接続コンフィギュレーションを変更する方法を確認してください。

[1]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.Modifying.html
[2]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.Modifying.html