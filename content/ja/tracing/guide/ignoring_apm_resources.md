---
kind: documentation
title: Ignoring Unwanted Resources in APM
---

A service can handle a variety of requests, some of which you might not want traced or included in trace metrics. An example of this is, possibly, health checks in a web application.

There are two ways to specify that such an endpoint should be untraced and excluded from trace metrics:

- [Trace Agent configuration](#trace-agent-configuration-options) (in Datadog Agent), or
- [Tracer configuration](#tracer-configuration-options).

<div class="alert alert-warning"><strong>Note</strong>: Filtering traces using any of the following options removes these requests from <a href="/tracing/guide/metrics_namespace/">trace metrics</a>. For information on how to reduce ingestion without affecting the trace metrics, see <a href="/tracing/trace_ingestion/ingestion_controls">ingestion controls</a>.</div>

If you need assistance, contact [Datadog support][1].


## Trace Agent configuration options

The Trace Agent component within the Datadog Agent has two methods to prevent certain traces from coming through: ignoring span tags or ignoring resources. If traces are dropped due to these settings, the trace metrics exclude these requests.

Configuring the Trace Agent to ignore certain spans or resources applies to all services that send traces to this particular Datadog Agent. If you have application-specific requirements, use the [Tracer configuration](#tracer-configuration) method instead.

### Ignoring based on span tags

Starting with Datadog Agent 6.27.0/7.27.0, the **filter tags** option drops traces with root spans that match specified span tags. This option applies to all services that send traces to this particular Datadog Agent. Traces that are dropped because of filter tags are not included in trace metrics.

If you can programmatically identify a set of traces that you know you don't want to send to Datadog, and no other option in this guide solves your requirement, you can consider adding a [custom span tag][2] so you can drop the traces. [Reach out to Support][1] to discuss your use case further so Datadog can continue to expand this functionality.

The filter tags option requires an exact string match. If your use case requires ignoring by regex, see [Ignoring based on resources](#ignoring-based-on-resources).

You can specify span tags to require or reject by using a list of keys and values separated by spaces in environment variables:

`DD_APM_FILTER_TAGS_REQUIRE`
: Collects only traces that have root spans with an exact match for the specified span tags and values. If it does not match this rule, the trace is dropped. For example, `DD_APM_FILTER_TAGS_REQUIRE="key1:value1 key2:value2"`. In Datadog Agent 7.49+, regular expressions can be provided with `DD_APM_FILTER_TAGS_REGEX_REQUIRE`.

`DD_APM_FILTER_TAGS_REJECT`
: Rejects traces that have root spans with an exact match for the specified span tags and values. If it matches this rule, the trace is dropped. For example, `DD_APM_FILTER_TAGS_REJECT="key1:value1 key2:value2"`. In Datadog Agent 7.49+, regular expressions can be provided with `DD_APM_FILTER_TAGS_REGEX_REJECT`.


{{< tabs >}}
{{% tab "datadog.yaml" %}}

Alternatively, you can set them in the Agent configuration with a comma-separated list:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  filter_tags:
    require: ["db:sql", "db.instance:mysql"]
    reject: ["outcome:success", "key2:value2"]
{{< /code-block >}}

For example, to ignore health checks where the `http.url` matches this endpoint:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  filter_tags:
    reject: ["http.url:http://localhost:5050/healthcheck"]
{{< /code-block >}}

{{% /tab %}}
{{% tab "Kubernetes" %}}
#### Datadog OperatorDatadog オペレーター

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      containers:
        trace-agent:
          env:
            - name: DD_APM_FILTER_TAGS_REJECT
              value: tag_key1:tag_val2 tag_key2:tag_val2
{{< /code-block >}}

{{% k8s-operator-redeploy %}}

#### Helm

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
agents:
  containers:
    traceAgent:
      env:
        - name: DD_APM_FILTER_TAGS_REJECT
          value: tag_key1:tag_val2 tag_key2:tag_val2

{{< /code-block >}}

{{% k8s-helm-redeploy %}}

[1]: /ja/agent/kubernetes/?tab=helm#installation
{{% /tab %}}
{{< /tabs >}}

この方法でトレースをフィルターすると、[トレースメトリクス][3]からこれらのリクエストが削除されます。トレースメトリクスに影響を与えずに取り込みを減らす方法については、[Ingestion Controls][4] を参照してください。

バックエンドでは、Datadog は取り込み後に以下のスパンタグを作成し、スパンに追加します。これらのタグは、Datadog Agent レベルでトレースをドロップするために使用することはできません。


| 名前                                    | 説明                                      |
|-----------------------------------------|--------------------------------------------------|
| `http.path_group`                       | `http.url` タグからの完全な URL パス。        |
| `http.url_details.host`                 | `http.url` タグのホスト名部分。      |
| `http.url_details.path`                 | HTTP リクエスト行で渡された完全なリクエスト対象、またはそれに相当するもの。 |
| `http.url_details.scheme`               | `http.url` タグからのリクエストスキーム。       |
| `http.url_details.queryString`          | `http.url` タグからのクエリ文字列部分。 |
| `http.url_details.port`                 | `http.url` タグからの HTTP ポート。            |
| `http.useragent_details.os.family`      | User-Agent によって報告された OS ファミリー。         |
| `http.useragent_details.browser.family` | User-Agent によって報告されたブラウザファミリー。    |
| `http.useragent_details.device.family`  | User-Agent によって報告されたデバイスファミリー。     |

<div class="alert alert-warning"><strong>注</strong>: 2022 年 10 月 1 日以降、Datadog バックエンドは、取り込まれたすべてのスパンについてトレーサー間で<a href="/tracing/trace_collection/tracing_naming_convention">スパンタグのセマンティクス</a>を適用するためにリマッピングを適用します。Datadog Agent レベルでタグに基づいてスパンをドロップしたい場合、<strong>Remap from</strong> 列でタグを使用します。</div>

#### ネットワーク通信

| **名前**                   | **Remap from**                                      |
|----------------------------|-----------------------------------------------------|
| `network.host.ip`          | `tcp.local.address` - Node.js                       |
| `network.destination.ip`   | `out.host` - すべての言語  |
| `network.destination.port` | `grpc.port` - Python<br>`tcp.remote.port` - Node.js<br>`out.port` - すべての言語  |

#### HTTP リクエスト

| **名前**                       | **Remap from**                                                                                        |
|--------------------------------|-------------------------------------------------------------------------------------------------------|
| `http.route`                   | `aspnet_core.route` - .NET<br>`aspnet.route` - .NET<br>`laravel.route` - PHP<br>`symfony.route` - PHP |
| `http.useragent`               | `user_agent` - Java                                                                                   |
| `http.url_details.queryString` | `http.query.string` - Python                                                                          |

#### データベース

| **名前**                         | **Remap from**                                                                                                                                                                                                                  |
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `db.system`                      | `db.type` - Java、Python、Node.js、Go<br>`active_record.db.vendor` - Ruby<br>`sequel.db.vendor` - Ruby                                                                                                                          |
| `db.instance`                    | `mongodb.db` - Python<br> `sql.db` - Python<br> `db.name` - すべての言語                                           |
| `db.statement`                   | `cassandra.query` - Go<br>`consul.command` - Python<br>`memcached.query` - Python<br>`mongodb.query` - Python、.NET、Go<br>`redis.command` - Python<br>`redis.raw_command` - Python<br>`sql.query` - Python、PHP、Node.js、Java |
| `db.row_count`                   | `cassandra.row_count` - Python<br>`db.rowcount` - Python、PHP<br>`mongodb.rows` - Python<br>`sql.rows` - Python                                                                                                                 |
| `db.cassandra.cluster`           | `cassandra.cluster` - Python、Go                                                                                                                                                                                                |
| `db.cassandra.consistency_level` | `cassandra.consistency_level` - Python、Go                                                                                                                                                                                      |
| `db.cassandra.table`             | `cassandra.keyspace` - Python、Go                                                                                                                                                                                               |
| `db.redis.database_index`        | `db.redis.dbIndex` - Java<br>`out.redis_db` - Python、Ruby                                                                                                                                                                      |
| `db.mongodb.collection`          | `mongodb.collection` - Python、.NET、Ruby、PHP                                                                                                                                                                                  |
| `db.cosmosdb.container`          | `cosmosdb.container` - .NET                                                                                                                                                                                                     |

#### メッセージキュー

| **名前**                               | **Remap from**                                                                                             |
|----------------------------------------|------------------------------------------------------------------------------------------------------------|
| `messaging.destination`                | `amqp.destination` - Node.js<br>`amqp.queue` - .NET<br>`msmq.queue.path` - .NET<br>`aws.queue.name` - .NET |
| `messaging.url`                        | `aws.queue.url` - .NET、Java                                                                               |
| `messaging.message_id`                 | `server_id` - Go                                                                                           |
| `messaging.message_payload_size`       | `message.size` - .NET、Java                                                                                |
| `messaging.operation`                  | `amqp.command` - .NET<br>`msmq.command` - .NET                                                             |
| `messaging.rabbitmq.routing_key`       | `amqp.routing_key` - Java<br>`amqp.routingKey` - Nodes.js                                                  |
| `messaging.rabbitmq.delivery_mode`     | `messaging.rabbitmq.exchange` - .NET                                                                       |
| `messaging.msmq.message.transactional` | `msmq.message.transactional` - .NET                                                                        |
| `messaging.msmq.queue.transactional`   | `msmq.queue.transactional` - .NET                                                                          |
| `messaging.kafka.consumer_group`       | `kafka.group` - Java                                                                                       |
| `messaging.kafka.tombstone`            | `kafka.tombstone` - .NET<br>`tombstone` - Java                                                             |
| `messaging.kafka.partition`            | `kafka.partition` - .NET<br>`partition` - Node.js、Go、Java                                                |
| `messaging.kafka.offset`               | `kafka.offset` - .NET                                                                                      |
| `messaging.msmq.message.transactional` | `msmq.message.transactional` - .NET                                                                        |


#### リモートプロシージャコール

| **名前**                       | **Remap from**                                                                                          |
|--------------------------------|---------------------------------------------------------------------------------------------------------|
| `rpc.service`                  | `grpc.method.service` - Python、.NET                                                                    |
| `rpc.method`                   | `grpc.method.name` - Python、.NET、Go                                                                   |
| `rpc.grpc.package`             | `grpc.method.package` - Python、.NET、Go                                                                |
| `rpc.grpc.status_code`         | `grpc.code` - Go<br>`status.code` - Python、.NET、Node.js<br>`grpc.status.code` - Python、.NET、Node.js |
| `rpc.grpc.kind`                | `grpc.method.kind` - Python、Node.js、Go、.NET                                                          |
| `rpc.grpc.path`                | `rpc.grpc.path` - Python、Node.js、Go、.NET                                                             |
| `rpc.grpc.request.metadata.*`  | `grpc.request.metadata.*` - Python、Node.js<br>`rpc.grpc.request.metadata` - Go                         |
| `rpc.grpc.response.metadata.*` | `grpc.response.metadata.*` - Python、Node.js

#### エラー

| **名前**                       | **Remap from**                                                                                          |
|--------------------------------|---------------------------------------------------------------------------------------------------------|
| `error.message`                  | `error.msg` - すべての言語                      |

### リソースに基づいて無視する

**ignore resources** オプションを使用すると、トレースのグローバルルートスパンが特定の基準に一致する場合にリソースを除外することができます。[リソースを収集から除外][5]を参照してください。このオプションは、この特定の Datadog Agent にトレースを送信するすべてのサービスに適用されます。ignore resources により無視されたトレースは、トレースメトリクスに含まれません。

無視するリソースは、Agent のコンフィギュレーションファイル、`datadog.yaml`、または `DD_APM_IGNORE_RESOURCES` 環境変数で指定します。以下の例を参照してください。

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
## @param ignore_resources - list of strings - optional
## 正規表現のリストを提供し、リソース名に基づいて特定のトレースを除外することができます。
## すべての入力項目は二重引用符で囲み、カンマ区切りにする必要があります。

  ignore_resources: ["(GET|POST) /healthcheck","API::NotesController#index"]
{{< /code-block >}}

**注**:
- Trace Agent が許容する正規表現の構文は、Go の [regexp][6] によって評価されます。
- デプロイ戦略によっては、特殊文字をエスケープして正規表現を調整しなければならない場合もあります。
- Kubernetes で専用コンテナを使用している場合は、ignore resource オプションの環境変数が **trace-agent** コンテナに適用されていることを確認してください。

#### 例

トレースを必要としない `/api/healthcheck` の呼び出しを含むトレースを考えてみましょう。

{{< img src="tracing/guide/ignoring_apm_resources/ignoreresources.png" alt="トレーサーに無視させたいリソースのフレームグラフ" style="width:90%;">}}

グローバルルートスパンのリソース名に注意してください。

- オペレーション名: `rack.request`
- リソース名: `Api::HealthchecksController#index`
- Http.url: `/api/healthcheck`

ignore resource オプションを正しく使用するためには、記述された正規表現ルールがリソース名 `Api::HealthchecksController#index` に一致している必要があります。いくつかの正規表現オプションが利用できますが、このリソースからのトレースをそのままフィルタリングする場合は `Api::HealthchecksController#index{TX-PL-LABEL}#x60; を使用するのが良いでしょう。

デプロイ方法に応じて、構文は少しずつ異なります。

{{< tabs >}}
{{% tab "datadog.yaml" %}}

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  ignore_resources: Api::HealthchecksController#index$
{{< /code-block >}}

複数の値の場合

{{< code-block lang="yaml" >}}
apm_config:
  ignore_resources: ["value1","Api::HealthchecksController#index$"]
{{< /code-block >}}

{{% /tab %}}
{{% tab "Docker compose" %}}

Datadog Agent コンテナの環境変数のリストに、以下の例のようなパターンで `DD_APM_IGNORE_RESOURCES` を追加します。Docker Compose には、独自の[変数の置換][1]機能があり、`$` などの特殊文字を使用する場合に考慮する必要があります。 

{{< code-block lang="yaml" >}}
    environment:
      // その他の Datadog Agent の環境変数
      - DD_APM_IGNORE_RESOURCES=Api::HealthchecksController#index$$
{{< /code-block >}}

複数の値の場合

{{< code-block lang="yaml" >}}
    environment:
      // その他の Datadog Agent の環境変数
      - DD_APM_IGNORE_RESOURCES="value1","Api::HealthchecksController#index$$"
{{< /code-block >}}

[1]: https://docs.docker.com/compose/compose-file/compose-file-v3/#variable-substitution
{{% /tab %}}
{{% tab "Docker run" %}}

Datadog Agent をスピンアップするための docker run コマンドに、`DD_APM_IGNORE_RESOURCES` を追加します。

{{< code-block lang="shell" >}}
docker run -d --name datadog-agent \
              --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<> \
              -e DD_APM_IGNORE_RESOURCES="Api::HealthchecksController#index$" \
              -e DD_APM_ENABLED=true \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              gcr.io/datadoghq/agent:latest
{{< /code-block >}}

複数の値の場合

{{< code-block lang="yaml" >}}
              -e DD_APM_IGNORE_RESOURCES=["value1","Api::HealthchecksController#index$"] \
{{< /code-block >}}

{{% /tab %}}
{{% tab "Kubernetes daemonset" %}}

trace-agent 専用コンテナに、環境変数 `DD_APM_IGNORE_RESOURCES` を追加します。

{{< code-block lang="yaml" >}}
    - name: trace-agent
        image: "gcr.io/datadoghq/agent:latest"
        imagePullPolicy: IfNotPresent
        command: ["trace-agent", "-config=/etc/datadog-agent/datadog.yaml"]
        resources: {}
        ports:
        - containerPort: 8126
          hostPort: 8126
          name: traceport
          protocol: TCP
        env:
        - name: DD_API_KEY
          valueFrom:
            secretKeyRef:
              name: "datadog-secret"
              key: api-key
        - name: DD_KUBERNETES_KUBELET_HOST
          valueFrom:
            fieldRef:
              fieldPath: status.hostIP
        - name: KUBERNETES
          value: "yes"
        - name: DOCKER_HOST
          value: unix:///host/var/run/docker.sock
        - name: DD_LOG_LEVEL
          value: "INFO"
        - name: DD_APM_ENABLED
          value: "true"
        - name: DD_APM_NON_LOCAL_TRAFFIC
          value: "true"
        - name: DD_APM_RECEIVER_PORT
          value: "8126"
        - name: DD_KUBELET_TLS_VERIFY
          value: "false"
        - name: DD_APM_IGNORE_RESOURCES
          value: "Api::HealthchecksController#index$"
{{< /code-block >}}

複数の値の場合

{{< code-block lang="yaml" >}}
        - name: DD_APM_IGNORE_RESOURCES
          value: '"value1","Api::HealthchecksController#index$"'
{{< /code-block >}}

{{% /tab %}}
{{% tab "Kubernetes Helm" %}}

`values.yaml` ファイルの `traceAgent` セクションで、`env` セクションに `DD_APM_IGNORE_RESOURCES` を追加し、[通常通りに Helm をスピンアップ][1]します。

{{< code-block lang="yaml" filename="values.yaml" >}}
    traceAgent:
      # agents.containers.traceAgent.env -- trace-agent コンテナ向けの追加の環境変数
      env:
        - name: DD_APM_IGNORE_RESOURCES
          value: Api::HealthchecksController#index$

{{< /code-block >}}

複数の値の場合

{{< code-block lang="yaml" >}}
        - name: DD_APM_IGNORE_RESOURCES
          value: value1, Api::HealthchecksController#index$
{{< /code-block >}}

代わりに、`helm install` コマンドで `agents.containers.traceAgent.env` を設定することもできます。　

{{< code-block lang="shell" >}}
helm install dd-agent -f values.yaml \
  --set datadog.apiKeyExistingSecret="datadog-secret" \
  --set agents.containers.traceAgent.env[0].name=DD_APM_IGNORE_RESOURCES, \
    agents.containers.traceAgent.env[0].value="Api::HealthchecksController#index$" \
  datadog/datadog
{{< /code-block >}}

[1]: /ja/agent/kubernetes/?tab=helm#installation
{{% /tab %}}
{{% tab "Amazon ECS Task Definition" %}}

If you use Amazon ECS (such as on EC2), in your Datadog Agent container definition, add the environment variable `DD_APM_IGNORE_RESOURCES` with the values such that the JSON evaluates to something like this:

{{< code-block lang="json" >}}
    "environment": [
    // Datadog Agent 向けのその他の環境変数
        {
          "name": "DD_APM_IGNORE_RESOURCES",
          "value": "Api::HealthchecksController#index$"
        }
     ]
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning"><strong>注</strong>: このようにトレースをフィルタリングすると、<a href="/tracing/guide/metrics_namespace/">トレースメトリクス</a>からこれらのリクエストが削除されます。トレースメトリクスに影響を与えずに取り込み量を削減する方法については、<a href="/tracing/trace_ingestion/ingestion_controls">取り込みコントロール</a>を参照してください。</div>

## トレーサーのコンフィギュレーションオプション

言語固有のトレーサーの中には、Datadog Agent に送信する前にスパンを修正するオプションがあります。アプリケーション固有の要件があり、以下の言語を使用している場合にはこのオプションを使用してください。

<div class="alert alert-danger"><strong>重要</strong>: リクエストが分散されたトレースに関連付けられている場合、これらのフィルタリングルールを通じて部分的に除外すると、結果として得られるトレースのサンプリングが不正確になる場合があります。


{{< programming-lang-wrapper langs="ruby,python,nodeJS,java" >}}

{{< programming-lang lang="ruby" >}}

Ruby トレーサーには、特定の条件を満たすトレースを除去する後処理パイプラインがあります。詳しい情報や例は[トレースの後処理][1]を参照してください。

たとえば、リソース名が `Api::HealthchecksController#index` である場合、そのリソース名を含むトレースを除去するために `Datadog::Tracing::Pipeline::SpanFilter` クラスを使用します。このフィルターは、[スパンオブジェクト][2]で利用可能な他のメタデータを照合するためにも使用できます。

```
Datadog::Tracing.before_flush(
   Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.resource =~ /Api::HealthchecksController#index/ }
)
```

[1]: /ja/tracing/trace_collection/custom_instrumentation/ruby/?tab=activespan#post-processing-traces
[2]: /ja/tracing/trace_collection/dd_libraries/ruby/#manual-instrumentation
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Pythonトレーサーには、特定のエンドポイントからのトレースを削除するように設定できる `FilterRequestsOnUrl` フィルターがあります。また、カスタムフィルターを書くこともできます。詳細は[トレースフィルター][1] を参照してください。

ルートスパンの `http.url` スパンタグの値が `http://<domain>/healthcheck` の場合の例を考えます。`healthcheck` で終わるすべてのエンドポイントに一致するよう、次の正規表現を使用します。

```
from ddtrace import tracer
from ddtrace.filters import FilterRequestsOnUrl
tracer.configure(settings={
    'FILTERS': [
        FilterRequestsOnUrl(r'http://.*/healthcheck$'),
    ],
})
```

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.filters.FilterRequestsOnUrl
{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

[Http][1] プラグインにブロックリストを設定します。ブロックリストが一致する対象については API ドキュメントを参照してください。例えば、受信 Http リクエストは URL パスに一致するため、トレースの `http.url` スパンタグが `http://<domain>/healthcheck` であれば、`healthcheck` URL に一致するルールを記述します。


```
const tracer = require('dd-trace').init();
tracer.use('http', {
  // 受信 http リクエストはパスに一致する
  server: {
    blocklist: ['/healthcheck']
  },
  // 発信 http リクエストは完全な URL で一致する
  client: {
    blocklist: ['https://telemetry.example.org/api/v1/record']
  }
})

//import http

```
<div class="alert alert-info"><strong>注</strong>: インテグレーションのためのトレーサーコンフィギュレーションは、インスツルメントされたモジュールがインポートされる<em>前に</em>行う必要があります。</div>

[1]: https://datadoghq.dev/dd-trace-js/interfaces/export_.plugins.connect.html#blocklist
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

Java トレーサーには、カスタム `TraceInterceptor` で特定のスパンをフィルタリングするオプションがあります。[トレーサーの拡張][1]を参照してください。

例えば、リソース名が `GET /healthcheck` であれば、このリソース名を含むトレースを無視するトレースインターセプターを記述します。ユースケースに合わせてロジックを調整してください。

```
public class GreetingController {
   static {
       // クラスの static ブロックで複数回の初期化を回避。
       GlobalTracer.get().addTraceInterceptor(new TraceInterceptor() {
           @Override
           public Collection<? extends MutableSpan> onTraceComplete(Collection<? extends MutableSpan> trace) {
               for (MutableSpan span : trace) {
                   if ("GET /healthcheck".contentEquals(span.getResourceName())) {
                       return Collections.emptyList();
                   }
               }
               return trace;
           }
           @Override
           public int priority() {
               return 200;  // Some unique number
           }
       });
   }
}
```

[1]: /ja/tracing/trace_collection/custom_instrumentation/java/#extending-tracers
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

<div class="alert alert-warning"><strong>注</strong>: このようにトレースをフィルタリングすると、<a href="/tracing/guide/metrics_namespace/">トレースメトリクス</a>からこれらのリクエストが削除されます。トレースメトリクスに影響を与えずに取り込み量を削減する方法については、<a href="/tracing/trace_ingestion/ingestion_controls">取り込みコントロール</a>を参照してください。</div>

[1]: /ja/help/
[2]: /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[3]: /ja/tracing/guide/metrics_namespace/
[4]: /ja/tracing/trace_ingestion/ingestion_controls
[5]: /ja/tracing/configure_data_security/?tab=mongodb#exclude-resources-from-being-collected
[6]: https://golang.org/pkg/regexp/