---
description: .NET アプリケーション用に Datadog Feature Flags をセットアップします。
further_reading:
- link: /feature_flags/server/
  tag: ドキュメント
  text: サーバーサイドの Feature Flags
- link: /tracing/trace_collection/dd_libraries/dotnet-core/
  tag: ドキュメント
  text: .NET トレーシング
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: ガイド
  text: サーバーサイドの Feature Flag 評価メトリクスをセットアップする
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: ガイド
  text: Feature Flags の APM トレースのリッチ化をセットアップする
- link: /feature_flags/concepts/flag_graphs/
  tag: コンセプト
  text: Feature Flag グラフ
title: .NET Feature Flags
---
## 概要 {#overview}

このページでは、Datadog Feature Flags SDK を使用して .NET アプリケーションをインスツルメントする方法について説明します。.NET SDK は、Feature Flag 管理のオープン標準である [OpenFeature][1] と統合され、Datadog .NET トレーサー (`dd-trace-dotnet`) を使用して、管理対象 CDN または Agent Remote Configuration からフラグ更新を受信します。

トレーサーバージョン 3.54.0 以降では、新規セットアップはデフォルトで Datadog 管理の CDN からフラグ構成を読み込みます。このガイドでは、SDK のインストール、OpenFeature クライアントの作成、およびアプリケーションでの Feature Flags の評価方法について説明します。

<div class="alert alert-warning">バージョン 3.54.0 では、Agentless モードはフラグ構成のみを変更します。エクスペリメントの露出イベントには、引き続き互換性のあるローカル Agent またはテレメトリリレーが必要です。直接の Event Platform Proxy (EVP) フォールバックはサポートされていません。評価メトリクスには、個別に構成された OpenTelemetry エクスポートパスが必要です。テレメトリパスがない場合、構成の配信とローカルフラグの評価のみが機能します。</div>

## 前提条件 {#prerequisites}

Agentless 構成配信の場合は、Datadog .NET トレーサーのバージョン **3.54.0 以降** および `Datadog.FeatureFlags.OpenFeature`バージョン **2.3.1 以降** をインストールしてください。トレーサーは [自動インスツルメンテーション][8] で読み込む必要があります。OpenFeature プロバイダーをインストールするだけでは不十分です。フラグ構成を取得するために、個別の Datadog Agent は必要ありません。

起動前に、アプリケーションプロセスで以下の環境変数を設定します。

{{< code-block lang="bash" >}}
DD_API_KEY=<YOUR_API_KEY>
DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

Datadog [API キー][5] と、`datadoghq.com` のような組織をホストするサイトを使用します。新規セットアップの場合、Feature Flags の有効化やソース設定は必要ありません。アプリケーションで Datadog OpenFeature プロバイダーを初期化してポーリングを開始します。トレーサーのインストールや初期化だけでは、CDN ポーリングは開始されません。評価にはローカルにキャッシュされた構成が使用され、ネットワークリクエストは行われません。

フラグ評価メトリクスには、個別に構成された OpenTelemetry パイプラインが使用されます。CDN 配信を有効にしても、メトリクスのエクスポートは構成されません。[サーバーサイドフラグ評価メトリクスの設定][6] および [Feature Flag グラフ][7] を参照してください。

### Agent Remote Configuration を使用する{#use-agent-remote-configuration}

Agent ベースの配信の場合は、[Remote Configuration][2] が有効で、Agent に API キーが構成されている Datadog Agent 7.55 以降を使用してください。最小トレーサーバージョンは、.NET 6+ の場合は 3.36.0、.NET Framework 4.6.2+ の場合は 3.38.0 です。

Tracer 3.54.0 以降では、ソースを明示的に選択してください。

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

それより前の Tracer バージョンでは `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` を使用します。3.54.0 では、この非推奨の設定は、新しい有効化設定も明示的なソースも指定されていない場合に Remote Configuration を保持します。移行するには、レガシーな設定を削除し、上記のアプリケーション認証情報を設定し、ソースをすでに明示的に選択している場合は `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless` を設定してください。`DD_FEATURE_FLAGS_ENABLED=false` は、選択されたソースに関係なく Feature Flags を無効にします。

ポーリング、リクエストタイムアウト、カスタムエンドポイント、および移行設定については、[Configuration Sources][9] を参照してください。デフォルトの Agentless ポーリング間隔は 30 秒、リクエストタイムアウトは 5 秒であり、プロバイダーの初期化は最初の設定まで最大 30 秒待機します。

## インストール {#installation}

NuGet を使用して Datadog [.NET SDK][3] および [OpenFeature SDK][4] をインストールします。

{{< code-block lang="bash" >}}
dotnet add package Datadog.FeatureFlags.OpenFeature
dotnet add package OpenFeature
{{< /code-block >}}

または、それらを `.csproj` ファイルに追加します。

{{< code-block lang="xml" filename="MyProject.csproj" >}}
<ItemGroup>
  <PackageReference Include="Datadog.FeatureFlags.OpenFeature" />
  <PackageReference Include="OpenFeature" />
</ItemGroup>
{{< /code-block >}}

フラグ評価メトリクスを有効にする場合は、OpenTelemetry SDK と OTLP エクスポーターもインストールする必要があります。

{{< code-block lang="bash" >}}
dotnet add package OpenTelemetry
dotnet add package OpenTelemetry.Exporter.OpenTelemetryProtocol
{{< /code-block >}}

または、それらを `.csproj` ファイルに追加します。

{{< code-block lang="xml" filename="MyProject.csproj" >}}
<ItemGroup>
  <PackageReference Include="OpenTelemetry" />
  <PackageReference Include="OpenTelemetry.Exporter.OpenTelemetryProtocol" />
</ItemGroup>
{{< /code-block >}}

## SDK の初期化 {#initialize-the-sdk}

Datadog OpenFeature プロバイダーを OpenFeature API に登録します。プロバイダーは、Datadog .NET Tracer で選択された設定ソースをアクティブにします。

### ブロッキングの初期化 {#blocking-initialization}

`SetProviderAsync` を `await` と共に使用して、初期フラグ構成が受信されるまで評価をブロックします。これにより、アプリケーションがリクエストの処理を開始する前にフラグの準備が整います。

{{< code-block lang="csharp" >}}
using OpenFeature;
using Datadog.FeatureFlags.OpenFeature;

// Create and register the Datadog provider
var provider = new DatadogProvider();
await Api.Instance.SetProviderAsync(provider);

// Create an OpenFeature client
var client = Api.Instance.GetClient("my-service");

// Your application code here
{{< /code-block >}}

### 非ブロッキングの初期化 {#non-blocking-initialization}

`SetProvider` を使用して、待機せずにプロバイダーを登録します。構成が受信されるまで、フラグ評価はデフォルト値を返します。

{{< code-block lang="csharp" >}}
using OpenFeature;
using Datadog.FeatureFlags.OpenFeature;

// Create and register the Datadog provider
var provider = new DatadogProvider();
Api.Instance.SetProvider(provider);

// Create an OpenFeature client
var client = Api.Instance.GetClient("my-service");

// Your application code here
// Flag evaluations return defaults until configuration is received
{{< /code-block >}}

## クライアントを作成する {#create-a-client}

フラグを評価するために OpenFeature クライアントを作成します。アプリケーションの異なる部分に対して、異なる名前を持つ複数のクライアントを作成できます。

{{< code-block lang="csharp" >}}
// Create a client for your application
var client = Api.Instance.GetClient("my-service");
{{< /code-block >}}

## 評価コンテキストを設定する {#set-the-evaluation-context}

フラグのターゲティング対象となるユーザーまたはエンティティを識別する評価コンテキストを定義します。評価コンテキストには、どのフラグバリエーションを返すかを決定するために使用される属性が含まれます。

<div class="alert alert-warning">Datadog Feature Flags では、評価コンテキスト属性が文字列、数値、ブール値といったフラットなプリミティブ値でなければなりません。ネストされたオブジェクトや配列は渡さないでください。これらはサポートされておらず、エクスポージャーデータが破棄される原因となる可能性があります。</div>

{{< code-block lang="csharp" >}}
using OpenFeature.Model;

var evalCtx = EvaluationContext.Builder()
    .SetTargetingKey("user-123")  // Targeting key (typically user ID)
    .Set("email", "user@example.com")
    .Set("country", "US")
    .Set("tier", "premium")
    .Set("age", 25)
    .Build();
{{< /code-block >}}

**注:** サーバーサイドアプリケーションでは、現在のユーザーに基づいてリクエストごとに評価コンテキストを一度構築し、そのリクエスト内のすべてのフラグ評価に同じコンテキストを渡してください。ユーザー属性が変更された場合にのみ、コンテキストを再構築してください。

ターゲティングキーは、一貫したトラフィックディストリビューション (パーセンテージロールアウト) に使用されます。追加の属性により、上記の例で「米国のユーザーに対して有効にする」や「プレミアム層のユーザーに対して有効にする」といったターゲティングルールが可能になります。

## フラグを評価する {#evaluate-flags}

プロバイダーを設定し、クライアントを作成した後、アプリケーション全体でフラグを評価できます。フラグの評価はローカルで高速に行われます。SDK はローカルにキャッシュされた構成データを使用するため、評価中にネットワークリクエストは発生しません。

各フラグはキー (一意の文字列) によって識別され、想定されるタイプの値を返すタイプ指定されたメソッドで評価できます。フラグが存在しない場合や評価できない場合、SDK は提供されたデフォルト値を返します。

### ブールフラグ {#boolean-flags}

オン/オフや真/偽の条件を表すフラグには、`GetBooleanValueAsync` を使用します。

{{< code-block lang="csharp" >}}
var enabled = await client.GetBooleanValueAsync("new-checkout-flow", false, evalCtx);

if (enabled)
{
    ShowNewCheckout();
}
else
{
    ShowLegacyCheckout();
}
{{< /code-block >}}

### 文字列フラグ {#string-flags}

複数のバリアントや構成文字列を選択するフラグには、`GetStringValueAsync` を使用します。

{{< code-block lang="csharp" >}}
var theme = await client.GetStringValueAsync("ui-theme", "light", evalCtx);

switch (theme)
{
    case "dark":
        SetDarkTheme();
        break;
    case "light":
        SetLightTheme();
        break;
    default:
        SetLightTheme();
        break;
}
{{< /code-block >}}

### 数値フラグ {#numeric-flags}

数値フラグの場合、`GetIntegerValueAsync` または `GetDoubleValueAsync` を使用します。これらは、機能が制限、パーセンテージ、乗数などの数値パラメーターに依存する場合に適しています。

{{< code-block lang="csharp" >}}
var maxItems = await client.GetIntegerValueAsync("cart-max-items", 20, evalCtx);

var discountRate = await client.GetDoubleValueAsync("discount-rate", 0.0, evalCtx);
{{< /code-block >}}

### オブジェクトフラグ {#object-flags}

構造化データの場合、`GetObjectValueAsync` を使用します。これは、複雑な構成にアクセスするために使用できる値を返します。

{{< code-block lang="csharp" >}}
using OpenFeature.Model;

var defaultConfig = new Value(new Structure(new Dictionary<string, Value>
{
    ["maxRetries"] = new Value(3),
    ["timeout"] = new Value(30)
}));

var config = await client.GetObjectValueAsync("feature-config", defaultConfig, evalCtx);

// Access configuration values
var maxRetries = config.AsStructure?["maxRetries"].AsInteger ?? 3;
var timeout = config.AsStructure?["timeout"].AsInteger ?? 30;
{{< /code-block >}}

### フラグ評価の詳細 {#flag-evaluation-details}

フラグの値だけでなく詳細情報が必要な場合は、`*DetailsAsync` メソッドを使用します。これらは、評価された値とその評価を説明するメタデータの両方を返します。

{{< code-block lang="csharp" >}}
var details = await client.GetBooleanDetailsAsync("new-feature", false, evalCtx);

Console.WriteLine($"Value: {details.Value}");
Console.WriteLine($"Variant: {details.Variant}");
Console.WriteLine($"Reason: {details.Reason}");
Console.WriteLine($"Error Type: {details.ErrorType}");
Console.WriteLine($"Error Message: {details.ErrorMessage}");
{{< /code-block >}}

フラグの詳細は、評価の動作をデバッグし、ユーザーが特定の値を受け取った理由を理解する上で役立ちます。

## プロバイダーの初期化の待機 {#waiting-for-provider-initialization}

デフォルトでは、最初のフラグ設定が受信されるまで、プロバイダーは非同期に初期化されてフラグ評価はデフォルト値を返します。アプリケーションでリクエストを処理する前にフラグの準備が必要な場合は、イベントハンドラーを使用してプロバイダーの初期化を待機できます。

{{< code-block lang="csharp" >}}
using OpenFeature;
using OpenFeature.Constant;

var taskCompletionSource = new TaskCompletionSource<bool>();

// Register event handler
Api.Instance.AddHandler(ProviderEventTypes.ProviderReady, (eventDetails) =>
{
    Console.WriteLine("Provider is ready");
    taskCompletionSource.SetResult(true);
});

Api.Instance.AddHandler(ProviderEventTypes.ProviderError, (eventDetails) =>
{
    Console.WriteLine($"Provider error: {eventDetails.Message}");
    taskCompletionSource.SetResult(false);
});

// Set provider
var provider = new DatadogProvider();
Api.Instance.SetProvider(provider);

// Wait for provider to be ready (with timeout)
var timeout = Task.Delay(TimeSpan.FromSeconds(30));
var completedTask = await Task.WhenAny(taskCompletionSource.Task, timeout);

if (completedTask == timeout)
{
    Console.WriteLine("Provider initialization timed out");
}

// Create client and evaluate flags
var client = Api.Instance.GetClient();
{{< /code-block >}}

## クリーンアップ {#cleanup}

アプリケーションを終了する際は、OpenFeature API をシャットダウンしてリソースをクリーンアップしてください。

{{< code-block lang="csharp" >}}
await Api.Instance.ShutdownAsync();
{{< /code-block >}}

## テスト {#testing}

実際の `DatadogProvider` を使用して専用の Datadog テスト環境に対してテストを行うか、OpenFeature の `InMemoryProvider` に置き換えてテストコード内でフラグ値を直接制御することができます。このセクションでは、テストを外部から隔離し、オフライン環境でも実行可能なインメモリ方式について説明します。`InMemoryProvider` は `OpenFeature` NuGet パッケージ (ネームスペース`OpenFeature.Providers.Memory`) に含まれているため、本番環境用にインストール済みのもの以外に追加の依存関係は必要ありません。

`Api.Instance`はシングルトンです。xUnit の `IAsyncLifetime` を使用してテストごとにプロバイダーを設定し、`DisposeAsync` で破棄することでテストの順序に依存する問題を回避できます。セットアップを共有するより高速なスイートの場合は、`InMemoryProvider.UpdateFlagsAsync(...)` を使用してプロバイダーを再登録することなくテスト間でフラグの状態を変更します。

{{< code-block lang="csharp" >}}
using OpenFeature;
using OpenFeature.Model;
using OpenFeature.Providers.Memory;
using Xunit;

public class CheckoutFlagTests : IAsyncLifetime
{
    private FeatureClient _client = null!;

    public async Task InitializeAsync()
    {
        var flags = new Dictionary<string, Flag>
        {
            ["new-checkout-flow"] = new Flag<bool>(
                variants: new Dictionary<string, bool> { ["on"] = true, ["off"] = false },
                defaultVariant: "on"),
            ["ui-theme"] = new Flag<string>(
                variants: new Dictionary<string, string> { ["dark"] = "dark", ["light"] = "light" },
                defaultVariant: "light",
                contextEvaluator: ctx =>
                    ctx.GetValue("tier")?.AsString == "premium" ? "dark" : "light"),
        };

        await Api.Instance.SetProviderAsync(new InMemoryProvider(flags));
        _client = Api.Instance.GetClient("test");
    }

    public Task DisposeAsync() => Api.Instance.ShutdownAsync();

    [Fact]
    public async Task NewCheckoutEnabledByDefault()
    {
        Assert.True(await _client.GetBooleanValueAsync("new-checkout-flow", false));
    }

    [Fact]
    public async Task PremiumUserGetsDarkTheme()
    {
        var ctx = EvaluationContext.Builder()
            .SetTargetingKey("u1")
            .Set("tier", "premium")
            .Build();
        Assert.Equal("dark", await _client.GetStringValueAsync("ui-theme", "light", ctx));
    }
}
{{< /code-block >}}

同じパターンが NUnit (`[SetUp]`/`[TearDown]`) および MSTest (`[TestInitialize]`/`[TestCleanup]`) に適用されます。ASP.NET Core のインテグレーションテストでは、アプリケーションの起動前に `WebApplicationFactory.ConfigureTestServices` 内で `InMemoryProvider` を登録してください。

テストを SDK の内部構造に結合させないようにするため、Moq などのライブラリで Datadog プロバイダーをモックするよりも `InMemoryProvider` に置き換えることを推奨します。

## トラブルシューティング {#troubleshooting}

### Agentless 設定が機能していません{#agentless-configuration-not-working}

- Tracer 3.54.0 以降が読み込まれ、OpenFeature プロバイダーが初期化されていることを確認してください。
- `DD_API_KEY`、`DD_SITE`、および `DD_ENV` をアプリケーションプロセスでチェックしてください。
- `DD_FEATURE_FLAGS_ENABLED` が `false` ではないことを確認してください。新規セットアップの場合は `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` を設定しないままにするか、明示的に `agentless` に設定してください。移行時には、レガシーな `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` 設定を削除してください。
- `ufc-server.ff-cdn.<DD_SITE>` へのアウトバウンド HTTPS を許可してください。
- `DD_TRACE_DEBUG=true` を有効にし、認証、タイムアウト、または不正な形式の設定エラーがないか Tracer ログを確認してください。

最初の有効な設定が行われる前は、評価は呼び出し元のデフォルト値を返します。初期化が成功した後は、一時的な配信失敗が発生しても、最後に有効だった設定が保持されます。

### Remote Configuration が機能していない {#remote-configuration-not-working}

Remote Configuration が機能していることを確認するために、以下を確認してください。
- Datadog Agent が [必要なバージョン](#prerequisites)
- Agent で Remote Configuration が有効になっている
- `DD_SERVICE` および `DD_ENV` 環境変数が設定されている
- SDK が Agent と通信できる

### 非同期評価エラー {#async-evaluation-errors}

.NET OpenFeature SDK は、すべてのフラグ評価に非同期メソッドを使用します。`await` を使用しているか、返された `Task` を適切に処理していることを確認してください。

{{< code-block lang="csharp" >}}
// Correct: Using await
var enabled = await client.GetBooleanValueAsync("flag-key", false, context);

// Incorrect: Not awaiting (will not work as expected)
var enabled = client.GetBooleanValueAsync("flag-key", false, context);
{{< /code-block >}}

[1]: https://openfeature.dev/
[2]: /ja/agent/remote_config/
[3]: https://www.nuget.org/packages/Datadog.Trace
[4]: https://www.nuget.org/packages/Datadog.FeatureFlags.OpenFeature
[5]: /ja/account_management/api-app-keys/#api-keys
[6]: /ja/feature_flags/guide/server_flag_evaluation_metrics/
[7]: /ja/feature_flags/concepts/flag_graphs/
[8]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/
[9]: /ja/feature_flags/concepts/configuration_sources/

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}