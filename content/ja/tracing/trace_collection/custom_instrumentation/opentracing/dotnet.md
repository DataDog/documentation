---
aliases:
- /ja/tracing/setup_overview/open_standards/dotnet
- /ja/tracing/trace_collection/open_standards/dotnet
- /ja/tracing/trace_collection/opentracing/dotnet/
code_lang: dotnet
code_lang_weight: 70
description: .NET のための OpenTracing インスツルメンテーション
further_reading:
- link: tracing/services/services_map/
  text: トレースコンテキストの伝搬
title: .NET OpenTracing インスツルメンテーション
type: multi-code-lang
---

<div class="alert alert-info">OpenTracing のサポートは、非推奨の仕様に基づくものです。オープンな仕様でコードをインスツルメンテーションしたい場合は、代わりに OpenTelemetry を使用してください。<a href="/tracing/trace_collection/otel_instrumentation/dotnet/">Datadog トレーシングライブラリの OpenTelemetry インスツルメンテーションからのデータを処理する</a>ためのベータサポートをお試しください。</div>

詳細や情報については、[OpenTracing API][1] をご覧ください。

## 計画と使用
OpenTracing のサポートには、[`Datadog.Trace.OpenTracing`][2] NuGet パッケージをアプリケーションに追加します。アプリケーションの起動時に、OpenTracing SDK を初期化します。

```csharp
using Datadog.Trace.OpenTracing;

public void ConfigureServices(IServiceCollection services)
{
    // デフォルト設定で OpenTracing ITracer を作成します
    OpenTracing.ITracer tracer = OpenTracingTracerFactory.CreateTracer();

    // ASP.NET Core 依存関係の挿入でトレーサーを使用します
    services.AddSingleton<ITracer>(tracer);

    // OpenTracing.GlobalTracer.Instance でトレーサーを使用します
    GlobalTracer.Register(tracer);
}
```

## メソッドの手動インスツルメント

OpenTracing を使用してスパンを作成します。

```csharp
using (IScope scope = GlobalTracer.Instance.BuildSpan("manual.sortorders").StartActive(finishSpanOnDispose: true))
{
    scope.Span.SetTag("resource.name", "<RESOURCE NAME>");
    SortOrders();
}
```

## 非同期トレース

非同期タスクで実行中のコードをトレースするには、バックグラウンドタスク内で新しいスコープを作成（非同期コードをラップするのと同様）します。
```csharp
 Task.Run(
     () =>
     {
         using (IScope scope = GlobalTracer.Instance.BuildSpan("manual.sortorders").StartActive(finishSpanOnDispose: true))
         {
             scope.Span.SetTag("resource.name", "<RESOURCE NAME>");
             SortOrders();
         }
     });

```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/opentracing/opentracing-csharp
[2]: https://www.nuget.org/packages/Datadog.Trace.OpenTracing