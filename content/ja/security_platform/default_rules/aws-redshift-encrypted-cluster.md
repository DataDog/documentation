---
aliases:
  - /ja/ca8-9ec-a27
  - /ja/security_monitoring/default_rules/ca8-9ec-a27
  - /ja/security_monitoring/default_rules/aws-redshift-encrypted-cluster
cloud: AWS
disable_edit: true
integration_id: amazon-redshift
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: redshift
security: コンプライアンス
source: redshift
title: Redshift クラスターが暗号化されています
type: security_rules
---
## 説明

AWS RedShift クラスターが暗号化されていることを確認します。

## 根拠

Redshift クラスターを暗号化すると、機密データが不正アクセスから保護されます。

## 修復

### コンソール

[クラスターの暗号化を変更][5]ドキュメントに従って、クラスターが暗号化されていることを確認します。

### CLI

1. [クラスター識別子][1]を使用して `describe-clusters` を実行します。

    {{< code-block lang="bash" filename="describe-cluster.sh" >}}
    aws redshift describe-clusters
        --cluster-identifier cluster-name
    {{< /code-block >}}

2. 手順 1 で返されたコンフィギュレーションの詳細と [`encrypted` フラグ][2]を使用して、`create-cluster` を実行します。

    {{< code-block lang="bash" filename="create-cluster.sh" >}}
    aws redshift create-cluster
        --cluster-identifier cluster-name
        ...
        --encrypted
    {{< /code-block >}}

3. [クエリフィルター][1]を使用して `describe-cluster` を実行し、新しいエンドポイントアドレスを公開します。

    {{< code-block lang="bash" filename="describe-cluster.sh" >}}
    aws redshift describe-clusters
        --cluster-identifier cluster-name
        --query 'Clusters[*].Endpoint.Address'
    {{< /code-block >}}

4. [Amazon Redshift Unload/Copy][3] ツールでクラスターエンドポイント URL を使用します。

5. 暗号化された Redshift クラスターコンフィギュレーションを新しい Redshift クラスターエンドポイント URL で更新します。

6. エンドポイントが変更されたら、`delete-cluster` を実行して[古い暗号化されていないクラスターを削除][4]します。

    {{< code-block lang="bash" filename="delete-cluster.sh" >}}
    aws redshift delete-cluster
        --cluster-identifier old-cluster
        --final-cluster-snapshot-identifier old-cluster-finalsnapshot
    {{< /code-block >}}

[1]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/redshift/describe-clusters.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/redshift/create-cluster.html
[3]: https://github.com/awslabs/amazon-redshift-utils/tree/master/src/UnloadCopyUtility
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/redshift/delete-cluster.html
[5]: https://docs.aws.amazon.com/redshift/latest/mgmt/changing-cluster-encryption.html