---
aliases:
- /ja/integrations/awselasticache/
- /ja/integrations/elasticache/
categories:
- aws
- caching
- cloud
- configuration & deployment
- log collection
dependencies: []
description: Amazon ElasicCache のキーメトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_elasticache/
draft: false
git_integration_title: amazon_elasticache
has_logo: true
integration_id: ''
integration_title: Amazon ElastiCache
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_elasticache
public_title: Datadog-Amazon ElastiCache インテグレーション
short_description: Amazon ElasicCache のキーメトリクスを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/awselasticache/elasticache-memcached.png" alt="ElastiCache Memcached のデフォルトダッシュボード" popup="true">}}

## 概要

主要なパフォーマンスメトリクス、それらの収集方法、そして [Coursera][2] が Datadog を使用して ElastiCache を監視する方法については、[Redis または Memcached を使用した ElastiCache パフォーマンスメトリクスの監視][1]を参照してください。

## セットアップ

[Amazon Web Services インテグレーション][3]をまだセットアップしていない場合は、最初にセットアップします。

### Datadog Agent を使用しない場合のインストール

1. [AWS インテグレーションページ][4]で、`Metric Collection` タブの下にある `ElastiCache` が有効になっていることを確認します。
2. Amazon ElastiCache のメトリクスを収集するには、次のアクセス許可を [Datadog IAM ポリシー][5]に追加します。詳細については、AWS ウェブサイト上の [ElastiCache ポリシー][6]を参照してください。

    | AWS アクセス許可                      | 説明                                                           |
    | ----------------------------------- | --------------------------------------------------------------------- |
    | `elasticache:DescribeCacheClusters` | (タグやメトリクスを追加する場合) キャッシュクラスターとその説明を一覧表示します。|
    | `elasticache:ListTagsForResource`   | (カスタムタグを追加する場合) クラスターのカスタムタグを一覧表示します。                    |
    | `elasticache:DescribeEvents`        | スナップショットとメンテナンスに関連するイベントを追加します。                          |

3. [Datadog - Amazon ElastiCache インテグレーション][7]をインストールします。

### Datadog Agent を使用する場合のインストール (推奨)

#### Agent を使用したネイティブメトリクスの収集

次の図は、Datadog がネイティブ ElastiCache インテグレーションを経由して CloudWatch からメトリクスを直接収集する方法と、バックエンド技術である Redis または Memcached から追加のネイティブメトリクスを直接収集する方法を示しています。バックエンドから直接収集することで、より多くの重要なメトリクスに、より高い精度でアクセスできます。

{{< img src="integrations/awselasticache/elasticache1.png" alt="ElastiCache、Redis 、Memcached のインテグレーション" >}}

#### 仕組み

Agent のメトリクスは、Agent が実行されている EC2 インスタンスに紐づけられており、実際の ElastiCache インスタンスには紐づけられていません。そのため、すべてのメトリクスを関連付けるには `cacheclusterid` タグを使用する必要があります。Agent を ElastiCache インスタンスと同じタグで構成すると、Redis/Memcached のメトリクスを ElastiCache のメトリクスと簡単に組み合わせることができます。

#### 手順

Agent は実際の ElastiCache インスタンスではなくリモートマシンで実行されるため、メトリクスをどこから収集するかを Agent に伝えることが、このインテグレーションを正しくセットアップするカギになります。

##### ElastiCache インスタンスの接続の詳細の収集

まず、AWS コンソールに移動し、ElastiCache セクションを開き、Cache Clusters のタブに移動して、監視対象のクラスターを探します。次のように表示されます。

{{< img src="integrations/awselasticache/elasticache2.png" alt="AWS コンソールの ElastiCache クラスター" >}}

「ノード」リンクをクリックして、エンドポイント URL にアクセスします。

{{< img src="integrations/awselasticache/elasticache3.png" alt="AWS コンソールのノードリンク" >}}

エンドポイント URL (例: **replica-001.xxxx.use1.cache.amazonaws.com**) と `cacheclusterid` (例: **replica-001**) をメモします。Agent を構成したり、グラフやダッシュボードを作成したりする際に、これらの値が必要になります。

##### Agent の構成

Redis/Memcached インテグレーションは、個別のキャッシュインスタンスのタグ付けをサポートします。本来は、同じマシン上の複数のインスタンスを監視するためのタグですが、このタグをメトリクスの絞り込みとグループ化に使用できます。以下は、`redisdb.yaml` を使用した Redis と ElastiCache の構成例です。このファイルがプラットフォームのどこに置かれているかについては、[Agent 構成ディレクトリ][8]を参照してください。

```yaml
init_config:

instances:
    # AWS コンソールからのエンドポイント URL
    - host: replica-001.xxxx.use1.cache.amazonaws.com
      port: 6379
      # AWS コンソールからのキャッシュクラスター ID
      tags:
          - cacheclusterid:replicaa-001
```

`sudo /etc/init.d/datadog-agent restart` (Linux の場合) で Agent を再起動します。

##### メトリクスを一緒に視覚化する

数分経過すると、Datadog で ElastiCache と Redis または Memcached のメトリクスにアクセスして、グラフ化、監視などを行うことができます。

以下に、同じ「cacheclusterid」タグ **replicaa-001** を使用して、ElastiCache からのキャッシュヒットメトリクスと Redis からのネイティブレイテンシーメトリクスを組み合わせたグラフをセットアップする例を挙げます。

{{< img src="integrations/awselasticache/elasticache4.png" alt="ElastiCache とキャッシュメトリクス" >}}

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_elasticache" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### ヘルプ

Amazon ElastiCache インテグレーションには、クラスター、キャッシュセキュリティグループ、およびキャッシュパラメーターグループのイベントが含まれています。以下はイベントの例です。

{{< img src="integrations/amazon_elasticache/aws_elasticache_events.png" alt="Amazon Elasticache イベント" >}}

### ヘルプ

Amazon ElastiCache インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

- [Redis または Memcached を使用した ElastiCache のパフォーマンスメトリクスの監視][1]
- [ElastiCache のメトリクスと Redis/Memcached メトリクスを収集する][11]

[1]: https://www.datadoghq.com/blog/monitoring-elasticache-performance-metrics-with-redis-or-memcached
[2]: https://www.coursera.org
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[6]: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/IAM.html
[7]: https://app.datadoghq.com/integrations/amazon-elasticache
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_elasticache/amazon_elasticache_metadata.csv
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://www.datadoghq.com/blog/collecting-elasticache-metrics-its-redis-memcached-metrics