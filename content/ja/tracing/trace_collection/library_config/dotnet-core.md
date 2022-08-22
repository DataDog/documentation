---
code_lang: dotnet-core
code_lang_weight: 60
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
  tag: ドキュメント
  text: .NET アプリケーションログとトレースの接続
- link: /tracing/metrics/runtime_metrics/dotnet/
  tag: ドキュメント
  text: ランタイムメトリクス
- link: /serverless/azure_app_services/
  tag: ドキュメント
  text: Microsoft Azure App Service 拡張機能
- link: /tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
- link: https://www.datadoghq.com/blog/net-monitoring-apm/
  tag: ブログ
  text: Datadog APM と分散型トレーシングを使用した .NET のモニタリング
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: GitHub
  text: カスタムインスツルメンテーションの例
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: GitHub
  text: ソースコード
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: ブログ
  text: ASP.NET Core アプリケーションを Azure App Service にデプロイする
kind: documentation
title: .NET Core トレーシングライブラリの構成
type: multi-code-lang
---

コードを使用してトレーシングライブラリをセットアップし、APM データを収集するように Agent を構成した後、オプションで[統合サービスタグ付け][4]のセットアップなど、必要に応じてトレーシングライブラリを構成してください。

{{< img src="tracing/dotnet/diagram_docs_net.png" alt=".NET トレーサーコンフィギュレーション設定の優先度"  >}}

.NET Tracer のコンフィギュレーション設定は、以下のいずれかの方法で行うことができます。

{{< tabs >}}

{{% tab "環境変数" %}}

環境変数を使用してトレーサーを構成するには、インスツルメントされたアプリケーションを起動する前に変数を設定します。さまざまな環境で環境変数を設定する方法については、[プロセス環境変数の構成][1]を参照してください。

[1]: /ja/tracing/trace_collection/dd_libraries/dotnet-core/#configuring-process-environment-variables
{{% /tab %}}

{{% tab "コード" %}}

アプリケーションコードでトレーサーを構成するには、デフォルトの構成ソースから `TracerSettings` インスタンスを作成します。`Tracer.Configure()` を呼び出す前に、この `TracerSettings` インスタンスにプロパティを設定します。例:

<div class="alert alert-warning">
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

### コンフィギュレーション設定

<div class="alert alert-warning">
  <strong>注:</strong> Linux では、環境変数の名前では大文字と小文字が区別されます。
</div>

上記の方法を使用して、次の変数を使用してトレースコンフィギュレーションをカスタマイズします。環境変数またはコンフィギュレーションファイルを設定するときは、環境変数の名前 (たとえば、`DD_TRACE_AGENT_URL`) を使用します。コードの設定を変更するときには、TracerSettings プロパティの名前 (たとえば、`Exporter.AgentUri`) を使用します。

#### 統合サービスタグ付け

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

#### 任意のコンフィギュレーション

自動インスツルメンテーションとカスタムインスツルメンテーションの両方で、次の構成変数を利用できます。

`DD_TRACE_AGENT_URL`
: **TracerSettings プロパティ**: `Exporter.AgentUri`<br>
トレースが送信される URL のエンドポイントを設定します。設定されている場合は `DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT` をオーバーライドします。<br>
`unix://` をプレフィックスとして、ソケットへの Unix パスを含めることができます。<br>
**デフォルト**: 設定されている場合は `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`、ファイルが存在する場合は `unix:///var/run/datadog/apm.socket`、または `http://localhost:8126`。

`DD_AGENT_HOST`
: Agent が接続をリッスンするホストを設定します。ホスト名または IP アドレスを指定します。このパラメーターより優先される `DD_TRACE_AGENT_URL` を使用します。 <br>
**デフォルト**: `localhost`

`DD_TRACE_AGENT_PORT`
: Agent が接続をリッスンする TCP ポートを設定します。このパラメーターより優先される `DD_TRACE_AGENT_URL` を使用します。 <br>
**デフォルト**: `8126`

`DD_TRACE_SAMPLE_RATE`
: **TracerSettings プロパティ**: `GlobalSamplingRate` <br>
**デフォルト**: デフォルトは、Datadog Agent から返される率です<br>
取り込み率コントロールを有効にします。このパラメーターは、サンプリングするスパンのパーセンテージを表す浮動小数点数です。有効な値は `0.0` から `1.0` までです。
詳しくは、[取り込みメカニズム][11]を参照してください。

`DD_TRACE_SAMPLING_RULES`
: **TracerSettings プロパティ**: `CustomSamplingRules`<br>
**デフォルト**: `null`<br>
オブジェクトの JSON 配列。各オブジェクトは `"sample_rate"` を持たなければなりません。`"name"` と `"service"` フィールドは省略可能です。`"sample_rate"` の値は `0.0` と `1.0` の間でなければなりません (この値を含む)。ルールは、トレースのサンプルレートを決定するために設定された順序で適用されます。
詳しくは、[取り込みメカニズム][11]を参照してください。<br>
**例:**<br>
  - サンプルレートを 20% に設定: `'[{"sample_rate": 0.2}]'`
  - 'a' で始まるサービスとスパン名 'b' のサービスのサンプルレートを 10% に、それ以外のサービスのサンプルレートを 20% に設定: `'[{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]'`

`DD_TRACE_RATE_LIMIT`
: **TracerSettings プロパティ**: `MaxTracesSubmittedPerSecond` <br>
1 秒間に送信できるトレースの数 (`DD_MAX_TRACES_PER_SECOND` は非推奨)。 <br>
**デフォルト**: `DD_TRACE_SAMPLE_RATE` が設定されている場合、`100`。それ以外の場合は、Datadog Agent にレート制限を委ねます。 <br>

`DD_TRACE_GLOBAL_TAGS`
: **TracerSettings プロパティ**: `GlobalTags`<br>
指定した場合、指定したすべてのタグを、生成されたすべてのスパンに追加します。

`DD_TRACE_DEBUG`
: デバッグログの有効・無効を設定します。有効な値は `true` または `false` です。<br>
**デフォルト**: `false`

`DD_TRACE_HEADER_TAGS`
: **TracerSettings プロパティ**:`HeaderTags` <br>
名前をタグ付けするヘッダーキー (大文字小文字の区別なし) のマップを受け入れ、一致するヘッダー値がルートスパンのタグとして自動的に提供されます。特定のタグ名のないエントリも受け入れます。<br>
**例**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
バージョン 1.18.3 で追加されました。レスポンスヘッダーのサポートとタグ名なしのエントリはバージョン 1.26.0 で追加されました。

`DD_TAGS`
: **TracerSettings プロパティ**: `GlobalTags`<br>
指定した場合、指定したすべてのタグを、生成されたすべてのスパンに追加します。<br>
**例**: `layer:api, team:intake` <br>
バージョン 1.17.0 で追加されました。
デリミタはコンマとスペース: `, ` であることに注意してください。

`DD_TRACE_LOG_DIRECTORY`
: .NET Tracer ログのディレクトリを設定します。<br>
**デフォルト**: Windows は `%ProgramData%\Datadog .NET Tracer\logs\`、Linux は `/var/log/datadog/dotnet`

`DD_TRACE_LOGGING_RATE`
: ログメッセージへのレート制限を設定します。設定した場合、`x` 秒ごとに一意のログ行が記述されます。たとえば、任意のメッセージを 60 秒ごとに一回ログに残したい場合は `60` を設定します。ログのレート制限を無効化したい場合は `0` を設定します。バージョン 1.24.0 で追加されました。デフォルトでは無効です。

`DD_TRACE_SERVICE_MAPPING`
: コンフィギュレーションを使用してサービスの名前を変更します。名前を変更するサービス名キーと、代わりに使用する名前のマップを、`[from-key]:[to-name]` の形式で受け入れます。<br>
**例**: `mysql:main-mysql-db, mongodb:offsite-mongodb-service`<br>
`from-key` はインテグレーションタイプに固有で、アプリケーション名のプレフィックスを除外する必要があります。たとえば、`my-application-sql-server` の名前を `main-db` に変更するには、`sql-server:main-db` を使用します。バージョン 1.23.0 で追加されました。

#### 自動インスツルメンテーションオプションコンフィギュレーション

以下の構成変数は、自動インスツルメンテーションの使用時に**のみ**利用できます。

`DD_TRACE_ENABLED`
: **TracerSettings プロパティ**: `TraceEnabled`<br>
<br>すべての自動インスツルメンテーションを有効または無効にします。環境変数を `false` に設定すると、CLR プロファイラーが完全に無効になります。他の構成メソッドの場合は、CLR プロファイラーはロードされ続けますが、トレースは生成されません。有効な値は `true` または `false`。
**デフォルト**: `true`

`DD_HTTP_CLIENT_ERROR_STATUSES`
: HTTP クライアントスパンがエラーとしてマークされる原因となるステータスコード範囲を設定します。 <br>
**デフォルト**: `400-499`

`DD_HTTP_SERVER_ERROR_STATUSES`
: HTTP サーバースパンがエラーとしてマークされる原因となるステータスコード範囲を設定します。 <br>
**デフォルト**: `500-599`

`DD_LOGS_INJECTION`
: **TracerSettings プロパティ**: `LogsInjectionEnabled` <br>
アプリケーションログに相関識別子を自動的に注入することを有効または無効にします。 <br>
ロガーは `trace_id` のマッピングを正しく設定する `source` を持つ必要があります。.NET アプリケーションのデフォルトのソースである `csharp` は、自動的にこれを行います。詳しくは、[トレース ID パネルの相関するログ][5]を参照してください。

`DD_RUNTIME_METRICS_ENABLED`
: .NET ランタイムメトリクスを有効にします。有効な値は `true` または `false`。<br>
**デフォルト**: `false`<br>
バージョン 1.23.0 で追加されました。

`DD_TRACE_EXPAND_ROUTE_TEMPLATES_ENABLED`
: ASP.NET/ASP.NET Core 用アプリケーションのすべてのルートパラメーター (ID パラメーターを除く) を拡張します<br>
これは、フォームの値を区別するためにパラメーター名を使用している場合や、GraphQL のようなスラッグを使用している場合に便利です。
**デフォルト**: `false`
バージョン 2.5.1 で追加されました。

`DD_TRACE_METHODS`
: トレースするメソッドのリスト。セミコロン (`;`) で区切られたリストで、各エントリーが `TypeName[MethodNames]` という形式であることを指定します (`MethodNames` はカンマ (`,`) 区切りのメソッド名のリストまたは `*` ワイルドカードのいずれかです)。汎用型の場合は、角括弧と型パラメーターの名前をバックスティック(`` ``)に置き換え、その後に汎用型パラメーターの数を記述します。例えば、`Dictionary<TKey, TValue>` は `` Dictionary`2 `` と記述しなければなりません。汎用メソッドの場合は、指定する必要があるのはメソッド名のみです。 <br>
**例**: ```Namespace1.Class1[Method1,GenericMethod];Namespace1.GenericTypeWithOneTypeVariable`1[ExecuteAsync];Namespace2.Class2[*]```<br>
**注:** ワイルドカードメソッドサポート (`[*]`) は、コンストラクタ、プロパティゲッターとセッター、 `Equals`、`Finalize`、`GetHashCode` そして `ToString` 以外の型のすべてのメソッドを選択します。<br>
バージョン 2.6.0 で追加されました。
ワイルドカードのサポート `[*]` はバージョン 2.7.0 で追加されました。

`DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED`
: Kafka コンシューマースパンの動作を変更します<br>
**デフォルト**: `true`<br>
`true` に設定すると、メッセージが消費されたときにコンシューマースパンが作成され、次のメッセージを消費する前に閉じられます。このスパンの長さは、あるメッセージの消費と次のメッセージの消費との間の計算を代表するものです。この設定は、メッセージの消費がループで実行される場合に使用します。<br>
`false` に設定すると、メッセージが消費されたときにコンシューマスパンが作成され、すぐに閉じられます。この設定は、メッセージが完全に処理されないまま次のメッセージを消費する場合や、複数のメッセージを一度に消費する場合に使用します。

#### 自動インスツルメンテーションインテグレーションコンフィギュレーション

次の表に、自動インスツルメンテーションを使用しており、インテグレーションごとの設定が可能な場合に**のみ**使用できる構成変数を示します。

`DD_DISABLED_INTEGRATIONS`
: **TracerSettings プロパティ**: `DisabledIntegrationNames` <br>
無効にするインテグレーションのリストを設定します。他のインテグレーションはすべて有効のままになります。設定しなかった場合、すべてのインテグレーションが有効になります。セミコロンで区切ることで複数の値がサポートされます。有効な値は、[インテグレーション][6]セクションでリストされているインテグレーション名です。

`DD_TRACE_<INTEGRATION_NAME>_ENABLED`
: **TracerSettings プロパティ**: `Integrations[<INTEGRATION_NAME>].Enabled` <br>
<br>特定のインテグレーションを有効または無効にします。有効な値は、`true` (デフォルト) または `false` です。インテグレーション名は、[インテグレーション][6]セクションにリストされています。
**デフォルト**: `true`

#### 試験機能

以下の構成変数は現在利用可能な機能ですが、今後のリリースで変更される場合があります。

`DD_TRACE_PARTIAL_FLUSH_ENABLED`
: Datadog Agent への大規模トレースのフラッシュをインクリメント形式で有効化し、Agent に拒否される可能性を低減します。保持期間が長いトレースまたは多数のスパンを持つトレースがある場合にのみ使用してください。有効な値は `true` または `false`。バージョン 1.26.0 で追加され、Datadog Agent 7.26.0 以降とのみ互換性を有しています。<br>
**デフォルト**: `false`

#### 非推奨の設定

`DD_TRACE_LOG_PATH`
: 自動インスツルメンテーション・ログファイルにパスを設定し、他の .NET Tracer ログファイルすべてのディレクトリを決定します。`DD_TRACE_LOG_DIRECTORY` が設定されている場合、無視されます。

`DD_TRACE_ROUTE_TEMPLATE_RESOURCE_NAMES_ENABLED`
: `true` に設定すると、Web スパンに対する改善されたリソース名を有効化します。利用可能なルートテンプレート情報を使用して ASP.NET のコアインテグレーションにスパンを追加し、追加のタグを有効化します。バージョン 1.26.0 で追加されました。2.0.0 ではデフォルトで有効になっています。<br>
**デフォルト**: `true`

### ヘッダーの抽出と挿入

Datadog APM トレーサーは、分散型トレーシングのための [B3][9] と [W3C (TraceParent)][10] のヘッダー抽出と挿入をサポートしています。

分散ヘッダーの挿入と抽出のスタイルを構成することができます。

.NET トレーサーは、以下のスタイルをサポートしています。

- Datadog: `Datadog`
- B3: `B3`
- W3C: `W3C`
- B3 Single Header: `B3SingleHeader` または `B3 single header`

以下の環境変数を使用して、挿入および抽出のスタイルを構成することができます。

- `DD_PROPAGATION_STYLE_INJECT=Datadog, B3, W3C`
- `DD_PROPAGATION_STYLE_EXTRACT=Datadog, B3, W3C`

環境変数の値は、挿入または抽出に有効なヘッダースタイルのカンマ区切りのリストです。デフォルトでは、`Datadog` 挿入スタイルのみが有効になっています。

複数の抽出スタイルが有効な場合、抽出の試みは構成されたスタイルの順に完了し、最初に成功した抽出値を使用します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[4]: /ja/getting_started/tagging/unified_service_tagging/
[5]: /ja/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel#trace_id-option
[6]: /ja/tracing/trace_collection/compatibility/dotnet-core#integrations
[7]: /ja/tracing/trace_collection/custom_instrumentation/dotnet/
[8]: https://www.freedesktop.org/software/systemd/man/systemctl.html#set-environment%20VARIABLE=VALUE%E2%80%A6
[9]: https://github.com/openzipkin/b3-propagation
[10]: https://www.w3.org/TR/trace-context/#traceparent-header
[11]: /ja/tracing/trace_pipeline/ingestion_mechanisms/?tab=net#pagetitle