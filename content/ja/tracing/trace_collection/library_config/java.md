---
code_lang: java
code_lang_weight: 0
further_reading:
- link: https://github.com/DataDog/dd-trace-java
  tag: GitHub
  text: Datadog Java APM ソースコード
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースを調査する
- link: /tracing/trace_collection/trace_context_propagation/java/
  tag: Documentation
  text: ヘッダーを使ったトレースコンテキストの伝搬
title: Java トレーシングライブラリの構成
type: multi-code-lang
---

コードを使用してトレーシングライブラリをセットアップし、APM データを収集するように Agent を構成した後、オプションで[統合サービスタグ付け][1]のセットアップなど、必要に応じてトレーシングライブラリを構成してください。

以下のすべてのコンフィギュレーションオプションには、同等のシステムプロパティと環境変数があります。
両方に同じキータイプが設定されている場合は、システムプロパティコンフィギュレーションが優先されます。
システムプロパティは、JVM フラグとして設定できます。

注: Java トレーサーのシステムプロパティを使用する場合は、JVM オプションとして読み込まれるように、`-jar` の前にリストされていることを確認してください。


`dd.service`
: **環境変数**: `DD_SERVICE`<br>
**デフォルト**: `unnamed-java-app`<br>
同一のジョブを実行するプロセスセットの名前。アプリケーションの統計のグループ化に使われます。バージョン 0.50.1 以降で利用可能。

`dd.tags`
: **環境変数**: `DD_TAGS`<br>
**デフォルト**: `null`<br>
**例**: `layer:api,team:intake,key:value`<br>
すべてのスパン、プロファイル、JMX メトリクスに追加されるデフォルトタグのリスト。DD_ENV または DD_VERSION が使用される場合、DD_TAGS で定義される env または version タグをオーバーライドします。バージョン 0.50.0 以降で利用可能。

`dd.env`
: **環境変数**: `DD_ENV`<br>
**デフォルト**: `none`<br>
アプリケーション環境 (例: production、staging)。0.48 以降のバージョンで利用可能。

`dd.version`
: **環境変数**: `DD_VERSION`<br>
**デフォルト**: `null`<br>
アプリケーションバージョン (例: 2.5、202003181415、1.3-alpha)。0.48 以降のバージョンで利用可能。

`dd.logs.injection`
: **環境変数**: `DD_LOGS_INJECTION`<br>
**デフォルト**: `true`<br>
Datadog のトレース ID とスパン ID に対する MDC キーの自動挿入を有効にします。詳細については、[高度な使用方法][2]を参照してください。<br><br>
**ベータ版**: バージョン 1.18.3 から、このサービスが実行される場所で [Agent リモート構成][16]が有効になっている場合、[サービスカタログ][17] UI で `DD_LOGS_INJECTION` を設定できます。

`dd.trace.config`
: **環境変数**: `DD_TRACE_CONFIG`<br>
**デフォルト**: `null`<br>
構成プロパティが行ごとに 1 つ提供されている、ファイルへのオプションパス。たとえば、ファイルパスは `-Ddd.trace.config=<ファイルパス>.properties` 経由として、ファイルのサービス名に `dd.service=<SERVICE_NAME>` を設定して提供することができます。

`dd.service.mapping`
: **環境変数**: `DD_SERVICE_MAPPING`<br>
**デフォルト**: `null`<br>
**例**: `mysql:my-mysql-service-name-db, postgresql:my-postgres-service-name-db`<br>
コンフィギュレーション経由でサービス名を動的に変更します。サービス間でデータベースの名前を区別する場合に便利です。

`dd.writer.type`
: **環境変数**: `DD_WRITER_TYPE`<br>
**デフォルト**: `DDAgentWriter`<br>
デフォルト値はトレースを Agent に送信します。代わりに `LoggingWriter` で構成すると、トレースがコンソールに書き出されます。

`dd.agent.host`
: **環境変数**: `DD_AGENT_HOST`<br>
**デフォルト**: `localhost`<br>
トレースの送信先のホスト名。コンテナ化された環境を使う場合は、これを構成してホスト IP にします。詳しくは、[Docker アプリケーションのトレース][3]を参照してください。

`dd.trace.agent.port`
: **環境変数**: `DD_TRACE_AGENT_PORT`<br>
**デフォルト**: `8126`<br>
構成されたホストに対して Agent がリッスンしているポート番号。[Agent 構成][4]で `receiver_port` または `DD_APM_RECEIVER_PORT` をデフォルトの `8126` 以外に設定した場合、`dd.trace.agent.port` または `dd.trace.agent.url` はそれに合わせる必要があります。

`dd.trace.agent.unix.domain.socket`
: **環境変数**: `DD_TRACE_AGENT_UNIX_DOMAIN_SOCKET`<br>
**デフォルト**: `null`<br>
これは、トレーストラフィックをプロキシに送り、その後リモート Datadog Agent に送信するために使うことができます。

`dd.trace.agent.url`
: **環境変数**: `DD_TRACE_AGENT_URL`<br>
**デフォルト**: `null`<br>
トレースを送信するための URL。[Agent 構成][4]で `receiver_port` または `DD_APM_RECEIVER_PORT` をデフォルトの `8126` 以外に設定した場合、`dd.trace.agent.port` または `dd.trace.agent.url` をそれに合わせる必要があります。URL の値は、HTTP で接続する場合は `http://` で始まり、Unixドメインソケットを使用する場合は `unix://` で始まることができます。この設定は `DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT` よりも優先されます。バージョン 0.65+ で利用可能です。

`dd.trace.agent.timeout`
: **環境変数**: `DD_TRACE_AGENT_TIMEOUT`<br>
**デフォルト**: `10`<br>
Datadog Agent とのネットワークインタラクションのタイムアウト (秒)。

`dd.trace.header.tags`
: **環境変数**: `DD_TRACE_HEADER_TAGS`<br>
**デフォルト**: `null`<br>
**例**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
大文字・小文字を区別しないヘッダーキーとタグ名のマップを受け取り、一致するヘッダー値を自動的にタグとしてトレースに適用します。また、タグ名を指定しないエントリーも受け入れ、それぞれ `http.request.headers.<header-name>` と `http.response.headers.<header-name>` という形式のタグに自動的にマップされます。<br><br>
バージョン 0.96.0 以前は、この設定はリクエストヘッダータグにのみ適用されました。以前の動作に戻すには、設定 `-Ddd.trace.header.tags.legacy.parsing.enabled=true` または環境変数 `DD_TRACE_HEADER_TAGS_LEGACY_PARSING_ENABLED=true` を追加することで可能です。<br><br>
**ベータ版**: バージョン 1.18.3 から、このサービスが実行される場所で [Agent リモート構成][16]が有効になっている場合、[サービスカタログ][17] UI で `DD_TRACE_HEADER_TAGS` を設定できます。

`dd.trace.request_header.tags`
: **環境変数**: `DD_TRACE_REQUEST_HEADER_TAGS`<br>
**デフォルト**: `null`<br>
**例**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
大文字・小文字を区別しないヘッダーキーとタグ名のマップを受け取り、一致するリクエストヘッダー値を自動的にタグとしてトレースに適用します。また、タグ名を指定しないエントリーも受け入れ、`http.request.headers.<header-name>` という形式のタグに自動的にマップされます。<br>
バージョン 0.96.0 以降で利用可能です。

`dd.trace.response_header.tags`
: **環境変数**: `DD_TRACE_RESPONSE_HEADER_TAGS`<br>
**デフォルト**: `null`<br>
**例**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
大文字・小文字を区別しないヘッダーキーとタグ名のマップを受け取り、一致するレスポンスヘッダー値を自動的にタグとしてトレースに適用します。また、タグ名を指定しないエントリーも受け入れ、`http.response.headers.<header-name>` という形式のタグに自動的にマップされます。<br>
バージョン 0.96.0 以降で利用可能です。

`dd.trace.header.baggage`
: **環境変数**: `DD_TRACE_HEADER_BAGGAGE`<br>
**デフォルト**: `null`<br>
**例**: `CASE-insensitive-Header:my-baggage-name,User-ID:userId,My-Header-And-Baggage-Name`<br>
<br>大文字・小文字を区別しないヘッダキーとバゲッジキーのマップを受け取り、 一致したリクエストヘッダ値をトレース時にバゲッジとして自動的に適用します。伝搬時には、逆のマッピングが適用されます。バゲッジはヘッダーにマップされます。
バージョン 1.3.0 以降で利用可能です。

`dd.trace.annotations`
: **環境変数**: `DD_TRACE_ANNOTATIONS`<br>
**デフォルト**: ([listed here][5])<br>
**例**: `com.some.Trace;io.other.Trace`<br>
`@Trace` として処理するメソッドアノテーションのリスト。

`dd.trace.methods`
: **環境変数**: `DD_TRACE_METHODS`<br>
**デフォルト**: `null`<br>
**例**: `package.ClassName[method1,method2,...];AnonymousClass$1[call];package.ClassName[*]`<br>
トレースするクラス/インターフェイスとメソッドのリスト。`@Trace` の追加と似ていますが、コードの変更はありません。**注:** ワイルドカード型メソッドのサポート (`[*]`) は、コンストラクター、get アクセス操作子、set アクセス操作子、synthetic、toString、等号、ハッシュコード、またはファイナライザーメソッドのコールに対応しません。

`dd.trace.classes.exclude`
: **環境変数**: `DD_TRACE_CLASSES_EXCLUDE`<br>
**デフォルト**: `null`<br>
**例**: `package.ClassName,package.ClassName$Nested,package.Foo*,package.other.*`<br>
トレーサーによって無視される (変更されない) 完全修飾クラス (プレフィックスを示すワイルドカードで終わる場合があります) のリスト。名前には jvm 内部表現を使用する必要があります (例: package.ClassName$Nested and not package.ClassName.Nested)

`dd.trace.partial.flush.min.spans`
: **環境変数**: `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`<br>
**デフォルト**: `1000`<br>
フラッシュする部分スパンの数を設定します。大量のトラフィック処理や長時間のトレース実行時にメモリのオーバーヘッドを軽減する際に役立ちます。

`dd.trace.split-by-tags`
: **環境変数**: `DD_TRACE_SPLIT_BY_TAGS`<br>
**デフォルト**: `null`<br>
**例**: `aws.service`<br>
対応するスパンタグで特定されるよう、スパンに関連付けられたサービス名の名前を変更するために使われます

`dd.trace.db.client.split-by-instance` 
: **環境変数**: `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` <br>
**デフォルト**: `false`<br>
`true` に設定すると、db スパンにインスタンス名がサービス名として割り当てられます

`dd.trace.elasticsearch.body.enabled`
: **環境変数**: `DD_TRACE_ELASTICSEARCH_BODY_ENABLED` <br>
**デフォルト**: `false`<br>
`true` に設定すると、Elasticsearch と OpenSearch のスパンに body が追加されます。

`dd.trace.elasticsearch.params.enabled`
: **環境変数**: `DD_TRACE_ELASTICSEARCH_PARAMS_ENABLED` <br>
**デフォルト**: `true`<br>
`true` に設定すると、Elasticsearch と OpenSearch のスパンに query string パラメーターが追加されます。

`dd.trace.health.metrics.enabled`
: **環境変数**: `DD_TRACE_HEALTH_METRICS_ENABLED`<br>
**デフォルト**: `true`<br>
`true` に設定すると、トレーサーヘルスメトリクスが送信されます

`dd.trace.health.metrics.statsd.host`
: **環境変数**: `DD_TRACE_HEALTH_METRICS_STATSD_HOST`<br>
**デフォルト**: `dd.jmxfetch.statsd.host` と同じ<br>
ヘルスメトリクスの送信先の Statsd ホスト

`dd.trace.health.metrics.statsd.port`
: **環境変数**: `DD_TRACE_HEALTH_METRICS_STATSD_PORT`<br>
**デフォルト**: `dd.jmxfetch.statsd.port` と同じ<br>
ヘルスメトリクスの送信先の Statsd ポート

`dd.http.client.tag.query-string`
: **環境変数**: `DD_HTTP_CLIENT_TAG_QUERY_STRING`<br>
**デフォルト**: `false`<br>
`true` に設定すると、クエリ文字列パラメーターとフラグメントが Web クライアントスパンに追加されます

`dd.http.client.error.statuses`
: **環境変数**: `DD_HTTP_CLIENT_ERROR_STATUSES`<br>
**デフォルト**: `400-499`<br>
許容可能なエラーの範囲。デフォルトで 4xx エラーは HTTP クライアントのエラーとしてレポートされます。この構成はこれをオーバーライドします。例: `dd.http.client.error.statuses=400-403,405,410-499`

`dd.http.server.error.statuses`
: **環境変数**: `DD_HTTP_SERVER_ERROR_STATUSES`<br>
**デフォルト**: `500-599`<br>
許容可能なエラーの範囲。デフォルトで 5xx ステータスコードは HTTP サーバーのエラーとしてレポートされます。この構成はこれをオーバーライドします。例: `dd.http.server.error.statuses=500,502-599`

`dd.http.server.tag.query-string`
: **環境変数**: `DD_HTTP_SERVER_TAG_QUERY_STRING`<br>
**デフォルト**: `true`<br>
`true` に設定すると、クエリ文字列パラメーターとフラグメントが Web サーバースパンに追加されます

`dd.http.server.route-based-naming`
: **環境変数**: `DD_HTTP_SERVER_ROUTE_BASED_NAMING`<br>
**デフォルト**: `true`<br>
`false` に設定すると、http フレームワークのルートはリソース名に使用されません。_この場合、変更されるとリソース名と派生メトリクスが変更される可能性があります。_

`dd.trace.enabled`
: **環境変数**: `DD_TRACE_ENABLED`<br>
**デフォルト**: `true`<br>
`false` の場合、トレース Agent は無効になります。

`dd.jmxfetch.enabled`
: **環境変数**: `DD_JMXFETCH_ENABLED`<br>
**デフォルト**: `true`<br>
Java トレース Agent による JMX メトリクスの収集を有効にします。

`dd.jmxfetch.config.dir`
: **環境変数**: `DD_JMXFETCH_CONFIG_DIR`<br>
**デフォルト**: `null`<br>
**例**: `/path/to/directory/etc/conf.d`<br>
JMX メトリクスコレクションの追加構成ディレクトリ。Java Agent は `yaml` ファイルの `instance` セクションの `jvm_direct:true` を探して構成を変更します。

`dd.jmxfetch.config`
: **環境変数**: `DD_JMXFETCH_CONFIG`<br>
**デフォルト**: `null`<br>
**例**: `path/to/file/conf.yaml,other/path/to/file/conf.yaml`<br>
JMX メトリクスコレクションの追加メトリクスコンフィギュレーションファイル。Java Agent は `yaml` ファイルの `instance` セクションの `jvm_direct:true` を探して構成を変更します。

`dd.jmxfetch.check-period`
: **環境変数**: `DD_JMXFETCH_CHECK_PERIOD`<br>
**デフォルト**: `1500`<br>
JMX メトリクスの送信頻度 (ms)。

`dd.jmxfetch.refresh-beans-period`
: **環境変数**: `DD_JMXFETCH_REFRESH_BEANS_PERIOD`<br>
**デフォルト**: `600`<br>
利用可能な JMX Bean のリストのリフレッシュ頻度 (秒)。

`dd.jmxfetch.statsd.host`
: **環境変数**: `DD_JMXFETCH_STATSD_HOST`<br>
**デフォルト**: `agent.host` と同じ<br>
JMX メトリクスの送信先の Statsd ホスト。Unix Domain Sockets を使用している場合、'unix://PATH_TO_UDS_SOCKET' のような引数を使用します。例: `unix:///var/datadog-agent/dsd.socket`

`dd.jmxfetch.statsd.port`
: **環境変数**: `DD_JMXFETCH_STATSD_PORT`<br>
**デフォルト**: `8125`<br>
JMX メトリクスの送信先の StatsD ポート。Unix Domain Sockets を使用している場合、0 を入力します。

`dd.trace.obfuscation.query.string.regexp`
: **環境変数**: `DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`<br>
**デフォルト**: `null`<br>
`http.url` タグで報告されるリクエストのクエリ文字列から機密データを削除するための正規表現 (マッチした場合は <redacted> に置き換え)。

`dd.integration.opentracing.enabled`
: **環境変数**: `DD_INTEGRATION_OPENTRACING_ENABLED`<br>
**デフォルト**: `true`<br>
デフォルトで、トレーシングクライアントは GlobalTracer がロードされており、トレーサーを動的に登録しているかどうかを検出します。これを false に設定すると、OpenTracing 上のトレーサーの依存関係がすべて消去されます。

`dd.hystrix.tags.enabled`
: **環境変数**: `DD_HYSTRIX_TAGS_ENABLED`<br>
**デフォルト**: `false`<br>
デフォルトでは、Hystrix のグループ、コマンド、サーキット状態のタグは有効になっていません。このプロパティにより有効になります。

`dd.trace.servlet.async-timeout.error` 
: **環境変数**: `DD_TRACE_SERVLET_ASYNC_TIMEOUT_ERROR` <br>
**デフォルト**: `true`<br>
デフォルトでは、長時間実行されている非同期リクエストはエラーとしてマークされます。この値を false に設定すると、すべてのタイムアウトを成功したリクエストとしてマークできます。

`dd.trace.startup.logs`
: **環境変数**: `DD_TRACE_STARTUP_LOGS`<br>
**デフォルト**: `true`<br>
`false` の場合は起動ログの収集が無効化されます。バージョン 0.64 以上で使用可能です。

`dd.trace.servlet.principal.enabled`
: **環境変数**: `DD_TRACE_SERVLET_PRINCIPAL_ENABLED`<br>
**デフォルト**: `false`<br>
`true` の場合は、ユーザープリンシパルが収集されます。バージョン 0.61 以降で使用可能です。

`dd.instrumentation.telemetry.enabled`
: **環境変数**: `DD_INSTRUMENTATION_TELEMETRY_ENABLED`<br>
**デフォルト**: `true`<br>
`true` の場合、トレーサーは[テレメトリーデータ][6]を収集します。バージョン 0.104+ で利用可能です。バージョン 0.115+ では `true` がデフォルトとなります。

**注**:

- 両方に同じキータイプが設定された場合、システムプロパティ構成が優先されます。
- システムプロパティは JVM パラメーターとして使用できます。
- デフォルトで、アプリケーションからの JMX メトリクスは、DogStatsD によりポート `8125` で Datadog Agent に送信されます。[DogStatsD が Agent に対して有効になっている][7]ことを確認してください。

  - Agent をコンテナとして実行している場合は、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` が [`true` に設定されている][8]ことと、Agent コンテナでポート `8125` が開いていることを確認してください。
  - Kubernetes の場合は、[DogStatsD ポートをホストポートにバインドします][9]。ECS の場合は、[タスク定義で適当なフラグを設定します][10]。

### インテグレーション

インテグレーションを無効にする方法については、[インテグレーション][11]の互換性セクションを参照してください。

### 例

#### `dd.service.mapping`

**システムプロパティの例**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.service.mapping=postgresql:web-app-pg -jar path/to/application.jar
```

{{< img src="tracing/setup/java/service_mapping.png" alt="サービスマッピング" >}}

#### `dd.tags`

**スパンと JMX メトリクスにグローバルな env を設定**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_global_tags.png" alt="グローバルタグのトレース" >}}

#### `dd.trace.span.tags`

**すべてのスパンに project:test を追加する例**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_span_tags.png" alt="スパンタグのトレース" >}}

#### `dd.trace.jmx.tags`

**JMX メトリクスに custom.type:2 を設定**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -Ddd.trace.jmx.tags=custom.type:2 -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_jmx_tags.png" alt="JMX タグのトレース" >}}

#### `dd.trace.methods`

**システムプロパティの例**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.methods="hello.GreetingController[doSomeStuff,doSomeOtherStuff];hello.Randomizer[randomize]" -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_methods.png" alt="メソッドのトレース" >}}

#### `dd.trace.db.client.split-by-instance`

システムプロパティの例:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.env=dev -Ddd.service=web-app -Ddd.trace.db.client.split-by-instance=TRUE -jar path/to/application.jar
```

これで、DB インスタンス 1 である `webappdb` に、`db.instance` スパンのメタデータと同じサービス名が付けられます。

{{< img src="tracing/setup/java/split_by_instance_1.png" alt="インスタンス 1" >}}

これで、DB インスタンス 2 である `secondwebappdb` に、`db.instance` スパンのメタデータと同じサービス名が付けられます。

{{< img src="tracing/setup/java/split_by_instance_2.png" alt="インスタンス 2" >}}

同様に、サービスマップで、1 つの Web アプリが 2 つの異なる Postgres データベースに呼び出しを行っていることがわかります。

#### `dd.http.server.tag.query-string`

システムプロパティの例:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.http.server.tag.query-string=TRUE -jar path/to/application.jar
```

{{< img src="tracing/setup/java/query_string.png" alt="クエリ文字列" >}}

#### `dd.trace.enabled`

**システムプロパティとデバッグアプリのモードの例**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.trace.enabled=false -Ddatadog.slf4j.simpleLogger.defaultLogLevel=debug -jar path/to/application.jar
```

デバッグアプリのログに、`Tracing is disabled, not installing instrumentations.` と表示されます。

#### `dd.jmxfetch.config.dir` と `dd.jmxfetch.config`

構成サンプル

- 以下のいずれかのコンビネーションを使用: `DD_JMXFETCH_CONFIG_DIR=<ディレクトリパス>` + `DD_JMXFETCH_CONFIG=conf.yaml`
- または直接指定: `DD_JMXFETCH_CONFIG=<DIRECTORY_PATH>/conf.yaml`

`conf.yaml` で以下の内容を使用します。

```yaml
init_config:
instances:
    - jvm_direct: true
      port: '<PORT>'
      conf:
          - include:
                bean:
                    - java.lang:type=MemoryPool,name=Metaspace
                attribute:
                    Usage.used:
                        metric_type: gauge
                        alias: sb.usage.used
```

次の結果が生成されます。

{{< img src="tracing/setup/java/jmxfetch_example.png" alt="JMX のフェッチ例" >}}

JMX フェッチを使った Java メトリクス収集についての詳細は [Java インテグレーションドキュメント][12]を参照してください。
### ヘッダーの抽出と挿入

有効な値と以下の構成オプションの使用に関する情報については、[Java トレースコンテキストの伝播][13]を参照してください。

`dd.trace.propagation.style.inject`
: **環境変数**: `DD_TRACE_PROPAGATION_STYLE_INJECT`<br>
**デフォルト**: `datadog`<br>
サービス間で分散型トレーシングを伝播するために含めるべきヘッダー形式のカンマ区切りリスト。<br>
バージョン 1.9.0 以降で利用可能

`dd.trace.propagation.style.extract`
: **環境変数**: `DD_TRACE_PROPAGATION_STYLE_EXTRACT`<br>
**デフォルト**: `datadog`<br>
分散型トレーシングの伝播データの抽出を試みるヘッダーフォーマットのカンマ区切りのリスト。完全で有効なヘッダーを持つ最初のフォーマットが、トレースを継続するために定義するために使用されます。<br>
バージョン 1.9.0 以降で利用可能

`dd.trace.propagation.style`
: **環境変数**: `DD_TRACE_PROPAGATION_STYLE`<br>
**デフォルト**: `datadog`<br>
分散型トレーシングの伝播データの挿入および抽出を試みるヘッダーフォーマットのカンマ区切りのリスト。完全で有効なヘッダーを持つ最初のフォーマットが、トレースを継続するために定義するために使用されます。より具体的な `dd.trace.propagation.style.inject` と `dd.trace.propagation.style.extract` の構成が存在する場合は、そちらが優先されます。<br>
バージョン 1.9.0 以降で利用可能

#### 非推奨の抽出と挿入の設定

これらの抽出と挿入の設定は廃止され、バージョン 1.9.0 以降では `dd.trace.propagation.style.inject`、`dd.trace.propagation.style.extract`、`dd.trace.propagation.style` の設定に変更されました。[Java トレースコンテキストの伝播][13]を参照してください。B3 マルチヘッダーと B3 シングルヘッダーに対する以前の `b3` 設定は、新しい `b3multi` と `b3single` 設定に置き換えられました。

`dd.propagation.style.inject`
: **環境変数**: `DD_PROPAGATION_STYLE_INJECT`<br>
**デフォルト**: `datadog`<br>
サービス間で分散型トレーシングを伝播するために含めるべきヘッダー形式のカンマ区切りリスト。<br>
バージョン 1.9.0 以降、非推奨

`dd.propagation.style.extract`
: **環境変数**: `DD_PROPAGATION_STYLE_EXTRACT`<br>
**デフォルト**: `datadog`<br>
分散型トレーシングの伝播データの抽出を試みるヘッダーフォーマットのカンマ区切りのリスト。完全で有効なヘッダーを持つ最初のフォーマットが、トレースを継続するために定義するために使用されます。<br>
バージョン 1.9.0 以降、非推奨

### 試験機能

以下の構成オプションは現在利用可能な機能向けですが、今後のリリースで変更される場合があります。

`dd.integration.opentelemetry.experimental.enabled`
: **環境変数**: `DD_INTEGRATION_OPENTELEMETRY_EXPERIMENTAL_ENABLED`<br>
**デフォルト**: `false`<br>
OpenTelemetry の試験機能を有効にします。この設定を有効にすると、Datadog Trace Agent によって支えられた OpenTelemetry トレーシング API を使用できます。<br>
バージョン 1.10.0 以降で利用可能

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging/
[2]: /ja/agent/logs/advanced_log_collection
[3]: /ja/tracing/setup/docker/
[4]: /ja/agent/guide/network/#configure-ports
[5]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[6]: /ja/tracing/configure_data_security/#telemetry-collection
[7]: /ja/developers/dogstatsd/#setup
[8]: /ja/agent/docker/#dogstatsd-custom-metrics
[9]: /ja/developers/dogstatsd/
[10]: /ja/agent/amazon_ecs/#create-an-ecs-task
[11]: /ja/tracing/compatibility_requirements/java#disabling-integrations
[12]: /ja/integrations/java/?tab=host#metric-collection
[13]: /ja/tracing/trace_collection/trace_context_propagation/java/
[16]: /ja/agent/remote_config/
[17]: https://app.datadoghq.com/services