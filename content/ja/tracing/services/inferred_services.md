---
aliases:
- /ja/tracing/guide/inferred-service-opt-in
description: アウトバウンド要求分析を通じて、データベースやキューなどのサービスの依存関係を自動的に検出します。
further_reading:
- link: /tracing/services/service_page/
  tag: Documentation
  text: Datadogのサービスの詳細
title: 推論されたサービス
---

## 概要

Datadogは、データベース、キュー、サードパーティAPIなど、計測されたサービスの依存関係を自動的に検出します。その依存関係が直接計測されていない場合でも、Datadogは計測されたサービスからのアウトバウンドリクエストを分析することで、これらの依存関係の存在を推測し、関連するパフォーマンスメトリックを収集します。

{{< img src="tracing/visualization/service/dependencies_section.png" alt="Service page dependency map" style="width:90%;">}}

{{< site-region region="ap1,us3,us5,eu,us,ap2" >}}

データベース、キュー、サードパーティAPIなどのエンティティタイプでエントリーをフィルタリングすることにより、[ソフトウェアカタログ][1]で推測されるサービスを確認できます。各[サービスページ][2]は、調査するサービスの種類に合わせて調整されています。たとえば、データベースサービスページには、データベース固有のインサイトが表示され、[データベース監視][3]を使用している場合はデータベース監視データが含まれます。

## 推論されたサービスのセットアップ
{{< tabs >}}
{{% tab "Agent v7.60.0+" %}}
Datadog Agentバージョン[7.60.0][1]以降では、推測されたサービスを見るために手動で設定する必要はありません。必要な設定（`apm_config.compute_stats_by_span_kind`と`apm_config.peer_tags_aggregation`）はデフォルトでイネーブルになっています。

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.60.0

{{% /tab %}}
{{% tab "Agent v7.55.1 - v7.59.1" %}}

Datadog Agentバージョン[7.55.1][1]から[7.59.1][2]の場合、`datadog.yaml`構成ファイルに以下を追加します。

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm_config:
  compute_stats_by_span_kind: true
  peer_tags_aggregation: true

{{< /code-block >}}

または、Datadog Agent構成で次の環境変数を設定します。

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true
DD_APM_PEER_TAGS_AGGREGATION=true

{{< /code-block >}}

Helmを使用している場合は、これらの環境変数を`values.yaml`[ファイル][3]に含めます。

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.55.1
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.59.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Agent v7.50.3 - v7.54.1" %}}

Datadog Agentバージョン[7.50.3][1]から[7.54.1][2]の場合、`datadog.yaml`構成ファイルに以下を追加します。

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm_config:
  compute_stats_by_span_kind: true
  peer_tags_aggregation: true
  peer_tags: [ "_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.service","queuename","rpc.service","server.address","stream.name","topicname]

{{< /code-block >}}

または、Datadog Agent構成で次の環境変数を設定します。

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true
DD_APM_PEER_TAGS_AGGREGATION=true
"DD_APM_PEER_TAGS='["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","peer.hostname","peer.service","rpc.service","server.address","stream.name","topicname]"

{{< /code-block >}}

Helmを使用している場合は、これらの環境変数を`values.yaml`[ファイル][3]に含めます。

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.50.3
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.54.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "OpenTelemetry Collector" %}}

OpenTelemetry Collectorの場合、最小推奨バージョンは`opentelemetry-collector-contrib` [v0.95.0][1]以降です。その場合は、この設定を更新します。

{{< code-block lang="yaml"  collapsible="true" >}}

コネクタ:
  datadog/connector:
    トレース:
      compute_stats_by_span_kind: true
      peer_tags_aggregation: true
      peer_tags: ["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","server.address","stream","tablename","topicname]

{{< /code-block >}}

使用しているコレクタのバージョンがv0.95.0未満の場合は、次のコレクタ構成を更新します。

{{< code-block lang="yaml" collapsible="true" >}}

exporters：
  datadog:
    トレース:
      compute_stats_by_span_kind: true
      peer_tags_aggregation: true
      peer_tags: ["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","server.address","stream","tablename","topicname]   

{{< /code-block >}}

**例**: [collector.yaml][2].

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.95.0
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml#L375-L395
{{% /tab %}}
{{< /tabs >}}

## 推論されたエンティティの命名

推測されるサービス依存関係の名前とタイプを決定するために、Datadogは標準スパン属性を使用し、`peer.*`属性にマッピングします。たとえば、推論された外部 API は、`api.stripe.com`、`api.twilio.com`、`us6.api.mailchimp.com` などのデフォルトの命名スキーム`net.peer.name`を使用します。推測されるデータベースでは、デフォルトの命名スキーム`db.instance`が使用されます。[名前変更規則][5]を作成することにより、推論されたエンティティの名前を変更できます。

### ピアタグ

ピアタグ|ソース属性
--------------------|-------------------
`peer.aws.dynamodb.table` | `tablename`
`peer.aws.kinesis.stream` | `streamname`
`peer.aws.s3.bucket` | `bucketname`, `aws.s3.bucket`
`peer.aws.sqs.queue` | `queuename`
`peer.cassandra.contact.points` | `db.cassandra.contact.points`
`peer.couchbase.seed.nodes` | `db.couchbase.seed.nodes`
`peer.db.name` | `db.name`, `mongodb.db`, `db.instance`, `cassandra.keyspace`, `db.namespace`
`peer.db.system` | `db.system`
`peer.hostname` | `peer.hostname`, `hostname`, `net.peer.name`, `db.hostname`, `network.destination.name`, `grpc.host`, `http.host`, `server.address`, `http.server_name`
`peer.kafka.bootstrap.servers` | `messaging.kafka.bootstrap.servers`
`peer.messaging.destination` | `topicname`, `messaging.destination`, `messaging.destination.name`, `messaging.rabbitmq.exchange`, `amqp.destination`, `amqp.queue`, `amqp.exchange`, `msmq.queue.path`, `aws.queue.name`
`peer.messaging.system` | `messaging.system`
`peer.rpc.service` | `rpc.service`
`peer.rpc.system` | `rpc.system`
`peer.service` | `peer.service`

**注意**:IP アドレス形式に一致するピア属性値（127.0.0.1 など）は、不要なノイズやカーディナリティの高い次元を持つタギング メトリックを防ぐために、`blocked-ip-address`で修正およびリダクションされます。その結果、一部の`blocked-ip-address`サービスが、計測されたサービスの下流の依存関係として表示されることがあります。

#### ピアタグの優先順位

推論されたエンティティに名前を割り当てるために、Datadogは、エンティティが複数のタグの組み合わせによって定義されている場合、ピアタグ間の特定の優先順位を使用します。 

エンティティタイプ|優先順位
-----------|----------------
Database | `peer.db.name` > `peer.aws.s3.bucket`（AWS S3向け ） / `peer.aws.dynamodb.table`（AWS DynamoDB向け ） / `peer.cassandra.contact.points`（Cassandra向け ） / `peer.couchbase.seed.nodes`（Couchbase向け） > `peer.hostname` > `peer.db.system`
Queue | `peer.messaging.destination` > `peer.kafka.bootstrap.servers`（Kafkaの場合 ） / `peer.aws.sqs.queue`（AWS SQSの場合 ） / `peer.aws.kinesis.stream`（AWS Kinesisの場合） > `peer.messaging.system`
推測サービス|`peer.service`>`peer.rpc.service`>`peer.hostname`

`peer.db.name`などの優先度の高いタグが計測の一部としてキャプチャされない場合、Datadogは`peer.hostname`のように優先度が2番目に高いタグを使用し、その順序で処理を続行します。

**注意**:Datadogは推論されたデータベースとキューの`peer.service`を設定することはありません。`peer.service`は、最も優先度の高いピア属性です。設定した場合、他のすべての属性よりも優先されます。

## グローバルデフォルトサービス名への移行

推論されたサービスを使用すると、既存のスパン属性からサービスの依存関係が自動的に検出されます。その結果、これらの依存関係を識別するために、サービス名の変更(`service`タグを使用)が不要になります。 

`DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED`を有効にして、デフォルトのグローバルサービス名とは異なるサービス名をDatadog統合で設定しないようにします。これにより、サポートされているすべてのトレース・ライブラリ言語と統合にわたって、サービス間の接続と推論されたサービスがDatadogの視覚化でどのように表現されるかも改善されます。

<div class="alert alert-danger">このオプションを有効にすると、古いサービス名を参照する既存のAPMメトリック、カスタムスパンメトリック、トレース分析、保持フィルター、機密データスキャン、モニター、ダッシュボード、またはノートブックに影響する可能性があります。グローバルデフォルトサービスタグ(<code>サービス:&lt;DD_SERVICE></code>)を使用するようにこれらのアセットを更新します。</div>

サービスのオーバーライドを削除し、推測されたサービスに移行する方法については、『[サービスオーバーライド』ガイド][4]を参照してください。

[1]: /ja/software_catalog/
[2]: /ja/tracing/services/service_page
[3]: /ja/database_monitoring/
[4]: /ja/tracing/guide/service_overrides
[5]: /ja/tracing/services/renaming_rules/

{{< /site-region >}}
{{< site-region region="gov" >}}
<div class="alert alert-info">データセンターでは、既定で推論サービス機能は使用できません。この<a href="https://docs.google.com/forms/d/1imGm-4SfOPjwAr6fwgMgQe88mp4Y-n_zV0K3DcNW4UA" target="_blank">フォーム</a>に入力してアクセスをリクエストします。</div>

{{< /site-region >}}

## さらに読む

{{< partial name="whats-next/whats-next.html" >}}