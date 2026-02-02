---
title: 推測サービス
description: アウトバウンドリクエストを分析して、データベースやキューなどのサービスの依存関係を自動的に検出します。
aliases:
  - /tracing/guide/inferred-service-opt-in
further_reading:
- link: "/tracing/services/service_page/"
  tag: "Documentation"
  text: "Datadog のサービスについて"
---

## 概要

Datadog は、インスツルメンテーションが実行されたサービスについて、データベース、キュー、サードパーティ API などの依存先のインスツルメンテーションが実行されていない場合でも、その依存関係を自動的に検出します。Datadog は、インスツルメンテーションが実行されたサービスからのアウトバウンドリクエストを分析して、これらの依存関係の存在を推測し、関連するパフォーマンスメトリクスを収集します。

{{< img src="tracing/visualization/service/dependencies\_section.png" alt="サービス詳細画面の依存関係マップ" style="width:90%;">}}

{{< site-region region="ap1,us3,us5,eu,us,ap2" >}}

データベース、キュー、サードパーティ API などのエンティティタイプでエントリを絞り込んで、[Software Catalog][1] 内の推定サービスを調べます。各[サービス詳細画面][2]は、調査しているサービスの種類に合わせてカスタマイズされています。たとえば、データベースサービス画面には、データベース固有のインサイトが表示され、[Database Monitoring][3] を使用している場合は、データベースの監視データも含まれます。

## 推測サービスの設定
{{< tabs >}}
{{% tab "Agent v7.60.0+" %}}
Datadog Agent バージョン [7.60.0][1] 以降では、推測サービスを表示するために手動の構成は必要ありません。必要な構成である `apm_config.compute_stats_by_span_kind` および `apm_config.peer_tags_aggregation` は、デフォルトで有効になっています。

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.60.0

{{% /tab %}}
{{% tab "Agent v7.55.1 - v7.59.1" %}}

Datadog Agentバージョン [7.55.1][1] から [7.59.1][2] の場合は、以下の内容を `datadog.yaml` 構成ファイルに追加します。

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm\_config:
  \`compute\_stats\_by\_span\_kind=true\`
  peer\_tags\_aggregation: true

{{< /code-block >}}

または、Datadog Agent 構成で、以下の環境変数を設定します。

{{< code-block collapsible="true" lang="yaml" >}}

DD\_APM\_COMPUTE\_STATS\_BY\_SPAN\_KIND=true
DD\_APM\_PEER\_TAGS\_AGGREGATION=true

{{< /code-block >}}

Helmを使用している場合は、これらの環境変数を `values.yaml`[ ファイル][3]に追加します。

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.55.1
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.59.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Agent v7.50.3 - v7.54.1" %}}

Datadog Agentバージョン [7.50.3][1] から [7.54.1][2] の場合は、以下の内容を `datadog.yaml` 構成ファイルに追加します。

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm\_config:
  \`compute\_stats\_by\_span\_kind=true\`
  peer\_tags\_aggregation: true
  peer\_tags: \["\_dd.base\_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server\_name","messaging.de stination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]

{{< /code-block >}}

または、Datadog Agent 構成で、以下の環境変数を設定します。

{{< code-block collapsible="true" lang="yaml" >}}

DD\_APM\_COMPUTE\_STATS\_BY\_SPAN\_KIND=true
DD\_APM\_PEER\_TAGS\_AGGREGATION=true
DD\_APM\_PEER\_TAGS='\["\_dd.base\_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server\_name","mes saging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]'

{{< /code-block >}}

Helmを使用している場合は、これらの環境変数を `values.yaml`[ ファイル][3]に追加します。

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.50.3
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.54.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "OpenTelemetry Collector" %}}

OpenTelemetry コレクターの場合、推奨される最小バージョンは `opentelemetry-collector-contrib` [v0.95.0][1] 以降です。この場合、次の構成を更新します。

{{< code-block lang="yaml" collapsible="true" >}}

connectors:
  datadog/connector:
    traces:
      \`compute\_stats\_by\_span\_kind=true\`
      peer\_tags\_aggregation: true
      peer\_tags: \["\_dd.base\_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server\_name","messaging.destination" ,"messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]

{{< /code-block >}}

コレクターのバージョンが v0.95.0 未満の場合、次の構成を更新します。

{{< code-block lang="yaml" collapsible="true" >}}

exporters:
  datadog:
    traces:
      \`compute\_stats\_by\_span\_kind=true\`
      peer\_tags\_aggregation: true
      peer\_tags: \["\_dd.base\_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server\_name","messaging.destination" ,"messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]   

{{< /code-block >}}

**例**: [collector.yaml][2]

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.95.0
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml#L375-L395
{{% /tab %}}
{{< /tabs >}}

## 推測エンティティの命名

Datadog では、推測されるサービス依存関係の名前とタイプを決定するために、標準のスパン属性を使用し、`peer.*` 属性にマッピングします。たとえば、推測された外部 API は、デフォルトの命名規則を使用して、`net.peer.name`、`api.stripe.com`、`api.twilio.com`、`us6.api.mailchimp.com` のように名前を付けられます。推測されたデータベースでは、デフォルトの命名規則である `db.instance` が使用されます。[名前変更ルール][5]を作成することで、推定されたエンティティの名前を変更できます。

### ピアタグ

ピアタグ | ソース属性
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

**注**:IP アドレス形式 (例: 127.0.0.1) に一致するピア属性値は、不要なノイズを防ぎ、値の多いディメンションでメトリクスがタグ付けされることを避けるために、`blocked-ip-address` に変更されます。その結果、インスツルメンテーション済みのサービスの下流の依存関係として、`blocked-ip-address` サービスが表示される場合があります。

#### ピアタグの優先順位

エンティティが複数のタグの組み合わせで定義されている場合、Datadog はピアタグ間の優先順位を使用して、推測されたエンティティに名前を割り当てます。 

エンティティタイプ | 優先順位
-----------|----------------
データベース | `peer.db.name`> `peer.aws.s3.bucket` (AWS S3) / `peer.aws.dynamodb.table` (AWS DynamoDB) / `peer.cassandra.contact.points` (Cassandra) / `peer.couchbase.seed.nodes` (Couchbase) > `peer.hostname`> `peer.db.system`
キュー | `peer.messaging.destination` > `peer.kafka.bootstrap.servers` (Kafka) / `peer.aws.sqs.queue` (AWS SQS) / `peer.aws.kinesis.stream` (AWS Kinesis) > `peer.messaging.system`
推定されたサービス | `peer.service`> `peer.rpc.service`> `peer.hostname`

`peer.db.name` のような優先順位が最も高いタグがインスツルメンテーションでキャプチャされない場合、Datadog は 2 番目に優先度の高いタグ (`peer.hostname` など) を使用します。以降も同様です。

**注**:Datadogは、推定されたデータベースとキューに `peer.service` を設定しません。`peer.service` は最も優先度の高いピア属性です。設定されている場合、他のすべての属性よりも優先されます。

## グローバルなデフォルトサービス名の移行

推定されたサービスでは、既存のスパン属性からサービスの依存関係が自動的に検出されます。そのため、これらの依存関係を識別するために、(`service` タグを使用して) サービス名を変更する必要はありません。 

`DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` を有効にして、Datadog インテグレーションによって、デフォルトのグローバルサービス名とは異なるサービス名が設定されないようにします。これにより、サポート対象のすべてのトレースライブラリ言語とインテグレーションで、サービス間の関係と推論されたサービスがわかりやすく表示されるようになります。

<div class="alert alert-danger">このオプションを有効にすると、古いサービス名を参照する既存の APM メトリクス、カスタムスパンメトリクス、トレース分析、保持フィルター、機密データスキャン、モニター、ダッシュボード、ノートブックに影響する可能性があります。グローバルなデフォルトサービスタグ (<code>service:&lt;DD_SERVICE></code>) を使用するようにこれらのアセットを更新してください。</div>

サービスオーバーライドを削除して、推測サービスに移行する方法については、[サービスオーバーライドガイド][4]を参照してください。

[1]: /software_catalog/
[2]: /tracing/services/service_page
[3]: /database_monitoring/
[4]: /tracing/guide/service_overrides
[5]: /tracing/services/renaming_rules/

{{< /site-region >}}
{{< site-region region="gov" >}}
<div class="alert alert-info">お客様のデータセンターでは、デフォルトで推測サービス機能を利用できません。アクセスをリクエストするには、この<a href="https://docs.google.com/forms/d/1imGm-4SfOPjwAr6fwgMgQe88mp4Y-n_zV0K3DcNW4UA" target="_blank">フォーム</a>に記入してください。</div>

{{< /site-region >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}
