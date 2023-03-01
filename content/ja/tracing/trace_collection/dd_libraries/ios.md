---
aliases:
- /ja/tracing/setup_overview/setup/ios/
- /ja/tracing/setup/ios/
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-ios/blob/master/docs/trace_collection.md
description: iOS アプリケーションからトレースを収集する。
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: GitHub
  text: dd-sdk-ios ソースコード
- link: tracing/visualization/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
kind: documentation
title: iOSトレースの収集
---
[Datadog の `dd-sdk-ios` クライアント側トレーシングライブラリ][2]を使用すると、iOS アプリケーションから Datadog へ[トレース][1]を送信すると共に、次の機能を利用できます。

* アプリケーションでのさまざまな操作用にカスタム[スパン][3]を作成する。
* 各スパンのログを個別に送信する。
* デフォルトを使用し、各スパンにカスタム属性を追加する。
* 自動一括ポストによって最適化されたネットワークの利用を活用します。

## セットアップ

1. パッケージマネージャーに応じてライブラリを依存関係として宣言します。

{{< tabs >}}
{{% tab "CocoaPods" %}}

[CocoaPods][4] を使用して、`dd-sdk-ios` をインストールできます。
```
pod 'DatadogSDK'
```

[4]: https://cocoapods.org/

{{% /tab %}}
{{% tab "Swift Package Manager (SPM)" %}}

Apple の Swift Package Manager を使用して統合するには、`Package.swift` に以下を依存関係として追加します。
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "1.0.0"))
```

{{% /tab %}}
{{% tab "Carthage" %}}

[Carthage][5] を使用して、`dd-sdk-ios` をインストールできます。
```
github "DataDog/dd-sdk-ios"
```

[5]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

2. アプリケーションコンテキストと [Datadog クライアントトークン][6]でライブラリを初期化します。セキュリティ上の理由から、クライアントトークンを使用する必要があります。API キーがクライアント側の iOS アプリケーションの IPA バイトコードで公開されてしまうため、[Datadog API キー][7]を使用して `dd-sdk-ios` ライブラリを構成することはできません。クライアントトークンの設定に関する詳細は、[クライアントトークンに関するドキュメント][6]を参照してください。

{{< site-region region="us" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(clientToken: "<client_token>", environment: "<environment_name>")
        .set(serviceName: "app-name")
        .set(endpoint: .us1)
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<client_token>"
                                                              environment:@"<environment_name>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us1]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="eu" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(clientToken: "<client_token>", environment: "<environment_name>")
        .set(serviceName: "app-name")
        .set(endpoint: .eu1)
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<client_token>"
                                                              environment:@"<environment_name>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint eu1]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us3" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(clientToken: "<client_token>", environment: "<environment_name>")
        .set(serviceName: "app-name")
        .set(endpoint: .us3)
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<client_token>"
                                                              environment:@"<environment_name>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us3]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us5" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(clientToken: "<client_token>", environment: "<environment_name>")
        .set(serviceName: "app-name")
        .set(endpoint: .us5)
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<client_token>"
                                                              environment:@"<environment_name>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us5]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(clientToken: "<client_token>", environment: "<environment_name>")
        .set(serviceName: "app-name")
        .set(endpoint: .us1_fed)
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<client_token>"
                                                              environment:@"<environment_name>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us1_fed]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

GDPR 規制に対応するため、SDK は初期化時に `trackingConsent` の値を要求します。

`trackingConsent` には以下の値のいずれかを使用します。

- `.pending` - the SDK はデータの収集とバッチ処理を開始しますが、Datadog へは送信しません。SDK はバッチ処理が完了したデータをどうするかについての新たな同意値が得られるまで待機します。
- `.granted` - SDK はデータの収集を開始し、Datadog へ送信します。
- `.notGranted` - SDK はデータを収集しません。ログ、トレース、RUM イベントは Datadog に送信されません。 

SDK の初期化後に追跡同意値を変更するには、`Datadog.set(trackingConsent:)` API 呼び出しを使用します。

SDK は新しい値に応じて動作を変更します。

たとえば、現在の追跡同意が `.pending` の場合: 

- `.granted` に変更すると、SDK は現在および今後のすべてのデータを Datadog に送信します。
-  `.notGranted` に変更すると、SDK は現在のすべてのデータを消去し、今後のデータを収集しません。

データは Datadog にアップロードされる前に、[アプリケーションサンドボックス][11]のキャッシュディレクトリ (`Library/Caches`) に平文で保存され、デバイスにインストールされた他のアプリからは読み取ることができません。

アプリケーションを作成する際、開発ログを有効にし、提供されたレベルと同等以上の優先度を持つ SDK のすべての内部メッセージをコンソールにログ出力するようにしてください。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.verbosityLevel = .debug
```
{{% /tab %}}
{{% tab "Objective-C" %}}
DDDatadog.verbosityLevel = DDSDKVerbosityLevelDebug;
```
{{% /tab %}}
{{< /tabs >}}

3. Datadog トレーサーは [Open Tracing 規格][8]を実装しています。`Tracer` を Open Tracing の `Global.sharedTracer` としてグローバルに構成・登録します。この作業は一度だけで、通常は `AppDelegate` のコードで行います。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Global.sharedTracer = Tracer.initialize(
    configuration: Tracer.Configuration(
        sendNetworkInfo: true
    )
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDTracerConfiguration *configuration = [[DDTracerConfiguration alloc] init];
[configuration sendNetworkInfo:YES];
DDGlobal.sharedTracer = [[DDTracer alloc] initWithConfiguration:configuration];
```
{{% /tab %}}
{{< /tabs >}}

4. 次のメソッドを使用してコードをインスツルメントします。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let span = Global.sharedTracer.startSpan(operationName: "<span_name>")
// 測定したいことをします ...
// ... そして、操作が終了したら:
span.finish()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
id<OTSpan> span = [DDGlobal.sharedTracer startSpan:@"<span_name>"];
// 測定したいことをします ...
// ... そして、操作が終了したら:
[span finish];
```
{{% /tab %}}
{{< /tabs >}}

5. (任意) - スパン間に親子関係を設定します。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let responseDecodingSpan = Global.sharedTracer.startSpan(
    operationName: "response decoding",
    childOf: networkRequestSpan.context // make it a child of `networkRequestSpan`
)
// ... HTTP レスポンスデータのデコード ...
responseDecodingSpan.finish()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
id<OTSpan> responseDecodingSpan = [DDGlobal.sharedTracer startSpan:@"response decoding"
                                                            childOf:networkRequestSpan.context];
// ... HTTP レスポンスデータのデコード ...
[responseDecodingSpan finish];
```
{{% /tab %}}
{{< /tabs >}}

6. (任意) - スパンと一緒に追加のタグを指定します。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
span.setTag(key: "http.url", value: url)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[span setTag:@"http.url" value:url];
```
{{% /tab %}}
{{< /tabs >}}

7. (任意) スパンにエラーを添付します。これは、[標準 Open Tracing ログフィールド][9]を使用してエラー情報のログを取得することで実施できます。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
span.log(
    fields: [
        OTLogFields.event: "error",
        OTLogFields.errorKind: "I/O Exception",
        OTLogFields.message: "File not found",
        OTLogFields.stack: "FileReader.swift:42",
    ]
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[span log:@{
    @"event": @"error",
    @"error.kind": @"I/O Exception",
    @"message": @"File not found",
    @"stack": @"FileReader.swift:42",
}];
```
{{% /tab %}}
{{< /tabs >}}

8. (オプション) フロントエンドとバックエンドのように、環境間でトレースを分散させるには、手動で行うか、自動インスツルメンテーションを活用します。どちらの場合も、ネットワークトレースは、調整可能なサンプリングレートでサンプリングされます。デフォルトでは、20% のサンプリングが適用されます。

* トレースを手動で伝播するには、スパンコンテキストを `URLRequest` ヘッダーに挿入します。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
var request: URLRequest = ... // the request to your API

let span = Global.sharedTracer.startSpan(operationName: "network request")

let headersWriter = HTTPHeadersWriter(samplingRate: 20)
Global.sharedTracer.inject(spanContext: span.context, writer: headersWriter)

for (headerField, value) in headersWriter.tracePropagationHTTPHeaders {
    request.addValue(value, forHTTPHeaderField: headerField)
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
id<OTSpan> span = [DDGlobal.sharedTracer startSpan:@"network request"];
DDHTTPHeadersWriter *headersWriter = [[DDHTTPHeadersWriter alloc] initWithSamplingRate:20];

NSError *error = nil;
[DDGlobal.sharedTracer inject:span.context
                        format:OT.formatTextMap
                        carrier:headersWriter
                        error:&error];

for (NSString *key in headersWriter.tracePropagationHTTPHeaders) {
    NSString *value = headersWriter.tracePropagationHTTPHeaders[key];
    [request addValue:value forHTTPHeaderField:key];
}
```
{{% /tab %}}
{{< /tabs >}}

 これにより、リクエストにトレーシングヘッダーが追加されるため、バックエンドでリクエストを抽出して分散型トレーシングを続行できます。リクエストが完了したら、完了ハンドラー内で `span.finish()` をコールします。また、バックエンドが [Datadog APM と分散型トレーシング][10]でインスツルメントされている場合、Datadog ダッシュボードにフロントエンドからバックエンドのすべてのトレースが表示されます。

* 特定のホストに対して行われたすべてのネットワークリクエストを SDK に自動トレースさせるには、Datadog の初期化で `firstPartyHosts` 配列を指定し、監視する `URLSession` インスタンスの代表として `DDURLSessionDelegate` を使用します。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    appContext: .init(),
    configuration: Datadog.Configuration
        .builderUsing(clientToken: "<client_token>", environment: "<environment_name>")
        .trackURLSession(firstPartyHosts: ["example.com", "api.yourdomain.com"])
        .set(tracingSamplingRate: 20)
        .build()
)

let session = URLSession(
    configuration: .default,
    delegate: DDURLSessionDelegate(),
    delegateQueue: nil
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<client_token>"
                                                                environment:@"<environment_name>"];

[builder trackURLSessionWithFirstPartyHosts:[NSSet setWithArray:@[@"example.com", @"api.yourdomain.com"]]];
[builder setWithTracingSamplingRate:20];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                        configuration:[builder build]];

NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                        delegate:[[DDNSURLSessionDelegate alloc] init]
                                                    delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}

この操作により、`example.com` と `api.yourdomain.com`  ホスト (例: `https://api.yourdomain.com/v2/users` または `https://subdomain.example.com/image.png`) に対して、この `session` とともに行われたすべてのリクエストをトレースできます。

**注**: 自動インスツルメンテーションのトレーシングでは、`URLSession` スウィズリングを使用し、これはオプトインです。`firstPartyHosts` を指定していない場合、スウィズリングは適用されません。


## バッチコレクション

すべてのスパンは、最初にローカルデバイスにバッチで格納されます。各バッチはインテークの仕様に従います。ネットワークが利用可能で、Datadog SDK がエンドユーザーのエクスペリエンスに影響を与えないようにバッテリーの残量が十分にあれば、バッチは定期的に送信されます。アプリケーションがフォアグラウンドにあるときにネットワークが利用できない場合、またはデータのアップロードが失敗した場合、バッチは正常に送信されるまで保持されます。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。

ディスク上のデータは、古すぎる場合は SDK がディスク容量を使いすぎないようにするために自動的に破棄されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/tracing/visualization/#trace
[2]: https://github.com/DataDog/dd-sdk-ios
[3]: https://docs.datadoghq.com/ja/tracing/visualization/#spans
[6]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#client-tokens
[7]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[8]: https://opentracing.io
[9]: https://github.com/opentracing/specification/blob/master/semantic_conventions.md#log-fields-table
[10]: https://docs.datadoghq.com/ja/tracing/
[11]: https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web