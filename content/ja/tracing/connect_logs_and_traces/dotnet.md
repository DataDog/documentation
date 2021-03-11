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
## トレースおよびスパン ID を自動的に挿入します

.NET トレーサーはトレース ID、スパン ID、`env`、`service`、`version` をアプリケーションログに自動的に挿入できます。まだこれを行っていない場合は、.NET トレーサーを `DD_ENV`, `DD_SERVICE`、および `DD_VERSION` で構成することが推奨されます。`env`、`service`、`version` を追加する際に違いを感じられるはずです（詳細は、[統合サービスタグ付け][3]を参照してください）。

.NET トレーサー は [Serilog][4]、[NLog][5] (バージョン 4.0+)、[log4net][6] に対応しており、[LibLog][2] ライブラリを使用してトレース ID をアプリケーションログに自動的に挿入します。自動挿入は、`Serilog` ロガーで `LogContext` 強化を有効化した後、あるいは、`NLog` ロガーまたは `log4net` ロガーで `Mapped Diagnostics Context` を有効化した後でのみ、アプリケーションログに表示されます。

**注**: 自動挿入が機能するのは JSON 形式のログのみです。

**有効にするには、以下の 2 つの手順に従います。**

1. 環境変数またはコンフィギュレーションファイルを通じて `DD_LOGS_INJECTION=true` を設定することで、.NET トレーサーの[コンフィギュレーション][1]の挿入を有効にします。
2. ログライブラリに基づいてログコンフィギュレーションを更新します。

{{< tabs >}}
{{% tab "Serilog" %}}

```csharp
var log = new LoggerConfiguration()
    // Enrich.FromLogContext を追加して Datadog プロパティを表示
    .Enrich.FromLogContext()
    .WriteTo.File(new JsonFormatter(), "log.json")
    .CreateLogger();
```

{{% /tab %}}
{{% tab "log4net" %}}

```xml
  <layout type="log4net.Layout.SerializedLayout, log4net.Ext.Json">
    <decorator type="log4net.Layout.Decorators.StandardTypesDecorator, log4net.Ext.Json" />
    <default />
    <!--明示的なデフォルトメンバー-->
    <remove value="ndc" />
    <remove value="message" />
    <!--書式設定済みのデフォルトメッセージメンバーを削除-->
    <member value="message:messageobject" />
    <!--未加工のメッセージを追加-->

    <!-- value='properties' を追加して MDC プロパティを表示 -->
    <member value='properties'/>
  </layout>
```

{{% /tab %}}
{{% tab "NLog" %}}

NLog バージョン 4.6 以降 の場合

```xml
  <!--includeMdlc="true" を追加して Datadog プロパティを表示-->
  <layout xsi:type="JsonLayout" includeMdlc="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```

NLog バージョン 4.0 - 4.5 の場合:

```xml
  <!--バージョン 4.4.10+ を使用している場合は、includeMdc="true" を抽出して Datadog プロパティを表示-->
  <layout xsi:type="JsonLayout" includeMdc="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>

  <!--バージョン4.4.10以下を使用している場合は、<attribute> ノードを追加することでDatadog プロパティを個別に抽出-->
  <layout xsi:type="JsonLayout">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />

    <attribute name="dd.env" layout="${mdc:item=dd.env}"/>
    <attribute name="dd.service" layout="${mdc:item=dd.service}"/>
    <attribute name="dd.version" layout="${mdc:item=dd.version}"/>
    <attribute name="dd.trace_id" layout="${mdc:item=dd.trace_id}"/>
    <attribute name="dd.span_id" layout="${mdc:item=dd.span_id}"/>
  </layout>
```

NLog バージョン 4.0 以下の場合、JSON レイアウトは内蔵されていません。

{{% /tab %}}
{{< /tabs >}}


## トレースおよびスパン ID を手動で挿入する

手動で[トレース][7]とログを相関付け、サービスのデータを結合する場合は、Datadog API を使用して相関識別子を取得します。

- `CorrelationIdentifier.<FIELD>` API メソッドを使用して、ログの各[スパン][8]の先頭と末尾に識別子を挿入します (下記の例を参照してください)。
- MDC を構成して挿入キーを使用します。

    - `dd.env` トレーサー用にグローバルに構成された `env`  (設定されていない場合はデフォルトの `""` )
    - `dd.service` グローバルに構成されたルートサービス名（設定されていない場合のデフォルトはアプリケーション名または IIS サイト名）
    - `dd.version` サービス用にグローバルに構成された `version`（設定されていない場合はデフォルトの `""`）
    - `dd.trace_id` ログステートメント中のアクティブなトレース ID (トレースがない場合はデフォルトの `0`)
    - `dd.span_id` ログステートメント中のアクティブなスパン ID (トレースがない場合はデフォルトの `0`)

{{< tabs >}}
{{% tab "Serilog" %}}

**注**: Serilog ライブラリでは、メッセージプロパティ名が有効な C# 識別子である必要があるため、プロパティ名は次のようにする必要があります。
- `dd_env`
- `dd_service`
- `dd_version`
- `dd_trace_id`
- `dd_span_id`

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
{{% tab "Log4net" %}}

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

**注**: [Datadog ログインテグレーション][9]を使ってログをパースしていない場合は、カスタムログパースルールによって `dd.trace_id` と `dd.span_id` が文字列としてパースされていることを確実にする必要があります。詳しくは、[このトピックの FAQ][10] を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/setup/dotnet/#configuration
[2]: https://github.com/damianh/LibLog
[3]: /ja/getting_started/tagging/unified_service_tagging
[4]: http://serilog.net
[5]: http://nlog-project.org
[6]: https://logging.apache.org/log4net
[7]: /ja/tracing/visualization/#trace
[8]: /ja/tracing/visualization/#spans
[9]: /ja/logs/log_collection/csharp/#configure-your-logger
[10]: /ja/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom