---
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: GitHub
  text: リアルユーザーモニタリング (RUM)
- link: https://www.datadoghq.com/blog/modern-frontend-monitoring/
  tag: GitHub
  text: シングルページアプリケーションの監視を開始
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: ガイド
  text: クロスプロダクト相関で容易にトラブルシューティング
- link: /tracing/
  tag: ドキュメント
  text: APM と分散型トレーシング
- link: /real_user_monitoring
  tag: ドキュメント
  text: RUM & セッションリプレイ
- link: https://www.datadoghq.com/blog/troubleshoot-with-session-replay-developer-tools/
  tag: GitHub
  text: セッションリプレイブラウザ開発ツールによるトラブルシューティング
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: ブログ
  text: Datadog RUM イベントと OTel インスツルメンテーションされたアプリケーションのトレースを相関させる
kind: documentation
title: RUM とトレースの接続
---

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_trace_tab.png" alt="RUM とトレース" style="width:100%;">}}

## 概要

APM と Real User Monitoring のインテグレーションにより、Web およびモバイルアプリケーションからのリクエストを対応するバックエンドトレースにリンクできます。この組み合わせにより、1 つのレンズを通してフロントエンドとバックエンドの完全なデータを確認できます。

RUM のフロントエンドデータに加えて、トレース ID 挿入のバックエンド、インフラストラクチャー、ログ情報を使用して、スタック内の問題を特定し、ユーザーに起こっていることを理解します。

## 使用方法

### 前提条件

-   RUM アプリケーションの対象となるサービスに [APM トレース][1]を設定していること。
-   サービスが HTTP サーバーを使用していること。
-   HTTP サーバーで、[分散型トレーシングをサポートするライブラリ](#supported-libraries)が使用されていること。
-   ご利用の SDK に応じて次の設定を行っていること。
    - **Browser SDK** の場合は、RUM エクスプローラーで XMLHttpRequest (XHR) または Fetch リソースを `allowedTracingUrls` に追加していること。
    - **Mobile SDK** の場合は、Native または XMLHttpRequest (XHR) を `firstPartyHosts` に追加していること。
-   `allowedTracingUrls` または `firstPartyHosts` へのリクエストに対応するトレースがあること。

### RUM の設定

{{< tabs >}}
{{% tab "ブラウザ RUM" %}}

1.  [RUM ブラウザモニタリング][1]を設定します。

2.  RUM SDK を初期化します。ブラウザアプリケーションによって呼び出される内部のファーストパーティオリジンのリストを使用して、`allowedTracingUrls` 初期化パラメーターを設定します。

    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        applicationId: '<DATADOG_APPLICATION_ID>',
        clientToken: '<DATADOG_CLIENT_TOKEN>',
        ...otherConfig,
        service: "my-web-application",
        allowedTracingUrls: ["https://api.example.com", /https:\/\/.*\.my-api-domain\.com/, (url) => url.startsWith("https://api.example.com")]
    })
    ```

    RUM をトレースに接続するには、`service` フィールドにブラウザアプリケーションを指定する必要があります。

    `allowedTracingUrls` は完全な URL (`<scheme>://<host>[:<port>]/<path>[?<query>][#<fragment>]`) に一致します。次のタイプを指定できます。
      - `string`: 指定した値で始まるすべての URL に一致します。したがって、`https://api.example.com` は `https://api.example.com/v1/resource` に一致します。
      - `RegExp`: 指定された正規表現と URL で検証を実行します。
      - `function`: URL をパラメーターとして評価を実行します。戻り値の `boolean` が `true` に設定されていた場合は、一致することを示します。

3.  _(オプション)_ `traceSampleRate` 初期化パラメーターを構成して、バックエンドトレースの定義されたパーセンテージを保持するように設定します。設定しない場合、ブラウザのリクエストから来るトレースの 100% が Datadog に送信されます。バックエンドトレースの 20% を保持する場合:

    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        ...otherConfig,
        traceSampleRate: 20
    })
    ```

**注**: `traceSampleRate` は RUM セッションのサンプリングには影響**しません**。バックエンドのトレースのみがサンプリングされます。

<div class="alert alert-info">ブラウザ SDK の初期化後に生成されたリクエストには、エンドツーエンドのトレーシングを利用できます。初めの HTML 文書のエンドツーエンドトレースおよび始めのブラウザリクエストはサポートされません。</div>

[1]: /ja/real_user_monitoring/browser/
{{% /tab %}}
{{% tab "Android RUM" %}}

1.  [RUM Android モニタリング][1]を設定します。

2.  Android アプリケーションによって呼び出される内部のファーストパーティオリジンのリストを使用して、`OkHttpClient` インターセプターを構成します。
    ```java
    val tracedHosts = listOf("example.com", "example.eu")

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor(tracedHosts))
        .addNetworkInterceptor(TracingInterceptor(tracedHosts))
        .eventListenerFactory(DatadogEventListener.Factory())
       .build()
    ```

    デフォルトでは、リストされたホストのすべてのサブドメインがトレースされます。たとえば、`example.com` を追加すると、`api.example.com` と `foo.example.com` のトレースも有効になります。

3.  _(オプション)_ `traceSamplingRate` パラメーターを構成して、バックエンドトレースの定義されたパーセンテージを保持するように設定します。設定しない場合、アプリケーションのリクエストから来るトレースの 20% が Datadog に送信されます。バックエンドトレースの 100% を保持する場合:

```java
    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(RumInterceptor(traceSamplingRate = 100f))
       .build()
  ```

**注**: `traceSamplingRate` は RUM セッションのサンプリングには影響**しません**。バックエンドのトレースのみがサンプリングされます。

[1]: /ja/real_user_monitoring/android/
{{% /tab %}}
{{% tab "iOS RUM" %}}

1.  [RUM iOS モニタリング][1]を設定します。

2.  iOS アプリケーションによって呼び出される内部のファーストパーティオリジンのリストを使用して、ビルダー関数 `trackURLSession(firstPartyHosts:)` を呼び出します。
    ```swift
    Datadog.initialize(
        appContext: .init(),
        configuration: Datadog.Configuration
            .builderUsing(
                rumApplicationID: "<rum_app_id>", 
                clientToken: "<client_token>", 
                environment: "<env_name>"
            )
            .trackURLSession(firstPartyHosts: ["example.com", "api.yourdomain.com"])
            .build()
    )
    ```

3. グローバル `Tracer` を初期化します。
    ```swift
    Global.sharedTracer = Tracer.initialize(
        configuration: Tracer.Configuration(...)
    )
    ```

4. [セットアップ][1]にあるように、URLSession を初期化します。
    ```swift
    let session =  URLSession(
        configuration: ...,
        delegate: DDURLSessionDelegate(),
        delegateQueue: ...
    )
    ```

   デフォルトでは、リストされたホストのすべてのサブドメインがトレースされます。たとえば、`example.com` を追加すると、`api.example.com` と `foo.example.com` のトレースも有効になります。

   `URLSession` に `URLRequest` を指定した場合、トレース ID 挿入が機能します。`URL` オブジェクトを使用した場合、分散型トレーシングは機能しません。

5. _(オプション)_ `tracingSamplingRate` 初期化パラメーターを設定して、バックエンドトレースの定義されたパーセンテージを保持するように設定します。設定しない場合、アプリケーションのリクエストから来るトレースの 20% が Datadog に送信されます。

     バックエンドトレースの 100% を保持する場合:
    ```swift
    Datadog.initialize(
        appContext: .init(),
        configuration: Datadog.Configuration
            .builderUsing(rumApplicationID: "<rum_app_id>", clientToken: "<client_token>", environment: "<env_name>")
            .set(tracingSamplingRate: 100)
            .build()
    )
    ```
**注**: `tracingSamplingRate` は RUM セッションのサンプリングには影響**しません**。バックエンドのトレースのみがサンプリングされます。

[1]: /ja/real_user_monitoring/ios/
{{% /tab %}}
{{% tab "React Native RUM" %}}

1.  [RUM React Native モニタリング][1]を設定します。

2.  `firstPartyHosts` の初期化パラメーターを設定して、React Native アプリケーションが呼び出す内部のファーストパーティオリジンのリストを定義します。
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.firstPartyHosts = ["example.com", "api.yourdomain.com"];
    ```

    デフォルトでは、リストされたホストのすべてのサブドメインがトレースされます。たとえば、`example.com` を追加すると、`api.example.com` と `foo.example.com` のトレースも有効になります。

3. _(オプション)_ `resourceTracingSamplingRate` 初期化パラメーターを設定して、バックエンドトレースの定義されたパーセンテージを保持するように設定します。設定しない場合、アプリケーションのリクエストから来るトレースの 20% が Datadog に送信されます。

     バックエンドトレースの 100% を保持する場合:
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.resourceTracingSamplingRate = 100;
    ```

   **注**: `resourceTracingSamplingRate` は RUM セッションのサンプリングには影響**しません**。バックエンドのトレースのみがサンプリングされます。

[1]: /ja/real_user_monitoring/reactnative/
{{% /tab %}}
{{% tab "Flutter RUM" %}}

1. [RUM Flutter モニタリング][1]を設定します。

2. [Automatic Resource Tracking][2] の説明に従って、Datadog Tracking HTTP Client パッケージを含め、HTTP 追跡を有効にします。これには、Flutter アプリケーションによって呼び出される内部、ファーストパーティーのオリジンのリストを追加するために、初期化に対する以下の変更が含まれます。
    ```dart
    final configuration = DdSdkConfiguration(
      // ...
      // added configuration
      firstPartyHosts: ['example.com', 'api.yourdomain.com'],
    )..enableHttpTracking()
    ```

[1]: /ja/real_user_monitoring/flutter/
[2]: /ja/real_user_monitoring/flutter/#automatic-resource-tracking

{{% /tab %}}
{{< /tabs >}}

## サポートされるライブラリ

以下の Datadog トレーシングライブラリがサポートされています。

| ライブラリ                             | 最小バージョン                                                                                                             |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| [Python][2]                  | [0.22.0][3]                |
| [Go][4]                  | [1.10.0][5]                |
| [Java][6]                  | [0.24.1][7]                |
| [Ruby][8]                  | [0.20.0][9]                |
| [JavaScript][10]                  | [0.10.0][11]                |
| [PHP][12]                  | [0.33.0][13]                |
| [.NET][14]                  | [1.18.2][15]                |


## OpenTelemetry のサポート

RUM は、OpenTelemetry ライブラリを使ってインスツルメントされたバックエンドとリソースを接続するため、複数のプロパゲータータイプをサポートしています。

{{< tabs >}} {{% tab "ブラウザ RUM" %}}
1. 上記に従い、RUM を APM に接続するためのセットアップを行います。

2. `allowedTracingUrls` を次のように変更します。
    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        ...otherConfig,
        allowedTracingUrls: [
          { match: "https://api.example.com", propagatorTypes: ["tracecontext"]}
        ]
    })
    ```
    `match` では、上記のようにシンプルな形式で使用した場合と同じパラメータータイプ (`string`、`RegExp`、`function`) を指定できます。

    `propagatorTypes` には、使用したいプロパゲーターに対応する文字列をリストで指定します。
      - `datadog`: Datadog のプロパゲーター (`x-datadog-*`)
      - `tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `b3`: [B3 シングルヘッダー](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `b3multi`: [B3 マルチヘッダー](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)
{{% /tab %}}

{{% tab "iOS RUM" %}}
1. 上記に従い、RUM を APM に接続するためのセットアップを行います。

2. 次のように、`trackURLSession(firstPartyHosts:)` の代わりに `trackURLSession(firstPartyHostsWithHeaderTypes:)` を使用します。
    ```swift
    Datadog.initialize(
        appContext: .init(),
        configuration: Datadog.Configuration
            .builderUsing(
                rumApplicationID: "<rum_app_id>", 
                clientToken: "<client_token>", 
                environment: "<env_name>"
            )
            .trackURLSession(
                firstPartyHostsWithHeaderTypes: [
                    "api.example.com": [.tracecontext]
                ]
            )
            .build()
        )
    ```
    `trackURLSession(firstPartyHostsWithHeaderTypes:)` には `Dictionary<String, Set<TracingHeaderType>>` をパラメーターとして指定します。キーはホスト、値はサポートされるサポートトレーシングヘッダータイプのリストになります。

    `TracingHeaderType` は列挙型で、次のトレーシングヘッダータイプを表します。
      - `.datadog`: Datadog のプロパゲーター (`x-datadog-*`)
      - `.tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `.b3`: [B3 シングルヘッダー](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `.b3multi`: [B3 マルチヘッダー](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)
{{% /tab %}}

{{% tab "Android RUM" %}}
1. 上記に従い、RUM を APM に接続するためのセットアップを行います。

2. 内部のファーストパーティオリジンのリストと、使用するトレーシングヘッダータイプを指定して、次のように `OkHttpClient` インターセプターを構成します。
    ```java
    val tracedHosts = mapOf("example.com" to setOf(TracingHeaderType.TRACECONTEXT), 
                          "example.eu" to setOf(TracingHeaderType.DATADOG))

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor(tracedHosts))
        .addNetworkInterceptor(TracingInterceptor(tracedHosts))
        .eventListenerFactory(DatadogEventListener.Factory())
       .build()
    ```

    `TracingHeaderType` は列挙型で、次のトレーシングヘッダータイプを表します。
      - `.DATADOG`: Datadog のプロパゲーター (`x-datadog-*`)
      - `.TRACECONTEXT`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `.B3`: [B3 シングルヘッダー](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `.B3MULTI`: [B3 マルチヘッダー](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{% tab "React Native RUM" %}}
1. RUM を [APM と接続](#setup-rum)するように設定します。

2. 内部のファーストパーティオリジンのリストと、使用するトレーシングヘッダータイプを指定して、次のように RUM SDK を構成します。
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.firstPartyHosts = [
        {match: "example.com", propagatorTypes: PropagatorType.TRACECONTEXT},
        {match: "example.com", propagatorTypes: PropagatorType.DATADOG}
    ];
    ```

   `PropagatorType` は列挙型で、次のトレーシングヘッダータイプを表します。
      - `PropagatorType.DATADOG`: Datadog のプロパゲーター (`x-datadog-*`)
      - `PropagatorType.TRACECONTEXT`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `PropagatorType.B3`: [B3 シングルヘッダー](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `PropagatorType.B3MULTI`: [B3 マルチヘッダー](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}} 

{{% tab "Flutter RUM" %}}
1. 上記に従い、RUM を APM に接続するためのセットアップを行います。

2. 以下のように、`firstPartyHosts` の代わりに `firstPartyHostsWithTracingHeaders` を使用します。
    ```dart
    final configuration = DdSdkConfiguration(
      // ...
      // added configuration
      firstPartyHostsWithTracingHeaders: {
        'example.com': { TracingHeaderType.tracecontext },
      },
    )..enableHttpTracking()
    ```

   `firstPartyHostsWithTracingHeaders` には `Map<String, Set<TracingHeaderType>>` をパラメーターとして指定します。キーはホスト、値はサポートされるサポートトレーシングヘッダータイプのリストになります。

    `TracingHeaderType` は列挙型で、次のトレーシングヘッダータイプを表します。
      - `TracingHeaderType.datadog`: Datadog のプロパゲーター (`x-datadog-*`)
      - `TracingHeaderType.tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `TracingHeaderType.b3`: [B3 シングルヘッダー](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `TracingHeaderType.b3multi`: [B3 マルチヘッダー](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{< /tabs >}}


## RUM リソースはどのようにトレースにリンクされていますか？

Datadog は分散型トレーシングプロトコルを使用し、次の HTTP ヘッダーをセットアップします。
{{< tabs >}} {{% tab "Datadog" %}}
`x-datadog-trace-id`
: リアルユーザーモニタリング SDK から生成されます。Datadog がトレースを RUM リソースにリンクできるようにします。

`x-datadog-parent-id`
Real User Monitoring SDK から生成されます。Datadog がトレースから最初のスパンを生成できるようにします。

`x-datadog-origin: rum`
リアルユーザーモニタリングから生成されたトレースが、APM インデックススパン数に影響を与えないようにします。

`x-datadog-sampling-priority: 1`
: Agent がトレースを保持できるようにします。
{{% /tab %}}
{{% tab "W3C Trace Context" %}}
`traceparent: [version]-[trace id]-[parent id]-[trace flags]`
: `version`: 現行の仕様では、バージョンは `00` に設定することを想定しています。
: `trace id`: 128 ビットのトレース ID (16 進数で 32 桁)。ソーストレース ID は APM との互換性を維持するため 64 ビットになっています。
: `parent id`: 64 ビットのスパン ID (16 進数で 16 桁)。
: `trace flags`: サンプリングあり (`01`)、またはサンプリングなし (`00`)

例:
: `traceparent: 00-00000000000000008448eb211c80319c-b7ad6b7169203331s-01`
{{% /tab %}}
{{% tab "b3 / b3 マルチヘッダー" %}}
`b3: [trace id]-[span id]-[sampled]`
: `trace id`: 64 ビットのトレース ID (16 進数で 16 桁)。
: `span id`: 64 ビットのスパン ID (16 進数で 16 桁)。
: `sampled`: True (`1`) または False (`0`)

b3 シングルヘッダーの例:
: `b3: 8448eb211c80319c-b7ad6b7169203331-1`

b3 マルチヘッダーの例:
: `X-B3-TraceId: 8448eb211c80319c`
: `X-B3-SpanId:  b7ad6b7169203331`
: `X-B3-Sampled: 1`
{{% /tab %}}
{{< /tabs >}}

上記 HTTP ヘッダーは CORS セーフリストに登録されていないため、SDK が監視するように設定されているリクエストを扱うサーバーで [Access-Control-Allow-Headers を構成][16]する必要があります。サーバーは、すべてのリクエストの前に SDK によって作られる[プレフライトリクエスト][17]も許可する必要があります (OPTIONS リクエスト)。

## APM クオータへの影響

RUM とトレースを接続すると、APM の取り込み量が大幅に増加する可能性があります。初期化パラメーター `traceSampleRate` を使用して、ブラウザとモバイルのリクエストから始まるバックエンドのトレースのシェアを維持します。

## トレースの保持期間

これらのトレースは、[Live Search][18] エクスプローラーで 15 分間利用可能です。より長い期間、トレースを保持するには、[保持フィルター][19]を作成します。重要なページとユーザーアクションのトレースを保持するために、任意のスパンタグにこれらの保持フィルターを適用します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing
[2]: /ja/tracing/trace_collection/dd_libraries/python/
[3]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.22.0
[4]: /ja/tracing/trace_collection/dd_libraries/go/
[5]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.10.0
[6]: /ja/tracing/trace_collection/dd_libraries/java/
[7]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.1
[8]: /ja/tracing/trace_collection/dd_libraries/ruby/
[9]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.20.0
[10]: /ja/tracing/trace_collection/dd_libraries/nodejs/
[11]: https://github.com/DataDog/dd-trace-js/releases/tag/v0.10.0
[12]: /ja/tracing/trace_collection/dd_libraries/php/
[13]: https://github.com/DataDog/dd-trace-php/releases/tag/0.33.0
[14]: /ja/tracing/trace_collection/dd_libraries/dotnet-core/
[15]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.18.2
[16]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
[17]: https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
[18]: /ja/tracing/trace_explorer/#live-search-for-15-minutes
[19]: /ja/tracing/trace_pipeline/trace_retention/#retention-filters