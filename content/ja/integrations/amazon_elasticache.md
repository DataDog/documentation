---
aliases:
  - /ja/integrations/awselasticache/
  - /ja/integrations/elasticache/
categories:
  - cloud
  - caching
  - aws
  - log collection
ddtype: クローラー
dependencies: []
description: Amazon ElasicCache のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_elasticache/'
git_integration_title: amazon_elasticache
has_logo: true
integration_title: Amazon ElastiCache
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_elasticache
public_title: Datadog-Amazon ElastiCache インテグレーション
short_description: Amazon ElasicCache のキーメトリクスを追跡
version: '1.0'
---
{{< img src="integrations/awselasticache/elasticache-memcached.png" alt="ElastiCache Memcached default dashboard" responsive="true" popup="true">}}

## 概要

ElastiCache のパフォーマンスメトリクスを監視する方法については、Redis と Memcached のどちらを使用する場合でも、[こちらの記事をご参照ください][1]。ここには、キーパフォーマンスメトリクス、その収集方法、Datadog を使用して [Coursera][2] が ElastiCache を監視する方法について詳述されています。

## セットアップ

[Amazon Web Services インテグレーション][3]をまだセットアップしていない場合は、最初にセットアップします。

### Datadog Agent を使用しない場合のインストール

1. [AWS インテグレーションタイル][4]のメトリクス収集で、`ElastiCache` をオンにします。

2. Amazon ElastiCache のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][5]に追加します。ElastiCache ポリシーの詳細については、[AWS Web サイトのガイド][6]を参照してください。

| AWS アクセス許可                      | 説明                                                           |
|-------------------------------------|-----------------------------------------------------------------------|
| `elasticache:DescribeCacheClusters` | タグやメトリクスを追加するために、キャッシュクラスターとそれらの説明を一覧表示します。 |
| `elasticache:ListTagsForResource`   | カスタムタグを追加するために、特定のクラスターのカスタムタグを一覧表示します。                    |
| `elasticache:DescribeEvents`        | スナップショットとメンテナンスに関するイベントを追加します。                          |

3. [Datadog - AWS ElastiCache インテグレーション][7]をインストールします。

### Datadog Agent を使用する場合のインストール (推奨)
#### Agent を使用したネイティブメトリクスの収集

次の図は、Datadog がネイティブ ElastiCache インテグレーションを経由して CloudWatch からメトリクスを直接収集する方法と、バックエンド技術である Redis または Memcached から追加のネイティブメトリクスを直接収集する方法を示しています。バックエンドから直接収集することで、より多くの重要なメトリクスに、より高い精度でアクセスできます。

{{< img src="integrations/awselasticache/elasticache1.png" alt="ElastiCache, Redis and Memcached integrations" responsive="true">}}

#### 仕組み

Agent メトリクスは、実際の ElastiCache インスタンスにではなく、Agent が実行されている EC2 インスタンスに関連付けられます。そのため、すべてのメトリクスを一緒に接続するには、`cacheclusterid` タグを使用する必要があります。ElastiCache インスタンスと同じタグを使用して Agent を構成した後に、Redis/Memcached メトリクスを ElastiCache メトリクスと組み合わせる方法が簡単です。

#### 手順

Agent は実際の ElastiCache インスタンスではなくリモートマシンで実行されるため、メトリクスをどこから収集するかを Agent に伝えることが、このインテグレーションを正しくセットアップするカギになります。

##### ElastiCache インスタンスの接続の詳細の収集

まず、AWS コンソールに移動し、ElastiCache セクションを開き、Cache Clusters のタブに移動して、監視対象のクラスターを探します。次のように表示されます。

{{< img src="integrations/awselasticache/elasticache2.png" alt="ElastiCache Clusters in AWS console" responsive="true">}}

「ノード」リンクをクリックして、エンドポイント URL にアクセスします。

{{< img src="integrations/awselasticache/elasticache3.png" alt="Node link in AWS console" responsive="true">}}

エンドポイント URL (例: **replica-001.xxxx.use1.cache.amazonaws.com**) と `cacheclusterid` (例: **replica-001**) をメモします。Agent を構成したり、グラフやダッシュボードを作成したりする際に、これらの値が必要になります。


##### Agent の構成

Redis/Memcached インテグレーションは、個別のキャッシュインスタンスのタグ付けをサポートします。本来は、同じマシン上の複数のインスタンスを監視するためのタグですが、このタグをメトリクスの絞り込みとグループ化に使用できます。以下は、`redisdb.yaml` を使用した Redis と ElastiCache の構成例です。このファイルがプラットフォームのどこに置かれているかについては、[Agent 構成ディレクトリ][8]を参照してください。

```yaml
init_config:

instances:
  - host: replica-001.xxxx.use1.cache.amazonaws.com # AWS コンソールで調べたエンドポイント URL
    port: 6379
    tags:
      - cacheclusterid:replicaa-001 # AWS コンソールで調べたキャッシュクラスター ID
```


`sudo /etc/init.d/datadog-agent restart` (Linux の場合) で Agent を再起動します。


##### ElastiCache と Redis/Memcached のメトリクスを共に視覚化

数分経過すると、Datadog で ElastiCache と Redis/Memcached のメトリクスにアクセスして、グラフ化、監視などを行うことができます。

以下に、同じ「cacheclusterid」タグ **replicaa-001** を使用して、ElastiCache からのキャッシュヒットメトリクスと Redis からのネイティブレイテンシーメトリクスを組み合わせたグラフをセットアップする例を挙げます。

{{< img src="integrations/awselasticache/elasticache4.png" alt="ElastiCache and Cache metrics" responsive="true">}}

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_elasticache" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント
AWS ElastiCache インテグレーションには、クラスター、キャッシュセキュリティグループ、およびキャッシュパラメーターグループのイベントが含まれています。以下はイベントの例です。

{{< img src="integrations/amazon_elasticache/aws_elasticache_events.png" alt="AWS Elasticache Events" responsive="true">}}


### サービスのチェック
AWS ElastiCache インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

* [Redis または Memcached を使用した ElastiCache のパフォーマンスメトリクスを監視する][11]  
* [ElastiCache メトリクスと Redis/Memcached メトリクスを収集する][12]  

[1]: https://www.datadoghq.com/blog/monitoring-elasticache-performance-metrics-with-redis-or-memcached
[2]: https://www.coursera.org
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[4]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[6]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_elasticache.html
[7]: https://app.datadoghq.com/account/settings#integrations/amazon_elasticache
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_elasticache/amazon_elasticache_metadata.csv
[10]: https://docs.datadoghq.com/ja/help
[11]: https://www.datadoghq.com/blog/monitoring-elasticache-performance-metrics-with-redis-or-memcached
[12]: https://www.datadoghq.com/blog/collecting-elasticache-metrics-its-redis-memcached-metrics


{{< get-dependencies >}}