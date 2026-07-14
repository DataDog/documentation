---
code_lang: dotnet-framework
code_lang_weight: 70
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
  tag: ドキュメント
  text: .NET アプリケーションログとトレースの接続
- link: /tracing/metrics/runtime_metrics/dotnet/
  tag: ドキュメント
  text: ランタイムメトリクス
- link: /tracing/trace_collection/trace_context_propagation/
  tag: ドキュメント
  text: トレースコンテキストの伝搬
- link: /serverless/azure_app_services/
  tag: ドキュメント
  text: Microsoft Azure App Service 拡張機能
- link: /tracing/glossary/
  tag: Documentation
  text: サービス、リソース、トレースの詳細
- link: https://www.datadoghq.com/blog/net-monitoring-apm/
  tag: GitHub
  text: Datadog APM と分散型トレーシングを使用した .NET のモニタリング
- link: https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/
  tag: GitHub
  text: コンテナ化された ASP.NET コアアプリケーションを監視する
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-aws-fargate/
  tag: ブログ
  text: AWS Fargate でコンテナ化された ASP.NET コアアプリケーションを監視する
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: ソースコード
  text: カスタムインスツルメンテーションの例
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: ソースコード
  text: ソースコード
- link: /opentelemetry/interoperability/environment_variable_support
  tag: ドキュメント
  text: OpenTelemetry Environment Variable Configurations
title: .NET Framework トレーシングライブラリの構成
type: multi-code-lang
---

コードを使用してトレーシングライブラリをセットアップし、APM データを収集するように Agent を構成した後、オプションで[統合サービスタグ付け][4]のセットアップなど、必要に応じてトレーシングライブラリを構成してください。

{{< img src="tracing/dotnet/dotnet_framework_configuration.png" alt=".NET Framework トレーサーの構成設定の優先度" style="width:100%" >}}

.NET Tracer のコンフィギュレーション設定は、以下のいずれかの方法で行うことができます。

{{< tabs >}}

{{% tab "環境変数" %}}

アプリケーションコードでトレーサーを構成するには、デフォルトの構成ソースから `TracerSettings` インスタンスを作成します。`Tracer.Configure()` を呼び出す前に、この `TracerSettings` インスタンスにプロパティを設定します。例:

[1]: /ja/tracing/trace_collection/dd_libraries/dotnet-framework/#configuring-process-environment-variables

{{% /tab %}}

{{% tab "コード" %}}

アプリケーションコードでトレーサーを構成するには、デフォルトの構成ソースから `TracerSettings` インスタンスを作成します。`Tracer.Configure()` を呼び出す前に、この `TracerSettings` インスタンスにプロパティを設定します。例:

<div class="alert alert-danger">
  <strong>注:</strong> 設定は、<code>トレーサー</code>を作成する<em>前</em>に <code>TracerSettings</code> で設定する必要があります。<code>トレーサー</code>の作成後に <code>TracerSettings</code> プロパティに加えられた変更は無視されます。
</div>

```csharp
using Datadog.Trace;
using Datadog.Trace.Configuration;

// デフォルトの構成ソースを読み取る (env vars、web.config、datadog.json)
var settings = TracerSettings.FromDefaultSources();

// 一部の設定を変更
settings.Environment = "prod";
settings.ServiceName = "MyService";
settings.ServiceVersion = "abc123";
settings.Exporter.AgentUri = new Uri("http://localhost:8126/");

// Tracer のグローバル設定を構成
Tracer.Configure(settings);
```

{{% /tab %}}

{{% tab "web.config" %}}

`app.config` または `web.config` ファイルを使ってトレーサーを構成するには、`<appSettings>` セクションを使います。例:

```xml
<configuration>
  <appSettings>
    <add key="DD_TRACE_AGENT_URL" value="http://localhost:8126"/>
    <add key="DD_ENV" value="prod"/>
    <add key="DD_SERVICE" value="MyService"/>
    <add key="DD_VERSION" value="abc123"/>
  </appSettings>
</configuration>
```

{{% /tab %}}

{{% tab "JSON ファイル" %}}

JSON ファイルを使ってトレーサーを構成するには、インスツルメンテーションされたアプリケーションのディレクトリに `datadog.json` を作成します。ルート JSON オブジェクトは各設定のキー値を持つオブジェクトである必要があります。例:

```json
{
  "DD_TRACE_AGENT_URL": "http://localhost:8126",
  "DD_ENV": "prod",
  "DD_SERVICE": "MyService",
  "DD_VERSION": "abc123",
}
```

{{% /tab %}}

{{< /tabs >}}

## 構成設定

上記の方法を使用して、次の変数を使用してトレースコンフィギュレーションをカスタマイズします。環境変数またはコンフィギュレーションファイルを設定するときは、環境変数の名前 (たとえば、`DD_TRACE_AGENT_URL`) を使用します。コードの設定を変更するときには、TracerSettings プロパティの名前 (たとえば、`Exporter.AgentUri`) を使用します。

### 統合サービスタグ付け

[統合サービスタグ付け][4]を使用するには、サービスに対して次の設定を構成します。

`DD_ENV`
: **TracerSettings プロパティ**: `Environment`<br>
指定した場合、生成されたすべてのスパンに、指定された値の `env` タグを追加します。バージョン 1.17.0 で追加されました。

`DD_SERVICE`
: **TracerSettings プロパティ**: `ServiceName`<br>
指定した場合、サービス名を設定します。それ以外の場合、.NET トレーサーは、アプリケーション名 (IIS アプリケーション名、プロセスエントリアセンブリ、またはプロセス名) からサービス名を自動的に判別しようとします。バージョン 1.17.0 で追加されました。

`DD_VERSION`
: **TracerSettings プロパティ**: `ServiceVersion`<br>
指定した場合、サービスのバージョンを設定します。バージョン 1.17.0 で追加されました。

### 任意のコンフィギュレーション

自動インスツルメンテーションとカスタムインスツルメンテーションの両方で、次の構成変数を利用できます。

#### トレース

`DD_TRACE_AGENT_URL`
: **TracerSettings property**: `Exporter.AgentUri`<br>
Sets the URL endpoint where traces are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. If the [Agent configuration][13] sets `receiver_port` or `DD_APM_RECEIVER_PORT` to something other than the default `8126`, then `DD_TRACE_AGENT_PORT` or `DD_TRACE_AGENT_URL` must match it.<br>
Note that Unix Domain Sockets (UDS) are not supported on .NET Framework.<br>
**Default**: `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>` if they are set or `http://localhost:8126`.

`DD_TRACE_AGENT_PORT`
: Agent が接続を待機している TCP ポートを設定します。このパラメーターより優先される `DD_TRACE_AGENT_URL` を使用します。[Agent 構成][13]で `receiver_port` または `DD_APM_RECEIVER_PORT` をデフォルトの `8126` 以外に設定した場合、`DD_TRACE_AGENT_PORT` または `DD_TRACE_AGENT_URL` はそれにマッチしなければなりません。<br>
**デフォルト**: `8126`

`DD_TRACE_SAMPLE_RATE`
: **TracerSettings property**: `GlobalSamplingRate` <br>
**Default**: Defaults to the rates returned by the Datadog Agent<br>
Enables ingestion rate control. This parameter is a float representing the percentage of spans to sample. Valid values are from `0.0` to `1.0`.
For more information, see [Ingestion Mechanisms][6]. <br><br>
**Beta**: Starting in version 2.35.0, if [Agent Remote Configuration][16] is enabled where this service runs, you can set `DD_TRACE_SAMPLE_RATE` in the [Service Catalog][17] UI.

`DD_TRACE_SAMPLING_RULES`
: **TracerSettings プロパティ**: `CustomSamplingRules`<br>
**デフォルト**: `null`<br>
オブジェクトの JSON 配列。各オブジェクトは `sample_rate` を持たなければなりません。`name` と `service` フィールドは省略可能です。`"sample_rate"` の値は `0.0` と `1.0` の間でなければなりません (この値を含む)。ルールは、トレースのサンプルレートを決定するために設定された順序で適用されます。
詳しくは、[取り込みメカニズム][6]を参照してください。<br>**例:**<br>
  - Set the sample rate to 20%: `[{"sample_rate": 0.2}]`
  - Set the sample rate to 10% for services starting with 'a' and span name 'b' and set the sample rate to 20% for all other services: `[{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]`

`DD_TRACE_RATE_LIMIT`
: **TracerSettings プロパティ**: `MaxTracesSubmittedPerSecond` <br>
1 秒間に送信できるトレースの数 (`DD_MAX_TRACES_PER_SECOND` は非推奨)。 <br>
**デフォルト**: `DD_TRACE_SAMPLE_RATE` が設定されている場合、`100`。それ以外の場合は、Datadog Agent にレート制限を委ねます。

`DD_TAGS`
: **TracerSettings プロパティ**: `GlobalTags`<br>
指定した場合、指定したすべてのタグを、生成されたすべてのスパンに追加します。<br>
**例**: `layer:api, team:intake, key:value` <br>
**注**: デリミタはコンマとスペース: `, ` です。<br>
バージョン 1.17.0 で追加されました。<br>

`DD_SPAN_SAMPLING_RULES`
: **Default**: `null`<br>
A JSON array of objects. Rules are applied in configured order to determine the span's sample rate. The `sample_rate` value must be between 0.0 and 1.0 (inclusive). For more information, see [Ingestion Mechanisms][3].<br>
**Example**: Set the span sample rate to 50% for the service `my-service` and operation name `http.request`, up to 50 traces per second: `[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]`

自動インスツルメンテーションオプションコンフィギュレーション

`DD_TRACE_HEADER_TAGS`
: **TracerSettings property**:`HeaderTags` <br>
Accepts a map of case-insensitive header keys to tag names and automatically applies matching header values as tags on traces. Also accepts entries without a specified tag name that are automatically mapped to tags of the form `http.request.headers.<header-name>` and `http.response.headers.<header-name>` respectively.<br><br>
**Example** (with specified tag names): `User-ID:userId`<br>
If the **Request** has a header `User-ID`, its value is applied as tag `userId` to the spans produced by the service.<br><br>
**Example** (without specified tag names): `User-ID`<br>
If the **Request** has a header `User-ID`, its value is applied as tag `http.request.headers.User-ID`.<br>
If the **Response** has a header `User-ID`, its value is applied as tag `http.response.headers.User-ID`.<br><br>
Added in version 1.18.3.<br>
Response header support and entries without tag names added in version 1.26.0.<br>
**Beta**: Starting in version 2.35.0, if [Agent Remote Configuration][16] is enabled where this service runs, you can set `DD_TRACE_HEADER_TAGS` in the [Service Catalog][17] UI.

`DD_TRACE_CLIENT_IP_ENABLED`
: 関連する IP ヘッダーからクライアント IP を収集できるようにします。<br>
バージョン `2.19.0` で追加されました。<br>
**デフォルト**: `false`<br>

`DD_TRACE_CLIENT_IP_HEADER`
: The IP header to be used for client IP collection, for example: `x-forwarded-for`. <br>
Added in version `2.19.0`.<br>
**Default**: Datadog parses the following: `x-forwarded-for`, `x-real-ip`, `true-client-ip`, `x-client-ip`, `x-forwarded`, `forwarded-for`, `x-cluster-client-ip`, `fastly-client-ip`, `cf-connecting-ip`, `cf-connecting-ipv6`. If several are present, none will be reported.<br>

`DD_TRACE_SERVICE_MAPPING`
: コンフィギュレーションを使用してサービスの名前を変更します。名前を変更するサービス名のキーと、代わりに使う名前のペアをカンマ区切りで `[from-key]:[to-name]` の形式で受け入れます。<br>
**例**: `mysql:main-mysql-db, mongodb:offsite-mongodb-service`<br>
`from-key` はインテグレーションタイプに固有で、アプリケーション名のプレフィックスを除外する必要があります。たとえば、`my-application-sql-server` の名前を `main-db` に変更するには、`sql-server:main-db` を使用します。バージョン 1.23.0 で追加されました。

`DD_HTTP_SERVER_TAG_QUERY_STRING`
: `true` に設定すると、`http.url` にクエリ文字列パラメーターが含まれます。詳しくは、[url 内のクエリを再編集する][14]に記載されています。
**デフォルト**: `true`

`DD_HTTP_SERVER_TAG_QUERY_STRING_SIZE`
: `DD_HTTP_SERVER_TAG_QUERY_STRING` が true のとき、難読化する前に報告するクエリ文字列の最大サイズを設定します。サイズに制限を設けない場合は 0 を設定します。<br>
**デフォルト**: `5000`

`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`
: `DD_HTTP_SERVER_TAG_QUERY_STRING` が true の場合、この正規表現は `http.url` タグで報告されるリクエストのクエリ文字列から機密データを削除します (マッチすると `<redacted>` に置き換えられます)。この正規表現は、受信するリクエストごとに実行されます。

#### Agent

`DD_AGENT_HOST`
: Agent が接続をリッスンするホストを設定します。ホスト名または IP アドレスを指定します。このパラメーターより優先される `DD_TRACE_AGENT_URL` を使用します。 <br>
**デフォルト**: `localhost`

`DD_INSTRUMENTATION_TELEMETRY_ENABLED`
: Datadog は、製品の改良のため、[システムの環境・診断情報][6]を収集することがあります。false の場合、このテレメトリーデータは収集されません。<br>
**デフォルト**: `true`

#### Diagnostic logs

`DD_TRACE_LOG_DIRECTORY`
: .NET Tracer ログのディレクトリを設定します。<br>
**デフォルト**: `%ProgramData%\Datadog .NET Tracer\logs\`

`DD_TRACE_LOGFILE_RETENTION_DAYS`
: トレーサーの起動中に、この構成は、トレーサーの現在のログディレクトリを使用して、指定された日数と同じかそれよりも古いログファイルを削除します。バージョン 2.19.0 で追加されました。 <br>
**デフォルト**: `32`

`DD_TRACE_LOGGING_RATE`
: ログメッセージへのレート制限を設定します。設定した場合、`x` 秒ごとに一意のログ行が記述されます。たとえば、任意のメッセージを 60 秒ごとに一回ログに残したい場合は `60` を設定します。ログのレート制限を無効化したい場合は `0` を設定します。バージョン 1.24.0 で追加されました。デフォルトでは無効です。

#### OpenTelemetry

`DD_TRACE_OTEL_ENABLED`
: Enables or disables OpenTelemetry based tracing, both for [custom][18] or [automatic][19] instrumentation.
Valid values are: `true` or `false`.<br>
**Default**: `false`

### 自動インスツルメンテーションオプション構成

以下の構成変数は、自動インスツルメンテーションの使用時に**のみ**利用できます。

#### トレース

`DD_TRACE_ENABLED`
: **TracerSettings property**: `TraceEnabled`<br>
Enables or disables all instrumentation. Valid values are: `true` or `false`.<br>
**Default**: `true`
**Note**: Setting the environment variable to `false` completely disables the client library, and it cannot be enabled through other configuration methods. If it is set to `false` through another configuration method (not an environment variable), the client library is still loaded, but traces will not be generated.

`DD_TRACE_EXPAND_ROUTE_TEMPLATES_ENABLED`
: ASP.NET/ASP.NET Core 用アプリケーションのすべてのルートパラメーター (ID パラメーターを除く) を拡張します<br>
これは、フォームの値を区別するためにパラメーター名を使用している場合や、GraphQL のようなスラッグを使用している場合に便利です。
**デフォルト**: `false`
バージョン 2.5.2 で追加されました

`DD_TRACE_METHODS`
: トレースするメソッドのリスト。セミコロン (`;`) で区切られたリストで、各エントリーが `TypeName[MethodNames]` という形式であることを指定します (`MethodNames` はカンマ (`,`) 区切りのメソッド名のリストまたは `*` ワイルドカードのいずれかです)。汎用型の場合は、角括弧と型パラメーターの名前をバックスティック(`` ``) に置き換え、その後に汎用型パラメーターの数を記述します。例えば、`Dictionary<TKey, TValue>` は `` Dictionary`2 `` と記述しなければなりません。汎用メソッドの場合は、指定する必要があるのはメソッド名のみです。 <br>
**例**: ```Namespace1.Class1[Method1,GenericMethod];Namespace1.GenericTypeWithOneTypeVariable`1[ExecuteAsync];Namespace2.Class2[*]```<br>
**注:** ワイルドカードメソッドサポート (`[*]`) は、コンストラクタ、プロパティゲッターとセッター、 `Equals`、`Finalize`、`GetHashCode` そして `ToString` 以外の型のすべてのメソッドを選択します。<br>
バージョン 2.6.0 で追加されました。ワイルドカードのサポート `[*]` はバージョン 2.7.0 で追加されました。

`DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED`
: Kafka コンシューマースパンの動作を変更します<br>
**デフォルト**: `true`<br>
`true` に設定すると、メッセージが消費されたときにコンシューマースパンが作成され、次のメッセージを消費する前に閉じられます。このスパンの長さは、あるメッセージの消費と次のメッセージの消費との間の計算を代表するものです。この設定は、メッセージの消費がループで実行される場合に使用します。<br>
`false` に設定すると、メッセージが消費されたときにコンシューマースパンが作成され、すぐに閉じられます。この設定は、メッセージが完全に処理されないまま次のメッセージを消費する場合や、複数のメッセージを一度に消費する場合に使用します。このパラメーターを `false` に設定すると、コンシューマースパンはすぐに閉じられます。トレースする子スパンがある場合は、コンテキストを手動で抽出する必要があります。詳しくは、[ヘッダーの抽出と挿入][12]をお読みください。

#### データベースモニタリング

`DD_DBM_PROPAGATION_MODE`
: Enables linking between data sent from APM and the Database Monitoring product when set to `service` or `full`. The `service` option enables the connection between DBM and APM services. The `full` option enables connection between database spans with database query events. Available for Postgres and MySQL.<br>
**Default**: `disabled`

#### ランタイムメトリクス

`DD_RUNTIME_METRICS_ENABLED`
: .NET ランタイムメトリクスを有効にします。有効な値は `true` または `false` です。<br>
**デフォルト**: `false`<br>
バージョン 1.23.0 で追加されました。

#### エラー

`DD_HTTP_CLIENT_ERROR_STATUSES`
: HTTP クライアントスパンがエラーとしてマークされる原因となるステータスコード範囲を設定します。 <br>
**デフォルト**: `400-499`

`DD_HTTP_SERVER_ERROR_STATUSES`
: HTTP サーバースパンがエラーとしてマークされる原因となるステータスコード範囲を設定します。 <br>
**デフォルト**: `500-599`

#### Logs

`DD_LOGS_INJECTION`
: **TracerSettings property**: `LogsInjectionEnabled` <br>
Enables or disables automatic injection of correlation identifiers into application logs. <br>
Your logger needs to have a `source` that sets the `trace_id` mapping correctly. The default source for .NET Applications, `csharp`, does this automatically. For more information, see [correlated logs in the Trace ID panel][5]. <br><br>
**Beta**: Starting in version 2.35.0, if [Agent Remote Configuration][16] is enabled where this service runs, you can set `DD_LOGS_INJECTION` in the [Service Catalog][17] UI.

### 自動インスツルメンテーションインテグレーション構成

次の表に、自動インスツルメンテーションを使用しており、インテグレーションごとの設定が可能な場合に**のみ**使用できる構成変数を示します。

`DD_DISABLED_INTEGRATIONS`
: **TracerSettings プロパティ**: `DisabledIntegrationNames` <br>
無効にするインテグレーションのリストを設定します。他のインテグレーションはすべて有効のままになります。設定しなかった場合、すべてのインテグレーションが有効になります。セミコロンで区切ることで複数の値がサポートされます。有効な値は、[インテグレーション][7]セクションでリストされているインテグレーション名です。

`DD_TRACE_<INTEGRATION_NAME>_ENABLED`
: **TracerSettings プロパティ**: `Integrations[<INTEGRATION_NAME>].Enabled` <br>
<br>特定のインテグレーションを有効または無効にします。有効な値は、`true` (デフォルト) または `false` です。インテグレーション名は、[インテグレーション][7]セクションにリストされています。
**デフォルト**: `true`

### 試験機能

以下の構成変数は現在利用可能な機能ですが、今後のリリースで変更される場合があります。

`DD_TRACE_PARTIAL_FLUSH_ENABLED`
: Datadog Agent への大規模トレースのフラッシュをインクリメント形式で有効化し、Agent に拒否される可能性を低減します。保持期間が長いトレースまたは多数のスパンを持つトレースがある場合にのみ使用してください。有効な値は `true` または `false` です。バージョン 1.26.0 で追加され、Datadog Agent 7.26.0 以降とのみ互換性を有しています。<br>
**デフォルト**: `false`

### 非推奨の設定

`DD_TRACE_LOG_PATH`
: 自動インスツルメンテーションログファイルにパスを設定し、他の .NET Tracer ログファイルすべてのディレクトリを決定します。`DD_TRACE_LOG_DIRECTORY` が設定されている場合、無視されます。

`DD_TRACE_ROUTE_TEMPLATE_RESOURCE_NAMES_ENABLED`
: `true` に設定すると、Web スパンに対する改善されたリソース名を有効化します。利用可能なルートテンプレート情報を使用して ASP.NET のコアインテグレーションにスパンを追加し、追加のタグを有効化します。バージョン 1.26.0 で追加されました。2.0.0 ではデフォルトで有効になっています。<br>
**デフォルト**: `true`


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[3]: /ja/tracing/trace_pipeline/ingestion_mechanisms/
[4]: /ja/getting_started/tagging/unified_service_tagging/
[5]: /ja/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel#trace_id-option
[6]: /ja/tracing/trace_pipeline/ingestion_mechanisms/?tab=environmentvariables#head-based-sampling
[7]: /ja/tracing/trace_collection/compatibility/dotnet-framework/#integrations
[8]: /ja/tracing/trace_collection/custom_instrumentation/dotnet/
[9]: https://github.com/openzipkin/b3-propagation
[10]: https://www.w3.org/TR/trace-context/#traceparent-header
[12]: /ja/tracing/trace_collection/custom_instrumentation/dotnet/#headers-extraction-and-injection
[13]: /ja/agent/configuration/network/#configure-ports
[14]: /ja/tracing/configure_data_security/#redacting-the-query-in-the-url
[15]: /ja/tracing/configure_data_security#telemetry-collection
[16]: /ja/agent/remote_config/
[17]: https://app.datadoghq.com/services
[18]: /ja/tracing/trace_collection/otel_instrumentation/dotnet/
[19]: /ja/tracing/trace_collection/compatibility/dotnet-core/#opentelemetry-based-integrations
[20]: /ja/opentelemetry/interoperability/environment_variable_support