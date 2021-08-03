---
beta: true
dependencies:
  - 'https://github.com/DataDog/dd-sdk-ios/blob/master/docs/trace_collection.md'
description: iOS アプリケーションからトレースを収集する。
further_reading:
  - link: 'https://github.com/DataDog/dd-sdk-ios'
    tag: Github
    text: dd-sdk-ios ソースコード
  - link: tracing/visualization/
    tag: Documentation
    text: サービス、リソース、トレースを調査する
kind: ドキュメント
title: iOSトレースの収集
---
<div class="alert alert-info">iOS トレースの収集は公開ベータ版です。ご質問がございましたら、<a href="https://docs.datadoghq.com/help/" target="_blank">サポートチーム</a>までお問い合わせください。</div>

[Datadog の `dd-sdk-ios` クライアント側トレーシングライブラリ][2]を使用すると、iOS アプリケーションから Datadog へ[トレース][1]を送信すると共に、次の機能を利用できます。

* アプリケーションでのさまざまな操作用にカスタム[スパン][3]を作成する。
* 各スパンのログを個別に送信する。
* デフォルトを使用し、各スパンにカスタム属性を追加する。
* 自動一括ポストによって最適化されたネットワークの利用を活用します。

## セットアップ

1. パッケージマネージャーに応じてライブラリを依存関係として宣言します。

    {{< tabs >}}
    {{% tab "CocoaPods" %}}

[CocoaPods][1] を使用して、`dd-sdk-ios` をインストールできます。
```
pod 'DatadogSDK'
```


[1]: https://cocoapods.org/
    {{% /tab %}}
    {{% tab "Swift Package Manager (SPM)" %}}

Apple の Swift Package Manager を使用して統合するには、`Package.swift` に以下を依存関係として追加します。
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "1.0.0"))
```

    {{% /tab %}}
    {{% tab "Carthage" %}}

[Carthage][1] を使用して、`dd-sdk-ios` をインストールできます。
```
github "DataDog/dd-sdk-ios"
```


[1]: https://github.com/Carthage/Carthage
    {{% /tab %}}
    {{< /tabs >}}

2. アプリケーションコンテキストと [Datadog クライアントトークン][4]でライブラリを初期化します。セキュリティ上の理由から、クライアントトークンを使用する必要があります。API キーがクライアント側の iOS アプリケーションの IPA バイトコードで公開されてしまうため、[Datadog API キー][5]を使用して `dd-sdk-ios` ライブラリを構成することはできません。クライアントトークンの設定に関する詳細は、[クライアントトークンに関するドキュメント][4]を参照してください。

    {{< tabs >}}
    {{% tab "US" %}}

```swift
Datadog.initialize(
    appContext: .init(),
    configuration: Datadog.Configuration
        .builderUsing(clientToken: "<client_token>", environment: "<environment_name>")
        .set(serviceName: "app-name")
        .build()
)
```

    {{% /tab %}}
    {{% tab "EU" %}}

```swift
Datadog.initialize(
    appContext: .init(),
    configuration: Datadog.Configuration
        .builderUsing(clientToken: "<client_token>", environment: "<environment_name>")
        .set(serviceName: "app-name")
        .set(tracesEndpoint: .eu)
        .build()
)
```

    {{% /tab %}}
    {{< /tabs >}}

     アプリケーションを書く際、開発ログを有効にできます。指定したレベル以上の優先度を持つ SDK 内のすべての内部メッセージがコンソールログに記録されます。

    ```swift
    Datadog.verbosityLevel = .debug
    ```

3. Datadog トレーサーは [Open Tracing 標準][6]を実装します。`Tracer` を Open Tracing `Global.sharedTracer` としてグローバルに構成して登録します。通常、`AppDelegate` コードで 1 回実施するだけです。

    ```swift
    import Datadog

    Global.sharedTracer = Tracer.initialize(
        configuration: Tracer.Configuration(
            sendNetworkInfo: true
        )
    )
    ```

4. 次のメソッドを使用してコードをインスツルメントします。

    ```swift
    let span = Global.sharedTracer.startSpan(operationName: "<span_name>")
    // do something you want to measure ...
    // ... then, when the operation is finished:
    span.finish()
    ```

5. (任意) - スパン間に親子関係を設定します。

    ```swift
    let responseDecodingSpan = Global.sharedTracer.startSpan(
        operationName: "response decoding",
        childOf: networkRequestSpan.context // make it a child of `networkRequestSpan`
    )
    // ... decode HTTP response data ...
    responseDecodingSpan.finish()
    ```

6. (任意) - スパンと一緒に追加のタグを指定します。

    ```swift
    span.setTag(key: "http.url", value: url)
    ```

7. (任意) スパンにエラーを添付します。これは、[標準 Open Tracing ログフィールド][7]を使用してエラー情報のログを取得することで実施できます。

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

8. (オプション) フロントエンド - バックエンドなど、環境間でトレースを手動で分散するには、手動で行うか、自動インスツルメンテーションを利用できます。

    * トレースを手動で伝播するには、スパンコンテキストを `URLRequest` ヘッダーに挿入します。

    ```swift
    import Datadog

    var request: URLRequest = ... // the request to your API

    let span = Global.sharedTracer.startSpan(operationName: "network request")

    let headersWritter = HTTPHeadersWriter()
    Global.sharedTracer.inject(spanContext: span.context, writer: headersWritter)

    for (headerField, value) in headersWritter.tracePropagationHTTPHeaders {
        request.addValue(value, forHTTPHeaderField: headerField)
    }
    ```
     これにより、リクエストにトレーシングヘッダーが追加されるため、バックエンドで抽出して分散型トレーシングを続行できます。リクエストが完了したら、完了ハンドラー内で `span.finish()` をコールします。また、バックエンドが [Datadog APM と Continuous Profiler][8] でインスツルメントされている場合、Datadog ダッシュボードにフロントエンドからバックエンドのすべてのトレースが表示されます。

    * SDK が特定のホストに対して行われたすべてのネットワークリクエストを自動的にトレースするようにするには、Datadog の初期化中に `tracedHosts` 配列を指定します。

    ```swift
    Datadog.initialize(
        appContext: .init(),
        configuration: Datadog.Configuration
            .builderUsing(clientToken: "<client_token>", environment: "<environment_name>")
            .set(tracedHosts: ["example.com", "api.yourdomain.com"])
            .build()
    )
    ```
    これは、 `example.com` と `api.yourdomain.com` (たとえば、`https://api.yourdomain.com/v2/users` または `https://subdomain.example.com/image.png`) に対して行われたすべてのリクエストをトレースします。

    **注**: 自動インスツルメンテーションは、`URLSession.dataTask(request:completionHandler:)` および `URLSession.dataTask(url:completionHandler:)` で作成されたリクエストのみをサポートします。`URLSession` スウィズリングを使用します。このスウィズリングは完全にオプトインです。`tracedHosts` を指定しない場合、スウィズリングは適用されません。


## バッチコレクション

すべてのスパンは、最初にローカルデバイスにバッチで格納されます。各バッチはインテークの仕様に従います。ネットワークが利用可能で、Datadog SDK がエンドユーザーのエクスペリエンスに影響を与えないようにバッテリーの残量が十分にあれば、バッチは定期的に送信されます。アプリケーションがフォアグラウンドにあるときにネットワークが利用できない場合、またはデータのアップロードが失敗した場合、バッチは正常に送信されるまで保持されます。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。

ディスク上のデータは、古すぎる場合は SDK がディスク容量を使いすぎないようにするために自動的に破棄されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/tracing/visualization/#trace
[2]: https://github.com/DataDog/dd-sdk-ios
[3]: https://docs.datadoghq.com/ja/tracing/visualization/#spans
[4]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#client-tokens
[5]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[6]: https://opentracing.io
[7]: https://github.com/opentracing/specification/blob/master/semantic_conventions.md#log-fields-table
[8]: https://docs.datadoghq.com/ja/tracing/