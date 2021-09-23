---
title: .NET カスタムインスツルメンテーション
kind: ドキュメント
aliases:
  - /ja/tracing/opentracing/dotnet
  - /ja/tracing/manual_instrumentation/dotnet
description: .NET アプリケーションを手動でインスツルメントしてカスタムトレースを Datadog に送信します。
further_reading:
  - link: tracing/guide/instrument_custom_method
    tag: ガイド
    text: カスタムメソッドをインスツルメントして、ビジネスロジックを詳細に可視化する
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: ログとトレースの接続
  - link: tracing/visualization/
    tag: Documentation
    text: サービス、リソース、トレースの詳細
---
{{< alert type="info" >}}
.NET トレーサーのセットアップおよび自動インスツルメンテーションの手順は、<a href="https://docs.datadoghq.com/tracing/setup/dotnet/">.NET セットアップ手順</a>からご覧ください。
{{< /alert >}}

**注:** カスタムと自動両方のインスツルメンテーションを使用する場合、MSI インストーラーと NuGet パッケージのバージョンの同期を保つ必要があります。

このページでは、Datadog APM を使用して可観測性を追加およびカスタマイズする一般的な使用例について説明します。

`Datadog.Trace` [NuGet パッケージ][1]をアプリケーションに追加します。新しいスパンを作成するには、`Datadog.Trace.Tracer.Instance` プロパティを通じてグローバルトレーサーにアクセスします。

カスタムインスツルメンテーションは、Windows の **.NET Framework 4.5 以上**と、Windows および Linux の **.NET Core 2.1、3.0、3.1** でサポートされています。


## タグやスパンを追加

Datadog 内の可観測性をカスタマイズするには、カスタム[スパンタグ][2]を[スパン][3]に追加します。スパンタグは受信トレースに適用されるため、観測された動作を、マーチャントの階層、チェックアウト金額、ユーザー ID などのコードレベルの情報と関連付けることができます。


### カスタムスパンタグを追加する

`customer.id` などのアプリケーションコード内の動的な値に対応するカスタムタグをスパンに追加します。

`Span.SetTag()` を呼び出すことで、`Datadog.Trace.Span` オブジェクトにタグを直接追加します。下記に例を示します。

```csharp
public class ShoppingCartController : Controller
{
    private IShoppingCartRepository _shoppingCartRepository;

    [HttpGet]
    public IActionResult Index(int customerId)
    {
        // グローバルトレーサーからアクティブスパンを取得 (null を返す)
        var scope = Tracer.Instance.ActiveScope;

        if (scope != null)
        {
            // タグをスパンに追加して Datadog ウェブ UI で使用
            scope.Span.SetTag("customer.id", customerId.ToString());
        }

        var cart = _shoppingCartRepository.Get(customerId);

        return View(cart);
    }
}
```

**注**: アクティブスパンがない場合、`Datadog.Trace.Tracer.Instance.ActiveScope` は `null` を返します。



### すべてのスパンにグローバルにタグを追加する

`DD_TAGS` 環境変数を使用して、アプリケーションに対して生成されたすべてのスパンにタグを設定します。これは、アプリケーション、データセンター、地域など、Datadog UI 内で統計データをグループ化するのに役立ちます。

```ini
DD_TAGS=datacenter:njc,key2:value2
```

### スパンにエラーを設定する

コードで発生したエラーを認識してマークするには、スパンで利用できる `Span.SetException(Exception)` メソッドを利用します。このメソッドは、スパンをエラーとしてマークし、[関連するスパンメタデータ][4]を追加して、例外の情報を提供します。

```csharp
try
{
    // 例外をスローする可能性のある作業を行います
}
catch(Exception e)
{
    span.SetException(e);
}
```

これで、3 つのタグがスパンに設定されます。 `"error.msg":exception.Message`,  `"error.stack":exception.ToString()`, and `"error.type":exception.GetType().ToString()`.

### 新しいスパンを手動で作成する

プログラムでコードのブロックの周囲にスパンを作成することで、可観測性をカスタマイズします。この方法で作成されたスパンは、他のトレースメカニズムと自動的に統合されます。つまり、トレースがすでに開始されている場合、手動スパンはその親スパンとして呼び出し元を持ちます。同様に、コードのラップされたブロックから呼び出されたトレースメソッドは、その親として手動スパンを持ちます。

```csharp
using (var parentScope =
       Tracer.Instance.StartActive("manual.sortorders"))
{
    using (var childScope =
           Tracer.Instance.StartActive("manual.sortorders.child"))
    {
        // トレースするコードの周囲にあるステートメントを使用してネストします
        SortOrders();
    }
}
```
## リソースフィルター

トレースはそれぞれのリソース名に基づいて除外可能で、これによりヘルスチェックなどの外形監視トラフィックが Datadog にレポートされるトレースから削除されます。この設定およびその他のセキュリティ/微調整に関するコンフィギュレーションについては[セキュリティ][5]ページを参照してください。

## OpenTracing

Datadog では、OpenTracing 標準もサポートしています。詳細は、[OpenTracing API][6] をご参照ください。

### セットアップ
OpenTracing のサポートには、[`Datadog.Trace.OpenTracing`][7] NuGet パッケージをアプリケーションに追加します。アプリケーションの起動時に、OpenTracing ライブラリを初期化します。

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


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.nuget.org/packages/Datadog.Trace
[2]: /ja/tracing/visualization/#span-tags
[3]: /ja/tracing/visualization/#spans
[4]: /ja/tracing/visualization/trace/?tab=spantags#more-information
[5]: /ja/tracing/security
[6]: https://github.com/opentracing/opentracing-csharp
[7]: https://www.nuget.org/packages/Datadog.Trace.OpenTracing