---
aliases:
  - /ja/n11-17q-3pj
  - /ja/security_monitoring/default_rules/n11-17q-3pj
  - /ja/security_monitoring/default_rules/aws-elasticache-ports
cloud: AWS
disable_edit: true
integration_id: amazon-elasticache
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: elasticache
security: コンプライアンス
source: elasticache
title: ElastiCache クラスターはデフォルトのポートを使用していません
type: security_rules
---
## 説明

AWS ElastiCache クラスターのエンドポイントポートをデフォルト以外のポートに変更します。

## 根拠

デフォルトのポートを使用すると、クラスターがエクスプロイトや攻撃の対象となるリスクがあります。カスタムポートを構成し、クラスターのセキュリティを強化します。

## 修復

### コンソール

クラスターのエンドポイントポートを探し変更する方法を確認するには、[暗号化されていない接続のエンドポイント][1] のドキュメントに従います。

### CLI

1. [ElastiCache クラスター ID][2] を使用して `aws elasticache describe-cache-clusters` を実行し、既存のクラスターコンフィギュレーションを出力します。

  {{< code-block lang="bash" filename="describe-cache-clusters.sh" >}}

  aws elasticache describe-cache-clusters
    --cache-cluster-id your-cc-id

  {{< /code-block >}}

2. 前のステップで返されたクラスターデータで `aws elasticache create-cache-cluster` を実行します。エンドポイントポートに、[カスタム値][3]を使用して新しい cache クラスターを構成します。これにより、新しいクラスターメタデータが返されます。

  {{< code-block lang="bash" filename="create-cache-cluster.sh" >}}

  aws elasticache create-cache-cluster
    --cache-cluster-id new-cc-id
    ...
    --port 10001

    {{< /code-block >}}

3. クラスターエンドポイントポートが更新されたら、古い ElastiCache クラスターを削除します。[元のクラスター ID][4] で `delete-cache-cluster` を実行します。

  {{< code-block lang="bash" filename="delete-cache-cluster.sh" >}}

  aws elasticache delete-cache-cluster
    --cache-cluster-id your-cc-id

  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/Endpoints.html#Endpoints.Find.Redis
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elasticache/describe-cache-clusters.html#synopsis
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elasticache/create-cache-cluster.html#synopsis
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elasticache/delete-cache-cluster.html#synopsis