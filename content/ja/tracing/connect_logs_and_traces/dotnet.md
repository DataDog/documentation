---
title: .NET ログとトレースの接続
kind: ドキュメント
description: .NET ログとトレースを接続して Datadog で関連付けます。
further_reading:
  - link: tracing/manual_instrumentation
    tag: ドキュメント
    text: 手動でアプリケーションのインスツルメンテーションを行いトレースを作成します。
  - link: tracing/opentracing
    tag: ドキュメント
    text: アプリケーション全体に Opentracing を実装します。
  - link: tracing/visualization/
    tag: ドキュメント
    text: サービス、リソース、トレースの詳細
  - link: 'https://www.datadoghq.com/blog/request-log-correlation/'
    tag: ブログ
    text: 自動的にリクエストログとトレースに相関性を持たせる
---
トレースとスパンの ID がアプリケーションログに挿入されるようロギングライブラリおよび .NET トレーシングのコンフィギュレーションを設定し、ログデータと相関したアプリケーションのパフォーマンスモニタリングデータを取得することができます。

<div class="alert alert-info"><strong>注:</strong> 自動挿入は、JSON でフォーマット化されたログのみに機能します。その他の場合は手動で挿入を行ってください。</div>

.NET トレーサーを[統合サービスタグ付け][1]で構成し、アプリケーションのトレースとログの相関付けに最高の使用体験と有用なコンテキストを確保します。

.NET トレーサーは、以下のロギングライブラリをサポートします。
- [Serilog][2]
- [log4net][3]
- [NLog][4] (バージョン 4.0 以降)

## はじめに

自動または手動のトレース挿入は、以下の手順でセットアップできます。

1. 以下のトレーサー設定で .NET トレーサーを構成します。
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. Tail を実行するよう指定されたファイルの[ログ Agent コンフィギュレーション][5]で、ログパイプラインがログファイルをパースできるよう `source: csharp` を設定します。

3. ログライブラリに基づいてログコンフィギュレーションを更新します。

例:

{{< tabs >}}
{{% tab "Serilog" %}}
トレースおよびスパン ID は、ログコンテキストの補完を有効にした後にのみアプリケーションログに挿入されます。以下のコード例を参照してください。

```csharp
var log = new LoggerConfiguration()
    // Enrich.FromLogContext を追加して Datadog プロパティを表示
    .Enrich.FromLogContext()
    .WriteTo.File(new JsonFormatter(), "log.json")
    .CreateLogger();
```
その他の例については、GitHub の [Serilog トレース ID 自動挿入プロジェクト][1]を参照してください。


[1]: https://github.com/DataDog/dd-trace-dotnet/blob/master/samples/AutomaticTraceIdInjection/SerilogExample/Program.cs
{{% /tab %}}
{{% tab "log4net" %}}
トレースおよびスパン ID は、マップされた診断コンテキスト (MDC) を有効にした後にのみアプリケーションログに挿入されます。以下のコード例を参照してください。

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
    <!-- value='properties' を追加して Datadog プロパティを表示 -->
    <member value='properties'/>
  </layout>
```
その他の例については、GitHub の [log4net トレース ID 自動挿入プロジェクト][1]を参照してください。


[1]: https://github.com/DataDog/dd-trace-dotnet/blob/master/samples/AutomaticTraceIdInjection/Log4NetExample/log4net.config
{{% /tab %}}
{{% tab "NLog" %}}

トレースおよびスパン ID は、マップされた診断コンテキスト (MDC) を有効にした後にのみアプリケーションログに挿入されます。NLog バージョン 4.6 以降の場合は、以下のコード例を参照してください。

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
その他の例については、GitHub で [NLog 4.0][1]、[NLog 4.5][2]、[NLog 4.6][3] を使用したトレース ID 自動挿入プロジェクトを参照してください。


[1]: https://github.com/DataDog/dd-trace-dotnet/blob/master/samples/AutomaticTraceIdInjection/NLog40Example/NLog.config
[2]: https://github.com/DataDog/dd-trace-dotnet/blob/master/samples/AutomaticTraceIdInjection/NLog45Example/NLog.config
[3]: https://github.com/DataDog/dd-trace-dotnet/blob/master/samples/AutomaticTraceIdInjection/NLog46Example/NLog.config
{{% /tab %}}
{{< /tabs >}}

次に、自動または手動挿入のセットアップを完了します。

## トレースおよびスパン ID を自動的に挿入

アプリケーションログが JSON 形式の場合、トレース ID の自動挿入のセットアップの最後に以下を実行します。

4. .NET トレーサーの環境変数で、`DD_LOGS_INJECTION=true` を有効にします。.NET トレーサーを構成するその他の方法については、[.NET トレーサーの構成][6]をご参照ください。

## トレースおよびスパン ID を手動で挿入

アプリケーションログが JSON 形式でない場合は、APM データを使用して手動でログを加工します。
  | 必要なキー   | 説明                                  |
  | -------------- | -------------------------------------------- |
  | `dd.env`       | グローバルにトレーサーに `env` を構成します。設定されていない場合、デフォルトは `""`。 |
  | `dd.service`   | ルートサービス名をグローバルに構成します。設定されていない場合、デフォルトはアプリケーション名または IIS サイト名。  |
  | `dd.version`   | グローバルにサービスに `version` を構成します。設定されていない場合、デフォルトは `""`。  |
  | `dd.trace_id`  | ログステートメント中のアクティブなトレース ID。トレースがない場合、デフォルトは `0`。  |
  | `dd.span_id`   | ログステートメント中のアクティブなスパン ID。トレースがない場合、デフォルトは `0`。 |


**注:** [Datadog ログインテグレーション][7]を使ってログをパースしていない場合、カスタムログパースルールによって `dd.trace_id` と `dd.span_id` が文字列としてパースされる必要があります。詳細は、[このトピックに関してよくあるご質問][8] をご覧ください。

手動のログ加工設定を終了するには、[上記](#getting-started)の 3 つのステップを実行してから、以下を行います。

4. プロジェクトの [`Datadog.Trace` NuGet パッケージ][9]を参照します。

5. `CorrelationIdentifier` API を使用して相関識別子を取得し、スパンがアクティブな間にログのコンテキストに追加します。

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
{{< /tabs >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging
[2]: http://serilog.net
[3]: https://logging.apache.org/log4net
[4]: http://nlog-project.org
[5]: /ja/logs/log_collection/csharp/?tab=serilog#configure-your-datadog-agent
[6]: /ja/tracing/setup_overview/setup/dotnet-core/?tab=windows#configuring-the-net-tracer
[7]: /ja/logs/log_collection/csharp/#configure-your-logger
[8]: /ja/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom
[9]: https://www.nuget.org/packages/Datadog.Trace/