---
aliases:
- /ja/tracing/opentracing/dotnet
- /ja/tracing/manual_instrumentation/dotnet
- /ja/tracing/custom_instrumentation/dotnet
- /ja/tracing/setup_overview/custom_instrumentation/dotnet
- /ja/tracing/trace_collection/custom_instrumentation/dotnet
- /ja/tracing/trace_collection/custom_instrumentation/dd_libraries/dotnet
code_lang: dd-api
code_lang_weight: 1
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
  tag: ソースコード
  text: .NET コードサンプル
title: .NET で Datadog API を使用したカスタム インスツルメンテーション
type: multi-code-lang
---

<div class="alert alert-info">
自動インスツルメンテーションとセットアップの手順をまだ確認していない場合は、まず <a href="https://docs.datadoghq.com/tracing/setup/dotnet-core/">.NET/.NET Core</a> または <a href="https://docs.datadoghq.com/tracing/setup/dotnet-framework/">.NET Framework</a> のセットアップ手順をご覧ください。
</div>

このページでは、Datadog APM で可観測性を追加・カスタマイズするための一般的なユースケースを詳しく説明します。サポートされているランタイムの一覧は、[.NET Framework 互換性要件][1]または [.NET Core 互換性要件][2]を参照してください。

[デフォルトの自動インスツルメンテーション][3]以上を取得するためには、いくつかの方法があります。

- [設定による方法](#instrument-methods-through-configuration) — 特定のタグを追加することはできません。
- [属性を使用する方法](#instrument-methods-through-attributes) — オペレーション名とリソース名をカスタマイズできます。
- [カスタム コードを使用する方法](#custom-instrumentation-with-code) — スパンを最も柔軟に制御できます。

これらの方法は組み合わせて使用でき、望む詳細レベルのインスツルメンテーションを実現できます。ただし、自動インスツルメンテーションを先に設定する必要があります。

## 構成によるインスツルメントメソッド

環境変数 `DD_TRACE_METHODS` を使用すると、アプリケーションコードを変更せずに、サポートされていないフレームワークを可視化することができます。`DD_TRACE_METHODS` の入力フォーマットの詳細については、[.NET Framework 構成手順][8]または [.NET Core 構成手順][9]を参照してください。例えば、`Store.Managers.SessionManager` 型で定義された `SaveSession` というメソッドをインスツルメンテーションするには、次のように設定します。

```ini
DD_TRACE_METHODS=Store.Managers.SessionManager[SaveSession]
```

結果として得られるスパンは、`trace.annotation` という値を持つ `operationName` 属性と `SaveSession` という値を持つ `resourceName` 属性を持っています。

スパンの属性をカスタマイズしたい場合で、ソースコードを修正する能力がある場合は、代わりに[属性を通してメソッドをインスツルメントする](#instrument-methods-through-attributes)ことが可能です。

## 属性によるインスツルメントメソッド

Datadog が自動インスツルメンテーションを行う際に、メソッドに `[Trace]` を追加し、トレースするようにします。自動インスツルメンテーションが有効でない場合、この属性はアプリケーションに何の影響も及ぼしません。

`[Trace]` 属性はデフォルトのオペレーション名 `trace.annotation` とトレースされるメソッドのリソース名を持っています。**操作名**と**リソース名**を `[Trace]` 属性の名前付き引数として設定することで、インスツルメンテーションされる内容をより良く反映させることができます。`[Trace]` 属性に設定できる引数は、オペレーション名とリソース名のみです。例:

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

## コードによるカスタムインスツルメンテーション

<div class="alert alert-info">
  <strong>注</strong>: この機能を使用するには、<a href="https://www.nuget.org/packages/Datadog.Trace"><code>Datadog.Trace</code> NuGet パッケージ</a>をアプリケーションに追加する必要があります。これは、トレーサーとアクティブスパンに直接アクセスするための API を提供します。
</div>

<div class="alert alert-danger">
  <strong>注:</strong> v3.0.0 以降、カスタム インスツルメンテーションを使用するには自動インスツルメンテーションも併用する必要があります。自動およびカスタム インスツルメンテーションのパッケージ バージョン (例: MSI と NuGet) は同期させ、メジャー バージョンを混在させないようにしてください。
</div>

### コードによる Datadog の構成

アプリケーションを構成する方法は複数あります。環境変数、`web.config` ファイル、`datadog.json` ファイルを使用する方法があり、 [ドキュメントで説明されています][11]。また、`Datadog.Trace` NuGet パッケージでは、コード内で構成を行うことができます。

構成設定をオーバーライドするには、`TracerSettings` のインスタンスを作成して、静的な `Tracer.Configure()` メソッドに渡します。

```csharp
using Datadog.Trace;

// 既存の環境変数と構成ソースを使用して
// 設定オブジェクトを作成します
var settings = TracerSettings.FromDefaultSources();

// 値をオーバーライドします
settings.GlobalTags.Add("SomeKey", "SomeValue");

// トレーサーの構成を置き換えます
Tracer.Configure(settings);
```

`Tracer.Configure()` を呼び出すと、カスタムインスツルメンテーションでも自動インスツルメンテーションでも、それ以降のすべてのトレースの設定が置き換わります。

<div class="alert alert-danger">
  構成の置き換えは、アプリケーションで<strong>一度だけ、できるだけ早い段階で</strong>行う必要があります。
</div>

### カスタムトレース/スパンの作成

自動インスツルメンテーション、 `[Trace]` 属性、`DD_TRACE_METHODS` の構成に加えて、プログラム的に任意のコードブロックの周りにスパンを作成することで、観測可能性をカスタマイズすることが可能です。

カスタムスパンを作成してアクティブにするには、`Tracer.Instance.StartActive()` を使用します。トレースがすでにアクティブな場合 (例えば、自動インスツルメンテーションによって作成された場合)、スパンは現在のトレースの一部となります。現在のトレースがない場合は、新しいトレースが開始されます。

<div class="alert alert-danger"><strong>警告</strong>: <code>StartActive</code> から返されたスコープを確実にディスポーズしてください。スコープをディスポーズすると、スパンが閉じられ、そのスパンがすべて閉じられると、トレースが Datadog にフラッシュされるようになります。
</div>

```csharp
using Datadog.Trace;

// 新しいスパンを開始します
using (var scope = Tracer.Instance.StartActive("custom-operation"))
{
    // 操作を実行します
}
```

カスタム[スパンタグ][5]を[スパン][6]に追加して、Datadog 内の可観測性をカスタマイズします。スパンタグは受信トレースに適用されるため、観測された動作を、マーチャントの階層、チェックアウト金額、ユーザー ID などのコードレベルの情報と関連付けることができます。

### 新しいスパンを手動で作成する

手動で作成したスパンは、他のトレースメカニズムからのスパンと自動的にインテグレーションされます。つまり、トレースがすでに開始されている場合、手動スパンはその呼び出し元を親スパンとして持っています。同様に、ラップされたコードブロックから呼び出されたトレースされたメソッドは、その親として手動スパンを持ちます。

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

### カスタムスパンタグを追加する

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

### スパンにエラーを設定する

コードで発生したエラーをマークするには、`Span.SetException(Exception)` メソッドを使用します。このメソッドは、スパンをエラーとしてマークし、[関連するスパンメタデータ][5]を追加して、例外の情報を提供します。

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

これは、スパンに以下のタグを設定します。
- `"error.message":exception.Message`
- `"error.stack":exception.ToString()`
- `"error.type":exception.GetType().ToString()`

## ヘッダー抽出と挿入によるコンテキストの伝搬

分散型トレーシングのコンテキストの伝搬は、ヘッダーの挿入と抽出で構成できます。詳しくは[トレースコンテキストの伝播][12]をお読みください。

## すべてのスパンにグローバルにタグを追加する

`DD_TAGS` 環境変数を使用して、アプリケーションに対して生成されたすべてのスパンにタグを設定します。これは、Datadog UI 内でアプリケーション、データセンター、または地域の統計データをグループ化するのに役立ちます。例:

```ini
DD_TAGS=datacenter:njc,key2:value2
```

## リソースのフィルター

リソース名に基づいてトレースを除外することで、ヘルスチェックなどの Synthetic トラフィックを削除することができます。セキュリティや追加構成については、[データセキュリティのための Datadog Agent またはトレーサーの構成][10]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/tracing/trace_collection/compatibility/dotnet-framework
[2]: /ja/tracing/trace_collection/compatibility/dotnet-core
[3]: /ja/tracing/trace_collection/dd_libraries/dotnet-core
[5]: /ja/tracing/glossary/#span-tags
[6]: /ja/tracing/glossary/#spans
[7]: /ja/tracing/glossary/#trace
[8]: /ja/tracing/trace_collection/library_config/dotnet-framework/#automatic-instrumentation-optional-configuration
[9]: /ja/tracing/trace_collection/library_config/dotnet-core/#automatic-instrumentation-optional-configuration
[10]: /ja/tracing/security
[11]: /ja/tracing/trace_collection/library_config/dotnet-core/
[12]: /ja/tracing/trace_collection/trace_context_propagation/