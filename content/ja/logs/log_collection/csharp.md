---
aliases:
- /ja/logs/languages/csharp
further_reading:
- link: https://www.datadoghq.com/blog/c-logging-guide/
  tag: ブログ
  text: C# ログの収集、カスタマイズ、分析方法
- link: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
  tag: Documentation
  text: .NET ログとトレースの接続
- link: /logs/log_configuration/processors
  tag: Documentation
  text: ログの処理方法
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: パースの詳細
- link: /logs/explorer/
  tag: Documentation
  text: ログの調査方法
- link: /logs/explorer/#visualize
  tag: ドキュメント
  text: ログ分析の実行
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: よくあるご質問
  text: ログ収集のトラブルシューティングガイド
kind: documentation
title: C# ログ収集
---

C# のログを Datadog に送信するには、次のいずれかの方法を使用します。

- [ファイルにログを記録し、そのファイルを Datadog Agent で追跡します](#file-tail-logging-with-the-datadog-agent)。
- [エージェントレスロギングを有効にします](#agentless-logging-with-apm)。
- [Serilog シンクを使用します](#agentless-logging-with-serilog-sink)。

このページでは、`Serilog`、`NLog`、`log4net`、`Microsoft.Extensions.Logging` ロギングライブラリのセットアップ例を、上記の各アプローチで詳しく説明します。

## Datadog Agent によるファイルテールロギング

C# ログ収集の推奨アプローチは、ログをファイルに出力し、そのファイルを Datadog Agent でテールすることです。これにより、Datadog Agent が追加のメタデータでログをリッチ化することができます。

Datadog は、[カスタムパース規則][1]の使用を避け、ログを JSON 形式で生成するようにロギングライブラリをセットアップすることを強くお勧めします。

### ロガーの構成

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
// ロガーをインスタンス化します
var log = new LoggerConfiguration()  // using Serilog;

    // Serilog.Formatting.Json; の使用
    .WriteTo.File(new JsonFormatter(renderMessage: true), "log.json")

    // Serilog.Formatting.Compact; の使用
    // .WriteTo.File(new RenderedCompactJsonFormatter(), "log.json")  

    .CreateLogger();

// 例
var position = new { Latitude = 25, Longitude = 134 };
var elapsedMs = 34;

log.Information("Processed {@Position} in {Elapsed:000} ms.", position, elapsedMs);
```

`log.json` ファイルで、ロガーが正常にインスタンス化されたことを確認します。

- `JsonFormatter(renderMessage: true)` を使う場合は、次のイベントを探して確認してください。

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

- `RenderedCompactJsonFormatter()` を使う場合は、次のイベントを探して確認してください。

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

NLog は、.NET 用ログプラットフォームで、ログルーティング機能とログ管理機能に優れています。アプリケーションのサイズや複雑さに関係なく、高品質なアプリケーションログを生成して管理できます。

NLog を NuGet を使ってインストールするには、パッケージマネージャーコンソールで、次のコマンドを実行してください。

```text
PM> Install-Package NLog
```

ライブラリをクラスパスに追加したら、次のレイアウトを任意のターゲットにアタッチします。プロジェクトのルートパスにある `NLog.config` ファイルを編集または追加します。次に、そのファイルに以下のコードをコピーして貼り付けます (ログは `application-logs.json` ファイルに書き込まれます)。

```xml
<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <!--
  ログ規則と出力のカスタマイズについては、
  https://github.com/nlog/nlog/wiki/Configuration-file を参照してください。
   -->
  <targets async="true">
    <!-- ログを Json 形式でファイルに書き込みます -->
    <target name="json-file" xsi:type="File" fileName="application-logs.json">
      <layout xsi:type="JsonLayout">
        <attribute name="date" layout="${date:format=yyyy-MM-ddTHH\:mm\:ss.fff}" />
        <attribute name="level" layout="${level:upperCase=true}"/>
        <attribute name="message" layout="${message}" />
        <attribute name="exception" layout="${exception:format=ToString}" />
      </layout>
    </target>

  </targets>
  <rules>
    <!-- すべてのイベントを json-file ターゲットに記録します -->
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
        // ロガーを初期化します
        private static Logger logger = LogManager.GetCurrentClassLogger();

        static void Main(string[] args)
        {
            // 簡単なデバッグメッセージをログに記録します
            logger.Debug("This is my first step");

            // この後にコードを続けます...
        }
    }
}
```

{{% /tab %}}
{{% tab "Log4Net" %}}
Log4Net は、Log4j から派生した .NET 用ログプラットフォームで、ログルーティング機能とログ管理機能に優れています。アプリケーションのサイズや複雑さに関係なく、高品質なアプリケーションログを生成して管理できます。

Log4Net をインストールするには、パッケージマネージャーコンソールで、次のコマンドを実行します。

```text
PM> Install-Package log4net
PM> Install-Package log4net.Ext.Json
```

ライブラリがインストールされたら、次のレイアウトを任意のターゲットにアタッチします。プロジェクトの `App.config` を編集して、以下のセクションを追加します。

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
        <!--明示的なデフォルトメンバー-->
        <remove value="ndc" />
        <remove value="message" />
        <!--デフォルトの書式設定済みメッセージメンバーを削除します-->
        <member value="message:messageobject" />
        <!--未加工のメッセージを追加します-->
      </layout>
    </appender>
  </log4net>

  <!-- 他の構成をここから始めます... -->
```

ロガーをインスタンス化し、イベントの生成を開始します。

```csharp
using log4net;

namespace Datadog
{
    class Program
    {
        // 現在のクラスロガーを取得します
        private static ILog logger = LogManager.GetLogger(typeof(Program));

        static void Main(string[] args)
        {

           // App.config から構成を読み込みます
           XmlConfigurator.Configure();

             // 簡単なデバッグメッセージをログに記録します
           logger.Debug("This is my first debug message");

            // この後にコードを続けます ...
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

### Datadog Agent の構成

[ログ収集が有効][2]になったら、ログファイルを追跡して Datadog に送信する[カスタムログ収集][3]を設定します。

1. `csharp.d/` フォルダーを `conf.d/` [Agent 構成ディレクトリ][4]に作成します。
2. `csharp.d/` に以下の内容で `conf.yaml` ファイルを作成します。

    ```yaml
    init_config:

    instances:

    ##Log section
    logs:

      - type: file
        path: "/path/to/your/csharp/log.log"
        service: csharp
        source: csharp
        sourcecategory: sourcecode
        # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
        #log_processing_rules:
        #  - type: multi_line
        #    name: new_log_start_with_date
        #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```

3. [Agent を再起動します][5]。
4. [Agent の status サブコマンド][6]を実行し、`Checks` セクションで `csharp` を探し、ログが Datadog に正常に送信されることを確認します。

ログが JSON 形式の場合、Datadog は自動的にログメッセージを[パース][7]し、ログ属性を抽出します。[ログエクスプローラー][8]を使用して、ログを表示し、トラブルシューティングを行うことができます。

### ログとトレースにおけるサービスを接続

APM が有効になっているアプリケーションの場合は、[APM .NET の指示に従い][9]ログにトレース ID、スパン ID、`env`、`service`、`version` を自動的に追加し、ログとトレースを接続します。

**注**: APM トレーサーがログに `service` を挿入する場合、Agent 構成で設定されている値は上書きされます。

## APM によるエージェントレスロギング

.NET APM 自動インスツルメンテーションライブラリを使用して、コードを変更することなく、アプリケーションから Datadog に直接ログをストリームすることが可能です。この方法は、Datadog に直接ログを送信するため、Datadog Agent が提供する[機密データスクラビングなどの機能][10]の恩恵を受けることができません。そのため、可能な限りファイルテールロギングを使用することを推奨しますが、これが不可能な環境 (例えば [Azure App Service][11] を使用している場合) においては有用です。なお、[機密データスキャナー][12]によって実行されるサーバーサイドのスクラビング機能には、これまで通り依存することが可能です。

エージェントレスロギング (「ダイレクトログ送信」とも呼ばれる) は、以下のフレームワークに対応しています。
- Serilog (v1.0+)
- NLog (v2.1+)
- log4net (v1.0+)
- Microsoft.Extensions.Logging (2.0+)

アプリケーションのコードを修正したり、アプリケーションに依存するものを追加でインストールする必要はありません。

<div class="alert alert-warning">
  <strong>注:</strong> log4net または NLog を使用する場合、エージェントレスロギングを有効にするには、アペンダー (log4net) またはロガー (NLog) が構成されている必要があります。これらの場合、これらの追加の依存関係を追加するか、代わりに <a href="/logs/log_collection/csharp/?tab=log4net#agentless-logging-with-serilog-sink">Serilog シンクを使用してエージェントレスロギング</a>を使用することができます。
</div>


### APM ライブラリの構成

エージェントレスロギングは、APM を自動インスツルメンテーションで使用する場合にのみ利用できます。まず、以下のドキュメントで説明されているように、アプリケーションをインスツルメントしてください。

- [.NET Core/.NET 5+ アプリケーション][13]
- [.NET Framework アプリケーション][14]

インストール後、トレースが正しく受信されていることを確認します。

### エージェントレスロギングを有効にする

エージェントレスロギングを有効にするには、以下の環境変数を設定します。

`DD_API_KEY`
: Datadog にログを送信するための [Datadog API キー][15]。

`DD_SITE`
: [Datadog サイト][16]の名前。以下の例から選択してください。<br>
**例**: `datadoghq.com` (US1)、`datadoghq.eu` (EU)、`us3.datadoghq.com` (US3)、`us5.datadoghq.com` (US5)、`ddog-gov.com` (US1-FED) <br>
**デフォルト**: `datadoghq.com` (US1)

`DD_LOGS_INJECTION`
: [ログとトレースの接続][9]を有効にします。<br>
**デフォルト**: `true` <br>
Tracer バージョン 2.7.0 からエージェントレスロギングを使用する場合、デフォルトで有効になります。

`DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS`
: エージェントレスロギングを有効にします。`Serilog`、`NLog`、`Log4Net`、または `ILogger` (`Microsoft.Extensions.Logging` の場合) に設定することで、使用しているロギングフレームワークで有効にすることができます。複数のロギングフレームワークを使用している場合は、セミコロンで区切った変数のリストを使用します。<br>
**例**: `Serilog;Log4Net;NLog`

<div class="alert alert-warning">
  <strong>注:</strong> <code>Microsoft.Extensions.Logging</code> と共にロギングフレームワークを使用している場合、一般的にフレームワーク名を使用する必要があります。例えば、<a href="https://github.com/serilog/serilog-extensions-logging">Serilog.Extensions.Logging</a> を使用している場合、<code>DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS=Serilog</code> に設定する必要があります。
</div>

これらの環境変数を設定した後、アプリケーションを再起動します。

### 追加のコンフィギュレーション

以下の環境変数を使用して、エージェントレスログ収集のいくつかの側面をさらにカスタマイズすることができます。

`DD_LOGS_DIRECT_SUBMISSION_MINIMUM_LEVEL`
: Datadog に送信される前に、ログをレベル別にフィルタリングできるようにします。`Verbose`、`Debug`、`Information`、`Warning`、`Error`、`Critical` のいずれかに設定します。これらはサポートされているロギングフレームワークで同等のレベルに対応します。<br>
**デフォルト**: `Information`

`DD_LOGS_DIRECT_SUBMISSION_HOST`
: ログに関連するホストマシンの名前を設定します。指定しない場合、ホスト名は自動検索が試みられます。<br>
**デフォルト**: 自動的に決定される

`DD_LOGS_DIRECT_SUBMISSION_TAGS`
: 指定された場合、生成されたすべてのスパンに指定されたすべてのタグを追加します。指定されない場合は、代わりに `DD_TAGS` を使用します。<br>
**例**: `layer:api, team:intake`
デリミタはコンマと空白: `, ` であることに注意してください。

以下の構成値は、基本的に変更すべきではありませんが、必要であれば設定しても構いません。

{{< site-region region="us" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: ログを送信するための URL を設定します。デフォルトでは `DD_SITE` で指定されたドメインを使用します。<br>
**デフォルト**: `https://http-intake.logs.datadoghq.com:443` (`DD_SITE` に基づく)

{{< /site-region >}}

{{< site-region region="us3" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: ログを送信するための URL を設定します。デフォルトでは `DD_SITE` で指定されたドメインを使用します。<br>
**デフォルト**: `https://http-intake.logs.us3.datadoghq.com:443` (`DD_SITE` に基づく)

{{< /site-region >}}

{{< site-region region="us5" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: ログを送信するための URL を設定します。デフォルトでは `DD_SITE` で指定されたドメインを使用します。<br>
**デフォルト**: `https://http-intake.logs.us5.datadoghq.com:443` (`DD_SITE` に基づく)

{{< /site-region >}}

{{< site-region region="eu" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: ログを送信するための URL を設定します。デフォルトでは `DD_SITE` で指定されたドメインを使用します。<br>
**デフォルト**: `https://http-intake.logs.datadoghq.eu:443` (`DD_SITE` に基づく)

{{< /site-region >}}

{{< site-region region="us1-fed" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: ログを送信するための URL を設定します。デフォルトでは `DD_SITE` で指定されたドメインを使用します。<br>
**デフォルト**: `https://http-intake.logs.ddog-gov.com:443` (`DD_SITE` に基づく)

{{< /site-region >}}

`DD_LOGS_DIRECT_SUBMISSION_SOURCE`
: 送信されたログのパースルールを設定します。[カスタムパイプライン][17]を使用していない限り、常に `csharp` に設定する必要があります。<br>
**デフォルト**: `csharp`

`DD_LOGS_DIRECT_SUBMISSION_MAX_BATCH_SIZE`
: 一度に送信するログの最大数を設定します。[API で設定されている制限][18]を考慮します。<br>
**デフォルト**: `1000`

`DD_LOGS_DIRECT_SUBMISSION_MAX_QUEUE_SIZE`
: ログメッセージを削除する前に、内部キューに一度に保持するログの最大数を設定します。<br>
**デフォルト**: `100000`

`DD_LOGS_DIRECT_SUBMISSION_BATCH_PERIOD_SECONDS`
: 送信する新しいログを確認するまでの待ち時間を設定します (秒)。<br>
**デフォルト**: `1`

`Microsoft.Extensions.Logging` のインテグレーションを使用している場合、`ILogger` に組み込まれた標準機能を使用して Datadog に送信されるログをフィルタリングすることができます。直接送信するプロバイダを特定するために `"Datadog"` というキーを使用し、各ネームスペースに最小限のログレベルを設定します。例えば、`appSettings.json` に以下を追加すると、`Warning` 以下のレベルのログを Datadog に送信しないようにすることができます。.NET トレーサーライブラリ v2.20.0 で導入されました。

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

## Serilog シンクによるエージェントレスロギング

もし、ファイルテールロギングや APM エージェントレスロギングを使用することができず、`Serilog` フレームワークを使用している場合は、Datadog [Serilog シンク][19]を使用して直接 Datadog にログを送信することが可能です。

Datadog [Serilog シンク][19]をアプリケーションにインストールします。このシンクは、イベントとログを Datadog に送信し、デフォルトではポート 443 の HTTPS 経由でログを転送します。
パッケージマネージャーコンソールで、次のコマンドを実行してください。

```text
PM> Install-Package Serilog.Sinks.Datadog.Logs
```

次に、アプリケーションでロガーを直接初期化します。必ず[ご使用の `<API_KEY>`][15] を追加してください。

{{< site-region region="us" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.datadoghq.com" })
    .CreateLogger())
{
    // コード
}
```

{{< /site-region >}}

{{< site-region region="us3" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.us3.datadoghq.com" })
    .CreateLogger())
{
    // コード
}
```

{{< /site-region >}}

{{< site-region region="us5" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.us5.datadoghq.com" })
    .CreateLogger())
{
    // コード
}
```

{{< /site-region >}}

{{< site-region region="eu" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.datadoghq.eu" })
    .CreateLogger())
{
    // コード
}
```

{{< /site-region >}}

{{< site-region region="us1-fed" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.ddog-gov.com" })
    .CreateLogger())
{
    // コード
}
```

{{< /site-region >}}


デフォルトの動作を上書きして、ログを TCP で転送することもできます。それには、必須プロパティ `url`、`port`、`useSSL`、および `useTCP` を手動で指定します。また、オプションで、[`source`、`service`、`host`、およびカスタムタグを指定][20]できます。

{{< site-region region="us" >}}

たとえば、Datadog US リージョンに TCP でログを転送する場合は、次のようなシンクコンフィギュレーションを使用します。

```csharp
var config = new DatadogConfiguration(url: "intake.logs.datadoghq.com", port: 10516, useSSL: true, useTCP: true);
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs(
        "<API_KEY>",
        source: "<SOURCE_NAME>",
        service: "<SERVICE_NAME>",
        host: "<HOST_NAME>",
        tags: new string[] {"<TAG_1>:<VALUE_1>", "<TAG_2>:<VALUE_2>"},
        configuration: config
    )
    .CreateLogger())
{
    // コード
}
```

{{< /site-region >}}
{{< site-region region="eu" >}}

たとえば、Datadog EU リージョンに TCP でログを転送する場合は、次のようなシンクコンフィギュレーションを使用します。

```csharp
var config = new DatadogConfiguration(url: "tcp-intake.logs.datadoghq.eu", port: 443, useSSL: true, useTCP: true);
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs(
        "<API_KEY>",
        source: "<SOURCE_NAME>",
        service: "<SERVICE_NAME>",
        host: "<HOST_NAME>",
        tags: new string[] {"<TAG_1>:<VALUE_1>", "<TAG_2>:<VALUE_2>"},
        configuration: config
    )
    .CreateLogger())
{
    // コード
}
```

{{< /site-region >}}

これで、新しいログが Datadog に直接送信されるようになります。

または、`0.2.0` 以降、`Serilog.Setting.Configuration` パッケージで `appsettings.json` ファイルを使用して Datadog シンクを構成できます。

`Serilog.WriteTo` 配列で、`DatadogLogs` のエントリを追加します。以下に例を示します。

```json
"Serilog": {
  "Using": [ "Serilog.Sinks.Console", "Serilog.Sinks.Datadog.Logs" ],
  "MinimumLevel": "Debug",
  "WriteTo": [
    { "Name": "Console" },
    {
      "Name": "DatadogLogs",
      "Args": {
        "apiKey": "<API_キー>",
        "source": "<ソース名>",
        "host": "<ホスト名>",
        "tags": ["<タグ_1>:<値_1>", "<タグ_2>:<値_2>"],
      }
    }
  ],
  "Enrich": [ "FromLogContext", "WithMachineName", "WithThreadId" ],
  "Properties": {
    "Application": "Sample"
  }
}
```

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/parsing
[2]: /ja/agent/logs/?tab=tailfiles#activate-log-collection
[3]: /ja/agent/logs/?tab=tailfiles#custom-log-collection
[4]: /ja/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[5]: /ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[6]: /ja/agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
[7]: /ja/logs/log_configuration/parsing/?tab=matchers
[8]: /ja/logs/explorer/#overview
[9]: /ja/tracing/other_telemetry/connect_logs_and_traces/dotnet/
[10]: /ja/agent/logs/advanced_log_collection
[11]: /ja/serverless/azure_app_services
[12]: /ja/account_management/org_settings/sensitive_data_detection/#overview
[13]: /ja/tracing/trace_collection/dd_libraries/dotnet-core
[14]: /ja/tracing/trace_collection/dd_libraries/dotnet-framework
[15]: https://app.datadoghq.com/organization-settings/api-keys
[16]: /ja/getting_started/site/
[17]: /ja/logs/log_configuration/pipelines/?tab=source
[18]: /ja/api/latest/logs/#send-logs
[19]: https://www.nuget.org/packages/Serilog.Sinks.Datadog.Logs
[20]: /ja/logs/log_configuration/attributes_naming_convention/#reserved-attributes