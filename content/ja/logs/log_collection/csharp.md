---
title: 'C# ログ収集'
kind: documentation
aliases:
  - /ja/logs/languages/csharp
further_reading:
  - link: 'https://www.datadoghq.com/blog/c-logging-guide/'
    tag: ブログ
    text: 'C# ログの収集、カスタマイズ、分析方法'
  - link: /logs/processing/
    tag: Documentation
    text: ログの処理方法
  - link: /logs/processing/parsing/
    tag: Documentation
    text: パースの詳細
  - link: /logs/explorer/
    tag: Documentation
    text: ログの調査方法
  - link: '/logs/explorer/#visualize'
    tag: Documentation
    text: ログ分析の実行
  - link: /logs/faq/log-collection-troubleshooting-guide/
    tag: FAQ
    text: ログ収集のトラブルシューティングガイド
---
C# ログを Datadog に送信する場合は、ファイルにログを記録し、Datadog Agent を使用してそのファイルを追跡することをお勧めします。ここでは、`Serilog`、`NLog`、および `log4net` ログライブラリをセットアップする例を紹介します。

[カスタムパース規則][1]の使用を避け、ログを JSON 形式で生成するようにロギングライブラリをセットアップすることを強くお勧めします。

## ロガーの構成

{{< tabs >}}
{{% tab "Serilog" %}}

他の多くの .NET のライブラリと同様に、Serilog は、ファイル、コンソールなどに診断ログを提供します。簡単にセットアップでき、洗練された API を備えています。また、最近の .NET プラットフォーム間で移植可能です。

他のロギングライブラリと異なり、Serilog は、強力な構造化イベント データを志向して構築されています。

Serilog は NuGet からインストールします。パッケージマネージャーコンソールで、次のコマンドを実行してください。

```text
PM> Install-Package Serilog.Sinks.File
```

次に、アプリケーションでロガーを直接初期化します。

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

次に、`log.json` ファイルをチェックして、次のイベントがあることを確認します。

- `JsonFormatter(renderMessage: true)` を使用する場合:

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

- `RenderedCompactJsonFormatter()` を使用する場合

```json
{
  "@t": "2020-05-20T04:15:28.6898801Z",
  "@m": "Processed { Latitude: 25, Longitude: 134 } in 034 ms.",
  "@i": "d1eb2146",
  "Position": {"Latitude": 25, "Longitude": 134 },
  "Elapsed": 34
}
```

これで、[Agent を使用してログファイルを監視][1]し、ログを Datadog アプリケーションに送信できます。

[1]: /ja/logs/#tail-existing-files
{{% /tab %}}
{{% tab "NLog" %}}

NLog は、.NET 用ログプラットフォームで、ログルーティング機能とログ管理機能に優れています。アプリケーションのサイズや複雑さに関係なく、高品質なアプリケーションログを生成して管理できます。

NLog は NuGet からインストールします。パッケージマネージャーコンソールで、次のコマンドを実行してください。

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

これで、[Agent を使用してログファイルを監視][1]し、ログを Datadog アプリケーションに送信できます。

[1]: /ja/logs/#tail-existing-files
{{% /tab %}}
{{% tab "Log4Net" %}}
Log4Net は、Log4j から派生した .NET 用ログプラットフォームで、ログルーティング機能とログ管理機能に優れています。アプリケーションのサイズや複雑さに関係なく、高品質なアプリケーションログを生成して管理できます。

インストールするには、パッケージマネージャーコンソールで、次のコマンドを実行します。

```text
PM> Install-Package log4net
PM> Install-Package log4net.Ext.Json
```

ライブラリをクラスパスに追加したら、次のレイアウトを任意のターゲットにアタッチします。プロジェクトの `App.config` を編集して、以下のセクションを追加します。

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

JSON でログを記録する方がメリットが多いですが、未加工の文字列形式でログを記録したい場合は、次のように `log4net の変換パターン`を更新し、C# インテグレーションパイプラインを使用してログが自動的にパースされるようにすることをお勧めします。

```text
<param name="ConversionPattern" value="%date{yyyy-MM-dd HH:mm:ss.SSS} %level [%thread] %logger %method:%line - %message%n" />
```

{{% /tab %}}
{{< /tabs >}}

## ログとトレース全体のサービスを接続

APM が有効になっているアプリケーションの場合は、[APM .NET の指示に従い][2]ログにトレース ID、スパン ID、`env`、`service`、`version` を自動的に追加し、ログとトレースを接続します。

**注**: APM トレーサーがログに `service` を挿入する場合、Agent 構成で設定されている値は上書きされます。

## Datadog Agent の構成

`conf.d/` フォルダーに次の内容の `csharp.d/conf.yaml` ファイルを作成します。

```yaml
init_config:

instances:

##ログセクション
logs:

  - type: file
    path: "/path/to/your/csharp/log.log"
    service: csharp
    source: csharp
    sourcecategory: sourcecode
    # 複数行ログで、ログが yyyy-mm-dd 形式の日付で始まる場合は、以下の処理ルールのコメントを解除します。
    #log_processing_rules:
    #  - type: multi_line
    #    name: new_log_start_with_date
    #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
```

完了です。これで、すべてのログが Datadog アプリケーションが自動的に理解できる適切な JSON 形式になります。

## エージェントレスのログ収集

アプリケーションから Datadog または Datadog Agent にログを直接ストリーミングすることができます。接続に関する処理はアプリケーションで直接行うべきではないため、これは推奨のセットアップではありません。しかし、アクセスできないマシンでアプリケーションが実行されている場合は、ファイルにログを記録できないことがあります。
{{< tabs >}}
{{% tab "Serilog" %}}

Datadog [Serilog シンク][1]をインストールします。このシンクは、イベントとログを Datadog に送信し、デフォルトではポート 443 の HTTPS 経由でログを転送します。
パッケージマネージャーコンソールで、次のコマンドを実行してください。

```text
PM> Install-Package Serilog.Sinks.Datadog.Logs
```

次に、アプリケーションでロガーを直接初期化します。[ご使用の `<API_KEY>`][2] を忘れず追加してください。

{{< site-region region="us" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration { Url = "https://http-intake.logs.datadoghq.com" })
    .CreateLogger())
{
    // コード
}
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration { Url = "https://http-intake.logs.datadoghq.eu" })
    .CreateLogger())
{
    // コード
}
```

{{< /site-region >}}

デフォルトの動作を上書きして、ログを TCP で転送することもできます。それには、必須プロパティ `url`、`port`、`useSSL`、および `useTCP` を手動で指定します。また、[オプションで、`source`、`service`、`host`、およびカスタムタグを指定][3]できます。

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

[1]: https://www.nuget.org/packages/Serilog.Sinks.Datadog.Logs
[2]: https://app.datadoghq.com/account/settings#api
[3]: /ja/logs/#reserved-attributes
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/processing/parsing/
[2]: /ja/tracing/connect_logs_and_traces/dotnet/