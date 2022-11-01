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
kind: documentation
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
**例**: `layer:api,team:intake`<br>
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
Datadog トレース ID とスパン ID に対する自動 MDC キー挿入の有効化。詳しくは、[高度な使用方法][2]を参照してください。

`dd.trace.config`
: **環境変数**: `DD_TRACE_CONFIG`<br>
**デフォルト**: `null`<br>
構成プロパティが行ごとに 1 つ提供されている、ファイルへのオプションパス。たとえば、ファイルパスは `-Ddd.trace.config=<ファイルパス>.properties` 経由として、ファイルのサービス名に `dd.service=<SERVICE_NAME>` を設定して提供することができます。

`dd.service.mapping`
: **環境変数**: `DD_SERVICE_MAPPING`<br>
**デフォルト**: `null`<br>
**例**: `mysql:my-mysql-service-name-db, postgres:my-postgres-service-name-db`<br>
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
構成されたホストに対して Agent がリッスンしているポート番号。

`dd.trace.agent.unix.domain.socket`
: **環境変数**: `DD_TRACE_AGENT_UNIX_DOMAIN_SOCKET`<br>
**デフォルト**: `null`<br>
これは、トレーストラフィックをプロキシに送り、その後リモート Datadog Agent に送信するために使うことができます。

`dd.trace.agent.url`
: **環境変数**: `DD_TRACE_AGENT_URL`<br>
**デフォルト**: `null`<br>
トレースを送信する URL。`http://` (HTTP を使用) もしくは `unix://` (Unix ドメインソケットを使用) のいずれかで始まります。この設定は `DD_AGENT_HOST` および `DD_TRACE_AGENT_PORT` よりも優先されます。バージョン 0.65 以上で使用可能です。

`dd.trace.agent.timeout`
: **環境変数**: `DD_TRACE_AGENT_TIMEOUT`<br>
**デフォルト**: `10`<br>
Datadog Agent とのネットワークインタラクションのタイムアウト (秒)。

`dd.trace.header.tags`
: **環境変数**: `DD_TRACE_HEADER_TAGS`<br>
**デフォルト**: `null`<br>
**例**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
大文字・小文字を区別しないヘッダーキーとタグ名のマップを受け取り、一致するヘッダー値を自動的にタグとしてトレースに適用します。また、タグ名を指定しないエントリーも受け入れ、それぞれ `http.request.headers.<header-name>` と `http.response.headers.<header-name>` という形式のタグに自動的にマップされます。<br><br>
バージョン 0.96.0 以前は、この設定はリクエストヘッダータグにのみ適用されました。以前の動作に戻すには、`Ddd.trace.header.tags.legacy.parsing.enabled=true` を追加するか、環境変数 `DD_TRACE_HEADER_TAGS_LEGACY_PARSING_ENABLED=true` を設定することで可能です。

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

`dd.trace.annotations`
: **環境変数**: `DD_TRACE_ANNOTATIONS`<br>
**デフォルト**: ([listed here][4])<br>
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
`true` に設定すると、クエリ文字列パラメーターとフラグメントがウェブクライアントスパンに追加されます

`dd.http.client.error.statuses`
: **環境変数**: `DD_HTTP_CLIENT_ERROR_STATUSES`<br>
**デフォルト**: `400-499`<br>
許容可能なエラーの範囲。デフォルトで 4xx エラーは HTTP クライアントのエラーとしてレポートされます。このコンフィギュレーションはこれをオーバーライドします。例: `dd.http.client.error.statuses=400-403,405,410-499`

`dd.http.server.error.statuses`
: **環境変数**: `DD_HTTP_SERVER_ERROR_STATUSES`<br>
**デフォルト**: `500-599`<br>
許容可能なエラーの範囲。デフォルトで 5xx ステータスコードは HTTP サーバーのエラーとしてレポートされます。このコンフィギュレーションはこれをオーバーライドします。例: `dd.http.server.error.statuses=500,502-599`

`dd.http.server.tag.query-string`
: **環境変数**: `DD_HTTP_SERVER_TAG_QUERY_STRING`<br>
**デフォルト**: `false`<br>
`true` に設定すると、クエリ文字列パラメーターとフラグメントがウェブサーバースパンに追加されます

`dd.trace.enabled`
: **環境変数**: `DD_TRACE_ENABLED`<br>
**デフォルト**: `true`<br>
`false` トレースエージェントが無効の時

`dd.jmxfetch.enabled`
: **環境変数**: `DD_JMXFETCH_ENABLED`<br>
**デフォルト**: `true`<br>
Java トレースエージェントによる JMX メトリクスの収集を有効にします。

`dd.jmxfetch.config.dir`
: **環境変数**: `DD_JMXFETCH_CONFIG_DIR`<br>
**デフォルト**: `null`<br>
**例**: `/path/to/directory/etc/conf.d`<br>
JMX メトリクスコレクションの追加構成ディレクトリ。Java エージェントは `yaml` ファイルの `instance` セクションの `jvm_direct:true` を探してコンフィギュレーションを変更します。

`dd.jmxfetch.config`
: **環境変数**: `DD_JMXFETCH_CONFIG`<br>
**デフォルト**: `null`<br>
**例**: `path/to/file/conf.yaml,other/path/to/file/conf.yaml`<br>
JMX メトリクスコレクションの追加メトリクス構成ファイル。Java エージェントは `yaml` ファイルの `instance` セクションの `jvm_direct:true` を探してコンフィギュレーションを変更します。

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

`dd.integration.opentracing.enabled`
: **環境変数**: `DD_INTEGRATION_OPENTRACING_ENABLED`<br>
**デフォルト**: `true`<br>
デフォルトで、トレーシングクライアントは GlobalTracer がロードされており、トレーサーを動的に登録しているかどうかを検知します。これを false に設定すると、OpenTracing 上のトレーサーの依存関係がすべて消去されます。

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


**注**:

- 両方に同じキータイプが設定された場合、システムプロパティコンフィギュレーションが優先されます。
- システムプロパティは JVM パラメーターとして使用できます。
- デフォルトで、アプリケーションからの JMX メトリクスは、DogStatsD によりポート `8125` で Datadog Agent に送信されます。[DogStatsD が Agent に対して有効になっている][5]ことを確認してください。

  - Agent をコンテナとして実行している場合は、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` が [`true` に設定されている][6]ことと、Agent コンテナでポート `8125` が開いていることを確認してください。
  - Kubernetes の場合は、[DogStatsD ポートをホストポートにバインドします][7]。ECS の場合は、[タスク定義で適当なフラグを設定します][2]。

### インテグレーション

インテグレーションを無効にする方法については、[インテグレーション][8]の互換性セクションを参照してください。

### 例

#### `dd.service.mapping`

**システムプロパティの例**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.service.mapping=postgresql:web-app-pg -jar path/to/application.jar
```

{{< img src="tracing/setup/java/service_mapping.png" alt="サービスマッピング"  >}}

#### `dd.tags`

**スパンと JMX メトリクスにグローバルな env を設定**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_global_tags.png" alt="グローバルタグのトレース"  >}}

#### `dd.trace.span.tags`

**すべてのスパンに project:test を追加する例**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_span_tags.png" alt="スパンタグのトレース"  >}}

#### `dd.trace.jmx.tags`

**JMX メトリクスに custom.type:2 を設定**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -Ddd.trace.jmx.tags=custom.type:2 -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_jmx_tags.png" alt="JMX タグのトレース"  >}}

#### `dd.trace.methods`

**システムプロパティの例**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.methods="hello.GreetingController[doSomeStuff,doSomeOtherStuff];hello.Randomizer[randomize]" -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_methods.png" alt="メソッドのトレース"  >}}

#### `dd.trace.db.client.split-by-instance`

システムプロパティの例:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.env=dev -Ddd.service=web-app -Ddd.trace.db.client.split-by-instance=TRUE -jar path/to/application.jar
```

これで、DB インスタンス 1 である `webappdb` に、`db.instance` スパンのメタデータと同じサービス名が付けられます:

{{< img src="tracing/setup/java/split_by_instance_1.png" alt="インスタンス 1"  >}}

これで、DB インスタンス 2 である `secondwebappdb` に、`db.instance` スパンのメタデータと同じサービス名が付けられます:

{{< img src="tracing/setup/java/split_by_instance_2.png" alt="インスタンス 2"  >}}

同様に、サービスマップで、1 つの Web アプリが 2 つの異なる Postgres データベースに呼び出しを行っていることがわかります。

#### `dd.http.server.tag.query-string`

システムプロパティの例:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.http.server.tag.query-string=TRUE -jar path/to/application.jar
```

{{< img src="tracing/setup/java/query_string.png" alt="クエリ文字列"  >}}

#### `dd.trace.enabled`

**システムプロパティとデバッグアプリのモードの例**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.trace.enabled=false -Ddatadog.slf4j.simpleLogger.defaultLogLevel=debug -jar path/to/application.jar
```

デバッグアプリのログに、`Tracing is disabled, not installing instrumentations.` と表示されます。

#### `dd.jmxfetch.config.dir` and `dd.jmxfetch.config`

構成サンプル

- 以下のいずれかのコンビネーションを使用: `DD_JMXFETCH_CONFIG_DIR=<ディレクトリパス>` + `DD_JMXFETCH_CONFIG=conf.yaml`
- または直接指定: `DD_JMXFETCH_CONFIG=<ディレクトリパス>/conf.yaml`

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

{{< img src="tracing/setup/java/jmxfetch_example.png" alt="JMX のフェッチ例"  >}}

JMX フェッチを使った Java メトリクス収集についての詳細は [Java インテグレーションドキュメント][9]を参照してください。

### B3 ヘッダーの抽出と挿入

Datadog APM トレーサーは、分散型トレーシングの [B3 ヘッダーの抽出][10]と挿入をサポートしています。

分散したヘッダーの挿入と抽出は、挿入/抽出スタイルを構成することで制御されます。現在、次の 2 つのスタイルがサポートされています:

- Datadog: `Datadog`
- B3: `B3`

挿入スタイルは次を使って構成できます:

- システムプロパティ: `-Ddd.propagation.style.inject=Datadog,B3`
- 環境変数: `DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

プロパティまたは環境変数の値は、挿入が有効になっているヘッダースタイルのカンマ (またはスペース) 区切りリストです。デフォルトでは、Datadog 挿入スタイルのみが有効になっています。

抽出スタイルは次を使って構成できます:

- システムプロパティ: `-Ddd.propagation.style.extract=Datadog,B3`
- 環境変数: `DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

プロパティまたは環境変数の値は、抽出が有効になっているヘッダースタイルのカンマ (またはスペース) 区切りリストです。デフォルトでは、Datadog 抽出スタイルのみが有効になっています。

複数の抽出スタイルが有効になっている場合、抽出試行はスタイルの構成順で実行され、最初に成功した抽出値が使われます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging/
[2]: /ja/agent/amazon_ecs/#create-an-ecs-task
[3]: /ja/tracing/setup/docker/
[4]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[5]: /ja/developers/dogstatsd/#setup
[6]: /ja/agent/docker/#dogstatsd-custom-metrics
[7]: /ja/developers/dogstatsd/
[8]: /ja/tracing/compatibility_requirements/java#disabling-integrations
[9]: /ja/integrations/java/?tab=host#metric-collection
[10]: https://github.com/openzipkin/b3-propagation