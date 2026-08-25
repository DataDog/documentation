---
aliases:
- /ja/logs/languages/csharp
further_reading:
- link: https://www.datadoghq.com/blog/c-logging-guide/
  tag: ブログ
  text: C# ログの収集、カスタマイズ、分析方法
- link: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
  tag: ドキュメント
  text: .NET ログとトレースの接続
- link: /logs/log_configuration/processors
  tag: ドキュメント
  text: ログの処理方法
- link: /logs/log_configuration/parsing
  tag: ドキュメント
  text: パースの詳細
- link: /logs/explorer/
  tag: ドキュメント
  text: ログの調査方法
- link: /logs/explorer/#visualize
  tag: ドキュメント
  text: ログ分析の実行
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: よくあるご質問
  text: ログ収集のトラブルシューティングガイド
- link: /glossary/#tail
  tag: 用語集
  text: 用語集の "tail" の項目
- link: https://github.com/DataDog/serilog-sinks-datadog-logs/
  tag: GitHub パッケージ
  text: Serilog.Sinks.Datadog.Logs パッケージ
title: C# ログ収集
---
C# のログを Datadog に送信するには、次のいずれかの方法を使用します。

- [ファイルにログを記録し、そのファイルを Datadog Agent でテールする](#file-tail-logging-with-the-datadog-agent)。
- [エージェントレスロギングを有効にする](#agentless-logging-with-apm)
- [Serilog シンクを使用する](#agentless-logging-with-serilog-sink)。

## Datadog Agent によるファイルテールロギング {#file-tail-logging-with-the-datadog-agent}

C# ログ収集の推奨アプローチは、ログをファイルに出力し、そのファイルを Datadog Agent で[テール][20]監視することです。これにより、Datadog Agent が追加のメタデータでログを強化することができます。

Datadog は、[カスタムパース規則][1]の使用を避け、ログを JSON 形式で生成するようにロギングライブラリをセットアップすることを強くお勧めします。

ファイルテールロギングは、以下のフレームワークをサポートしています。
- Serilog
- NLog
- log4net

### ロガーの構成 {#configure-your-logger}

{{< tabs >}}
{{% tab "Serilog" %}}

他の多くの .NET のライブラリと同様に、Serilog は、ファイル、コンソールなどに診断ログを提供します。洗練された API を備えています。また、最近の .NET プラットフォーム間で移植可能です。

他のロギングライブラリと異なり、Serilog は、強力な構造化イベント データを志向して構築されています。

Serilog を NuGet でインストールするには、パッケージマネージャーコンソールで、次のコマンドを実行してください。

```text
PM> Install-Package Serilog.Sinks.File
```

次に、以下のコードを追加してアプリケーションでロガーを直接初期化します。

```csharp
// Instantiate the logger
var log = new LoggerConfiguration()  // using Serilog;

    // using Serilog.Formatting.Json;
    .WriteTo.File(new JsonFormatter(renderMessage: true), "log.json")

    // using Serilog.Formatting.Compact;
    // .WriteTo.File(new RenderedCompactJsonFormatter(), "log.json")

    .CreateLogger();

// An example
var position = new { Latitude = 25, Longitude = 134 };
var elapsedMs = 34;

log.Information("Processed {@Position} in {Elapsed:000} ms.", position, elapsedMs);
```

`log.json` ファイルで、ロガーが正常にインスタンス化されたことを確認します。

-  `JsonFormatter(renderMessage: true)` を使用している場合は、確認のために次のイベントを探してください。

```json
{
  "MessageTemplate": "Processed {@Position} in {Elapsed:000} ms.",
  "Level": "Information",
  "Timestamp": "2016-09-02T15:02:29.648Z",
  "Renderings": {"Elapsed": [{"Format": "000", "Rendering": "034"}]},
  "RenderedMessage":"Processed { Latitude: 25, Longitude: 134 } in 034 ms.",
  "Properties": {"Position": {"Latitude": 25, "Longitude": 134}, "Elapsed": 34}
}
```

-  `RenderedCompactJsonFormatter()` を使用している場合は、確認のために次のイベントを探してください。

```json
{
  "@t": "2020-05-20T04:15:28.6898801Z",
  "@m": "Processed { Latitude: 25, Longitude: 134 } in 034 ms.",
  "@i": "d1eb2146",
  "Position": {"Latitude": 25, "Longitude": 134 },
  "Elapsed": 34
}
```

{{% /tab %}}
{{% tab "NLog" %}}

NLog は、豊富なログルーティングおよび管理機能を備えた .NET 用のログプラットフォームです。アプリケーションのサイズや複雑さに関係なく、高品質なログの生成および管理に役立ちます。

NLog を NuGet を使ってインストールするには、パッケージマネージャーコンソールで、次のコマンドを実行してください。

```text
PM> Install-Package NLog
```

ライブラリがクラスパスにある場合は、次のレイアウトを任意のターゲットに適用してください。プロジェクトのルートパスに `NLog.config` ファイルを編集または追加してください。次に、以下のコードをその中にコピー/ペーストします (*ログは `application-logs.json` ファイルに書き込まれます*)。

```xml
<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <!--
  See https://github.com/nlog/nlog/wiki/Configuration-file
  for information on customizing logging rules and outputs.
   -->
  <targets async="true">
    <!-- Write logs as Json into a file -->
    <target name="json-file" xsi:type="File" fileName="application-logs.json">
      <layout xsi:type="JsonLayout">
        <attribute name="date" layout="${date:universalTime=true:format=o}" />
        <attribute name="level" layout="${level:upperCase=true}"/>
        <attribute name="message" layout="${message}" />
        <attribute name="exception" layout="${exception:format=ToString}" />
      </layout>
    </target>

  </targets>
  <rules>
    <!-- Log all events to the json-file target -->
    <logger name="*" writeTo="json-file" minlevel="Trace" />
  </rules>
</nlog>
```

最初のイベントを生成してログに記録するには、以下をコードに追加します。

```csharp
using NLog;

namespace Datadog
{
    class Program
    {
        // Initialize a logger
        private static Logger logger = LogManager.GetCurrentClassLogger();

        static void Main(string[] args)
        {
            // Log a simple debug message
            logger.Debug("This is my first step");

            // your code continues here ...
        }
    }
}
```

{{% /tab %}}
{{% tab "Log4Net" %}}
Log4Net は、Log4j にインスパイアされた .NET 用のログプラットフォームで、豊富なログルーティングおよび管理機能を備えています。アプリケーションのサイズや複雑さに関係なく、高品質なログの生成および管理に役立ちます。

Log4Net をインストールするには、パッケージマネージャーコンソールで、次のコマンドを実行します。

```text
PM> Install-Package log4net
PM> Install-Package log4net.Ext.Json
```

ライブラリをインストールしたら、任意のターゲットに次のレイアウトを適用します。プロジェクトの `App.config` を編集し、次のセクションを追加します。

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>

  <configSections>
    <section name="log4net" type="log4net.Config.Log4NetConfigurationSectionHandler, log4net" />
  </configSections>

  <log4net>
    <root>
      <level value="DEBUG" />
      <appender-ref ref="JsonFileAppender" />
    </root>
    <appender name="JsonFileAppender" type="log4net.Appender.FileAppender">
      <threshold value="DEBUG"/>
      <file value="application-logs.json" />
      <encoding type="System.Text.UTF8Encoding" />
      <appendToFile value="true" />
      <layout type="log4net.Layout.SerializedLayout, log4net.Ext.Json">
        <decorator type="log4net.Layout.Decorators.StandardTypesDecorator, log4net.Ext.Json" />
        <default />
        <!--explicit default members-->
        <remove value="ndc" />
        <remove value="message" />
        <!--remove the default preformatted message member-->
        <member value="message:messageobject" />
        <!--add raw message-->
      </layout>
    </appender>
  </log4net>

  <!-- The rest of your configuration starts here ... -->
```

ロガーをインスタンス化し、イベントの生成を開始します。

```csharp
using log4net;

namespace Datadog
{
    class Program
    {
        // Get the current class logger
        private static ILog logger = LogManager.GetLogger(typeof(Program));

        static void Main(string[] args)
        {

           // Load the configure fom App.config
           XmlConfigurator.Configure();

           // Log a simple debug message
           logger.Debug("This is my first debug message");

           // your code continues here ...
        }
    }
}
```

上の手順に従った場合は、ログファイル (例: `C:\Projects\Datadog\Logs\log.json`) に次のイベントがあることを確認できます。

```json
{
  "level": "DEBUG",
  "message": "This is my debug message",
  "date": "2016-05-24 15:53:35.7175",
  "appname": "Datadog.vshost.exe",
  "logger": "Datadog.Program",
  "thread": "10"
}
```

JSON でログを記録する方がメリットが多いですが、未加工の文字列形式でログを記録したい場合は、次のように `log4net conversion pattern` を更新し、C# インテグレーションパイプラインを使用してログが自動的にパースされるようにします。

```text
<param name="ConversionPattern" value="%date{yyyy-MM-dd HH:mm:ss.SSS} %level [%thread] %logger %method:%line - %message%n" />
```

{{% /tab %}}
{{< /tabs >}}

### Datadog Agent の構成{#configure-the-datadog-agent}

[ログ収集が有効][2]になったら、ログファイルを追跡して Datadog に送信する[カスタムログ収集][3]を設定します。

1. `csharp.d/` フォルダーを `conf.d/` [Agent 構成ディレクトリ][4]に作成します。
2. `csharp.d/` に以下の内容で `conf.yaml` ファイルを作成します。

    ```yaml
    init_config:

    instances:

    ##Log section
    logs:

      - type: file
        path: "<path_to_your_csharp_log>.log"
        service: <service_name>
        source: csharp
        sourcecategory: sourcecode
        # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
        #log_processing_rules:
        #  - type: multi_line
        #    name: new_log_start_with_date
        #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```
3. Agent ユーザーにログファイルの読み取り権限があることを確認します。
4. [Agent を再起動][5]します。
5. [Agent の status サブコマンド][6]を実行し、`Checks` セクションで `csharp` を探し、ログが Datadog に正常に送信されることを確認します。

ログが JSON 形式の場合、Datadog は自動的にログメッセージを[パース][7]し、ログ属性を抽出します。[ログエクスプローラー][8]を使用して、ログを表示し、トラブルシューティングを行うことができます。

### ログとトレース全体のサービスを接続 {#connect-your-service-across-logs-and-traces}

このアプリケーションで APM が有効になっている場合は、トレース ID とスパン ID を自動的に追加して、ログとトレースを接続します。
`env`、`service`、および `version` をログに追加して、[APM .NET の指示に従って][9]ログとトレースを接続してください。

**注**: Datadog SDK がログに `service` を挿入する場合、Agent 構成で設定されている値は上書きされます。

## APM によるエージェントレスロギング {#agentless-logging-with-apm}

コードを変更することなく、.NET APM 自動インスツルメンテーションライブラリを使用して、アプリケーションから Datadog にログを直接ストリーミングできます。このアプローチではログを Datadog に直接送信するため、Datadog Agent が提供する[機能 (機密データのスクラビングなど)][10]の恩恵を受けることはありません。そのため、可能な限りファイルテールロギングを使用することを推奨しますが、[Azure App Service][11] を使用する場合など、ファイルテールロギングを使用できない環境では有用です。なお、[Sensitive Data Scanner][12] によるサーバー側のスクラビング機能は引き続き利用できる点は特筆すべきです。

エージェントレスロギング (「ダイレクトログ送信」とも呼ばれる) は、以下のフレームワークに対応しています。
- Serilog (v1.0+)
- NLog (v2.1+)
- log4net (v1.0+)
- Microsoft.Extensions.Logging (2.0+)

アプリケーションのコードを修正したり、アプリケーションに依存するものを追加でインストールする必要はありません。

<div class="alert alert-danger">
  <strong>注:</strong> log4net または NLog を使用する場合、エージェントレスロギングを有効にするには、アペンダー (log4net) またはロガー (NLog) を構成する必要があります。その場合、これらの追加依存関係を追加するか、<a href="/logs/log_collection/csharp/?tab=log4net#agentless-logging-with-serilog-sink">Serilog シンクを使用したエージェントレスロギング</a>を代わりに使用できます。
</div>


### Datadog SDK を構成する {#configure-the-datadog-sdk}

エージェントレスロギングは、APM で自動インスツルメンテーションを使用している場合にのみ利用可能です。始めるには、以下のドキュメントに記載されているようにアプリケーションをインスツルメントしてください。

- [.NET Core/.NET 5+ applications][13]
- [.NET Framework applications][14]

インストール後、トレースが正しく受信されていることを確認します。

### エージェントレスロギングを有効にする {#enable-agentless-logging}

エージェントレスロギングを有効にするには、以下の環境変数を設定します。

`DD_API_KEY`
: Datadog にログを送信するための [Datadog API キー][15]。

`DD_SITE`
: [あなたの Datadog サイト][16]の名前。次の例のいずれかを選択してください。<br>
**例**: `datadoghq.com` (US1)、`datadoghq.eu` (EU)、`us3.datadoghq.com` (US3)、`us5.datadoghq.com` (US5)、`ap1.datadoghq.com` (AP1)、`ap2.datadoghq.com` (AP2)、`ddog-gov.com` (US1-FED)、`us2.ddog-gov.com` (US2-FED) <br>
**デフォルト**: `datadoghq.com` (US1)

`DD_LOGS_INJECTION`
: [ログとトレースの接続][9]を有効にします。<br>
**デフォルト**: `true` <br>
Tracer バージョン 3.24.0 以降、デフォルトで有効です。

`DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS`
: エージェントレスロギングを有効にします。`Serilog`、`NLog`、`Log4Net`、または`ILogger` (`Microsoft.Extensions.Logging` 用) に設定することで、ログフレームワークで有効にします。複数のログフレームワークを使用している場合は、セミコロン区切りの変数リストを使用してください。<br>
**例**: `Serilog;Log4Net;NLog`

<div class="alert alert-danger">
  <strong>注:</strong>  <code>Microsoft.Extensions.Logging</code>と併用してログフレームワークを使用している場合は、通常、そのフレームワーク名を使用する必要があります。例えば、<a href="https://github.com/serilog/serilog-extensions-logging">Serilog.Extensions.Logging</a> を使用している場合は、 <code>DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS=Serilog</code>を設定する必要があります。
</div>

これらの環境変数を設定した後、アプリケーションを再起動します。

### 追加の構成 {#additional-configuration}

以下の環境変数を使用して、エージェントレスログ収集のいくつかの側面をさらにカスタマイズすることができます。

`DD_LOGS_DIRECT_SUBMISSION_MINIMUM_LEVEL`
: Datadogに送信される_前に_、レベルでログをフィルタリングできるようにします。次のいずれかの値に設定してください: `Verbose`、`Debug`、`Information`、`Warning`、`Error`、`Critical`。これらは、サポートされているログフレームワークにおける同等のレベルに対応します。<br>
**デフォルト**: `Information`

`DD_LOGS_DIRECT_SUBMISSION_HOST`
: ログに関連付けられたホストの名前を設定します。指定されない場合、ホスト名は自動的に検出されます。<br>
**デフォルト**: 自動的に決定されます。

`DD_LOGS_DIRECT_SUBMISSION_TAGS`
: 指定された場合、指定されたすべてのタグを生成されたすべてのスパンに追加します。指定されない場合は、代わりに `DD_TAGS` を使用します。<br>
**例**: `layer:api, team:intake`
区切り文字はカンマと空白であることに注意してください: `, `。

以下の構成値は、基本的に変更すべきではありませんが、必要であれば設定しても構いません。

`DD_LOGS_DIRECT_SUBMISSION_URL`
: ログを送信する URL を設定します。デフォルトでは、`DD_SITE` で指定されたドメインを使用します。<br>
**デフォルト**: `{{< region-param key=http_endpoint_full >}}:443` (based on `DD_SITE`)

`DD_LOGS_DIRECT_SUBMISSION_SOURCE`
: 送信されたログのパースルールを設定します。[カスタムパイプライン][17]がない限り、常に `csharp` に設定する必要があります。<br>
**デフォルト**: `csharp`

`DD_LOGS_DIRECT_SUBMISSION_MAX_BATCH_SIZE`
: 一度に送信するログの最大数を設定します。[API に設定されている制限][18]を考慮します。<br>
**デフォルト**: `1000`

`DD_LOGS_DIRECT_SUBMISSION_MAX_QUEUE_SIZE`
: ログメッセージを削除する前に、内部キューに一度に保持するログの最大数を設定します。<br>
**デフォルト**: `100000`

`DD_LOGS_DIRECT_SUBMISSION_BATCH_PERIOD_SECONDS`
: 新しいログを送信する前にチェックするまでの待機時間 (秒) を設定します。<br>
**デフォルト**: `1`

`Microsoft.Extensions.Logging` インテグレーションを使用している場合は、`ILogger` に組み込まれている標準機能を使用して、Datadog に送信されるログをフィルタリングできます。キー `"Datadog"` を使用して直接送信プロバイダーを識別し、各ネームスペースの最小ログレベルを設定します。例えば、`appSettings.json` に以下を追加すると、`Warning` 未満のレベルのログが Datadog に送信されないようにできます。..NET SDK v2.20.0 で導入されました。

```json
{
  "Logging": {
    "Datadog": {
      "LogLevel": {
        "Microsoft.AspNetCore": "Warning"
      },
    }
  }
}
```

## Serilog シンクによるエージェントレスロギング {#agentless-logging-with-serilog-sink}

<div class="alert alert-info"> <code>0.2.0</code>以降では、 <code>appsettings.json</code> ファイルを使用して <a href="https://github.com/serilog/serilog-settings-configuration"> パッケージの Datadog シンクを構成できます。<code>Serilog.Setting.Configuration</code></a> パッケージ。
詳細については、<a href="https://github.com/DataDog/serilog-sinks-datadog-logs/tree/master?tab=readme-ov-file#serilogsinksdatadoglogs">`Serilog.Sinks.Datadog.Logs`</a> パッケージを参照してください。</div>

もし、ファイルテールロギングや APM エージェントレスロギングを使用することができず、`Serilog` フレームワークを使用している場合は、Datadog [Serilog シンク][19]を使用して直接 Datadog にログを送信することが可能です。

[Datadog Serilog シンク][19] をアプリケーションにインストールすると、イベントとログが Datadog に送信されます。デフォルトでは、シンクは HTTPS (ポート 443) 経由でログを転送します。
パッケージマネージャーコンソールで次のコマンドを実行します。

```text
PM> Install-Package Serilog.Sinks.Datadog.Logs
```

次に、アプリケーションでロガーを直接初期化します。必ず[ご使用の `<API_KEY>`][15] を追加してください。

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "{{< region-param key="http_endpoint_full" >}}" })
    .CreateLogger())
{
    // Some code
}
```

これで、新しいログが Datadog に直接送信されるようになります。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/parsing
[2]: /ja/agent/logs/?tab=tailfiles#activate-log-collection
[3]: /ja/agent/logs/?tab=tailfiles#custom-log-collection
[4]: /ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[5]: /ja/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[6]: /ja/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[7]: /ja/logs/log_configuration/parsing/?tab=matchers
[8]: /ja/logs/explorer/#overview
[9]: /ja/tracing/other_telemetry/connect_logs_and_traces/dotnet/
[10]: /ja/agent/logs/advanced_log_collection
[11]: /ja/serverless/azure_app_services
[12]: /ja/security/sensitive_data_scanner/
[13]: /ja/tracing/trace_collection/dd_libraries/dotnet-core
[14]: /ja/tracing/trace_collection/dd_libraries/dotnet-framework
[15]: https://app.datadoghq.com/organization-settings/api-keys
[16]: /ja/getting_started/site/
[17]: /ja/logs/log_configuration/pipelines/?tab=source
[18]: /ja/api/latest/logs/#send-logs
[19]: https://www.nuget.org/packages/Serilog.Sinks.Datadog.Logs
[20]: /ja/glossary/#tail