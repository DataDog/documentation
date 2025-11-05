---
algolia:
  tags:
  - C#
  - APM
aliases:
- /ja/tracing/trace_collection/otel_instrumentation/dotnet/
- /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/dotnet
code_lang: otel
code_lang_weight: 2
description: OpenTelemetry API を使用して .NET アプリケーションをインスツルメントし、Datadog へトレースを送信します。
further_reading:
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: ドキュメント
  text: OpenTelemetry API と Datadog でインスツルメントされたトレースの相互運用性
title: OpenTelemetry API を使用した .NET カスタム インスツルメンテーション
type: multi-code-lang
---

{{% otel-custom-instrumentation-lang %}}

## セットアップ

OpenTelemetry を Datadog トレースプロバイダーを使用するように構成するには

1. [OpenTelemetry .NET 手動インスツルメンテーションドキュメント][5]に従って、必要な手動 OpenTelemetry インスツルメンテーションを .NET コードに追加してください。**注**: OpenTelemetry SDK を呼び出すように指示されている箇所では、代わりに Datadog トレーシングライブラリを呼び出してください。

2. Datadog .NET トレーシング ライブラリをインストールし、[.NET Framework サービス][10]または [.NET Core (および .NET 5+) サービス][11]のトレーサーを有効にします。**プレビュー**: 必要に応じて、[Single Step APM Instrumentation][13] を使用してこれを実行できます。

3. `DD_TRACE_OTEL_ENABLED` 環境変数を `true` に設定します。

4. アプリケーションを実行します。

Datadog は、これらの OpenTelemetry スパンと他の Datadog APM スパンを組み合わせて、アプリケーションの単一のトレースにします。また、[OpenTelemetry インスツルメンテーションライブラリ][8]もサポートしています。

## カスタムスパンの作成

新しい独立したトレースを開始するスパンを手動で作成するには:

```csharp
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

// 新しいスパンを開始
using (Activity? activity = Telemetry.ActivitySource.StartActivity("<RESOURCE NAME>"))
            {
  activity?.SetTag("operation.name", "custom-operation");
               // 何かを実行
            }

```

## スパンの作成

既存のトレースコンテキスト内にカスタムスパンを作成するには

```csharp
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

using (Activity? parentScope = Telemetry.ActivitySource.StartActivity("<RESOURCE NAME>"))
{
   parentScope?.SetTag("operation.name", "manual.sortorders");
   using (Activity? childScope = Telemetry.ActivitySource.StartActivity("<RESOURCE NAME>"))
   {
       // トレース対象のコードの周囲に using ステートメントをネストする
       childScope?.SetTag("operation.name", "manual.sortorders.child");
       SortOrders();
   }
}
```

## スパンタグの追加

カスタムタグをスパンに追加して、追加のコンテキストを提供します。

{{< highlight csharp "hl_lines=15" >}}
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

public class ShoppingCartController : Controller
{
    private IShoppingCartRepository _shoppingCartRepository;

    [HttpGet]
    public IActionResult Index(int customerId)
    {
      Activity? activity =
      Telemetry.ActivitySource.StartActivity("<RESOURCE NAME>")

        // Datadog の Web UI で使用できるよう、スパンにタグを追加
        activity?.SetTag("customer.id", customerId.ToString());

        var cart = _shoppingCartRepository.Get(customerId);

        return View(cart);
    }
}
{{< /highlight >}}

## スパンにエラーを設定する

実行中にエラーが発生した場合は、スパンにエラー情報を設定します。

```csharp
try
{
    // 例外をスローする可能性のある処理を実行します。
}
catch(Exception e)
{
    activity?.SetTag("error", 1);
    activity?.SetTag("error.message", exception.Message);
    activity?.SetTag("error.stack", exception.ToString());
    activity?.SetTag("error.type", exception.GetType().ToString());
}
```

## スパン イベントの追加

<div class="alert alert-info">スパン イベントを追加するには SDK バージョン 2.53.0 以上が必要です。</div>

`AddEvent` API を使用してスパン イベントを追加できます。このメソッドには `name` パラメーターで構築した `ActivityEvent` が必須で、オプションで `attributes` と `timestamp` を受け取ります。メソッドは指定されたプロパティを持つ新しいスパン イベントを作成し、対象のスパンに関連付けます。

- **Name** [_required_]: イベント名を表す文字列。
- **Timestamp** [_optional_]: イベント発生時刻を表す UNIX タイムスタンプ。`DateTimeOffset` オブジェクトを想定します。
- **Attributes** [_optional_]: 以下のプロパティを持つ 0 個以上のキーと値のペア。
  - キーは空でない文字列である必要があります。
  - 値として指定できるのは次のいずれかです。
    - プリミティブ型: string、Boolean、number。
    - 同一プリミティブ型の要素のみを含む配列 (例: string の配列)。
  - 入れ子の配列や異なるデータ型を混在させた配列は使用できません。

以下の例は、スパンにイベントを追加するさまざまな方法を示しています。

```csharp
var eventTags = new ActivityTagsCollection
{
    { "int_val", 1 },
    { "string_val", "two" },
    { "int_array", new int[] { 3, 4 } },
    { "string_array", new string[] { "5", "6" } },
    { "bool_array", new bool[] { true, false } }
};

activity.AddEvent(new ActivityEvent("Event With No Attributes"));
activity.AddEvent(new ActivityEvent("Event With Some Attributes", DateTimeOffset.Now, eventTags));
```

詳細は [OpenTelemetry 仕様][15] を参照してください。

## ヘッダー抽出と挿入によるコンテキストの伝搬

分散型トレーシングのコンテキストの伝搬は、ヘッダーの挿入と抽出で構成できます。詳しくは[トレースコンテキストの伝播][14]をお読みください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[5]: https://opentelemetry.io/docs/instrumentation/net/manual/
[8]: https://opentelemetry.io/docs/instrumentation/net/libraries/
[10]: /ja/tracing/trace_collection/dd_libraries/dotnet-framework/#installation-and-getting-started
[11]: /ja/tracing/trace_collection/dd_libraries/dotnet-core/#installation-and-getting-started
[13]: /ja/tracing/trace_collection/single-step-apm/
[14]: /ja/tracing/trace_collection/trace_context_propagation/
[15]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events