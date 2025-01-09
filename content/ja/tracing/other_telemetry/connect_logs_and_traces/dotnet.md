---
aliases:
- /ja/tracing/connect_logs_and_traces/dotnet
code_lang: dotnet
code_lang_weight: 60
description: .NET ログとトレースを接続して Datadog で関連付けます。
further_reading:
- link: tracing/trace_collection/custom_instrumentation
  tag: ドキュメント
  text: アプリケーションを手動でインストルメントしてトレースを作成します。
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: GitHub
  text: 自動的にリクエストログとトレースに相関性を持たせる
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: ガイド
  text: クロスプロダクト相関で容易にトラブルシューティング。
title: .NET ログとトレースの相関付け
type: multi-code-lang
---

トレースとスパンの ID がアプリケーションログに挿入されるようロギングライブラリおよび .NET トレーシングのコンフィギュレーションを設定し、ログデータと相関したアプリケーションのパフォーマンスモニタリングデータを取得することができます。

.NET トレーサーを[統合サービスタグ付け][1]で構成し、アプリケーションのトレースとログの相関付けに最高の使用体験と有用なコンテキストを確保します。

.NET トレーサーは、以下のロギングライブラリをサポートします。
- [Serilog][2] (v1.4+)
- [log4net][3]
- [NLog][4]
- [Microsoft.Extensions.Logging][5] (v1.28.6 で追加)

## ログ収集の構成

ログパイプラインがログファイルをパースできるように、Datadog Agent でログ収集が構成され、追跡する指定ファイルの [Logs Agent の構成][15]が `source: csharp` に設定されていることを確認します。詳細は、[C# ログ収集][7]を参照してください。`source` が `csharp` 以外の値に設定されている場合、相関を正しく動作させるために、適切なログ処理パイプラインに[トレースリマッパー][8]を追加する必要があるかもしれません。

<div class="alert alert-warning"><strong>注:</strong> 自動ログ挿入は、JSON でフォーマット化されたログのみに機能します。また、カスタムパースルールを使用することもできます。</div>

## ログへの挿入の構成

ログメッセージに相関関係のある識別子を挿入するには、お使いのロギングライブラリの指示に従ってください。

<div class="alert alert-info">
  <div class="alert-info">その他の例については、<a href="https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/AutomaticTraceIdInjection">dd-trace-dotnet にあるサンプル</a>を参照してください。</div>
  </div>
</div>

{{< tabs >}}
{{% tab "Serilog" %}}

<div class="alert alert-warning">
  <strong>注: </strong>NET トレーサーバージョン 2.0.1 以降、Serilog ロギングライブラリの自動挿入には、アプリケーションが自動インスツルメンテーションされているれていることが必要になります。
</div>

ログメッセージに相関性のある識別子を自動的に挿入するには:

1. 以下のトレーサー設定で .NET トレーサーを構成します。
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. [.NET Tracer のインストール手順][1]に従って、アプリの自動インスツルメンテーショントレーシングを有効にします。

[1]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/dotnet-core/
{{% /tab %}}
{{% tab "log4net" %}}

<div class="alert alert-warning">
  <strong>注: </strong>NET トレーサーバージョン 1.29.0 以降、log4net ロギングライブラリの自動挿入には、アプリケーションが自動インスツルメンテーションされているれていることが必要になります。
</div>

ログメッセージに相関性のある識別子を自動的に挿入するには:

1. 以下のトレーサー設定で .NET トレーサーを構成します。
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. [.NET Tracer のインストール手順][1]に従って、アプリの自動インスツルメンテーショントレーシングを有効にします。

3. ログ出力に `dd.env`、`dd.service`、`dd.version`、`dd.trace_id`、`dd.span_id` のログプロパティを追加してください。これは、これらのプロパティを個別に含めることもできますし、すべてのログプロパティを含めることもできます。どちらの方法も、次のサンプルコードに示されています。

```xml
  <layout type="log4net.Layout.SerializedLayout, log4net.Ext.Json">
    <decorator type="log4net.Layout.Decorators.StandardTypesDecorator, log4net.Ext.Json" />
    <default />
    <!--明示的なデフォルトメンバー-->
    <remove value="ndc" />
    <!--書式設定済みのデフォルトメッセージメンバーを削除-->
    <remove value="message" />
    <!--未加工のメッセージを追加-->
    <member value="message:messageobject" />

    <!-- Datadog のプロパティを含める -->
    <!-- EITHER 個々のプロパティを value='<property_name>' で含める-->
    <member value='dd.env' />
    <member value='dd.service' />
    <member value='dd.version' />
    <member value='dd.trace_id' />
    <member value='dd.span_id' />
    <!-- OR value='properties' を持つすべてのプロパティを含める -->
    <member value='properties'/>
  </layout>
```
その他の例については、GitHub の [log4net トレース ID 自動挿入プロジェクト][2]を参照してください。


[1]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/dotnet-core/
[2]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/Log4NetExample/log4net.config
{{% /tab %}}
{{% tab "NLog" %}}

<div class="alert alert-warning">
  <strong>注: </strong>NET トレーサーバージョン 2.0.1 以降、NLog ロギングライブラリの自動挿入には、アプリケーションが自動インスツルメンテーションされているれていることが必要になります。
</div>

ログメッセージに相関性のある識別子を自動的に挿入するには:

1. 以下のトレーサー設定で .NET トレーサーを構成します。
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. [.NET Tracer のインストール手順][1]に従って、アプリの自動インスツルメンテーショントレーシングを有効にします。

3. 次の NLog バージョン 5.0 向けのサンプルコードに示すように、マップされた診断コンテキスト (MDC) を有効にします。

```xml
  <!-- includeScopeProperties="true" を追加して ScopeContext プロパティを表示 -->
  <layout xsi:type="JsonLayout" includeScopeProperties="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```

NLog バージョン 4.6 以降 の場合

```xml
  <!-- includeMdlc="true" を追加して MDC プロパティを表示 -->
  <layout xsi:type="JsonLayout" includeMdlc="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```

NLog バージョン 4.5 の場合

```xml
  <!-- includeMdc="true" を追加して MDC プロパティを表示 -->
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
ログメッセージに相関性のある識別子を自動的に挿入するには

1. 以下のトレーサー設定で .NET トレーサーを構成します。
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. [.NET Tracer のインストール手順][1]に従って、アプリの自動インスツルメンテーショントレーシングを有効にします。

3. サンプルコードに示するように、お使いのロギングプロバイダーの[ログスコープ][2]を有効にします。ログスコープをサポートしているプロバイダーにのみ、相関関係のある識別子が挿入されます。

```csharp
Host.CreateDefaultBuilder(args)
    .ConfigureLogging(logging =>
    {
        logging.AddFile(opts =>
        {
            opts.IncludeScopes = true; // 相関識別子が追加されるように、スコープを含む必要があります
            opts.FormatterName = "json";
        });
    }
```

ログが書き込まれているときにアクティブなトレースがあれば、トレースとスパン ID が `dd_trace_id` および `dd_span_id` プロパティと合わせて自動的にアプリケーションログに挿入されます。アクティブなトレースがない場合は、`dd_env`、`dd_service`、`dd_version` プロパティのみが挿入されます。

**注:** [_Serilog.Extensions.Hosting_][3] や [_Serilog.Extensions.Logging_][4] パッケージのように、デフォルトの `LoggerFactory` の実装を置き換えるロギングライブラリを使用している場合は、フレームワーク固有の指示に従ってください (この例では、**Serilog** をご参照ください)。

その他の例については、GitHub の [Microsoft.Extensions.Logging トレース ID 自動挿入プロジェクト][5]を参照してください。


[1]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/dotnet-core/
[2]: https://docs.microsoft.com/aspnet/core/fundamentals/logging/#log-scopes-1
[3]: https://github.com/serilog/serilog-extensions-hosting
[4]: https://github.com/serilog/serilog-extensions-logging
[5]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/MicrosoftExtensionsExample/Program.cs
{{% /tab %}}
{{< /tabs >}}

次に、自動または手動挿入のセットアップを完了します。

## 自動挿入

相関識別子の自動挿入を有効にするための最後のステップは次の通りです。

1. .NET トレーサーの環境変数で `DD_LOGS_INJECTION=true` を有効にします。.NET トレーサーを構成するその他の方法については、[.NET トレーサーの構成][6]をご参照ください。

相関識別子の挿入を構成した後、[C# ログ収集][7]を参照してログ収集の構成を行います。

**注:** トレースとログを関連付けるには、ログのトレース ID として `dd_trace_id` をパースする[トレース ID リマッパー][8]をセットアップする必要があるかもしれません。詳しくは、[関連するログがトレース ID パネルに表示されない][9]を参照してください。

<div class="alert alert-info"><strong>ベータ版</strong>: バージョン 2.35.0 から、このサービスが実行される場所で <a href="/agent/remote_config/">Agent リモート構成</a>が有効になっている場合、<a href="/tracing/service_catalog">サービスカタログ</a> の UI で <code>DD_LOGS_INJECTION</code> を設定できます。</div>

## 手動挿入

トレースとログを手動で相関させたい場合は、ログに相関識別子を追加することができます。

  | 必要なキー   | 説明                                  |
  | -------------- | -------------------------------------------- |
  | `dd.env`       | トレーサー用に `env` をグローバルに構成します。設定されていない場合のデフォルトは `""` となります。 |
  | `dd.service`   | ルートサービス名をグローバルに構成します。設定されていない場合のデフォルトは、アプリケーションの名前または IIS サイト名となります。  |
  | `dd.version`   | サービス用に `version` をグローバルに構成します。設定されていない場合のデフォルトは `""` となります。  |
  | `dd.trace_id`  | ログステートメント中のアクティブなトレース ID。トレースがない場合は `0` となります。  |
  | `dd.span_id`   | ログステートメント中のアクティブなスパン ID。トレースがない場合は `0` となります。 |

**注:** [Datadog ログインテグレーション][7]を使用してログをパースしていない場合、カスタムログパースルールは `dd.trace_id` と `dd.span_id` を文字列としてパースする必要があります。詳しくは、[関連するログがトレース ID パネルに表示されない][10]を参照してください。

**注**: ILogger を通して Serilog、Nlog、log4net を使用している場合、`BeginScope()` を使用してこれらのプロパティを構成するには、Microsoft.Extensions.Logging セクションを見てください。

[はじめのステップ](#getting-started)が完了したら、手動のログ加工設定を終了します。

1. プロジェクトの [`Datadog.Trace` NuGet パッケージ][11]を参照します。

2. `CorrelationIdentifier` API を使用して相関識別子を取得し、スパンがアクティブな間にログのコンテキストに追加します。

最後に、[C# ログ収集][7]を参照して、ログ収集を構成します。

例:

{{< tabs >}}
{{% tab "Serilog" %}}

**注**: Serilog ライブラリでは、メッセージプロパティ名が有効な C# 識別子である必要があります。要求されるプロパティ名は、`dd_env`、`dd_service`、`dd_version`、`dd_trace_id`、`dd_span_id` です。

```csharp
using Datadog.Trace;
using Serilog.Context;

// スパンはこのブロック以前に開始され、アクティブになっている必要があります。
using (LogContext.PushProperty("dd_env", CorrelationIdentifier.Env))
using (LogContext.PushProperty("dd_service", CorrelationIdentifier.Service))
using (LogContext.PushProperty("dd_version", CorrelationIdentifier.Version))
using (LogContext.PushProperty("dd_trace_id", CorrelationIdentifier.TraceId.ToString()))
using (LogContext.PushProperty("dd_span_id", CorrelationIdentifier.SpanId.ToString()))
{
    // 任意のログを記録
}
```

{{% /tab %}}
{{% tab "log4net" %}}

```csharp
using Datadog.Trace;
using log4net;

// スパンはこのブロック以前に開始され、アクティブになっている必要があります。
try
{
    LogicalThreadContext.Properties["dd.env"] = CorrelationIdentifier.Env;
    LogicalThreadContext.Properties["dd.service"] = CorrelationIdentifier.Service;
    LogicalThreadContext.Properties["dd.version"] = CorrelationIdentifier.Version;
    LogicalThreadContext.Properties["dd.trace_id"] = CorrelationIdentifier.TraceId.ToString();
    LogicalThreadContext.Properties["dd.span_id"] = CorrelationIdentifier.SpanId.ToString();

    // 任意のログを記録

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

// スパンはこのブロック以前に開始され、アクティブになっている必要があります。
using (MappedDiagnosticsLogicalContext.SetScoped("dd.env", CorrelationIdentifier.Env))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.service", CorrelationIdentifier.Service))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.version", CorrelationIdentifier.Version))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.trace_id", CorrelationIdentifier.TraceId.ToString()))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.span_id", CorrelationIdentifier.SpanId.ToString()))
{
    // 任意のログを記録
}
```

{{% /tab %}}
{{% tab "Microsoft.Extensions.Logging" %}}

```csharp
using Datadog.Trace;
using Microsoft.Extensions.Logging;

ILogger _logger;

// スパンはこのブロック以前に開始され、アクティブになっている必要があります。
using(_logger.BeginScope(new Dictionary<string, object>
{
    {"dd.env", CorrelationIdentifier.Env},
    {"dd.service", CorrelationIdentifier.Service},
    {"dd.version", CorrelationIdentifier.Version},
    {"dd.trace_id", CorrelationIdentifier.TraceId.ToString()},
    {"dd.span_id", CorrelationIdentifier.SpanId.ToString()},
}))
{
    // 何かしらのログを記録
}
```

{{% /tab %}}
{{< /tabs >}}

BeginScope を使用して、以下のログプロバイダーの構造化されたログメッセージを作成する方法については、こちらをご覧ください。
- Serilog: [ILogger.BeginScope() のセマンティクス][12]
- NLog: [Microsoft Extension Logging による NLog プロパティ][13]
- log4net: [BeginScope の使用][14]

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging
[2]: http://serilog.net
[3]: https://logging.apache.org/log4net
[4]: http://nlog-project.org
[5]: https://docs.microsoft.com/en-us/dotnet/core/extensions/logging
[6]: /ja/tracing/trace_collection/library_config/dotnet-core/#configuring-the-net-tracer
[7]: /ja/logs/log_collection/csharp/
[8]: /ja/logs/log_configuration/processors/?tab=ui#trace-remapper
[9]: /ja/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=withlogintegration
[10]: /ja/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom
[11]: https://www.nuget.org/packages/Datadog.Trace/
[12]: https://nblumhardt.com/2016/11/ilogger-beginscope/
[13]: https://github.com/NLog/NLog.Extensions.Logging/wiki/NLog-properties-with-Microsoft-Extension-Logging
[14]: https://github.com/huorswords/Microsoft.Extensions.Logging.Log4Net.AspNetCore#using-beginscope
[15]: /ja/logs/log_collection/csharp/#configure-your-datadog-agent