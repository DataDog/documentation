---
aliases:
  - /ja/625-933-d8d
  - /ja/security_monitoring/default_rules/625-933-d8d
  - /ja/security_monitoring/default_rules/aws-rds-enabled-encryption
cloud: AWS
disable_edit: true
integration_id: amazon-rds
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: rds
security: コンプライアンス
source: rds
title: RDS データベースインスタンスが暗号化されていることを確認します
type: security_rules
---
## 説明

AWS RDS データベースインスタンスが暗号化されていることを確認します。

## 根拠

AWS RDS クラスターを暗号化すると、機密データが不正アクセスから保護されます。

## 修復

### コンソール

[DB インスタンスへの Amazon RDS 暗号化を有効にする][1]ドキュメントに従って、データベースインスタンスが暗号化されていることを確認します。 

### CLI

1. インスタンス識別子クエリと `describe-db-instances` を実行して RDS データベース名をリストアップします。

    {{< code-block lang="bash" filename="describe-db-instances.sh" >}}
    aws rds describe-db-instances
        --query 'DBInstances[*].DBInstanceIdentifier'
    {{< /code-block >}}

2. 調整を希望するデータベースインスタンスと `create-db-snapshot` を実行します。

    {{< code-block lang="bash" filename="create-db-snapshot.sh" >}}
    aws rds create-db-snapshot
        --db-snapshot-identifier my-db-snapshot
        --db-instance-identifier my-db-id
    {{< /code-block >}}

3. `list-aliases` を実行して、KMS キーのエイリアスをリージョンごとにリストアップします。

    {{< code-block lang="bash" filename="list-aliases.sh" >}}
    aws kms list-aliases
        --region us-west-1
    {{< /code-block >}}

4. 手順 3 で返された `kms-key-id` とともに `copy-db-snapshot` を実行します。

    {{< code-block lang="bash" filename="copy-db-snapshot.sh" >}}
    aws rds copy-db-snapshot
        --region us-west-1
        --source-db-snapshot-identifier original-db-snapshot-id
        --target-db-snapshot-identifier encrypted-db-snapshot-id
        --copy-tags
        --kms-key-id 01234567-1a2b-1234a-b45c-abcdef123456
    {{< /code-block >}}

5. `restore-db-instance-from-db-snapshot` を実行して、以前に作成されたスナップショットを復元します。

    {{< code-block lang="bash" filename="restore-db-instance.sh" >}}
    aws rds restore-db-instance-from-db-snapshot
        --region us-west-1
        --db-instance-identifier encrypted-db-id
        --db-snapshot-identifier encrypted-db-snapshot-id
    {{< /code-block >}}

6. クエリと `describe-db-instances` を実行して、確実にデータベースを暗号化します。

    {{< code-block lang="bash" filename="describe-db-instances.sh" >}}
    aws rds describe-db-instances
        --region us-west-1
        --db-instance-identifier encrypted-db-snapshot-id
        --query 'DBInstances[*].StorageEncrypted'
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html#Overview.Encryption.Enabling