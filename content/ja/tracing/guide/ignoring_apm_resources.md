---
description: サンプリングルールやフィルタリングを使って、ヘルスチェックなどの不要なリソースをトレースから除外し、ノイズを減らしてコストを管理する方法を学びましょう。
title: APM で不要なリソースを無視する
---
サービスは、トレースしたくないトラフィックを持つエンドポイント（例：ヘルスチェック）を扱うことがよくあります。このガイドでは、そのトラフィックを除外するための次の方法を説明します。

- **サンプリング**：トレースメトリクスにリクエストを表示させたいが、トレースの取り込み量を減らしたい場合に使用します。
- **Datadogエージェントでのフィルタリング**：エージェントに報告するすべてのサービスでリクエストを完全に除外するために使用します（トレースメトリクスからも除外されます）。
- **トレーサー構成**：フィルタリングロジックをサービスごとに適用する必要がある場合や、アプリケーション固有のコンテキスト（例えば、リクエスト属性や実行時状態）に依存する場合に使用します。

ご利用のユースケースに最適なオプションの選択でお困りの場合は、[Datadogサポート][1]にお問い合わせください。

## サンプリング {#sampling}

トレースメトリクスにスパンを含めたいが、取り込まれたくない場合は、サンプリングルールを使用します。サンプリングに関する詳細は、[Ingestion Control][4]を参照してください。

### サンプリングルールの使用 {#using-sampling-rules}

推奨されるアプローチは、リソース名、サービス名、タグ、および操作名に基づいてトレースをサンプリングできるサンプリングルールを使用することです：

```shell
DD_TRACE_SAMPLING_RULES='[{"resource": "GET healthcheck", "sample_rate": 0.0}]'
```

または、HTTP URLタグに基づいてサンプリングします：

```shell
DD_TRACE_SAMPLING_RULES='[{"tags": {"http.url": "http://.*/healthcheck$"}, "sample_rate": 0.0}]'
```

<div class="alert alert-info">サンプリングの決定は、トレース内の最初のスパンを使用して決定されます。フィルタリングしたいタグを含むスパンが該当しない場合、 {{< tooltip glossary="trace_root_span" case="sentence" >}}このルールは適用されません。</div>

## Datadogエージェントでのフィルタリング {#filtering-in-the-datadog-agent}

スパンを取り込まれたくない、またはトレースメトリクスに反映させたくない場合は、Datadogエージェントでのフィルタリングを使用します。

Datadogエージェント内のトレースエージェントコンポーネントには、特定のトレースが送信されないようにするための2つの方法があります：スパンタグによるフィルタリングまたはリソースによるフィルタリングです。これらの設定によりトレースがドロップされた場合、トレースメトリクスはこれらのリクエストを除外します。

トレースエージェントを構成して特定のトレースやリソースを無視することは、このDatadog Agentにトレースを送信するすべてのサービスに適用されます。アプリケーション固有の要件がある場合は、代わりに[トレーサー構成](#tracer-configuration)を使用してください。

<div class="alert alert-info">
このガイドのオプションのいずれも要件を満たさない場合は、アプリケーションに<a href="/tracing/trace_collection/custom_instrumentation/otel_instrumentation/">カスタムスパンタグ</a>を追加し、それを使用してエージェントでトレースをドロップすることを検討してください。
</div>

### スパンタグに基づくトレースの無視 {#ignoring-traces-based-on-span-tags}

Datadog Agent 6.27.0/7.27.0以降、**フィルタタグ**オプションは、指定されたスパンタグに一致するルートスパンを持つトレースをドロップします。このオプションは、このDatadog Agentにトレースを送信するすべてのサービスに適用されます。フィルタタグのためにドロップされたトレースは、トレースメトリクスには含まれません。

<div class="alert alert-info">
トレース内の個々のスパンは選択的にドロップすることはできません。ルートスパンがフィルタ基準に一致する場合、完全なトレースがドロップされます。
</div>

**一致する動作:**

フィルタタグオプションは、正確な文字列一致を必要とします。正規表現に基づくフィルタリングについては、[リソースに基づく無視](#ignoring-traces-based-on-resources)を参照してください。

複数のタグを指定すると、フィルタは**ORロジック**: を使用し、ルートスパンが**いずれか**のタグに一致する場合、トレースがドロップされます。複数の条件を同時に一致させるには、それらの組み合わせた基準を表すカスタムタグを追加してください。

**構成:**

環境変数でキーと値をスペースで区切ったリストを使うことで、require または reject するスパンタグを指定することができます。

`DD_APM_FILTER_TAGS_REQUIRE`
: 指定されたスパンタグと値が完全に一致するルートスパンを持つトレースのみを収集します。このルールに一致しない場合、トレースはドロップされます。たとえば、 `DD_APM_FILTER_TAGS_REQUIRE="key1:value1 key2:value2"`。Datadog Agent 7.49+では、`DD_APM_FILTER_TAGS_REGEX_REQUIRE`で正規表現を提供できます。

`DD_APM_FILTER_TAGS_REJECT`
: 指定されたスパンタグと値が完全に一致するルートスパンを持つトレースを拒否します。このルールに一致する場合、トレースはドロップされます。たとえば、 `DD_APM_FILTER_TAGS_REJECT="key1:value1 key2:value2"`。Datadog Agent 7.49+では、`DD_APM_FILTER_TAGS_REGEX_REJECT`で正規表現を提供できます。

{{< tabs >}}

{{% tab "Kubernetes" %}}

#### Datadog Operator {#datadog-operator}

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

#### Helm {#helm}

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

{{% tab "datadog.yaml" %}}

これらの値をAgentの設定ファイルでカンマ区切りのリストを使用して設定することもできます：

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  filter_tags:
    require: ["db:sql", "db.instance:mysql"]
    reject: ["outcome:success", "key2:value2"]
{{< /code-block >}}

たとえば、`http.url`がこのエンドポイントに一致するヘルスチェックを無視するには次のようにします:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  filter_tags:
    reject: ["http.url:http://localhost:5050/healthcheck"]
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}


#### 利用可能なスパンタグ {#available-span-tags}

バックエンドでは、Datadogは取り込み後のスパンに次のスパンタグを作成します。

**注意**: これらのタグは、Datadog Agentレベルでトレースをドロップするために使用することはできません。Agentは、取り込み前に利用可能なタグに基づいてのみフィルタリングします。

| 名前                                    | 説明                                      |
|-----------------------------------------|--------------------------------------------------|
| `http.path_group`                       | `http.url`タグからの完全なURLパス。       |
| `http.url_details.host`                 | `http.url`タグのホスト名部分。     |
| `http.url_details.path`                 | HTTPリクエスト行で渡された完全なリクエスト対象、またはそれに相当するもの。|
| `http.url_details.scheme`               | `http.url`タグからのリクエストスキーム。      |
| `http.url_details.queryString`          | `http.url`タグからのクエリ文字列部分。|
| `http.url_details.port`                 | `http.url`タグからのHTTPポート。           |
| `http.useragent_details.os.family`      | User-Agentによって報告されたOSファミリー。        |
| `http.useragent_details.browser.family` | User-Agentによって報告されたブラウザファミリー。   |
| `http.useragent_details.device.family`  | User-Agentによって報告されたデバイスファミリー。     |

<div class="alert alert-danger">2022年10月1日から、Datadog backendは<a href="/tracing/trace_collection/tracing_naming_convention">スパンタグセマンティクスを適用するために再マッピングを適用します。
</a>すべての取り込まれたスパンにわたるトレーサーで。Datadog Agentレベルでルートスパンタグに基づいてトレースをドロップしたい場合は、<strong>Remap from</strong>列のタグを使用してください。</div>

##### ネットワーク通信 {#network-communications}

| **名前**                   | **Remap from**                                      |
|----------------------------|-----------------------------------------------------|
| `network.host.ip`          | `tcp.local.address` - Node.js                       |
| `network.destination.ip`   | `out.host` - すべての言語  |
| `network.destination.port` | `grpc.port` - Python<br>`tcp.remote.port` - Node.js<br>`out.port` - すべての言語  |

##### HTTPリクエスト {#http-requests}

| **名前**                       | **Remap from**                                                                                        |
|--------------------------------|-------------------------------------------------------------------------------------------------------|
| `http.route`                   | `aspnet_core.route` - .NET<br>`aspnet.route` - .NET<br>`laravel.route` - PHP<br>`symfony.route` - PHP |
| `http.useragent`               | `user_agent` - Java, C++                                                                                   |
| `http.url_details.queryString` | `http.query.string` - Python                                                                          |

##### データベース {#database}

| **名前**                         | **Remap from**                                                                                                                                                                                                                  |
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `db.system`                      | `db.type` - Java, Python, Node.js, Go<br>`active_record.db.vendor` - Ruby<br>`sequel.db.vendor` - Ruby                                                                                                                          |
| `db.instance`                    | `mongodb.db` - Python<br> `sql.db` - Python<br> `db.name` - すべての言語                                           |
| `db.statement`                   | `cassandra.query` - Go<br>`consul.command` - Python<br>`memcached.query` - Python<br>`mongodb.query` - Python, .NET, Go<br>`redis.command` - Python<br>`redis.raw_command` - Python<br>`sql.query` - Python, PHP, Node.js, Java |
| `db.row_count`                   | `cassandra.row_count` - Python<br>`db.rowcount` - Python, PHP<br>`mongodb.rows` - Python<br>`sql.rows` - Python                                                                                                                 |
| `db.cassandra.cluster`           | `cassandra.cluster` - Python, Go                                                                                                                                                                                                |
| `db.cassandra.consistency_level` | `cassandra.consistency_level` - Python, Go                                                                                                                                                                                      |
| `db.cassandra.table`             | `cassandra.keyspace` - Python, Go                                                                                                                                                                                               |
| `db.redis.database_index`        | `db.redis.dbIndex` - Java<br>`out.redis_db` - Python, Ruby                                                                                                                                                                      |
| `db.mongodb.collection`          | `mongodb.collection` - Python、.NET、Ruby、PHP                                                                                                                                                                                  |
| `db.cosmosdb.container`          | `cosmosdb.container` - .NET                                                                                                                                                                                                     |

##### メッセージキュー{#message-queue}

| **名前**                               | **リマップ元**                                                                                             |
|----------------------------------------|------------------------------------------------------------------------------------------------------------|
| `messaging.destination`                | `amqp.destination` - Node.js<br>`amqp.queue` - .NET<br>`msmq.queue.path` - .NET<br>`aws.queue.name` - .NET |
| `messaging.url`                        | `aws.queue.url` - .NET、Java                                                                               |
| `messaging.message_id`                 | `server_id` - Go                                                                                           |
| `messaging.message_payload_size`       | `message.size` - .NET、Java                                                                                |
| `messaging.operation`                  | `amqp.command` - .NET<br>`msmq.command` - .NET                                                             |
| `messaging.rabbitmq.routing_key`       | `amqp.routing_key` - Java<br>`amqp.routingKey` - Node.js                                                  |
| `messaging.rabbitmq.delivery_mode`     | `messaging.rabbitmq.exchange` - .NET                                                                       |
| `messaging.msmq.message.transactional` | `msmq.message.transactional` - .NET                                                                        |
| `messaging.msmq.queue.transactional`   | `msmq.queue.transactional` - .NET                                                                          |
| `messaging.kafka.consumer_group`       | `kafka.group` - Java                                                                                       |
| `messaging.kafka.tombstone`            | `kafka.tombstone` - .NET<br>`tombstone` - Java                                                             |
| `messaging.kafka.partition`            | `kafka.partition` - .NET<br>`partition` - Node.js, Go, Java                                                |
| `messaging.kafka.offset`               | `kafka.offset` - .NET                                                                                      |
| `messaging.msmq.message.transactional` | `msmq.message.transactional` - .NET                                                                        |


##### リモートプロシージャコール {#remote-procedure-calls}

| **名前**                       | **リマップ元**                                                                                          |
|--------------------------------|---------------------------------------------------------------------------------------------------------|
| `rpc.service`                  | `grpc.method.service` - Python, .NET                                                                    |
| `rpc.method`                   | `grpc.method.name` - Python、.NET、Go                                                                   |
| `rpc.grpc.package`             | `grpc.method.package` - Python, .NET, Go                                                                |
| `rpc.grpc.status_code`         | `grpc.code` - Go<br>`status.code` - Python, .NET, Node.js<br>`grpc.status.code` - Python, .NET, Node.js |
| `rpc.grpc.kind`                | `grpc.method.kind` - Python, Node.js, Go, .NET                                                          |
| `rpc.grpc.path`                | `rpc.grpc.path` - Python, Node.js, Go, .NET                                                             |
| `rpc.grpc.request.metadata.*`  | `grpc.request.metadata.*` - Python、Node.js <br>`rpc.grpc.request.metadata` - Go |
| `rpc.grpc.response.metadata.*` | `grpc.response.metadata.*` - Python, Node.js

##### エラー {#errors}

| **名前**                       | **リマップ元**                                                                                          |
|--------------------------------|---------------------------------------------------------------------------------------------------------|
| `error.message`                  | `error.msg` - すべての言語 |

### リソースに基づいてトレースを無視する {#ignoring-traces-based-on-resources}

**ignore resources**オプションは、トレースのグローバルルートスパンが特定の基準に一致する場合にリソースを除外できるようにします。[リソースを収集から除外する][5]を参照してください。このオプションは、この特定のDatadog Agentにトレースを送信するすべてのサービスに適用されます。ignore resourcesのためにドロップされたトレースは、トレースメトリクスに含まれません。

無視するリソースを指定するには、Agentの設定ファイル`datadog.yaml`または`DD_APM_IGNORE_RESOURCES`環境変数を使用できます。以下の例を参照してください。

`datadog.yaml`を使用する：

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
## @param ignore_resources - list of strings - optional
## A list of regular expressions can be provided to exclude certain traces based on their resource name.
## All entries must be surrounded by double quotes and separated by commas.

  ignore_resources: ["(GET|POST) /healthcheck","API::NotesController#index"]
{{< /code-block >}}

`DD_APM_IGNORE_RESOURCES`を使用する：

```shell
DD_APM_IGNORE_RESOURCES="(GET|POST) /healthcheck,API::NotesController#index"
```

**注**:
- 環境変数形式（`DD_APM_IGNORE_RESOURCES`）を使用する場合、値はカンマ区切りの文字列リストとして提供する必要があります。
- Trace Agentが受け入れる正規表現の構文は、Goの[regexp][6]によって評価されます。
- デプロイ戦略によっては、特殊文字をエスケープして正規表現を調整しなければならない場合があります。
- Kubernetesで専用コンテナを使用している場合は、ignore resourceオプションの環境変数が**trace-agent**コンテナに適用されていることを確認してください。

#### 例 {#example}

トレース収集の対象としたくない`/api/healthcheck`への呼び出しを含むトレースを考えてみましょう:

{{< img src="tracing/guide/ignoring_apm_resources/ignoreresources.png" alt="SDK に無視させたいリソースのフレームグラフ" style="width:90%;">}}

グローバルルートスパンのリソース名に注意してください。

- オペレーション名: `rack.request`
- リソース名: `Api::HealthchecksController#index`
- Http.url: `/api/healthcheck`

無視リソースオプションを正しく使用するには、記述された正規表現ルールがリソース名`Api::HealthchecksController#index`と一致する必要があります。いくつかの正規表現オプションが可能ですが、このリソースからトレースを正確にフィルタリングするには、使用する可能性のある正規表現は `Api::HealthchecksController#index$` です。

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
{{% tab "Docker Compose" %}}

Datadog Agent コンテナの環境変数リストに `DD_APM_IGNORE_RESOURCES` を追加し、以下の例のようなパターンを使用します。Docker Compose には、`$` のような特殊文字を使用する際に考慮すべき独自の [変数置換][1] があります。

{{< code-block lang="yaml" >}}
    environment:
      // other Datadog Agent environment variables
      - DD_APM_IGNORE_RESOURCES=Api::HealthchecksController#index$$
{{< /code-block >}}

複数の値の場合

{{< code-block lang="yaml" >}}
    environment:
      // other Datadog Agent environment variables
      - DD_APM_IGNORE_RESOURCES="value1","Api::HealthchecksController#index$$"
{{< /code-block >}}

[1]: https://docs.docker.com/compose/compose-file/compose-file-v3/#variable-substitution
{{% /tab %}}
{{% tab "Docker run" %}}

Datadog Agent をスピンアップするための docker run コマンドに `DD_APM_IGNORE_RESOURCES` を追加します:

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
              registry.datadoghq.com/agent:latest
{{< /code-block >}}

複数の値の場合

{{< code-block lang="yaml" >}}
              -e DD_APM_IGNORE_RESOURCES=["value1","Api::HealthchecksController#index$"] \
{{< /code-block >}}

{{% /tab %}}
{{% tab "Kubernetes DaemonSet" %}}

専用の trace-agent コンテナに環境変数 `DD_APM_IGNORE_RESOURCES` を追加します:

{{< code-block lang="yaml" >}}
    - name: trace-agent
        image: "registry.datadoghq.com/agent:latest"
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

`traceAgent` ファイルの `values.yaml` セクションに `DD_APM_IGNORE_RESOURCES` を `env` セクションに追加し、その後 [通常通り helm をスピンアップします][1]。

{{< code-block lang="yaml" filename="values.yaml" >}}
    traceAgent:
      # agents.containers.traceAgent.env -- Additional environment variables for the trace-agent container
      env:
        - name: DD_APM_IGNORE_RESOURCES
          value: Api::HealthchecksController#index$

{{< /code-block >}}

複数の値の場合

{{< code-block lang="yaml" >}}
        - name: DD_APM_IGNORE_RESOURCES
          value: value1, Api::HealthchecksController#index$
{{< /code-block >}}

または、`agents.containers.traceAgent.env` を `helm install` コマンドで設定することもできます:

{{< code-block lang="shell" >}}
helm install dd-agent -f values.yaml \
  --set datadog.apiKeyExistingSecret="datadog-secret" \
  --set agents.containers.traceAgent.env[0].name=DD_APM_IGNORE_RESOURCES, \
    agents.containers.traceAgent.env[0].value="Api::HealthchecksController#index$" \
  datadog/datadog
{{< /code-block >}}

[1]: /ja/agent/kubernetes/?tab=helm#installation
{{% /tab %}}
{{% tab "Amazon ECS タスク定義" %}}

Amazon ECS を使用している場合 (例えば、EC2 上で)、Datadog Agent のコンテナ定義に環境変数 `DD_APM_IGNORE_RESOURCES` を追加し、その値が次のような JSON に評価されるようにします:

{{< code-block lang="json" >}}
    "environment": [
	// other environment variables for the Datadog Agent
        {
          "name": "DD_APM_IGNORE_RESOURCES",
          "value": "Api::HealthchecksController#index$"
        }
     ]
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger">この方法でトレースをフィルタリングすると、これらのリクエストが <a href="/tracing/guide/metrics_namespace/">トレースメトリクス</a> から削除されます。トレースメトリクスに影響を与えずに取り込みを削減する方法については、<a href="/tracing/trace_ingestion/ingestion_controls">取り込みコントロール</a>を参照してください。</div>

## トレーサーの構成 {#tracer-configuration}

一部の言語トレーサーは、Datadog Agent に送信される前にトレースを除外することができます。アプリケーション固有の要件がある場合は、このオプションを使用してください。

<div class="alert alert-warning">
1. リクエストが分散トレースに関連付けられている場合、これらのフィルタリングルールに従って部分を除外すると、結果として得られるトレースのサンプリングが不正確になる可能性があります。<br>
2. この方法でトレースをフィルタリングすると、これらのリクエストが<a href="/tracing/guide/metrics_namespace/">トレースメトリクス</a>から除外されます。トレースメトリクスに影響を与えずに取り込みを削減する方法については、<a href="/tracing/trace_ingestion/ingestion_controls">取り込みコントロール</a>を参照してください。</div>


{{< programming-lang-wrapper langs="ruby,python,nodeJS,java" >}}

{{< programming-lang lang="ruby" >}}

Rubyトレーサーには、特定の基準を満たすトレースを除去する後処理パイプラインがあります。詳細情報と例は、[トレースの後処理][1]にあります。

例えば、リソース名が`Api::HealthchecksController#index`の場合、リソース名を含むトレースを除去するために`Datadog::Tracing::Pipeline::SpanFilter`クラスを使用します。このフィルターは、[スパンオブジェクト][2]に対して利用可能な他のメタデータに基づいて一致させるためにも使用できます。

```
Datadog::Tracing.before_flush(
   Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.resource =~ /Api::HealthchecksController#index/ }
)
```

[1]: /ja/tracing/trace_collection/custom_instrumentation/ruby/?tab=activespan#post-processing-traces
[2]: /ja/tracing/trace_collection/dd_libraries/ruby/#manual-instrumentation
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Pythonトレーサーは、不要なトレースをフィルタリングするオプションを提供します：

### カスタムフィルターの使用 {#using-custom-filters}

高度なユースケースでは、カスタムフィルターを作成できます：

```py
from ddtrace.trace import tracer
from ddtrace.trace import TraceFilter
import re

class CustomFilter(TraceFilter):
    def __init__(self, pattern):
        self.pattern = re.compile(pattern)

    def process_trace(self, trace):
        for span in trace:
            if span.get_tag('http.url') and self.pattern.match(span.get_tag('http.url')):
                return None  # Drop the trace
        return trace  # Keep the trace

# Configure the SDK with your custom filter
tracer.configure(trace_processors=[CustomFilter(r'http://.*/healthcheck$')])
```

{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

[Http][1]プラグインにブロックリストを設定します。APIドキュメントからブロックリストが一致する内容に注意してください。例えば、受信するHttpリクエストはURLパスに一致するため、トレースの`http.url`スパンタグが`http://<domain>/healthcheck`の場合、`healthcheck`URLに一致するルールを書きます：


```
const tracer = require('dd-trace').init();
tracer.use('http', {
  // incoming http requests match on the path
  server: {
    blocklist: ['/healthcheck']
  },
  // outgoing http requests match on a full URL
  client: {
    blocklist: ['https://telemetry.example.org/api/v1/record']
  }
})

//import http

```
<div class="alert alert-info">統合のSDK構成は、<em>その計測モジュールがインポートされる</em>前に来る必要があります。</div>

[1]: https://datadoghq.dev/dd-trace-js/interfaces/export_.plugins.connect.html#blocklist
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

Javaトレーサーには、特定のスパンをフィルタリングするためのカスタム`TraceInterceptor`オプションがあります。[トレーサーの拡張][1]を参照してください。

たとえば、リソース名が`GET /healthcheck`の場合、このリソース名を含むトレースをドロップするトレースインターセプターを作成してください。あなたのケースに合うようにロジックを調整してください。

```
public class GreetingController {
   static {
       // In a class static block to avoid initializing multiple times.
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


[1]: /ja/help/
[2]: /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[3]: /ja/tracing/guide/metrics_namespace/
[4]: /ja/tracing/trace_ingestion/ingestion_controls
[5]: /ja/tracing/configure_data_security/?tab=mongodb#exclude-resources-from-being-collected
[6]: https://golang.org/pkg/regexp/