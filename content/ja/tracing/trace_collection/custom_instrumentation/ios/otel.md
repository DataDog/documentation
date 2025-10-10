---
aliases:
- /ja/tracing/trace_collection/otel_instrumentation/ios/
- /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/ios
description: OpenTelemetry API で iOS / tvOS アプリをインスツルメントして、トレースを Datadog に送信します。
further_reading:
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: ドキュメント
  text: OpenTelemetry API と Datadog でインスツルメントされたトレースの相互運用性
title: OpenTelemetry API を使用した iOS と tvOS のカスタム インスツルメンテーション
---

{{% otel-custom-instrumentation-lang %}}

## 要件と制限

- iOS / tvOS 向け DatadogTrace バージョン 2.12.0 以上が必要です。


## OpenTelemetry による iOS アプリのトレーシング

1. ご利用のパッケージ マネージャーに応じてライブラリを依存関係として宣言してください。推奨は Swift Package Manager (SPM) です。

{{< tabs >}}
{{% tab "Swift Package Manager (SPM)" %}}

Apple の Swift Package Manager を使用して統合するには、`Package.swift` に以下を依存関係として追加します。
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

プロジェクトで、以下のライブラリをリンクします。
```
DatadogCore
DatadogTrace
```

{{% /tab %}}
{{% tab "CocoaPods" %}}

[CocoaPods][1] を使用して、`dd-sdk-ios` をインストールできます。

```
pod 'DatadogCore'
pod 'DatadogTrace'
```

[1]: https://cocoapods.org/

{{% /tab %}}
{{% tab "Carthage" %}}

[Carthage][1] を使用して、`dd-sdk-ios` をインストールできます。

```
github "DataDog/dd-sdk-ios"
```

Xcode で、以下のフレームワークをリンクします。
```
OpenTelemetryApi.xcframework
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogTrace.xcframework
```

[1]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

2. アプリケーション コンテキストと [Datadog クライアント トークン][9]を使用してライブラリを初期化します。セキュリティ上の理由から、必ずクライアント トークンを使用してください。`dd-sdk-ios` ライブラリを [Datadog API キー][10]で設定すると、iOS アプリ IPA のバイト コードにクライアント サイドで露出してしまいます。

クライアント トークンの設定方法については、[クライアント トークンのドキュメント][11]を参照してください。

{{< site-region region="us" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        service: "<service name>"
    ),
    trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="eu" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .eu1,
        service: "<service name>"
    ),
    trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us3" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .us3,
        service: "<service name>"
    ),
    trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us5" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .us5,
        service: "<service name>"
    ),
    trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .us1_fed,
        service: "<service name>"
    ),
    trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="ap1" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .ap1,
        service: "<service name>"
    ),
    trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

GDPR に準拠するため、SDK は初期化時に `trackingConsent` 値が必要です。
`trackingConsent` には、次のいずれかの値を設定できます:

- `.pending`: - SDK はデータの収集とバッチ処理を開始しますが、Datadog へは送信しません。SDK はバッチ処理が完了したデータをどうするかについての新たな同意値が得られるまで待機します。
- `.granted`: SDK はデータの収集を開始し、Datadog へ送信します。
- `.notGranted`: SDK はデータを収集しません。ログ、トレース、RUM イベントは Datadog に送信されません。 

SDK の初期化後に追跡同意値を変更するには、`Datadog.set(trackingConsent:)` API 呼び出しを使用します。

SDK は新しい値に応じて動作を変更します。例えば、現在の追跡に関する同意が `.pending` であった場合:

- 値を `.granted` に変更すると、SDK は現在および将来のデータをすべて Datadog に送信します。
- 値を `.notGranted` に変更すると、SDK は現在のデータをすべて消去し、今後のデータ収集を停止します。

Datadog にアップロードされる前に、データはクリア テキストのまま[アプリケーション サンドボックス][12]のキャッシュ ディレクトリ (`Library/Caches`) に保存されます。このキャッシュ ディレクトリは、デバイスにインストールされている他のアプリから読み取ることはできません。

アプリケーションを作成する際、開発ログを有効にし、提供されたレベルと同等以上の優先度を持つ SDK のすべての内部メッセージをコンソールにログ出力するようにしてください。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.verbosityLevel = .debug
```
{{% /tab %}}
{{< /tabs >}}

3. Datadog トレーサーは [Open Telemetry 標準][13]を実装しています。Datadog トレーサーを有効化し、トレーサー プロバイダを登録して、トレーサー インスタンスを取得します:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogTrace
import OpenTelemetryApi

Trace.enable(
    with: Trace.Configuration(
        networkInfoEnabled: true
    )
)

OpenTelemetry.registerTracerProvider(
    tracerProvider: OTelTracerProvider()
)

let tracer = OpenTelemetry
    .instance
    .tracerProvider
    .get(instrumentationName: "", instrumentationVersion: nil)
```
{{% /tab %}}
{{< /tabs >}}

4. OpenTelemetry API でコードをインスツルメントします:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let span = tracer.spanBuilder(spanName: "<span_name>").startSpan()
// 測定したいことをします ...
// ... そして、操作が終了したら:
span.end()
```
{{% /tab %}}
{{< /tabs >}}

5. (任意) スパン間の子親関係を設定します:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let responseDecodingSpan = tracer.spanBuilder(spanName: "response decoding")
    .setParent(networkRequestSpan) // `networkRequestSpan` の子にします
    .startSpan()

// ... HTTP レスポンスデータのデコード ...
responseDecodingSpan.end()
```
{{% /tab %}}
{{< /tabs >}}

6. (任意) スパンに追加属性を付与します:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
span.setAttribute(key: "http.url", value: url)
```
{{% /tab %}}
{{< /tabs >}}

7. (任意) スパンにエラーを添付します:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
span.status = .error(description: "Failed to decode response")
```
{{% /tab %}}
{{< /tabs >}}

8. (任意) スパンに Span リンクを追加します:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let linkedSpan = tracer.spanBuilder(spanName: "linked span").startSpan()
linkedSpan.end()

let spanWithLinks = tracer.spanBuilder(spanName: "span with links")
    .addLink(spanContext: linkedSpan.context)
    .startSpan()
spanWithLinks.end()
```
{{% /tab %}}
{{< /tabs >}}

[1]: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
[2]: https://opentelemetry.io/docs/concepts/signals/traces/#attributes
[3]: https://opentelemetry.io/docs/concepts/signals/traces/#span-events
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[5]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[6]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=browserrum#opentelemetry-support
[9]: /ja/account_management/api-app-keys/#client-tokens
[10]: /ja/account_management/api-app-keys/#api-keys
[11]: /ja/account_management/api-app-keys/#client-tokens
[12]: https://support.apple.com/en-gb/guide/security/sec15bfe098e/web
[13]: https://opentelemetry.io/docs/concepts/signals/traces/