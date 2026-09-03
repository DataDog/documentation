---
aliases:
- /ja/tracing/connect_logs_and_traces/dotnet
code_lang: dotnet
code_lang_weight: 60
description: .NET のログとトレースを接続して Datadog で関連付けます。
further_reading:
- link: tracing/trace_collection/custom_instrumentation
  tag: ドキュメント
  text: アプリケーションを手動でインスツルメントしてトレースを作成する
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの調査
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: ブログ
  text: 自動的にリクエストログをトレースに関連付ける
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: ガイド
  text: クロスプロダクト相関で容易にトラブルシューティング。
title: .NET のログとトレースの相関付け
type: multi-code-lang
---
トレースとスパンの ID がアプリケーションログに挿入されるようロギングライブラリおよび .NET トレーシングの構成を設定し、ログデータと相関したアプリケーションのパフォーマンスモニタリングデータを取得することができます。

.NET トレーサーを [Unified Service Tagging][1] で構成して、アプリケーションのトレースとログの相関付けに最高の使用体験と有用なコンテキストを確保します。

.NET トレーサーは、以下のロギングライブラリをサポートします。
- [Serilog][2] (v1.4+)
- [log4net][3]
- [NLog][4]
- [Microsoft.Extensions.Logging][5] (v1.28.6 で追加)

## ログ収集の構成 {#configure-log-collection}

Datadog Agent でログ収集が構成されていること、またログパイプラインがログファイルを解析できるように、追跡する指定ファイルの[ログ Agent の構成][15]が `source: csharp` に設定されていることを確認します。詳細については、[C# ログ収集][7]を参照してください。`source` が `csharp` 以外の値に設定されている場合、相関を正しく動作させるために、適切なログ処理パイプラインに[トレースリマッパー][8]を追加する必要があるかもしれません。

<div class="alert alert-danger">自動ログ収集は、JSON 形式のログにのみ対応しています。カスタムパースルールを使用することもできます。</div>

## ログへの挿入の構成 {#configure-injection-in-logs}

ログメッセージに相関識別子を挿入するには、お使いのロギングライブラリの指示に従ってください。

<div class="alert alert-info">
  その他の例については、<a href="https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/AutomaticTraceIdInjection">dd-trace-dotnet にあるサンプル</a>を参照してください。
</div>

{{< tabs >}}
{{% tab "Serilog" %}}

<div class="alert alert-danger">
  <strong>注: </strong>.NET トレーサーバージョン 2.0.1 以降、Serilog ロギングライブラリの自動挿入には、アプリケーションが自動インスツルメンテーションされているれていることが必要になります。
</div>

ログメッセージに相関識別子を自動的に挿入するには:

1. 以下のトレーサー設定で .NET トレーサーを構成します。
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. [.NET トレーサーのインストール手順][1]に従って、アプリの自動インスツルメンテーショントレーシングを有効にします。

[1]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/dotnet-core/
{{% /tab %}}
{{% tab "log4net" %}}

<div class="alert alert-danger">
  <strong>注: </strong>.NET トレーサーバージョン 1.29.0 以降、log4net ロギングライブラリの自動挿入には、アプリケーションが自動インスツルメンテーションされているれていることが必要になります。
</div>

ログメッセージに相関識別子を自動的に挿入するには:

1. 以下のトレーサー設定で .NET トレーサーを構成します。
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. [.NET トレーサーのインストール手順][1]に従って、アプリの自動インスツルメンテーショントレーシングを有効にします。

3. ログ出力に `dd.env`、`dd.service`、`dd.version`、`dd.trace_id`、`dd.span_id` のログプロパティを追加してください。これらのプロパティを_個別に_含めることもできますし、_すべての_ログプロパティを含めることもできます。どちらの方法も、次のサンプルコードに示されています。

```xml
  <layout type="log4net.Layout.SerializedLayout, log4net.Ext.Json">
    <decorator type="log4net.Layout.Decorators.StandardTypesDecorator, log4net.Ext.Json" />
    <default />
    <!--explicit default members-->
    <remove value="ndc" />
    <!--remove the default preformatted message member-->
    <remove value="message" />
    <!--add raw message-->
    <member value="message:messageobject" />

    <!-- Include Datadog properties -->
    <!-- EITHER Include individual properties with value='<property_name>' -->
    <member value='dd.env' />
    <member value='dd.service' />
    <member value='dd.version' />
    <member value='dd.trace_id' />
    <member value='dd.span_id' />
    <!-- OR Include all properties with value='properties' -->
    <member value='properties'/>
  </layout>
```
その他の例については、GitHub の [log4net トレース ID 自動挿入プロジェクト][2]を参照してください。


[1]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/dotnet-core/
[2]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/Log4NetExample/log4net.config
{{% /tab %}}
{{% tab "NLog" %}}

<div class="alert alert-danger">
  <strong>注: </strong>.NET トレーサーバージョン 2.0.1 以降、NLog ロギングライブラリの自動挿入には、アプリケーションが自動インスツルメンテーションされているれていることが必要になります。
</div>

ログメッセージに相関識別子を自動的に挿入するには:

1. 以下のトレーサー設定で .NET トレーサーを構成します。
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. [.NET トレーサーのインストール手順][1]に従って、アプリの自動インスツルメンテーショントレーシングを有効にします。

3. 次の NLog バージョン 5.0 以降向けのサンプルコードに示すように、マップされた診断コンテキスト (MDC) を有効にします。

```xml
  <!-- Add includeScopeProperties="true" to emit ScopeContext properties -->
  <layout xsi:type="JsonLayout" includeScopeProperties="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```

NLog バージョン 4.6 以降 の場合

```xml
  <!-- Add includeMdlc="true" to emit MDC properties -->
  <layout xsi:type="JsonLayout" includeMdlc="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```

NLog バージョン 4.5 の場合

```xml
  <!-- Add includeMdc="true" to emit MDC properties -->
  <layout xsi:type="JsonLayout" includeMdc="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```
その他の例については、GitHub で [NLog 4.0][2]、[NLog 4.5][3]、[NLog 4.6][4] を使用したトレース ID 自動挿入プロジェクトを参照してください。


[1]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/dotnet-core/
[2]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/NLog40Example/NLog.config
[3]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/NLog45Example/NLog.config
[4]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/NLog46Example/NLog.config
{{% /tab %}}
{{% tab "Microsoft.Extensions.Logging" %}}
ログメッセージに相関識別子を自動的に挿入するには:

1. 以下のトレーサー設定で .NET トレーサーを構成します。
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. [.NET トレーサーのインストール手順][1]に従って、アプリの自動インスツルメンテーショントレーシングを有効にします。

3. サンプルコードに示するように、お使いのロギングプロバイダーの[ログスコープ][2]を有効にします。ログスコープをサポートしているプロバイダーにのみ、相関識別子が挿入されます。

```csharp
Host.CreateDefaultBuilder(args)
    .ConfigureLogging(logging =>
    {
        logging.AddFile(opts =>
        {
            opts.IncludeScopes = true; // must include scopes so that correlation identifiers are added
            opts.FormatterName = "json";
        });
    }
```

ログが書き込まれているときにアクティブなトレースがあれば、トレース ID とスパン ID が `dd_trace_id` プロパティと `dd_span_id` プロパティにより自動的にアプリケーションログに挿入されます。アクティブなトレースがない場合は、`dd_env`、`dd_service`、`dd_version` プロパティのみが挿入されます。

**注:** [_Serilog.Extensions.Hosting_][3] パッケージや [_Serilog.Extensions.Logging_][4] パッケージのように、デフォルトの `LoggerFactory` の実装を置き換えるロギングライブラリを使用している場合は、フレームワーク固有の指示に従ってください (この例では、**Serilog** を参照してください)。

その他の例については、GitHub の [Microsoft.Extensions.Logging トレース ID 自動挿入プロジェクト][5]を参照してください。


[1]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/dotnet-core/
[2]: https://docs.microsoft.com/aspnet/core/fundamentals/logging/#log-scopes-1
[3]: https://github.com/serilog/serilog-extensions-hosting
[4]: https://github.com/serilog/serilog-extensions-logging
[5]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/MicrosoftExtensionsExample/Program.cs
{{% /tab %}}
{{< /tabs >}}

次に、自動挿入または手動挿入のセットアップを完了します。

## 自動挿入 {#automatic-injection}

相関識別子の自動挿入を有効にするには、`DD_LOGS_INJECTION` が有効であることを確認してください。

バージョン 3.24.0 以降、`DD_LOGS_INJECTION` はデフォルトで有効になっています。それより前のバージョンでは、.NET トレーサーの環境変数に `DD_LOGS_INJECTION=true` を設定してください。

.NET トレーサーを構成する別の方法については、[.NET トレーサーの構成][6]を参照してください。

相関識別子の挿入を構成した後、[C# ログ収集][7]を参照して、ログ収集の構成を行います。

**注:** トレースとログを関連付けるには、ログのトレース ID として `dd_trace_id` をパースする[トレース ID リマッパー][8]をセットアップする必要があるかもしれません。詳しくは、[関連するログがトレース ID パネルに表示されない][9]を参照してください。

<div class="alert alert-info">バージョン 2.35.0 以降、このサービスが実行される環境で <a href="/remote_configuration">Agent Remote Configuration</a> が有効になっている場合は、 <code>DD_LOGS_INJECTION</code>  を <a href="/internal_developer_portal/catalog/">Catalog</a> UI で設定できます。</div>

## 手動挿入 {#manual-injection}

トレースとログを手動で相関させたい場合は、ログに相関識別子を追加することができます。

  | 必要なキー   | 説明                                  |
  | -------------- | -------------------------------------------- |
  | `dd.env`       | SDK の `env` をグローバルに構成します。設定されていない場合は、デフォルトで `""` になります。|
  | `dd.service`   | ルートサービス名をグローバルに構成します。設定されていない場合は、デフォルトでアプリケーション名または IIS サイト名になります。 |
  | `dd.version`   | サービスの `version` をグローバルに構成します。設定されていない場合は、デフォルトで `""` になります。 |
  | `dd.trace_id`  | ログステートメント中のアクティブなトレース ID (64 ビットの 10 進数として表現)。トレースがない場合は、デフォルトで `0` になります。 |
  | `dd.span_id`   | ログステートメント中のアクティブなスパン ID (64 ビットの 10 進数として表現)。トレースがない場合は、デフォルトで `0` になります。|

**注:** [Datadog ログインテグレーション][7]を使用してログをパースしていない場合、カスタムログパースルールによって `dd.trace_id` と `dd.span_id` が文字列としてパースされる必要があります。詳しくは、[関連するログがトレース ID パネルに表示されない][10]を参照してください。

**注**: ILogger を通して Serilog、NLog、log4net を使用している場合、`BeginScope()` を使用してこれらのプロパティを構成するには、Microsoft.Extensions.Logging のセクションを参照してください。

[はじめのステップ](#getting-started)が完了したら、手動のログエンリッチメント設定を完了してください。

1. プロジェクトの [`Datadog.Trace` NuGet パッケージ][11]を参照します。

2. `CorrelationIdentifier` API を使用して相関識別子を取得し、スパンがアクティブな間にログのコンテキストに追加します。

最後に、[C# ログ収集][7]を参照して、ログ収集を構成します。

例:

{{< tabs >}}
{{% tab "Serilog" %}}

**注**: Serilog ライブラリでは、メッセージプロパティ名が有効な C# 識別子である必要があります。必要なプロパティ名は、`dd_env`、`dd_service`、`dd_version`、`dd_trace_id`、および `dd_span_id` です。

```csharp
using Datadog.Trace;
using Serilog.Context;

// there must be spans started and active before this block.
using (LogContext.PushProperty("dd_env", CorrelationIdentifier.Env))
using (LogContext.PushProperty("dd_service", CorrelationIdentifier.Service))
using (LogContext.PushProperty("dd_version", CorrelationIdentifier.Version))
using (LogContext.PushProperty("dd_trace_id", CorrelationIdentifier.TraceId.ToString()))
using (LogContext.PushProperty("dd_span_id", CorrelationIdentifier.SpanId.ToString()))
{
    // Log something
}
```

{{% /tab %}}
{{% tab "log4net" %}}

```csharp
using Datadog.Trace;
using log4net;

// there must be spans started and active before this block.
try
{
    LogicalThreadContext.Properties["dd.env"] = CorrelationIdentifier.Env;
    LogicalThreadContext.Properties["dd.service"] = CorrelationIdentifier.Service;
    LogicalThreadContext.Properties["dd.version"] = CorrelationIdentifier.Version;
    LogicalThreadContext.Properties["dd.trace_id"] = CorrelationIdentifier.TraceId.ToString();
    LogicalThreadContext.Properties["dd.span_id"] = CorrelationIdentifier.SpanId.ToString();

    // Log something

}
finally
{
    LogicalThreadContext.Properties.Remove("dd.env");
    LogicalThreadContext.Properties.Remove("dd.service");
    LogicalThreadContext.Properties.Remove("dd.version");
    LogicalThreadContext.Properties.Remove("dd.trace_id");
    LogicalThreadContext.Properties.Remove("dd.span_id");
}
```

{{% /tab %}}
{{% tab "NLog" %}}

```csharp
using Datadog.Trace;
using NLog;

// there must be spans started and active before this block.
using (MappedDiagnosticsLogicalContext.SetScoped("dd.env", CorrelationIdentifier.Env))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.service", CorrelationIdentifier.Service))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.version", CorrelationIdentifier.Version))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.trace_id", CorrelationIdentifier.TraceId.ToString()))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.span_id", CorrelationIdentifier.SpanId.ToString()))
{
    // Log something
}
```

{{% /tab %}}
{{% tab "Microsoft.Extensions.Logging" %}}

```csharp
using Datadog.Trace;
using Microsoft.Extensions.Logging;

ILogger _logger;

// there must be spans started and active before this block.
using(_logger.BeginScope(new Dictionary<string, object>
{
    {"dd.env", CorrelationIdentifier.Env},
    {"dd.service", CorrelationIdentifier.Service},
    {"dd.version", CorrelationIdentifier.Version},
    {"dd.trace_id", CorrelationIdentifier.TraceId.ToString()},
    {"dd.span_id", CorrelationIdentifier.SpanId.ToString()},
}))
{
    // Log something
}
```

{{% /tab %}}
{{< /tabs >}}

BeginScope を使用して、以下のログプロバイダーの構造化されたログメッセージを作成する方法については、こちらをご覧ください。
- Serilog: [ILogger.BeginScope() のセマンティクス][12]
- NLog: [Microsoft Extension Logging による NLog プロパティ][13]
- log4net: [BeginScope の使用][14]

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging
[2]: http://serilog.net
[3]: https://logging.apache.org/log4net
[4]: http://nlog-project.org
[5]: https://docs.microsoft.com/en-us/dotnet/core/extensions/logging
[6]: /ja/tracing/trace_collection/library_config/dotnet-core/#configuring-the-net-tracer
[7]: /ja/logs/log_collection/csharp/
[8]: /ja/logs/log_configuration/processors/trace_remapper/
[9]: /ja/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=withlogintegration
[10]: /ja/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom
[11]: https://www.nuget.org/packages/Datadog.Trace/
[12]: https://nblumhardt.com/2016/11/ilogger-beginscope/
[13]: https://github.com/NLog/NLog.Extensions.Logging/wiki/NLog-properties-with-Microsoft-Extension-Logging
[14]: https://github.com/huorswords/Microsoft.Extensions.Logging.Log4Net.AspNetCore#using-beginscope
[15]: /ja/logs/log_collection/csharp/#configure-your-datadog-agent