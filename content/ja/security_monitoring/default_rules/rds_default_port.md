---
aliases:
  - /ja/2fa-56b-77b
cloud: AWS
disable_edit: true
kind: ドキュメント
rule_category:
  - クラウドコンフィギュレーション
scope: rds
security: コンプライアンス
source: rds
title: デフォルトのポートを持つ RDS インスタンス
type: security_rules
---
## 概要

## 説明

[Amazon RDS データベースインスタンス][1]がデフォルトのポートを使用していないことを確認します。MySQL/Aurora ポート 3306、SQL Server ポート 1433、 PostgreSQL ポート 5432 などのデフォルトポートが含まれます。

## 根拠

カスタムポートの使用は、総当たり攻撃や辞書攻撃などに対する防衛になります。

## 修復

### コンソール

[Amazon RDS DB インスタンスの変更][4]のドキュメントに従って、デフォルトを使用していないことを確認してください。その [DB インスタンス設定][5]を変更することで、ポートを変更できます。

### CLI

1. データベースインスタンスおよびスナップショット識別子とともに `create-db-snapshot` を実行して、[スナップショットを作成][2]します。

    {{< code-block lang="bash" filename="create-db-snapshot.sh" >}}
    aws rds create-db-snapshot \
        --db-instance-identifier database-mysql \
        --db-snapshot-identifier snapshotidentifier
    {{< /code-block >}}

2. 有効な新しいポート番号で `modify-db-instance` を実行します。こちらの[ポート番号のリスト][3]をご利用ください。

    {{< code-block lang="bash" filename="modify-db-instance.sh" >}}
    aws rds modify-db-instance \
        --db-instance-identifier database-identifier \
        --option-group-name test-group-name \
        --db-parameter-group-name test-sqlserver-name \
        --apply-immediately
    {{< /code-block >}}



[1]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/create-db-snapshot.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/modify-db-instance.html#options
[4]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.Modifying.html
[5]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.Modifying.html#USER_ModifyInstance.Settings