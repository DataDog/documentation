---
aliases:
  - /ja/fo0-6re-l0f
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: rds
security: コンプライアンス
source: rds
title: RDS スナップショットは公開されていません
type: security_rules
---
## 説明

Amazon Relational Database Service (RDS) データベースのスナップショットを保護します。

## 根拠

公開されているスナップショットは、他の AWS アカウントにスナップショットをコピーし、そこからデータベースインスタンスを作成する権限を与え、プライベートデータを公開する可能性があります。

## 修復

### コンソール

[AWS アカウントとの手動 DB スナップショットの共有を停止する][1] AWS コンソールのドキュメントに従ってください。

### CLI

[スナップショット識別子、属性名、削除する値][2]を指定して `modify-db-snapshot-attribute` を実行します。これにより、特定の AWS アカウントから DB スナップショットを復元するためのアクセス許可が削除されます。

    {{< code-block lang="bash" filename="modify-db-snapshot-attribute.sh" >}}
    aws rds modify-db-snapshot-attribute
        --db-snapshot-identifier yourdbsnapshot
        --attribute-name restore
        --values-to-remove 1111222233333
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ShareSnapshot.html#USER_ShareSnapshot.Sharing
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/modify-db-snapshot-attribute.html#synopsis