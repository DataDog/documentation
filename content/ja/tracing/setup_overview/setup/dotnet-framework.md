---
title: .NET Framework アプリケーションのトレース
kind: documentation
aliases:
  - /ja/tracing/dotnet
  - /ja/tracing/languages/dotnet
  - /ja/tracing/setup/dotnet
  - /ja/tracing/setup_overview/dotnet
  - /ja/agent/apm/dotnet/
  - /ja/tracing/dotnet-framework
  - /ja/tracing/languages/dotnet-framework
  - /ja/tracing/setup/dotnet-framework
  - /ja/agent/apm/dotnet-framework/
  - /ja/tracing/setup_overview/dotnet-framework
  - /ja/tracing/setup_overview/setup/dotnet
code_lang: dotnet-framework
type: multi-code-lang
code_lang_weight: 70
further_reading:
  - link: /tracing/connect_logs_and_traces/dotnet/
    tag: Documentation
    text: .NET アプリケーションログとトレースの接続
  - link: /tracing/runtime_metrics/dotnet/
    tag: Documentation
    text: ランタイムメトリクス
  - link: /serverless/azure_app_services/
    tag: Documentation
    text: Microsoft Azure App Service 拡張機能
  - link: /tracing/visualization/
    tag: Documentation
    text: サービス、リソース、トレースの詳細
  - link: 'https://www.datadoghq.com/blog/net-monitoring-apm/'
    tag: ブログ
    text: Datadog APM と分散型トレーシングを使用した .NET のモニタリング
  - link: 'https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples'
    tag: GitHub
    text: カスタムインスツルメンテーションの例
  - link: 'https://github.com/DataDog/dd-trace-dotnet'
    tag: GitHub
    text: ソースコード
---
## 互換性要件

.NET トレーサーは、.NET Framework 4.5 以上の自動インスツルメンテーションをサポートします。サポート対象のライブラリについては、[互換性要件][1]ページをご覧ください。

## インストールと利用開始

### 自動インスツルメンテーション

<div class="alert alert-warning"> 
  <strong>注:</strong>  自動インスツルメンテーションとカスタムインスツルメンテーションの両方を使用している場合は、パッケージバージョン (MSI や NuGet など) の同期を維持することが重要です。
</div>

次の手順に従って .NET アプリケーションのトレーシングを開始します。

#### IIS でホストされているアプリケーション

IIS でホストされているアプリケーションのトレースを開始するには:

1. [Windows Datadog Agent][2] をインストールして構成します。

2. .NET トレーサー [MSI インストーラー][3]をダウンロードします。オペレーティングシステム (x64 または x86) に一致するアーキテクチャの MSI インストーラーを選択します。

3. 管理者権限で .NET トレーサー MSI インストーラーを実行します。

4. 管理者として次のコマンドに従って、IIS を停止してから起動します。

    <div class="alert alert-warning"> 
      <strong>Note:</strong> You must use a stop and start command. This is not the same as a reset or restart command.
    </div>

    ```text
    net stop /y was
    net start w3svc
    ```
5. アプリケーションロードを作成します。

6. [APM ライブトレース][4]にアクセスします。

#### IIS でホストされていないアプリケーション

IIS に存在しない Windows アプリケーションの自動インスツルメンテーションを有効にするには、アプリケーションを起動する前に 2 つの環境変数を設定する必要があります。

| 名前                   | 値                                    |
| ---------------------- | ---------------------------------------- |
| `COR_ENABLE_PROFILING` | `1`                                      |
| `COR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}` |

<div class="alert alert-warning"> 
  <strong>注:</strong> .NET ランタイムは、これらの環境変数が設定された状態で開始されたあらゆる .NET プロセスにプロファイラーをロードしようとします。インスツルメンテーションは、トレースする必要のあるアプリケーションのみに制限する必要があります。これらの環境変数をグローバルに設定しないでください。こうすると、ホスト上のすべての .NET プロセスがプロファイラーをロードします。
</div>

##### Windows サービス
Windows サービスを自動的にインスツルメントするには、`COR_ENABLE_PROFILING` および `COR_PROFILER` 環境変数を設定します。

1. Windows レジストリエディタで、`HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` に `Environment` という複数の文字列値を作成します。
2. 値データを次のように設定します。

   ```text
   COR_ENABLE_PROFILING=1
   COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   ```
     {{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="レジストリエディター" >}}

または、次の PowerShell スニペットを使用して環境変数を設定することもできます。

   {{< code-block lang="powershell" filename="add-env-var.ps1" >}}
   [String[]] $v = @("COR_ENABLE_PROFILING=1", "COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
   Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<NAME> -Name Environment -Value $v
   {{< /code-block >}}

##### コンソールアプリケーション

コンソールアプリケーションを自動的にインスツルメントするには、アプリケーションを起動する前に、バッチファイルから `COR_ENABLE_PROFILING` および `COR_PROFILER` 環境変数を設定します。

```bat
rem Set environment variables
SET COR_ENABLE_PROFILING=1
SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Start application
example.exe
```
### APM に Datadog Agent を構成する

インスツルメントされたアプリケーションからトレースを受信するように Datadog Agent をインストールして構成します。デフォルトでは、Datadog Agent は `datadog.yaml` ファイルの `apm_enabled: true` で有効になっており、`localhost:8126` でトレーストラフィックをリッスンします。コンテナ化環境の場合、アプリ内の[クイックスタート手順][2]に従って、Datadog Agent 内でトレース収集を有効にします。
{{< site-region region="us3,eu,gov" >}} 

確実に Datadog Agent の `DD_SITE` を {{< region-param key="dd_site" code="true" >}} に設定して、Agent が正しい Datadog の場所にデータを送信するようにします。

{{< /site-region >}}

## カスタムインスツルメンテーション

<div class="alert alert-warning"> 
  <strong>注:</strong>  自動インスツルメンテーションとカスタムインスツルメンテーションの両方を使用している場合は、パッケージバージョン (MSI や NuGet など) の同期を維持することが重要です。
</div>

.NET アプリケーションでカスタムインスツルメンテーションを使用するには

1. `Datadog.Trace` [NuGet パッケージ][5]をアプリケーションに追加します。
2. アプリケーションコードで、`Datadog.Trace.Tracer.Instance` プロパティを介してグローバルトレーサーにアクセスし、新しいスパンを作成します。

カスタムインスツルメンテーションとカスタムタグ付けの詳細については、[.NET カスタムインスツルメンテーション][6]を参照してください。

## コンフィギュレーション

{{< img src="tracing/dotnet/diagram_docs_net.png" alt=".NET トレーサーコンフィギュレーション設定の優先度"  >}}

.NET トレーサーには、次のいずれかの方法で設定できるコンフィギュレーション設定があります。

{{< tabs >}}

{{% tab "環境変数" %}}

環境変数を使ってトレーサーを構成するには、インスツルメンテーションされたアプリケーションを起動する前に変数を設定します。

例:

```cmd
rem Set environment variables
SET DD_TRACE_AGENT_URL=http://localhost:8126
SET DD_ENV=prod
SET DD_SERVICE=MyService
SET DD_VERSION=abc123

rem Launch application
example.exe
```

<div class="alert alert-warning"> 
<strong>注:</strong> Windows Service に対して環境変数を設定するには、上記のように Windows レジストリで複数文字列キー<code>HKLM\System\CurrentControlSet\Services\{service name}\Environment</code> を使います。
</div>

{{% /tab %}}

{{% tab "コード" %}}

アプリケーションコードでトレーサーを構成するには、デフォルトの構成ソースから `TracerSettings` インスタンスを作成します。`Tracer` コンストラクタに渡す前にこの `TracerSettings` インスタンスにプロパティを設定します。例:

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
settings.AgentUri = new Uri("http://localhost:8126/");

// この設定を使ってトレーサーを新規作成
var tracer = new Tracer(settings);

// グローバルトレーサーを設定
Tracer.Instance = tracer;
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

JSON ファイルを使ってトレーサーを構成するには、インスツルメンテーションされたアプリケーションのディレクトリに `datadog.json` を作成します。ルート JSON オブジェクトは各設定のキー/値を持つハッシュである必要があります。例:

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

## コンフィギュレーション設定

上記の方法を使用して、次の変数を使用してトレースコンフィギュレーションをカスタマイズします。環境変数またはコンフィギュレーションファイルを設定するときは、環境変数の名前 (たとえば、`DD_TRACE_AGENT_URL`) を使用します。コードの設定を変更するときには、TracerSettings プロパティの名前 (たとえば、`AgentUri`) を使用します。

### 統合サービスタグ付け

[統合サービスタグ付け][7]を使用するには、サービスに対して次の設定を構成します。


`DD_ENV`
: **TracerSettings プロパティ**: `Environment`<br>
指定した場合、生成されたすべてのスパンに、指定された値の `env` タグを追加します。バージョン 1.17.0 で追加されました。

`DD_SERVICE`
: **TracerSettings プロパティ**: `ServiceName`<br>
指定した場合、サービス名を設定します。それ以外の場合、.NET トレーサーは、アプリケーション名 (例: IIS アプリケーション名、プロセスエントリアセンブリ、またはプロセス名) からサービス名を自動的に判別しようとします。バージョン 1.17.0 で追加されました。

`DD_VERSION`
: **TracerSettings プロパティ**: `ServiceVersion`<br>
指定した場合、サービスのバージョンを設定します。バージョン 1.17.0 で追加されました。

### 追加のオプションコンフィギュレーション

自動インスツルメンテーションとカスタムインスツルメンテーションの両方で構成変数を利用できます。

`DD_TRACE_AGENT_URL`
: **TracerSettings プロパティ**: `AgentUri`<br>
<br>トレースが送信される URL エンドポイントを設定します。設定された場合、`DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT` をオーバーライドします。
**デフォルト**: `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`

`DD_AGENT_HOST`
: トレースが送信されるホストを設定します (Agent を実行するホスト)。ホスト名または IP アドレスにできます。`DD_TRACE_AGENT_URL` が設定されている場合は無視されます。<br>
**デフォルト**: `localhost`

`DD_TRACE_AGENT_PORT`
: トレースが送信されるポートを設定します (Agent が接続のためにリッスンしているポート)。`DD_TRACE_AGENT_URL` が設定されている場合は無視されます。<br>
**デフォルト**: `8126`

`DD_LOGS_INJECTION`
: **TracerSettings プロパティ**: `LogsInjectionEnabled` <br>
アプリケーションログへの相関識別子の自動挿入を有効または無効にします。

`DD_TRACE_DEBUG`
: **TracerSettings プロパティ**: `DebugEnabled` <br>
<br>デバッグのロギングを有効または無効にします。有効な値は `true` または `false` です。
**デフォルト**: `false`

`DD_TRACE_HEADER_TAGS`
: **TracerSettings プロパティ**:`HeaderTags` <br>
名前をタグ付けするヘッダーキー (大文字小文字の区別なし) のマップを受け入れ、一致するヘッダー値がルートスパンのタグとして自動的に提供されます。特定のタグ名のないエントリも受け入れます。<br>
**例**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
バージョン 1.18.3 で追加されました。レスポンスヘッダーのサポートとタグ名なしのエントリはバージョン 1.26.0 で追加されました。

`DD_TAGS`
: **TracerSettings プロパティ**: `GlobalTags`<br>
指定した場合、指定したすべてのタグを、生成されたすべてのスパンに追加します。バージョン 1.17.0 で追加されました。<br>
**例**: `layer:api,team:intake`

`DD_TRACE_LOGGING_RATE`
: ログメッセージへのレート制限を設定します。設定した場合、`x` 秒ごとに一意のログ行が記述されます。たとえば、任意のメッセージを 60 秒ごとに一回ログに残したい場合は `60` を設定します。ログのレート制限を無効化したい場合は `0` を設定します。バージョン 1.24.0 で追加されました。デフォルトでは無効です。

`DD_TRACE_SERVICE_MAPPING`
: コンフィギュレーションを使用してサービスの名前を変更します。名前を変更するサービス名キーと、代わりに使用する名前のマップを、`[from-key]:[to-name]` の形式で受け入れます。<br>
**例**: `mysql:main-mysql-db, mongodb:offsite-mongodb-service`<br>
`from-key` はインテグレーションタイプに固有で、アプリケーション名のプレフィックスを除外する必要があります。たとえば、`my-application-sql-server` の名前を `main-db` に変更するには、`sql-server:main-db` を使用します。バージョン 1.23.0 で追加されました。

### 自動インスツルメンテーションオプションコンフィギュレーション

構成変数は自動インスツルメンテーションの使用時に**のみ**利用できます。

`DD_TRACE_ENABLED`
: **TracerSettings プロパティ**: `TraceEnabled`<br>
<br>すべての自動インスツルメンテーションを有効または無効にします。環境変数を `false` に設定すると、CLR プロファイラーが完全に無効になります。他の構成メソッドの場合は、CLR プロファイラーはロードされ続けますが、トレースは生成されません。有効な値は `true` または `false`。
**デフォルト**: `true`

`DD_TRACE_LOG_DIRECTORY`
: .NET Tracer ログのディレクトリを設定します。<br>
**デフォルト**: `%ProgramData%\Datadog .NET Tracer\logs\`

`DD_TRACE_LOG_PATH`
: 自動インスツルメンテーション・ログファイルにパスを設定し、他の .NET Tracer ログファイルすべてのディレクトリを決定します。`DD_TRACE_LOG_DIRECTORY` が設定されている場合、無視されます。

`DD_DISABLED_INTEGRATIONS`
: **TracerSettings プロパティ**: `DisabledIntegrationNames` <br>
無効にするインテグレーションのリストを設定します。他のインテグレーションはすべて有効のままになります。設定しなかった場合、すべてのインテグレーションが有効になります。セミコロンで区切ることで複数の値がサポートされます。有効な値は、[インテグレーション][8]セクションでリストされているインテグレーション名です。

`DD_HTTP_CLIENT_ERROR_STATUSES`
: HTTP クライアントスパンがエラーとしてマークされる原因となるステータスコード範囲を設定します。<br>
**デフォルト**: `400-499`

`DD_HTTP_SERVER_ERROR_STATUSES`
: HTTP サーバースパンがエラーとしてマークされる原因となるステータスコード範囲を設定します。 <br>
**デフォルト**: `500-599`

`DD_RUNTIME_METRICS_ENABLED`
: .NET ランタイムメトリクスを有効にします。有効な値は `true` または `false` です。バージョン 1.23.0 で追加されました。<br>
**デフォルト**: `false`

`DD_TRACE_ADONET_EXCLUDED_TYPES`
: **TracerSettings プロパティ**: `AdoNetExcludedTypes` <br>
自動インスツルメンテーションから除外される `AdoNet` タイプ (たとえば、`System.Data.SqlClient.SqlCommand`) のリストを設定します。


### インテグレーションコンフィギュレーションを無効にする

次の表に、自動インスツルメンテーションを使用しており、インテグレーションごとの設定が可能な場合に**のみ**使用できる構成変数を示します。

`DD_TRACE_<INTEGRATION_NAME>_ENABLED`
: **TracerSettings プロパティ**: `Integrations[<INTEGRATION_NAME>].Enabled` <br>
<br>特定のインテグレーションを有効または無効にします。有効な値は、`true` (デフォルト) または `false` です。インテグレーション名は、[インテグレーション][8]セクションにリストされています。
**デフォルト**: `true`

#### 試験機能

構成変数は現在利用可能な機能ですが、今後のリリースで変更される場合があります。

`DD_TRACE_ROUTE_TEMPLATE_RESOURCE_NAMES_ENABLED`
: `true` に設定すると、Web スパンに対する改善されたリソース名を有効化します。利用可能なルートテンプレート情報を使用して ASP.NET のコアインテグレーションにスパンを追加し、追加のタグを有効化します。バージョン 1.26.0 で追加されました。<br>
**デフォルト**: `false`

`DD_TRACE_PARTIAL_FLUSH_ENABLED`
: Datadog Agent への大規模トレースのフラッシュをインクリメント形式で有効化し、Agent に拒否される可能性を低減します。保持期間が長いトレースまたは多数のスパンを持つトレースがある場合にのみ使用してください。有効な値は `true` または `false`。バージョン 1.26.0 で追加され、Datadog Agent 7.26.0 以降とのみ互換性を有しています。<br>
**デフォルト**: `false`

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/dotnet-framework
[2]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/windows/?tab=gui
[3]: https://github.com/datadog/dd-trace-dotnet/releases/latest
[4]: https://app.datadoghq.com/apm/traces
[5]: https://www.nuget.org/packages/Datadog.Trace
[6]: /ja/tracing/custom_instrumentation/dotnet/
[7]: /ja/getting_started/tagging/unified_service_tagging/
[8]: /ja/tracing/setup_overview/compatibility_requirements/dotnet-framework/#integrations