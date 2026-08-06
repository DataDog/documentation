---
code_lang: java
code_lang_weight: 0
further_reading:
- link: https://github.com/DataDog/dd-trace-java
  tag: ソースコード
  text: Datadog Java APM ソースコード
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースを調査する
- link: /tracing/trace_collection/trace_context_propagation/
  tag: ドキュメント
  text: ヘッダーを使ったトレースコンテキストの伝搬
- link: /opentelemetry/interoperability/environment_variable_support
  tag: ドキュメント
  text: OpenTelemetry の環境変数の構成
- link: https://learn.datadoghq.com/courses/apm-java-host
  tag: ラーニングセンター
  text: Java アプリケーション用の APM を設定する
title: Java SDK の構成
type: multi-code-lang
---
コードを使用して SDK をセットアップし、APM データを収集するように Agent を構成した後、オプションで、[Unified Service Tagging][1] のセットアップなど、必要に応じて SDK を構成してください。

{{% apm-config-visibility %}}

以下のすべての構成オプションには、同等のシステムプロパティと環境変数があります。
両方に同じキータイプが設定された場合、システムプロパティ構成が優先されます。
システムプロパティは JVM フラグとして設定できます。

### システムプロパティと環境変数の間の変換 {#converting-between-system-properties-and-environment-variables}
特に記載がない限り、以下の変換を使用して、システムプロパティと環境変数の間で変換を行うことができます。

- システムプロパティを環境変数として設定するには、プロパティ名を大文字にし、`.` または `-` を `_` に置き換えます。
  たとえば、`dd.service` は `DD_SERVICE` になります。
- 環境変数をシステムプロパティとして設定するには、変数名を小文字にし、`_` を `.` に置き換えます。
  たとえば、`DD_TAGS` は `dd.tags` になります。

**注**: Java トレーサーのシステムプロパティを使用する際には、プロパティを `-jar` の前にリストしてください。これにより、プロパティが JVM オプションとして読み込まれます。

## 構成オプション {#configuration-options}

### Unified Service Tagging {#unified-service-tagging}

`dd.service`
: **環境変数**: `DD_SERVICE`<br>
**デフォルト**: `unnamed-java-app`<br>
同じジョブを実行する一連のプロセスの名前。アプリケーションの統計情報をグループ化するために使用されます。バージョン 0.50.0 以降で利用可能です。

`dd.env`
: **環境変数**: `DD_ENV`<br>
**デフォルト**: `none`<br>
アプリケーション環境 (例: production、staging)。バージョン 0.48 以降で利用可能です。

`dd.version`
: **環境変数**: `DD_VERSION`<br>
**デフォルト**: `null`<br>
アプリケーションのバージョン (例: 2.5、202003181415、1.3-alpha)。バージョン 0.48 以降で利用可能です。

### トレース {#traces}

`dd.trace.enabled`
: **環境変数**: `DD_TRACE_ENABLED`<br>
**デフォルト**: `true`<br>
`false` の場合、トレースエージェントは無効になります。<br/>
[DD_APM_TRACING_ENABLED][21] も参照してください。

`dd.trace.config`
: **環境変数**: `DD_TRACE_CONFIG`<br>
**デフォルト**: `null`<br>
構成プロパティが各行に 1 つずつ指定されているファイルへのオプションのパス。たとえば、`-Ddd.trace.config=<FILE_PATH>.properties` としてファイルパスを指定し、ファイル内で `dd.service=<SERVICE_NAME>`<br> を使用してサービス名を設定します。
**注**: SDK に依存する製品 (Profiler、Dynamic Instrumentation など) を有効または無効にするのに `dd.trace.config` のみに依存しないようにしてください。代わりに、対応するシステムプロパティや環境変数 (Single Step Instrumentation の場合は `application_monitoring.yaml`) を使用してください。

`dd.service.mapping`
: **環境変数**: `DD_SERVICE_MAPPING`<br>
**デフォルト**: `null`<br>
**例**: `mysql:my-mysql-service-name-db, postgresql:my-postgres-service-name-db`<br>
構成を介してサービス名を動的に変更します。サービス間でデータベースの名前を区別する場合に便利です。

`dd.writer.type`
: **環境変数**: `DD_WRITER_TYPE`<br>
**デフォルト**: `DDAgentWriter`<br>
デフォルト値はトレースを Agent に送信します。`LoggingWriter` で構成すると、トレースがコンソールに出力されます。

`dd.trace.agent.port`
: **環境変数**: `DD_TRACE_AGENT_PORT`<br>
**デフォルト**: `8126`<br>
構成されたホストに対して Agent がリッスンしているポート番号。[Agent 構成][6]で `receiver_port` または `DD_APM_RECEIVER_PORT` がデフォルトの `8126` 以外に設定されている場合は、`dd.trace.agent.port` または `dd.trace.agent.url` をそれに合わせる必要があります。

`dd.trace.agent.unix.domain.socket`
: **環境変数**: `DD_TRACE_AGENT_UNIX_DOMAIN_SOCKET`<br>
**デフォルト**: `null`<br>
これは、トレーストラフィックをプロキシに送り、その後リモート Datadog Agent に送信するために使用できます。

`dd.trace.agent.url`
: **環境変数**: `DD_TRACE_AGENT_URL`<br>
**デフォルト**: `null`<br>
トレースを送信する URL。[Agent 構成][6]で `receiver_port` または `DD_APM_RECEIVER_PORT` がデフォルトの `8126` 以外に設定されている場合は、`dd.trace.agent.port` または `dd.trace.agent.url` をそれに合わせる必要があります。URL の値は、接続に HTTP を使用する場合は `http://` で始め、Unix ドメインソケットを使用する場合は `unix://` で始めます。この設定は `DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT` よりも優先されます。バージョン 0.65 以降で利用可能です。

`dd.trace.agent.timeout`
: **環境変数**: `DD_TRACE_AGENT_TIMEOUT`<br>
**デフォルト**: `10`<br>
Datadog Agent とのネットワークインタラクションのタイムアウト (秒)。

`dd.trace.client-ip.enabled`
: **デフォルト**: `false` <br>
HTTP リクエストスパンの関連 IP ヘッダーからのクライアント IP の収集を有効にします。`dd.appsec.enabled=true` の場合は自動的に有効になります。

`dd.trace.header.tags`
: **環境変数**: `DD_TRACE_HEADER_TAGS`<br>
**デフォルト**: `null`<br>
**例**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
大文字/小文字を区別しないヘッダーキーとタグ名のマップを受け取り、一致するヘッダー値を自動的にタグとしてトレースに適用します。また、タグ名を指定しないエントリも受け入れ、それぞれ `http.request.headers.<header-name>` と `http.response.headers.<header-name>` という形式のタグに自動的にマップします。<br><br>
バージョン 0.96.0 以前は、この設定はリクエストヘッダータグにのみ適用されていました。以前の動作に戻すには、設定 `-Ddd.trace.header.tags.legacy.parsing.enabled=true` または環境変数 `DD_TRACE_HEADER_TAGS_LEGACY_PARSING_ENABLED=true` を追加してください。<br><br>
バージョン 1.18.3 以降、このサービスが実行される場所で [Agent Remote Configuration][3] が有効になっている場合は、[Catalog][4] UI で `DD_TRACE_HEADER_TAGS` を設定できます。

`dd.trace.request_header.tags`
: **環境変数**: `DD_TRACE_REQUEST_HEADER_TAGS`<br>
**デフォルト**: `null`<br>
**例**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
大文字/小文字を区別しないヘッダーキーとタグ名のマップを受け取り、一致するリクエストヘッダー値を自動的にタグとしてトレースに適用します。また、タグ名を指定しないエントリも受け入れ、`http.request.headers.<header-name>` という形式のタグに自動的にマップします。<br>
バージョン 0.96.0 以降で利用可能です。

`dd.trace.response_header.tags`
: **環境変数**: `DD_TRACE_RESPONSE_HEADER_TAGS`<br>
**デフォルト**: `null`<br>
**例**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
大文字/小文字を区別しないヘッダーキーとタグ名のマップを受け取り、一致するレスポンスヘッダー値を自動的にタグとしてトレースに適用します。また、タグ名を指定しないエントリも受け入れ、`http.response.headers.<header-name>` という形式のタグに自動的にマップします。<br>
バージョン 0.96.0 以降で利用可能です。

`dd.trace.header.baggage`
: **環境変数**: `DD_TRACE_HEADER_BAGGAGE`<br>
**デフォルト**: `null`<br>
**例**: `CASE-insensitive-Header:my-baggage-name,User-ID:userId,My-Header-And-Baggage-Name`<br>
大文字/小文字を区別しないヘッダーキーと Baggage キーのマップを受け取り、一致するリクエストヘッダー値を自動的に Baggage としてトレースに適用します。伝搬時には逆のマッピングが適用され、Baggage がヘッダーにマッピングされます。<br>
バージョン 1.3.0 以降で利用可能です。

`dd.trace.annotations`
: **環境変数**: `DD_TRACE_ANNOTATIONS`<br>
**デフォルト**: ([こちらを参照][7])<br>
**例**: `com.some.Trace;io.other.Trace`<br>
`@Trace` として処理するメソッドアノテーションのリスト。

`dd.trace.methods`
: **環境変数**: `DD_TRACE_METHODS`<br>
**デフォルト**: `null`<br>
**例**: `package.ClassName[method1,method2,...];AnonymousClass$1[call];package.ClassName[*]`<br>
トレースするクラス/インターフェイスとメソッドのリスト。`@Trace` の追加と似ていますが、コードの変更はありません。**注:** ワイルドカード型メソッドのサポート (`[*]`) は、コンストラクター、get アクセス操作子、set アクセス操作子、synthetic、toString、等号、ハッシュコード、またはファイナライザーメソッドの呼び出しには対応していません。
`dd.trace.methods` は、大量のメソッドやクラスをトレースすることを目的としていません。発見された CPU、メモリ、IO のボトルネックをメソッド名、クラス名、行番号で分類するには、[Continuous Profiler][22] の使用を検討してください。

`dd.trace.classes.exclude`
: **環境変数**: `DD_TRACE_CLASSES_EXCLUDE`<br>
**デフォルト**: `null`<br>
**例**: `package.ClassName,package.ClassName$Nested,package.Foo*,package.other.*`<br>
SDK によって無視される (変更されない) 完全修飾クラス (プレフィックスを示すワイルドカードで終わる場合があります) のリスト。名前には jvm 内部表現を使用する必要があります (例: package.ClassName.Nested ではなく package.ClassName$Nested)。

`dd.trace.partial.flush.min.spans`
: **環境変数**: `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`<br>
**デフォルト**: `1000`<br>
フラッシュする部分スパンの数を設定します。大量のトラフィック処理や長時間のトレース実行時にメモリのオーバーヘッドを軽減するのに役立ちます。

`dd.trace.split-by-tags`
: **環境変数**: `DD_TRACE_SPLIT_BY_TAGS`<br>
**デフォルト**: `null`<br>
**例**: `aws.service`<br>
スパンに関連付けられたサービス名を、対応するスパンタグで識別されるように変更するために使用されます。

`dd.trace.health.metrics.enabled`
: **環境変数**: `DD_TRACE_HEALTH_METRICS_ENABLED`<br>
**デフォルト**: `true`<br>
`true` に設定すると、トレーサーヘルスメトリクスが送信されます。

`dd.trace.health.metrics.statsd.host`
: **環境変数**: `DD_TRACE_HEALTH_METRICS_STATSD_HOST`<br>
**デフォルト**: `dd.jmxfetch.statsd.host` と同じ <br>
ヘルスメトリクスの送信先の Statsd ホスト

`dd.trace.health.metrics.statsd.port`
: **環境変数**: `DD_TRACE_HEALTH_METRICS_STATSD_PORT`<br>
**デフォルト**: `dd.jmxfetch.statsd.port` と同じ <br>
ヘルスメトリクスの送信先の Statsd ポート

`dd.trace.obfuscation.query.string.regexp`
: **環境変数**: `DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`<br>
**デフォルト**: `null`<br>
`http.url` タグで報告される受信リクエストのクエリ文字列から機密データを削除するための正規表現 (マッチした場合は <redacted> に置き換え)。

`dd.trace.servlet.async-timeout.error`
: **環境変数**: `DD_TRACE_SERVLET_ASYNC_TIMEOUT_ERROR` <br>
**デフォルト**: `true`<br>
デフォルトでは、長時間実行されている非同期リクエストはエラーとしてマークされます。この値を false に設定すると、すべてのタイムアウトを成功したリクエストとしてマークできます。

`dd.trace.span.tags`
: **環境変数**: `DD_TRACE_SPAN_TAGS`<br>
**デフォルト**: `none`<br>
**例**: `tag1:value1,tag2:value2`<br>
すべてのスパンに追加されるデフォルトタグのリスト。

`dd.trace.jmx.tags`
: **環境変数**: `DD_TRACE_JMX_TAGS`<br>
**デフォルト**: `none`<br>
**例**: `tag1:value1,tag2:value2`<br>
すべての jmx メトリクスに追加されるスパンタグのリスト。

`dd.trace.startup.logs`
: **環境変数**: `DD_TRACE_STARTUP_LOGS`<br>
**デフォルト**: `true`<br>
`false` の場合は起動ログの収集が無効化されます。バージョン 0.64 以降で利用可能です。

`dd.trace.debug`
: **環境変数**: `DD_TRACE_DEBUG`<br>
**デフォルト**: `false`<br>
`true` の場合、Datadog Java Tracer のデバッグモードが有効になります。

`datadog.slf4j.simpleLogger.jsonEnabled`
: **環境変数**: 利用不可<br>
**デフォルト**: `false`<br>
`true` の場合、Datadog Java SDK のログが JSON 形式で記録されます。バージョン 1.48.0 以降で利用可能です。<br>
**注**: これは組み込みの SLF4J シンプルロガーに固有の設定で、環境変数はサポートされていません。推奨される構成オプションは `dd.log.format.json` です。

`dd.trace.servlet.principal.enabled`
: **環境変数**: `DD_TRACE_SERVLET_PRINCIPAL_ENABLED`<br>
**デフォルト**: `false`<br>
`true` の場合、ユーザープリンシパルが収集されます。バージョン 0.61 以降で利用可能です。

`dd.trace.rate.limit`
: **環境変数**: `DD_TRACE_RATE_LIMIT`<br>
**デフォルト**: `100`<br>
`DD_TRACE_SAMPLING_RULES` または `DD_TRACE_SAMPLE_RATE` が設定されている場合、プロセスごとに 1 秒間にサンプリングされるスパンの最大数。それ以外の場合は、Datadog Agent がレート制限を制御します。

`dd.http.server.tag.query-string`
: **環境変数**: `DD_HTTP_SERVER_TAG_QUERY_STRING`<br>
**デフォルト**: `true`<br>
`true` に設定すると、クエリ文字列パラメーターとフラグメントが Web サーバースパンに追加されます。

`dd.http.server.route-based-naming`
: **環境変数**: `DD_HTTP_SERVER_ROUTE_BASED_NAMING`<br>
**デフォルト**: `true`<br>
`false` に設定すると、http フレームワークのルートはリソース名に使用されません。_これを変更すると、リソース名や派生メトリクスが変更される可能性があります。_

`dd.trace.http.server.path-resource-name-mapping`<br>
: **環境変数**: `DD_TRACE_HTTP_SERVER_PATH_RESOURCE_NAME_MAPPING`<br>
**デフォルト**: `{}` (空) <br>
HTTP リクエストパスをカスタムリソース名にマッピングします。`pattern:resource_name` ペアのカンマ区切りリストを次のように指定します。<br>
&nbsp;&nbsp;&nbsp;&ndash; `pattern`: [Ant スタイルのパスパターン][20]。`http.path_group` スパンタグの値と一致する必要があります。<br>
&nbsp;&nbsp;&nbsp;&ndash; `resource_name`: パターンが一致した場合に割り当てるカスタムリソース名。<br>
マッチングパターンの `resource_name` として `*` を使用すると、元の正規化されていないリクエストパスと HTTP メソッドの組み合わせがリソース名として使用されます。たとえば、`/test/**:*` というルールがある場合、`/test/some/path` に対する `GET` リクエストのリソース名は `GET /test/some/path` になります。<br>
マッピングは優先順位順に評価され、最初に一致したルールが適用されます。一致しないリクエストパスにはデフォルトの正規化動作が使用されます。<br>
**例**: `-Ddd.trace.http.server.path-resource-name-mapping=/admin/*.jsp:/admin-page,/admin/user/**:/admin/user` を使用すると、次のようになります。<br>
リクエストパス | リソースパス
------------ | -------------
`/admin/index.jsp` | `/admin-page`
`/admin/user/12345/delete` | `/admin/user`
`/user/12345` | `/user/?`

`dd.trace.http.client.path-resource-name-mapping`<br>
: **環境変数**: `DD_TRACE_HTTP_CLIENT_PATH_RESOURCE_NAME_MAPPING`<br>
**デフォルト**: `{}` (空) <br>
HTTP クライアントリクエストパスをカスタムリソース名にマッピングします。`dd.trace.http.server.path-resource-name-mapping` と同じ形式を使用しますが、HTTP サーバースパンではなく HTTP クライアントスパンに適用されます。

`dd.trace.status404rule.enabled`
: **環境変数**: `DD_TRACE_STATUS404RULE_ENABLED`<br>
**デフォルト**: `true`<br>
デフォルトでは、HTTP 404 レスポンスはスパンリソース名として "404" を使用します。`false` の場合、HTTP 404 レスポンスは元の URL パスをリソース名として保持します。

`dd.trace.128.bit.traceid.generation.enabled`
: **環境変数**: `DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED`<br>
**デフォルト**: `true`<br>
`true` の場合、SDK は 128 ビットのトレース ID を生成し、ゼロパディングされた 32 文字の小文字の 16 進数としてエンコードします。

`dd.trace.128.bit.traceid.logging.enabled`
: **環境変数**: `DD_TRACE_128_BIT_TRACEID_LOGGING_ENABLED`<br>
**デフォルト**: `false`<br>
`true` の場合、SDK は 128 ビットのトレース ID をゼロパディングされた 32 文字の小文字の 16 進数として挿入し、64 ビットのトレース ID を10進数として挿入します。それ以外の場合、SDK はトレース ID を常に 10 進数として挿入します。

`dd.trace.otel.enabled`
: **環境変数**: `DD_TRACE_OTEL_ENABLED`<br>
**デフォルト**: `false`<br>
`true` の場合、OpenTelemetry ベースのトレースが[カスタム][16]インスツルメンテーションに対して有効になります。

`dd.trace.cloud.payload.tagging.services`
: **環境変数**: `DD_TRACE_CLOUD_PAYLOAD_TAGGING_SERVICES`<br>
**デフォルト**: `ApiGateway,ApiGatewayV2,EventBridge,Sqs,Sns,S3,Kinesis`<br>
**例**: `S3,Sso`<br>
[AWS ペイロードタグ付け][18]をその他のサービスに対して有効にするには、この設定を使用します。

`dd.trace.cloud.request.payload.tagging`
: **環境変数**: `DD_TRACE_CLOUD_REQUEST_PAYLOAD_TAGGING`<br>
**デフォルト**: N/A (無効)<br>
**例**: `$.Metadata.UserId,$.phoneNumber`<br>
AWS SDK のリクエストからマスキングする JSONPath エントリをカンマ区切りで指定した文字列。これを設定すると、リクエストの [AWS ペイロードタグ付け][18]が有効になります。

`dd.trace.cloud.response.payload.tagging`
: **環境変数**: `DD_TRACE_CLOUD_RESPONSE_PAYLOAD_TAGGING`<br>
**デフォルト**: N/A (無効)<br>
**例**: `$.Metadata.Credentials.*`<br>
AWS SDK のレスポンスからマスキングする JSONPath エントリをカンマ区切りで指定した文字列。これを設定すると、レスポンスの [AWS ペイロードタグ付け][18]が有効になります。

`dd.trace.cloud.payload.tagging.max-depth`
: **環境変数**: `DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_DEPTH`<br>
**デフォルト**: `10`<br>
AWS SDK のリクエスト/レスポンスペイロードの最大深度を表す整数で、[AWS ペイロードタグ付け][18]に使用されます。

`dd.trace.cloud.payload.tagging.max-tags`
: **環境変数**: `DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_TAGS`<br>
**デフォルト**: `758`<br>
スパンごとに抽出するタグの最大数を表す整数で、[AWS ペイロードタグ付け][18]に使用されます。

### エージェント {#agent}

`dd.tags`
: **環境変数**: `DD_TAGS`<br>
**デフォルト**: `null`<br>
**例**: `layer:api,team:intake,key:value`<br>
すべてのスパン、プロファイル、JMX メトリクスに追加されるデフォルトタグのリスト。DD_ENV または DD_VERSION を使用すると、DD_TAGS で定義した env タグまたは version タグがオーバーライドされます。バージョン 0.50.0 以降で利用可能です。

`dd.agent.host`
: **環境変数**: `DD_AGENT_HOST`<br>
**デフォルト**: `localhost`<br>
トレースの送信先のホスト名。コンテナ化された環境を使用する場合は、これを構成してホスト IP にします。詳しくは、[Docker アプリケーションのトレース][5]を参照してください。

`dd.instrumentation.telemetry.enabled`
: **環境変数**: `DD_INSTRUMENTATION_TELEMETRY_ENABLED`<br>
**デフォルト**: `true`<br>
`true` の場合、トレーサーは[テレメトリデータ][8]を収集します。バージョン 0.104 以降で利用可能です。バージョン 0.115 以降では `true` がデフォルトです。

### データベース {#databases}

`dd.trace.db.client.split-by-instance`
: **環境変数**: `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` <br>
**デフォルト**: `false`<br>
`true` に設定すると、db スパンにインスタンス名がサービス名として割り当てられます。

`dd.trace.db.client.split-by-host`
: **環境変数**: `DD_TRACE_DB_CLIENT_SPLIT_BY_HOST` <br>
**デフォルト**: `false`<br>
`true` に設定すると、db スパンにリモートデータベースのホスト名がサービス名として割り当てられます。

`dd.dbm.propagation.mode`
: **環境変数**: `DD_DBM_PROPAGATION_MODE` <br>
**デフォルト**: `null`<br>
`service` または `full` に設定すると、Database Monitoring と APM の相関が有効になります。詳細については、[Database Monitoring とトレースの相関付け][23]を参照してください。

### AAP {#aap}

`dd.appsec.enabled`
: **環境変数**: `DD_APPSEC_ENABLED`<br>
**デフォルト**: `false`<br>
`true` の場合、Datadog App and API Protection のモニタリングが有効になります。さらに、クライアント IP の収集も自動的に有効になります (`dd.trace.client-ip.enabled`)。<br>
詳細については、[Java の AAP の有効化][19]を参照してください。

### エラー {#errors}

`dd.trace.http.client.tag.query-string`
: **システムプロパティ (非推奨)**: `dd.http.client.tag.query-string`<br>
**環境変数**: `DD_TRACE_HTTP_CLIENT_TAG_QUERY_STRING`<br>
**環境変数 (非推奨)**: `DD_HTTP_CLIENT_TAG_QUERY_STRING`<br>
**デフォルト**: `true`<br>
デフォルトでは、クエリ文字列パラメーターとフラグメントが Web クライアントスパンの `http.url` タグに追加されます。このデータの収集を防ぐには `false` に設定してください。

`dd.trace.http.client.error.statuses`
: **環境変数**: `DD_TRACE_HTTP_CLIENT_ERROR_STATUSES`<br>
**デフォルト**: `400-499`<br>
許容可能なエラーの範囲。デフォルトでは、4xx エラーが HTTP クライアントのエラーとしてレポートされます。この構成はこれをオーバーライドします。例: `dd.trace.http.client.error.statuses=400-403,405,410-499`

`dd.trace.http.server.error.statuses`
: **環境変数**: `DD_TRACE_HTTP_SERVER_ERROR_STATUSES`<br>
**デフォルト**: `500-599`<br>
許容可能なエラーの範囲。デフォルトでは、5xx ステータスコードが HTTP サーバーのエラーとしてレポートされます。この構成はこれをオーバーライドします。例: `dd.trace.http.server.error.statuses=500,502-599`

`dd.grpc.client.error.statuses`
: **環境変数**: `DD_GRPC_CLIENT_ERROR_STATUSES`<br>
**デフォルト**: `1-16`<br>
許容可能なエラーの範囲。デフォルトでは、1 ～ 16 の gRPC ステータスコードが gRPC クライアントのエラーとしてレポートされます。この構成はこれをオーバーライドします。例: `dd.grpc.client.error.statuses=1-4,7-10`

`dd.grpc.server.error.statuses`
: **環境変数**: `DD_GRPC_SERVER_ERROR_STATUSES`<br>
**デフォルト**: `2-16`<br>
許容可能なエラーの範囲。デフォルトでは、2 ～ 16 の gRPC ステータスコードが gRPC サーバーのエラーとしてレポートされます。この構成はこれをオーバーライドします。例:`dd.grpc.server.error.statuses=2-4,7-10`

### ログ {#logs}

`dd.log.level`
: **環境変数**: `DD_LOG_LEVEL`<br>
**デフォルト**: `INFO`<br>
Datadog Java Tracer の内部ログレベルを設定します。有効な値は、`DEBUG`、`INFO`、`WARN`、`ERROR` です。<br>
バージョン 1.36.0 以降で利用可能です。

`dd.log.format.json`
: **環境変数**: `DD_LOG_FORMAT_JSON`<br>
**デフォルト**: `false`<br>
`true` の場合、Datadog Logs UI と互換性のある JSON 形式で Datadog Java Tracer のログを出力します。<br>
バージョン 1.58.0 以降で利用可能です。

`dd.logs.injection`
: **環境変数**: `DD_LOGS_INJECTION`<br>
**デフォルト**: `true`<br>
Datadog のトレース ID とスパン ID に対する MDC キーの自動挿入を有効にします。詳細については、[高度な使用方法][2]を参照してください。<br><br>
バージョン 1.18.3 以降、このサービスが実行される場所で [Agent Remote Configuration][3] が有効になっている場合は、[Catalog][4] UI で `DD_LOGS_INJECTION` を設定できます。

### トレースコンテキスト伝搬 {#trace-context-propagation}

有効な値と以下の構成オプションの使用に関する情報については、[Java トレースコンテキストの伝搬][15]を参照してください。

`dd.trace.propagation.style.inject`
: **環境変数**: `DD_TRACE_PROPAGATION_STYLE_INJECT`<br>
**デフォルト**: `datadog,tracecontext`<br>
サービス間で分散型トレースを伝播させるために含めるヘッダーフォーマットのカンマ区切りリスト。<br>
バージョン 1.9.0 以降で利用可能です。

`dd.trace.propagation.style.extract`
: **環境変数**: `DD_TRACE_PROPAGATION_STYLE_EXTRACT`<br>
**デフォルト**: `datadog,tracecontext`<br>
分散型トレーシングの伝搬データの抽出を試みるヘッダーフォーマットのカンマ区切りのリスト。完全かつ有効なヘッダーを持つ最初のフォーマットが、トレースを続行するために使用されます。<br>
バージョン 1.9.0 以降で利用可能です。

`dd.trace.propagation.style`
: **環境変数**: `DD_TRACE_PROPAGATION_STYLE`<br>
**デフォルト**: `datadog,tracecontext`<br>
分散型トレーシングの伝搬データの挿入および抽出を試みるヘッダーフォーマットのカンマ区切りのリスト。完全かつ有効なヘッダーを持つ最初のフォーマットが、トレースを続行するために使用されます。より具体的な `dd.trace.propagation.style.inject` と `dd.trace.propagation.style.extract` の構成が存在する場合は、そちらが優先されます。<br>
バージョン 1.9.0 以降で利用可能です。

`trace.propagation.extract.first`
: **環境変数**: `DD_TRACE_PROPAGATION_EXTRACT_FIRST`<br>
**デフォルト**: `false`<br>
`true` に設定すると、有効なトレースコンテキストが見つかったときに抽出を停止します。

### JMX メトリクス {#jmx-metrics}

`dd.jmxfetch.enabled`
: **環境変数**: `DD_JMXFETCH_ENABLED`<br>
**デフォルト**: `true`<br>
Java トレースエージェントによる JMX メトリクスの収集を有効にします。

`dd.jmxfetch.config.dir`
: **環境変数**: `DD_JMXFETCH_CONFIG_DIR`<br>
**デフォルト**: `null`<br>
**例**: `/path/to/directory/etc/conf.d`<br>
JMX メトリクス収集のための追加の構成ディレクトリ。Java Agent は、`yaml` ファイルの `instance` セクションで `jvm_direct:true` を探して構成を変更します。

`dd.jmxfetch.config`
: **環境変数**: `DD_JMXFETCH_CONFIG`<br>
**デフォルト**: `null`<br>
**例**: `path/to/file/conf.yaml,other/path/to/file/conf.yaml`<br>
JMX メトリクス収集のための追加のメトリクス構成ファイル。Java Agent は、`jvm_direct:true` ファイルの `instance` セクションで `yaml` を探して構成を変更します。

`dd.jmxfetch.check-period`
: **環境変数**: `DD_JMXFETCH_CHECK_PERIOD`<br>
**デフォルト**: `15000`<br>
JMX メトリクスの送信頻度 (ミリ秒)。

`dd.jmxfetch.refresh-beans-period`
: **環境変数**: `DD_JMXFETCH_REFRESH_BEANS_PERIOD`<br>
**デフォルト**: `600`<br>
利用可能な JMX Bean のリストのリフレッシュ頻度 (秒)。

`dd.jmxfetch.statsd.host`
: **環境変数**: `DD_JMXFETCH_STATSD_HOST`<br>
**デフォルト**: `agent.host`<br> と同じ
JMX メトリクスの送信先の Statsd ホスト。Unix ドメインソケットを使用している場合は、'unix://PATH_TO_UDS_SOCKET' のような引数を使用します。例: `unix:///var/datadog-agent/dsd.socket`

`dd.jmxfetch.statsd.port`
: **環境変数**: `DD_JMXFETCH_STATSD_PORT`<br>
**デフォルト**: `8125`<br>
JMX メトリクスの送信先の StatsD ポート。Unix ドメインソケットを使用している場合は、0 を入力します。

`dd.jmxfetch.<integration-name>.enabled`
: **環境変数**: `DD_JMXFETCH_<INTEGRATION_NAME>_ENABLED`<br>
**デフォルト**: `false`<br>
有効にする JMX インテグレーション (Kafka、ActiveMQ など)。

### インテグレーション {#integrations}

インテグレーションを無効にする方法については、[インテグレーション][13]の互換性セクションを参照してください。

`dd.integration.opentracing.enabled`
: **環境変数**: `DD_INTEGRATION_OPENTRACING_ENABLED`<br>
**デフォルト**: `true`<br>
デフォルトでは、トレーシングクライアントは GlobalTracer が読み込まれているかを検出し、動的にトレーサーを登録します。これを false に設定すると、OpenTracing に対するトレーサーの依存関係が削除されます。

`dd.hystrix.tags.enabled`
: **環境変数**: `DD_HYSTRIX_TAGS_ENABLED`<br>
**デフォルト**: `false`<br>
デフォルトでは、Hystrix のグループ、コマンド、サーキット状態のタグは有効になっていません。このプロパティにより有効になります。

`dd.trace.elasticsearch.body.enabled`
: **環境変数**: `DD_TRACE_ELASTICSEARCH_BODY_ENABLED` <br>
**デフォルト**: `false`<br>
`true` に設定すると、Elasticsearch と OpenSearch のスパンに body が追加されます。

`dd.trace.elasticsearch.params.enabled`
: **環境変数**: `DD_TRACE_ELASTICSEARCH_PARAMS_ENABLED` <br>
**デフォルト**: `true`<br>
`true` に設定すると、Elasticsearch と OpenSearch のスパンにクエリ文字列パラメーターが追加されます。

`dd.trace.cassandra.keyspace.statement.extraction.enabled`
: **環境変数**: `DD_TRACE_CASSANDRA_KEYSPACE_STATEMENT_EXTRACTION_ENABLED` <br>
**デフォルト**: `false`<br>
デフォルトでは、キースペースが抽出されるのはセッション作成時に構成されている場合だけです。`true` に設定すると、キースペースを抽出するためにクエリ結果のメタデータも調査されるようになります。

`dd.trace.websocket.messages.enabled`
: **環境変数**: `DD_TRACE_WEBSOCKET_MESSAGES_ENABLED` <br>
**デフォルト**: `false`<br>
送受信された WebSocket メッセージ (テキストおよびバイナリ) と接続終了イベントのトレースを有効にします。

`dd.trace.websocket.messages.inherit.sampling`
: **環境変数**: `DD_TRACE_WEBSOCKET_MESSAGES_INHERIT_SAMPLING` <br>
**デフォルト**: `true`<br>
デフォルトでは、WebSocket メッセージはハンドシェイク時にキャプチャされたスパンと同じサンプリングを保持します。これにより、ハンドシェイクスパンがサンプリングされている場合、そのセッション内のすべてのメッセージもサンプリングされます。その動作を無効にして、各 WebSocket メッセージを独立してサンプリングするには、この構成を `false` に設定します。

`dd.trace.websocket.messages.separate.traces`
: **環境変数**: `DD_TRACE_WEBSOCKET_MESSAGES_SEPARATE_TRACES` <br>
**デフォルト**: `true`<br>
デフォルトでは、メッセージが受信されるたびに新しいトレースが生成されます。それにハンドシェイクがスパンリンクとして関連付けられます。このパラメーターを `false` に設定すると、セッション中にキャプチャされたすべてのスパンが同じトレースに含まれます。

`dd.trace.websocket.tag.session.id`
: **環境変数**: `DD_TRACE_WEBSOCKET_TAG_SESSION_ID` <br>
**デフォルト**: `false`<br>
`true` に設定すると、WebSocket スパンにタグ `websocket.session.id` が付与されて、利用可能であればセッション ID が含まれます。


**注**:

- 両方に同じキータイプが設定された場合、システムプロパティ構成が優先されます。
- システムプロパティは JVM パラメーターとして使用できます。
- デフォルトでは、アプリケーションからの JMX メトリクスは DogStatsD によりポート `8125` で Datadog Agent に送信されます。[DogStatsD が Agent に対して有効になっている][9]ことを確認してください。

  - Agent をコンテナとして実行している場合は、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` が [`true` に設定されている][10]ことと、Agent コンテナでポート `8125` が開いていることを確認してください。
  - Kubernetes の場合は、[DogStatsD ポートをホストポートにバインドします][11]。ECS の場合は、[タスク定義で適当なフラグを設定します][12]。

### UDS {#uds}

`dd.jdk.socket.enabled`
: **環境変数**: `DD_JDK_SOCKET_ENABLED` <br>
**デフォルト**: `true`<br>
Unix ドメインソケットのネイティブ JDK サポートを有効にします。

### 例 {#examples}

#### `dd.service.mapping` {#ddservicemapping}

システムプロパティの例:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.service.mapping=postgresql:web-app-pg -jar path/to/application.jar
```

{{< img src="tracing/setup/java/service_mapping.png" alt="サービスマッピング" >}}

#### `dd.tags` {#ddtags}
スパンと JMX メトリクスにグローバルな env を設定:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_global_tags.png" alt="グローバルタグのトレース" >}}

#### `dd.trace.span.tags` {#ddtracespantags}

すべてのスパンに project:test を追加する例:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_span_tags.png" alt="スパンタグのトレース" >}}

#### `dd.trace.jmx.tags` {#ddtracejmxtags}

JMX メトリクスに custom.type:2 を設定:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -Ddd.trace.jmx.tags=custom.type:2 -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_jmx_tags.png" alt="JMX タグのトレース" >}}

#### `dd.trace.methods` {#ddtracemethods}

システムプロパティの例:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.methods="hello.GreetingController[doSomeStuff,doSomeOtherStuff];hello.Randomizer[randomize]" -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_methods.png" alt="メソッドのトレース" >}}

#### `dd.trace.db.client.split-by-instance` {#ddtracedbclientsplit-by-instance}

システムプロパティの例:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.env=dev -Ddd.service=web-app -Ddd.trace.db.client.split-by-instance=TRUE -jar path/to/application.jar
```

これで、DB インスタンス 1 である `webappdb` に、`db.instance` スパンのメタデータと同じサービス名が付けられます。

{{< img src="tracing/setup/java/split_by_instance_1.png" alt="インスタンス 1" >}}

これで、DB インスタンス 2 である `secondwebappdb` に、`db.instance` スパンのメタデータと同じサービス名が付けられます。

{{< img src="tracing/setup/java/split_by_instance_2.png" alt="インスタンス 2" >}}

同様に、サービスマップで、1 つの Web アプリが 2 つの異なる Postgres データベースに呼び出しを行っていることがわかります。

#### `dd.http.server.tag.query-string`{#ddhttpservertagquery-string}

システムプロパティの例:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.http.server.tag.query-string=TRUE -jar path/to/application.jar
```

{{< img src="tracing/setup/java/query_string.png" alt="クエリ文字列" >}}

#### `dd.trace.enabled` {#ddtraceenabled}

システムプロパティとデバッグアプリモードの例:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.trace.enabled=false -Ddd.trace.debug=true -jar path/to/application.jar
```

デバッグアプリのログに、`Tracing is disabled, not installing instrumentations.` と表示されます。

#### `dd.jmxfetch.config.dir` と `dd.jmxfetch.config` {#ddjmxfetchconfigdir-and-ddjmxfetchconfig}

構成サンプル

- 次の組み合わせ: `DD_JMXFETCH_CONFIG_DIR=<DIRECTORY_PATH>` + `DD_JMXFETCH_CONFIG=conf.yaml`
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

{{< img src="tracing/setup/java/jmxfetch_example.png" alt="JMX フェッチの例" >}}

JMX フェッチを使った Java メトリクス収集についての詳細は [Java インテグレーションドキュメント][14]を参照してください。

#### 非推奨の抽出と挿入の設定 {#deprecated-extraction-and-injection-settings}

これらの抽出と挿入の設定は廃止され、バージョン 1.9.0 以降では `dd.trace.propagation.style.inject`、`dd.trace.propagation.style.extract`、`dd.trace.propagation.style` の設定に変更されました。[Java トレースコンテキストの伝搬][15]を参照してください。B3 マルチヘッダーと B3 シングルヘッダーに対する以前の `b3` 設定は、新しい設定の `b3multi` と `b3single` に置き換えられました。

`dd.propagation.style.inject`
: **環境変数**: `DD_PROPAGATION_STYLE_INJECT`<br>
**デフォルト**: `datadog`<br>
サービス間で分散型トレースを伝播させるために含めるヘッダーフォーマットのカンマ区切りリスト。<br>
バージョン 1.9.0 以降は非推奨

`dd.propagation.style.extract`
: **環境変数**: `DD_PROPAGATION_STYLE_EXTRACT`<br>
**デフォルト**: `datadog`<br>
分散型トレーシングの伝搬データの抽出を試みるヘッダーフォーマットのカンマ区切りのリスト。完全かつ有効なヘッダーを持つ最初のフォーマットが、トレースを続行するために使用されます。<br>
バージョン 1.9.0 以降は非推奨

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging/
[2]: /ja/agent/logs/advanced_log_collection
[3]: /ja/tracing/guide/remote_config
[4]: https://app.datadoghq.com/services
[5]: /ja/tracing/setup/docker/
[6]: /ja/agent/configuration/network/#configure-ports
[7]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[8]: /ja/tracing/configure_data_security/#telemetry-collection
[9]: /ja/extend/dogstatsd/#setup
[10]: /ja/agent/docker/#dogstatsd-custom-metrics
[11]: /ja/extend/dogstatsd/
[12]: /ja/agent/amazon_ecs/#create-an-ecs-task
[13]: /ja/tracing/compatibility_requirements/java#disabling-integrations
[14]: /ja/integrations/java/?tab=host#metric-collection
[15]: /ja/tracing/trace_collection/trace_context_propagation/
[16]: /ja/tracing/trace_collection/custom_instrumentation/java/otel/
[17]: /ja/opentelemetry/interoperability/environment_variable_support
[18]: /ja/tracing/guide/aws_payload_tagging/?code-lang=java
[19]: /ja/security/application_security/setup/threat_detection/java/
[20]: https://ant.apache.org/manual/dirtasks.html#patterns
[21]: /ja/tracing/trace_collection/library_config/#traces
[22]: /ja/profiler/
[23]: /ja/database_monitoring/connect_dbm_and_apm/?tab=java