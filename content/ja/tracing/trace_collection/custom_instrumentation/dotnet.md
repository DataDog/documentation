---
aliases:
- /ja/tracing/opentracing/dotnet
- /ja/tracing/manual_instrumentation/dotnet
- /ja/tracing/custom_instrumentation/dotnet
- /ja/tracing/setup_overview/custom_instrumentation/dotnet
code_lang: dotnet
code_lang_weight: 80
description: .NET アプリケーションを手動でインスツルメントしてカスタムトレースを Datadog に送信します。
further_reading:
- link: tracing/guide/instrument_custom_method
  tag: ガイド
  text: カスタムメソッドをインスツルメントして、ビジネスロジックを詳細に可視化する
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: ドキュメント
  text: ログとトレースの接続
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: GitHub
  text: .NET コードサンプル
kind: documentation
title: .NET カスタムインスツルメンテーション
type: multi-code-lang
---
<div class="alert alert-info">
.NET トレーサーのセットアップ方法と自動計測を有効にする方法については、<a href="https://docs.datadoghq.com/tracing/setup/dotnet-framework/">.NET Framework セットアップ方法</a>または <a href="https://docs.datadoghq.com/tracing/setup/dotnet-core/">.NET Core セットアップ方法</a>を参照してください。
</div>

このページでは、Datadog APM で可観測性を追加・カスタマイズするための一般的なユースケースを詳しく説明します。サポートされているランタイムの一覧は、[.NET Framework 互換性要件][1]または [.NET Core 互換性要件][2]を参照してください。

以下の手順を実行するには、1 つまたは複数のライブラリに NuGet パッケージの参照を追加する必要がある場合があります。

- `Datadog.Trace` [NuGet パッケージ][3]: このライブラリはトレーサーとアクティブスパンに直接アクセスするための API を提供します。**注:** NuGet パッケージの `Datadog.Trace` と自動インスツルメンテーションを同時に使用する場合、バージョンを同期させることが重要です。
- `Datadog.Trace.Annotations` [NuGet パッケージ][4]: このライブラリは、コードに適用して追加の自動インスツルメンテーション機能を有効にすることができる .NET 属性を提供します。

## `ddtrace` ライブラリの機能性を拡張したり、アプリケーションのインスツルメントをより精確に制御するのに役立つ方法がライブラリにあります。

カスタム[スパンタグ][5]を[スパン][6]に追加して、Datadog 内の可観測性をカスタマイズします。スパンタグは受信トレースに適用されるため、観測された動作を、マーチャントの階層、チェックアウト金額、ユーザー ID などのコードレベルの情報と関連付けることができます。

### カスタムスパンタグを追加する

<div class="alert alert-warning">
  <strong>注:</strong> この機能を使用するには、アプリケーションに `Datadog.Trace` NuGet パッケージを追加することが必須です。
</div>

`customer.id` などのアプリケーションコード内の動的な値に対応するカスタムタグをスパンに追加します。

```csharp
using Datadog.Trace;

public class ShoppingCartController : Controller
{
    private IShoppingCartRepository _shoppingCartRepository;

    [HttpGet]
    public IActionResult Index(int customerId)
    {
        // グローバルトレーサーでアクティブスコープにアクセスする
        // 注: アクティブなスパンが存在しない場合は null を返すことがあります
        var scope = Tracer.Instance.ActiveScope;

        if (scope != null)
        {
            // Datadog の Web UI で使用するためのタグをスパンに追加する
            scope.Span.SetTag("customer.id", customerId.ToString());
        }

        var cart = _shoppingCartRepository.Get(customerId);

        return View(cart);
    }
}
```

### すべてのスパンにグローバルにタグを追加する

`DD_TAGS` 環境変数を使用して、アプリケーションに対して生成されたすべてのスパンにタグを設定します。これは、アプリケーション、データセンター、地域など、Datadog UI 内で統計データをグループ化するのに役立ちます。

```ini
DD_TAGS=datacenter:njc,key2:value2
```

### スパンにエラーを設定する

<div class="alert alert-warning">
  <strong>注:</strong> この機能を使用するには、アプリケーションに `Datadog.Trace` NuGet パッケージを追加することが必須です。
</div>

コードで発生したエラーをマークするには、`Span.SetException(Exception)` メソッドを利用します。このメソッドは、スパンをエラーとしてマークし、[関連するスパンメタデータ][5]を追加して、例外の情報を提供します。

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

## タグの追加

[.NET Framework][1] または [.NET Core][2] に対して対応するフレームワークインスツルメンテーションを使用しない場合や、より深いアプリケーションの[トレース][7]をする場合、完全なフレームグラフのため、またはコードの断片の実行時間を測定するために、コードにカスタムインスツルメンテーションを追加できます。

アプリケーションコードの変更が不可能な場合は、環境変数 `DD_TRACE_METHODS` を使用してこれらのメソッドの詳細を記述します。

既存の `[Trace]` または同様の属性がある場合、または属性を使用して Datadog 内の不完全なトレースを完了する場合は、トレースアノテーションを使用します。

### 構成によるインスツルメントメソッド

<div class="alert alert-warning">
  <strong>注:</strong> この機能を使用するには、アプリケーションの自動インスツルメンテーションを有効にすることが必須です。
</div>

環境変数 `DD_TRACE_METHODS` を使用すると、アプリケーションコードを変更せずに、サポートされていないフレームワークを視覚化することができます。入力フォーマットに関する完全な詳細については、[.NET Framework セットアップ手順][8]または [.NET Core セットアップ手順][9]を参照してください。次の例では、インスツルメントしたいメソッドの名前が `SaveSession` で、そのメソッドが `Store.Managers.SessionManager` タイプで定義されていると仮定します。

```ini
DD_TRACE_METHODS=Store.Managers.SessionManager[SaveSession]
```

この結果、スパンには `operationName` が `trace.annotation` に、`resourceName` が `SaveSession` に設定されます。もし、スパンの属性をカスタマイズしたい場合で、ソースコードを変更できるのであれば、代わりに[属性によってメソッドをインスツルメント](#instrument-methods-via-attributes)することができます。

### 属性によるインスツルメントメソッド

<div class="alert alert-warning">
  <strong>注:</strong> この機能を使用するには、`Datadog.Trace.Annotations` NuGet パッケージを追加し、アプリケーションの自動インスツルメンテーションを有効にすることが必須です。
</div>

Datadog が自動インスツルメンテーションを行う際に、メソッドに `[Trace]` を追加し、トレースするようにします。自動インスツルメンテーションが有効でない場合、この属性はアプリケーションに何の影響も及ぼしません。

`[Trace]` 属性はデフォルトのオペレーション名 `trace.annotation` とトレースされるメソッドのリソース名を持っています。これらは `[Trace]` 属性の名前付き引数として設定することで、インスツルメンテーションされる内容をより良く反映させることができます。`[Trace]` 属性に設定できる引数は、オペレーション名とリソース名のみです。

```csharp
using Datadog.Trace.Annotations;

namespace Store.Managers
{
    public class SessionManager
    {
        [Trace(OperationName = "database.persist", ResourceName = "SessionManager.SaveSession")]
        public static void SaveSession()
        {
            // ここにメソッドの実装
        }
    }
}
```

### 新しいスパンを手動で作成する

<div class="alert alert-warning">
  <strong>注:</strong> この機能を使用するには、アプリケーションに `Datadog.Trace` NuGet パッケージを追加することが必須です。
</div>

自動インスツルメンテーション、`[Trace]` 属性、`DD_TRACE_METHODS` コンフィギュレーションに加えて、プログラムでコードのブロックの周囲にスパンを作成することで、可観測性をカスタマイズできます。この方法で作成されたスパンは、他のトレースメカニズムと自動的に統合されます。つまり、トレースがすでに開始されている場合、手動スパンはその親スパンとして呼び出し元を持ちます。同様に、コードのラップされたブロックから呼び出されたトレースメソッドは、その親として手動スパンを持ちます。

```csharp
using (var parentScope =
       Tracer.Instance.StartActive("manual.sortorders"))
{
    parentScope.Span.ResourceName = "<RESOURCE NAME>";
    using (var childScope =
           Tracer.Instance.StartActive("manual.sortorders.child"))
    {
        // トレースするコードの周囲にあるステートメントを使用してネストします
        childScope.Span.ResourceName = "<RESOURCE NAME>";
        SortOrders();
    }
}
```

## トレースクライアントと Agent コンフィギュレーション

### ヘッダーの抽出と挿入

Datadog APM トレーサーは、分散型トレーシングのための [B3][5] と [W3C][6] のヘッダー抽出と注入をサポートしています。詳細については、[セットアップドキュメント][7]を参照してください。

ほとんどの場合、ヘッダーの抽出と注入は透過的に行われます。しかし、分散トレースが切断される可能性があるケースも知られています。例えば、分散キューからメッセージを読み込むとき、ライブラリによってはスパンコンテキストを失うことがあります。そのような場合、以下のコードを使ってカスタムトレースを追加することができます。

```csharp
var spanContextExtractor = new SpanContextExtractor();
var parentContext = spanContextExtractor.Extract(headers, (headers, key) => GetHeaderValues(headers, key));
var spanCreationSettings = new SpanCreationSettings() { Parent = parentContext };
using var scope = Tracer.Instance.StartActive("operation", spanCreationSettings);
```

`GetHeaderValues` メソッドを提供します。このメソッドの実装方法は、`SpanContext` を保持する構造に依存します。

以下はその例です。

```csharp
// Confluent.Kafka
IEnumerable<string> GetHeaderValues(Headers headers, string name)
{
    if (headers.TryGetLastBytes(name, out var bytes))
    {
        try
        {
            return new[] { Encoding.UTF8.GetString(bytes) };
        }
        catch (Exception)
        {
            // 無視
        }
    }

    return Enumerable.Empty<string>();
}

// RabbitMQ
IEnumerable<string> GetHeaderValues(IDictionary<string, object> headers, string name)
{
    if (headers.TryGetValue(name, out object value) && value is byte[] bytes)
    {
        return new[] { Encoding.UTF8.GetString(bytes) };
    }

    return Enumerable.Empty<string>();
}
```

Kafka コンシューマースパンをトレースするために `SpanContextExtractor` API を使用する場合、`DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` を `false` に設定します。これにより、メッセージがトピックから消費された直後にコンシューマースパンが正しく閉じられ、メタデータ (`partition` や `offset` など) が正しく記録されることが保証されます。`SpanContextExtractor` API を使用して Kafka メッセージから作成されたスパンは、プロデューサーのスパンの子であり、コンシューマーのスパンの兄弟になります。

### リソースのフィルター

リソース名に基づいてトレースを除外することで、ヘルスチェックなどの Synthetic トラフィックを削除することができます。セキュリティや追加構成については、[データセキュリティのための Datadog Agent またはトレーサーの構成][10]を参照してください。

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/tracing/trace_collection/compatibility/dotnet-framework
[2]: /ja/tracing/trace_collection/compatibility/dotnet-core
[3]: https://www.nuget.org/packages/Datadog.Trace
[4]: https://www.nuget.org/packages/Datadog.Trace.Annotations
[5]: /ja/tracing/glossary/#span-tags
[6]: /ja/tracing/glossary/#spans
[7]: /ja/tracing/glossary/#trace
[8]: /ja/tracing/trace_collection/dd_libraries/dotnet-framework
[9]: /ja/tracing/trace_collection/dd_libraries/dotnet-core
[10]: /ja/tracing/security