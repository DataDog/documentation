---
title: .NET オープン標準
kind: documentation
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 70
description: '.NET のオープン標準'
---

## OpenTracing

Datadog では、OpenTracing 標準もサポートしています。詳細は、[OpenTracing API][1] をご参照ください。

### セットアップ
OpenTracing のサポートには、[`Datadog.Trace.OpenTracing`][2] NuGet パッケージをアプリケーションに追加します。アプリケーションの起動時に、OpenTracing ライブラリを初期化します。

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

### メソッドの手動インスツルメント

OpenTracing を使用してスパンを作成します。

```csharp
using (var scope =
       Tracer.Instance.StartActive("manual.sortorders"))
{
    SortOrders();
}
```

### 非同期トレース

非同期タスクで実行中のコードをトレースするには、バックグラウンドタスク内で新しいスコープを作成（非同期コードをラップするのと同様）します。
```csharp
 Task.Run(
     () =>
     {
         using (var scope =
                Tracer.Instance.StartActive("manual.sortorders.async"))
         {
             SortOrders();
         }
     });

```


[1]: https://github.com/opentracing/opentracing-csharp
[2]: https://www.nuget.org/packages/Datadog.Trace.OpenTracing
