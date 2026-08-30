---
description: Go アプリケーション用に Datadog Feature Flags をセットアップします。
further_reading:
- link: /feature_flags/server/
  tag: ドキュメント
  text: サーバーサイド Feature Flags
- link: /tracing/trace_collection/dd_libraries/go/
  tag: ドキュメント
  text: Go トレーシング
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: ガイド
  text: サーバーサイドのフラグ評価メトリクスを設定する
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: ガイド
  text: Feature Flags の APM トレースエンリッチメントを設定する
- link: /feature_flags/concepts/flag_graphs/
  tag: 概念
  text: Feature Flag グラフ
title: Go Feature Flags
---
## 概要{#overview}

このページでは、Datadog Feature Flags SDK を使用して Go アプリケーションをインスツルメントする方法を説明します。Go SDK は、Feature Flags 管理のオープン標準である [OpenFeature][1] と統合されており、Datadog Go tracer (`dd-trace-go`) の Remote Configuration を通じてフラグの更新を受信します。

このガイドでは、SDK のインストールと有効化、OpenFeature クライアントの作成、およびアプリケーションでの Feature Flags の評価方法について説明します。

## 前提条件{#prerequisites}

Go Feature Flags SDK をセットアップする前に、以下が準備されていることを確認してください。

- **Datadog Agent** バージョン 7.55 以降 ([Remote Configuration][2] が有効であること)
- **Datadog [API キー][3]** (Agent で構成済みであること)
- **Datadog Go SDK** `dd-trace-go` バージョン 2.4.0 以降

以下の環境変数を設定します。

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Optional: Enable flag evaluation metrics
DD_METRICS_OTEL_ENABLED=true

# Required: Service identification
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

<div class="alert alert-info"> <code>EXPERIMENTAL_</code> プレフィックスは後方互換性のために維持されています。プロバイダー自体は安定しています。</div>

必要なトレーサーバージョンや Agent の OTLP のセットアップを含む `feature_flag.evaluations` の設定については、「[サーバーサイドのフラグ評価メトリクスを設定する][4]」を参照してください。利用可能なグラフ機能の詳細については、「[Feature Flag グラフ][5]」を参照してください。

## インストール {#installation}

Datadog OpenFeature プロバイダーパッケージをインストールします。

{{< code-block lang="bash" >}}
go get github.com/DataDog/dd-trace-go/v2/openfeature
{{< /code-block >}}

OpenFeature Go SDK も必要です。

{{< code-block lang="bash" >}}
go get github.com/open-feature/go-sdk/openfeature
{{< /code-block >}}

## SDK の初期化{#initialize-the-sdk}

Datadog Go tracer を開始し、Datadog OpenFeature プロバイダーを登録します。トレーサーは、フラグ設定をアプリケーションに配信する Remote Configuration を有効にするため、最初に開始する必要があります。

### ブロッキング初期化 {#blocking-initialization}

初期フラグ設定を受信するまで評価をブロックするには、`SetProviderAndWait` を使用します。これにより、アプリケーションがリクエストの処理を開始する前に、フラグの準備が整います。

{{< code-block lang="go" >}}
package main

import (
    "log"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
    ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"
    "github.com/open-feature/go-sdk/openfeature"
)

func main() {
    // Start the Datadog tracer (enables Remote Config)
    tracer.Start()
    defer tracer.Stop()

    // Create the Datadog OpenFeature provider
    provider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        log.Fatalf("Failed to create provider: %v", err)
    }
    if ddProvider, ok := provider.(*ddopenfeature.DatadogProvider); ok {
        defer ddProvider.Shutdown()
    }

    // Register the provider and wait for initialization (default 30s timeout)
    if err := openfeature.SetProviderAndWait(provider); err != nil {
        log.Fatalf("Failed to set provider: %v", err)
    }

    // Create the OpenFeature client
    client := openfeature.NewClient("my-service")

    // Your application code here
}
{{< /code-block >}}

カスタムタイムアウトを指定するには、`SetProviderAndWaitWithContext` を使用します。

{{< code-block lang="go" >}}
ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()

if err := openfeature.SetProviderAndWaitWithContext(ctx, provider); err != nil {
    log.Fatalf("Failed to set provider: %v", err)
}
{{< /code-block >}}

### ノンブロッキング初期化 {#non-blocking-initialization}

待機せずにプロバイダーを登録するには、`SetProvider` を使用します。設定を受信するまで、フラグ評価はデフォルト値を返します。

{{< code-block lang="go" >}}
package main

import (
    "log"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
    ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"
    "github.com/open-feature/go-sdk/openfeature"
)

func main() {
    // Start the Datadog tracer (enables Remote Config)
    tracer.Start()
    defer tracer.Stop()

    // Create the Datadog OpenFeature provider
    provider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        log.Fatalf("Failed to create provider: %v", err)
    }
    if ddProvider, ok := provider.(*ddopenfeature.DatadogProvider); ok {
        defer ddProvider.Shutdown()
    }

    // Register the provider without waiting
    openfeature.SetProvider(provider)

    // Create the OpenFeature client
    client := openfeature.NewClient("my-service")

    // Your application code here
    // Flag evaluations return defaults until configuration is received
}
{{< /code-block >}}

## クライアントの作成 {#create-a-client}

フラグを評価するための OpenFeature クライアントを作成します。アプリケーションの異なる部分に対して、異なる名前の複数のクライアントを作成できます。

{{< code-block lang="go" >}}
// Create a client for your application
client := openfeature.NewClient("my-service")
{{< /code-block >}}

## 評価コンテキストの設定{#set-the-evaluation-context}

フラグのターゲットとなるユーザーまたはエンティティを識別する評価コンテキストを定義します。評価コンテキストには、どのフラグバリエーションを返すかを決定するために使用される属性が含まれます。

<div class="alert alert-warning">Datadog Feature Flags では、評価コンテキスト属性として、文字列、数値、ブール値といったフラットなプリミティブ値を使用する必要があります。ネストされたオブジェクトや配列は渡さないでください。これらはサポートされておらず、エクスポージャーデータが破棄される原因となる可能性があります。</div>

{{< code-block lang="go" >}}
evalCtx := openfeature.NewEvaluationContext(
    "user-123", // Targeting key (typically user ID)
    map[string]interface{}{
        "email":   "user@example.com",
        "country": "US",
        "tier":    "premium",
        "age":     25,
    },
)
{{< /code-block >}}

ターゲティングキーは、一貫したトラフィックの振り分け (パーセンテージロールアウト) に使用されます。追加の属性を使用することで、「米国のユーザーに対して有効にする」や「プレミアムティアのユーザーに対して有効にする」といったターゲティングルールを設定できます。

## フラグの評価{#evaluate-flags}

プロバイダーの設定とクライアントの作成が完了したら、アプリケーション全体でフラグを評価できます。フラグの評価はローカルで高速に行われます。SDK はローカルにキャッシュされた設定データを使用するため、評価中にネットワークリクエストが発生することはありません。

各フラグはキー (一意の文字列) で識別され、期待される型の値を返す型指定されたメソッドを使用して評価できます。フラグが存在しない場合や評価できない場合、SDK は指定されたデフォルト値を返します。

### ブール型フラグ {#boolean-flags}

オン/オフや true/false の状態を表すフラグには、`BooleanValue` を使用します。

{{< code-block lang="go" >}}
ctx := context.Background()

enabled, err := client.BooleanValue(ctx, "new-checkout-flow", false, evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}

if enabled {
    showNewCheckout()
} else {
    showLegacyCheckout()
}
{{< /code-block >}}

### 文字列フラグ {#string-flags}

複数のバリエーションや設定用文字列のいずれかを選択するフラグには、`StringValue` を使用します。

{{< code-block lang="go" >}}
theme, err := client.StringValue(ctx, "ui-theme", "light", evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}

switch theme {
case "dark":
    setDarkTheme()
case "light":
    setLightTheme()
default:
    setLightTheme()
}
{{< /code-block >}}

### 数値フラグ {#numeric-flags}

数値フラグには、`IntValue` または `FloatValue` を使用します。これらは、制限値、パーセンテージ、倍率などの数値パラメーターに機能が依存する場合に適しています。

{{< code-block lang="go" >}}
maxItems, err := client.IntValue(ctx, "cart-max-items", 20, evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}

discountRate, err := client.FloatValue(ctx, "discount-rate", 0.0, evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}
{{< /code-block >}}

### オブジェクトフラグ {#object-flags}

構造化データには、`ObjectValue` を使用します。これは、マップやその他の複雑な型に型アサーションできる値を返します。

{{< code-block lang="go" >}}
config, err := client.ObjectValue(ctx, "feature-config", map[string]interface{}{
    "maxRetries": 3,
    "timeout":    30,
}, evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}

// Type assert to access the configuration
if configMap, ok := config.(map[string]interface{}); ok {
    maxRetries := configMap["maxRetries"]
    timeout := configMap["timeout"]
    // Use configuration values
}
{{< /code-block >}}

### フラグ評価の詳細 {#flag-evaluation-details}

フラグの値だけでなく詳細情報が必要な場合は、`*ValueDetails` メソッドを使用してください。これらは、評価された値と評価内容を説明するメタデータの両方を返します。

{{< code-block lang="go" >}}
details, err := client.BooleanValueDetails(ctx, "new-feature", false, evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}

fmt.Printf("Value: %v\n", details.Value)
fmt.Printf("Variant: %s\n", details.Variant)
fmt.Printf("Reason: %s\n", details.Reason)
fmt.Printf("Error: %v\n", details.Error())
{{< /code-block >}}

フラグの詳細情報は、評価の動作をデバッグしたり、なぜユーザーが特定の値を受け取ったのかを理解したりするのに役立ちます。

## テスト {#testing}

専用の Datadog テスト環境で実際の `DatadogProvider` に対してテストすることも、OpenFeature のインメモリプロバイダーに置き換えて、テストコード内でフラグの値を直接制御することもできます。このセクションでは、テストを独立した状態でオフラインに保つインメモリ方式について説明します。インメモリプロバイダーは、アップストリームの `go-sdk` モジュール内の `github.com/open-feature/go-sdk/openfeature/memprovider` で提供されるため、追加の依存関係は不要です。

デフォルトのグローバルプロバイダーではなく、**名前付きクライアント**にインメモリプロバイダーを登録します。デフォルトのプロバイダーはプロセス全体で共有されるため、`t.Parallel()` が壊れ、テスト間でフラグの状態が漏洩してしまいます。名前付きクライアントを使用すると、プロバイダーのスコープを各テストに限定できます。

{{< code-block lang="go" >}}
package checkout

import (
    "context"
    "testing"

    "github.com/open-feature/go-sdk/openfeature"
    "github.com/open-feature/go-sdk/openfeature/memprovider"
)

func TestNewCheckoutFlow(t *testing.T) {
    cases := []struct {
        name string
        tier string
        want bool
    }{
        {"premium user sees new flow", "premium", true},
        {"free user sees legacy", "free", false},
    }

    for _, tc := range cases {
        t.Run(tc.name, func(t *testing.T) {
            evalByTier := func(flag memprovider.InMemoryFlag, flatCtx openfeature.FlattenedContext) (any, openfeature.ProviderResolutionDetail) {
                if flatCtx["tier"] == "premium" {
                    return flag.Variants["on"], openfeature.ProviderResolutionDetail{Reason: openfeature.TargetingMatchReason, Variant: "on"}
                }
                return flag.Variants[flag.DefaultVariant], openfeature.ProviderResolutionDetail{Reason: openfeature.DefaultReason, Variant: flag.DefaultVariant}
            }

            provider := memprovider.NewInMemoryProvider(map[string]memprovider.InMemoryFlag{
                "new-checkout-flow": {
                    State:            memprovider.Enabled,
                    DefaultVariant:   "off",
                    Variants:         map[string]any{"on": true, "off": false},
                    ContextEvaluator: &evalByTier,
                },
            })

            name := "test-" + t.Name()
            if err := openfeature.SetNamedProviderAndWait(name, provider); err != nil {
                t.Fatal(err)
            }
            t.Cleanup(func() {
                _ = openfeature.SetNamedProviderAndWait(name, openfeature.NoopProvider{})
            })

            client := openfeature.NewClient(name)
            got, err := client.BooleanValue(context.Background(), "new-checkout-flow", false, openfeature.NewEvaluationContext("user-1", map[string]any{"tier": tc.tier}))
            if err != nil {
                t.Fatal(err)
            }
            if got != tc.want {
                t.Errorf("got %v, want %v", got, tc.want)
            }
        })
    }
}
{{< /code-block >}}

`ContextEvaluator` は `*func(...)`、つまり関数へのポインターとして定義されています。上記のように、評価関数をローカル変数で定義し、`&` を使用してそのアドレスを渡します。常に `DefaultVariant` を返す場合は、`ContextEvaluator` を完全に省略します。

[1]: https://openfeature.dev/
[2]: /ja/agent/remote_config/
[3]: /ja/account_management/api-app-keys/#api-keys
[4]: /ja/feature_flags/guide/server_flag_evaluation_metrics/
[5]: /ja/feature_flags/concepts/flag_graphs/

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}