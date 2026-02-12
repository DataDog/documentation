---
algolia:
  tags:
  - rum トレース
aliases:
- /ja/real_user_monitoring/connect_rum_and_traces
- /ja/real_user_monitoring/platform/connect_rum_and_traces/
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: ブログ
  text: リアルユーザーモニタリング
- link: https://www.datadoghq.com/blog/modern-frontend-monitoring/
  tag: ブログ
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
  tag: ブログ
  text: セッションリプレイブラウザ開発ツールによるトラブルシューティング
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: ブログ
  text: Datadog RUM イベントと OpenTelemetry インスツルメンテーションされたアプリケーションのトレースを相関させる
title: RUM とトレースを関連付け
---

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_trace_tab.png" alt="RUM とトレース" style="width:100%;">}}

## 概要

APM と Real User Monitoring のインテグレーションにより、Web およびモバイルアプリケーションからのリクエストを対応するバックエンドトレースにリンクできます。この組み合わせにより、1 つのレンズを通してフロントエンドとバックエンドの完全なデータを確認できます。

RUM のフロントエンドデータに加えて、トレース ID 挿入のバックエンド、インフラストラクチャー、ログ情報を使用して、スタック内の問題を特定し、ユーザーに起こっていることを理解します。

iOS アプリケーションのトレースだけを Datadog に送信し始めるには、[iOS トレース収集][1]をご覧ください。

## 使用状況

### 前提条件

-   RUM アプリケーションの対象となるサービスに [APM トレース][2]を設定していること。
-   サービスが HTTP サーバーを使用していること。
-   HTTP サーバーで、[分散型トレーシングをサポートするライブラリ](#supported-libraries)が使用されていること。
-   ご利用の SDK に応じて次の設定を行っていること。
    - **Browser SDK** の場合は、RUM エクスプローラーで XMLHttpRequest (XHR) または Fetch リソースを `allowedTracingUrls` に追加していること。
    - **Mobile SDK** の場合は、Native または XMLHttpRequest (XHR) を `firstPartyHosts` に追加していること。
-   `allowedTracingUrls` または `firstPartyHosts` へのリクエストに対応するトレースがあること。

### RUM の設定

**注:** RUM とトレースの構成では、RUM で APM の有料データを使用するため、APM の請求に影響を与える可能性があります。

{{< tabs >}}
{{% tab "ブラウザ RUM" %}}

1. [RUM ブラウザモニタリング][1]を設定します。

2. RUM SDK を初期化します。ブラウザアプリケーションによって呼び出される内部のファーストパーティオリジンのリストを使用して、`allowedTracingUrls` 初期化パラメーターを設定します。

   **npm インストール**の場合:
    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      allowedTracingUrls: ["https://api.example.com", /https:\/\/.*\.my-api-domain\.com/, (url) => url.startsWith("https://api.example.com")],
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not specified, defaults to 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    })
    ```

   **CDN インストール**の場合:

   ```javascript
   window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      allowedTracingUrls: ["https://api.example.com", /https:\/\/.*\.my-api-domain\.com/, (url) => url.startsWith("https://api.example.com")],
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
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

4. (オプション) `traceSampleRate` を設定している場合、バックエンドサービス側のサンプリング判定が適用されるように、初期化パラメーター `traceContextInjection` を `sampled` に設定してください (デフォルトは `all` です)。

    例えば、Browser SDK で `traceSampleRate` を 20% に設定した場合: 
    - `traceContextInjection` が `all` のとき、バックエンドトレースの **20%** が保持され、**80%** が破棄されます。

  {{< img src="real_user_monitoring/connect_rum_and_traces/traceContextInjection_all-2.png" alt="traceContextInjection を all に設定した状態" style="width:90%;">}}

  - `traceContextInjection` を `sampled` に設定したとき、バックエンドトレースの **20%** は保持されますが、残りの **80%** に対してブラウザ SDK はサンプリング判定を**注入しません**。サンプリングの決定はサーバー側で行われ、トレーシングライブラリのヘッドベースサンプリング[構成][2]に基づきます。以下の例では、バックエンド側のサンプルレートが 40% に設定されているため、残りのバックエンドトレースのうち 32% が保持されます。

    {{< img src="real_user_monitoring/connect_rum_and_traces/traceContextInjection_sampled-3.png" alt="traceContextInjection を sampled に設定した状態" style="width:90%;">}}

<div class="alert alert-info">ブラウザ SDK の初期化後に生成されたリクエストには、エンドツーエンドのトレーシングを利用できます。初めの HTML 文書のエンドツーエンドトレースおよび始めのブラウザリクエストはサポートされません。</div>

[1]: /ja/real_user_monitoring/browser/
[2]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
{{% /tab %}}
{{% tab "Android RUM" %}}

1. [RUM Android モニタリング][1]を設定します。
2. [Android トレース収集][2]を設定します。
3. モジュールレベルの `build.gradle` ファイルで、`dd-sdk-android-okhttp` ライブラリに Gradle 依存関係を追加します。

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

4. Android アプリケーションによって呼び出される内部のファーストパーティオリジンのリストを使用して、`OkHttpClient` インターセプターを構成します。
    ```kotlin
    val tracedHosts = listOf("example.com", "example.eu")

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor.Builder(tracedHosts).build())
        .addNetworkInterceptor(TracingInterceptor.Builder(tracedHosts).build())
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
    ```

   デフォルトでは、リストされたホストのすべてのサブドメインがトレースされます。たとえば、`example.com` を追加すると、`api.example.com` と `foo.example.com` のトレースも有効になります。

3.  _(オプション)_ `traceSampler` パラメーターを構成して、バックエンドトレースの定義されたパーセンテージを保持するように設定します。設定しない場合、アプリケーションのリクエストから来るトレースの 20% が Datadog に送信されます。バックエンドトレースの 100% を保持する場合:

    ```kotlin
        val tracedHosts = listOf("example.com")

        val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(
            DatadogInterceptor.Builder(tracedHosts)
                .setTraceSampler(RateBasedSampler(100f))
                .build()
        )
        .build()
    ```

**注**:
* `traceSampler` は RUM セッションのサンプリングには**影響しません**。サンプリング対象となるのはバックエンドトレースのみです。
* Datadog の設定でカスタムトレーシングヘッダータイプを定義していて、かつ `GlobalTracer` に登録したトレーサーを使用している場合は、実際に使用しているトレーサーにも同じヘッダータイプが設定されていることを確認してください。

[1]: /ja/real_user_monitoring/android/
[2]: /ja/tracing/trace_collection/dd_libraries/android/?tab=kotlin
{{% /tab %}}
{{% tab "iOS RUM" %}}

1. [RUM iOS モニタリング][1]を設定します。

2. `urlSessionTracking` オプションと `firstPartyHostsTracing` パラメーターを指定して `RUM` を有効化してください。
    ```swift
    RUM.enable(
        with: RUM.Configuration(
            applicationID: "<rum application id>",
            urlSessionTracking: .init(
                firstPartyHostsTracing: .trace(
                    hosts: [
                        "example.com",
                        "api.yourdomain.com"
                    ]
                )
            )
        )
    )
    ```

3. `URLSessionDataDelegate` プロトコルに準拠した `SessionDelegate` タイプ用に、URLSession のインスツルメンテーションを有効化してください。
    ```swift
    URLSessionInstrumentation.enable(
        with: .init(
            delegateClass: <YourSessionDelegate>.self
        )
    )
    ```

4. [セットアップ][1]にあるように、URLSession を初期化します。
    ```swift
    let session =  URLSession(
        configuration: ...,
        delegate: <YourSessionDelegate>(),
        delegateQueue: ...
    )
    ```

   デフォルトでは、リストされたホストのすべてのサブドメインがトレースされます。たとえば、`example.com` を追加すると、`api.example.com` と `foo.example.com` のトレースも有効になります。

   `URLSession` に `URLRequest` を指定した場合、トレース ID 挿入が機能します。`URL` オブジェクトを使用した場合、分散型トレーシングは機能しません。

5. (オプション) バックエンドトレースの特定の割合を保持するには、`sampleRate` パラメーターを設定します。設定しない場合、アプリケーションリクエストから送信されるトレースの 20% が Datadog に送られます。

     バックエンドトレースの 100% を保持する場合:
    ```swift
    RUM.enable(
        with: RUM.Configuration(
            applicationID: "<rum application id>",
            urlSessionTracking: .init(
                firstPartyHostsTracing: .trace(
                    hosts: [
                        "example.com",
                        "api.yourdomain.com"
                    ],
                    sampleRate: 100
                )
            )
        )
    )
    ```
**注**: `sampleRate` は RUM セッションのサンプリングには**影響しません**。サンプリング対象となるのはバックエンドトレースのみです。

[1]: /ja/real_user_monitoring/ios/
{{% /tab %}}
{{% tab "React Native RUM" %}}

1. [RUM React Native モニタリング][1]を設定します。

2. `firstPartyHosts` の初期化パラメーターを設定して、React Native アプリケーションが呼び出す内部のファーストパーティオリジンのリストを定義します。
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

1. [RUM Flutter Monitoring][1] をセットアップしてください。

2. [Automatic Resource Tracking][2] の説明に従って、Datadog Tracking HTTP Client パッケージを含め、HTTP 追跡を有効にします。これには、Flutter アプリケーションによって呼び出される内部、ファーストパーティーのオリジンのリストを追加するために、初期化に対する以下の変更が含まれます。
    ```dart
    final configuration = DatadogConfiguration(
      // ...
      // added configuration
      firstPartyHosts: ['example.com', 'api.yourdomain.com'],
    )..enableHttpTracking()
    ```

[1]: /ja/real_user_monitoring/mobile_and_tv_monitoring/flutter/setup/
[2]: /ja/real_user_monitoring/mobile_and_tv_monitoring/flutter/setup/#automatic-resource-tracking

{{% /tab %}}


{{% tab "Roku RUM" %}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">RUM for Roku は、US1-FED Datadog サイトではご利用いただけません。</div>
{{< /site-region >}}

1. [RUM Roku モニタリング][1]を設定します。

2. ネットワークリクエストを行うには、`datadogroku_DdUrlTransfer` コンポーネントを使用します。
    ```brightscript
        ddUrlTransfer = datadogroku_DdUrlTransfer(m.global.datadogRumAgent)
        ddUrlTransfer.SetUrl(url)
        ddUrlTransfer.EnablePeerVerification(false)
        ddUrlTransfer.EnableHostVerification(false)
        result = ddUrlTransfer.GetToString()
    ```

[1]: /ja/real_user_monitoring/mobile_and_tv_monitoring/roku/setup/


{{% /tab %}}
{{% tab "Kotlin Multiplatform RUM" %}}

1. [RUM Kotlin Multiplatform Monitoring][1] をセットアップしてください。
2. [Ktor インスツルメンテーション][2]をセットアップしてください。

3. Datadog Ktor Plugin の設定において、`tracedHosts` 初期化パラメーターを使用し、Kotlin Multiplatform アプリケーションが呼び出す内部 (ファーストパーティ) のドメインリストを定義してください。
    ```kotlin
    val ktorClient = HttpClient {
        install(
            datadogKtorPlugin(
                tracedHosts = mapOf(
                    "example.com" to setOf(TracingHeaderType.DATADOG),
                    "example.eu" to setOf(TracingHeaderType.DATADOG)
                ),
                traceSampleRate = 100f
            )
        )
    }
    ```

   デフォルトでは、リストされたホストのすべてのサブドメインがトレースされます。たとえば、`example.com` を追加すると、`api.example.com` と `foo.example.com` のトレースも有効になります。

4. (オプション) バックエンドトレースの特定の割合を保持するには、`traceSampleRate` 初期化パラメーターを設定します。設定しない場合、アプリケーションリクエストから送信されるトレースの 20% が Datadog に送られます。

     バックエンドトレースの 100% を保持する場合:
    ```kotlin
    val ktorClient = HttpClient {
        install(
            datadogKtorPlugin(
                tracedHosts = mapOf(
                    "example.com" to setOf(TracingHeaderType.DATADOG),
                    "example.eu" to setOf(TracingHeaderType.DATADOG)
                ),
                traceSampleRate = 100f
            )
        )
    }
    ```

    **注**: `traceSampleRate` は RUM セッションのサンプリングには**影響しません**。サンプリング対象となるのはバックエンドトレースのみです。

[1]: /ja/real_user_monitoring/mobile_and_tv_monitoring/kotlin_multiplatform/setup
[2]: /ja/real_user_monitoring/mobile_and_tv_monitoring/kotlin_multiplatform/setup?tab=rum#initialize-the-rum-ktor-plugin-to-track-network-events-made-with-ktor
{{% /tab %}}
{{< /tabs >}}

### セットアップの検証

RUM との APM インテグレーションが構成されていることを検証するには、RUM をインストールした SDK に基づいて以下の手順に従ってください。


{{< tabs >}}
{{% tab "ブラウザ" %}}

1. アプリケーションのページにアクセスします。
2. ブラウザの開発者ツールで、**Network** タブを開きます。
3. 相関が期待されるリソースリクエストのリクエストヘッダーに [Datadog からの相関ヘッダー][1]が含まれていることを確認します。

[1]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum#how-are-rum-resources-linked-to-traces

{{% /tab %}}
{{% tab "Android" %}}

1. Android Studio からアプリケーションを実行します。
2. アプリケーションの画面にアクセスします。
3. Android Studio の [Network Inspector][1] を開きます。
4. RUM リソースのリクエストヘッダーをチェックし、[必要なヘッダーが SDK によって設定されている][2]ことを検証します。

[1]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/correlate_with_other_telemetry/apm?tab=androidrum#how-are-rum-resources-linked-to-traces

{{% /tab %}}
{{% tab "iOS" %}}

1. Xcode からアプリケーションを実行します。
2. アプリケーションの画面にアクセスします。
3. Xcode の [Network Connections and HTTP Traffic instrument][1] を開きます。
4. RUM リソースのリクエストヘッダーをチェックし、[必要なヘッダーが SDK によって設定されている][2]ことを検証します。

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: https://docs.datadoghq.com/ja//real_user_monitoring/correlate_with_other_telemetry/apm/?tab=iosrum#how-are-rum-resources-linked-to-traces

{{% /tab %}}
{{% tab "React Native" %}}

1. Xcode (iOS) または Android Studio (Android) からアプリケーションを実行します。
2. アプリケーションの画面にアクセスします。
3. Xcode の [Network Connections and HTTP Traffic instrument][1] または Android Studio の [Network Inspector][2] を開きます。
4. RUM リソースのリクエストヘッダーをチェックし、[必要なヘッダーが SDK によって設定されている][3]ことを検証します。

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=reactnativerum#how-are-rum-resources-linked-to-traces

{{% /tab %}}
{{% tab "Flutter" %}}

1. 希望の IDE または `flutter run` を使ってアプリケーションを実行します。
2. アプリケーションの画面にアクセスします。
3. Flutter の [Dev Tools][1] を開き、[Network View][2] に移動します。
4. RUM リソースのリクエストヘッダーをチェックし、[必要なヘッダーが SDK によって設定されている][3]ことを検証します。

[1]: https://docs.flutter.dev/tools/devtools/overview
[2]: https://docs.flutter.dev/tools/devtools/network
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=reactnativerum#how-are-rum-resources-linked-to-traces

{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

1. Xcode (iOS) または Android Studio (Android) からアプリケーションを実行します。
2. アプリケーションの画面にアクセスします。
3. Xcode の [Network Connections and HTTP Traffic instrument][1] または Android Studio の [Network Inspector][2] を開きます。
4. RUM リソースのリクエストヘッダーをチェックし、[必要なヘッダーが SDK によって設定されている][3]ことを検証します。

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[3]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=kotlinmultiplatformrum#how-are-rum-resources-linked-to-traces

{{% /tab %}}
{{< /tabs >}}

## サポートされるライブラリ

サポートされているバックエンドライブラリは、ネットワークリクエストを受け取るサービス上に導入する必要があります。

| ライブラリ          | 最小バージョン |
| ---------------- | --------------- |
| [Python][3]      | [0.22.0][4]     |
| [Go][5]          | [1.10.0][6]     |
| [Java][7]        | [0.24.1][8]     |
| [Ruby][9]        | [0.20.0][10]     |
| [JavaScript][11] | [0.10.0][12]    |
| [PHP][13]        | [0.33.0][14]    |
| [.NET][15]       | [1.18.2][16]    |


## OpenTelemetry のサポート

RUM は、OpenTelemetry ライブラリを使ってインスツルメントされたバックエンドとリソースを接続するため、複数のプロパゲータータイプをサポートしています。

既定の注入形式は `tracecontext` と `Datadog` です。

{{< tabs >}}
{{% tab "ブラウザ RUM" %}}

**注**: Next.js/Vercel など、OpenTelemetry を使用するバックエンドフレームワークを使用している場合は、以下の手順に従ってください。

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
      - `tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`, `tracestate`)
      - `b3`: [B3 シングルヘッダー](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `b3multi`: [B3 マルチヘッダー](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}
{{% tab "iOS RUM" %}}

1. 上記に従い、RUM を APM に接続するためのセットアップを行います。

2. 以下のように、`.trace(hosts:sampleRate:)` の代わりに `.traceWithHeaders(hostsWithHeaders:sampleRate:)` を使用してください:
    ```swift
      RUM.enable(
          with: RUM.Configuration(
              applicationID: "<rum application id>",
              urlSessionTracking: .init(
                  firstPartyHostsTracing: .traceWithHeaders(
                      hostsWithHeaders: [
                          "api.example.com": [.tracecontext]
                      ],
                      sampleRate: 100
                  )
              )
          )
      )
    ```
    `.traceWithHeaders(hostsWithHeaders:sampleRate:)` は `Dictionary<String, Set<TracingHeaderType>>` をパラメーターとして取り、キーがホスト、値がサポートされるトレーシングヘッダータイプのリストとなります。

    `TracingHeaderType` は列挙型で、次のトレーシングヘッダータイプを表します。
      - `.datadog`: Datadog のプロパゲーター (`x-datadog-*`)
      - `.tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `.b3`: [B3 シングルヘッダー](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `.b3multi`: [B3 マルチヘッダー](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)
{{% /tab %}}

{{% tab "Android RUM" %}}
1. 上記に従い、RUM を APM に接続するためのセットアップを行います。

2. 内部のファーストパーティオリジンのリストと、使用するトレーシングヘッダータイプを指定して、次のように `OkHttpClient` インターセプターを構成します。
    ```kotlin
    val tracedHosts = mapOf("example.com" to setOf(TracingHeaderType.TRACECONTEXT),
                          "example.eu" to setOf(TracingHeaderType.DATADOG))

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor.Builder(tracedHosts).build())
        .addNetworkInterceptor(TracingInterceptor.Builder(tracedHosts).build())
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
    config.firstPartyHosts = [{
        match: "example.com",
        propagatorTypes: [
            PropagatorType.TRACECONTEXT,
            PropagatorType.DATADOG
        ]
    }];
    ```

   `PropagatorType` は列挙型で、次のトレーシングヘッダータイプを表します。
      - `PropagatorType.DATADOG`: Datadog のプロパゲーター (`x-datadog-*`)
      - `PropagatorType.TRACECONTEXT`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `PropagatorType.B3`: [B3 シングルヘッダー](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `PropagatorType.B3MULTI`: [B3 マルチヘッダー](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{% tab "Flutter RUM" %}}
1. 上記に従い、RUM を APM に接続するためのセットアップを行います。

2. 以下のように、`firstPartyHosts` の代わりに `firstPartyHostsWithTracingHeaders` を使用してください:
    ```dart
    final configuration = DatadogConfiguration(
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

{{% tab "Kotlin Multiplatform RUM" %}}
1. RUM を [APM と接続](#setup-rum)するように設定します。

2. 内部のファーストパーティオリジンのリストと、使用するトレーシングヘッダータイプを指定して、次のように RUM SDK を構成します。
    ```kotlin
    val ktorClient = HttpClient {
        install(
            datadogKtorPlugin(
                tracedHosts = mapOf(
                    "example.com" to setOf(TracingHeaderType.DATADOG),
                    "example.eu" to setOf(TracingHeaderType.DATADOG)
                ),
                traceSampleRate = 100f
            )
        )
    }
    ```

    `TracingHeaderType` は列挙型で、次のトレーシングヘッダータイプを表します。
      - `TracingHeaderType.DATADOG`: Datadog のプロパゲータ (`x-datadog-*`) 
      - `TracingHeaderType.TRACECONTEXT`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `TracingHeaderType.B3`: [B3 シングルヘッダー](https://github.com/openzipkin/b3-propagation#single-header) (`b3`) 
      - `TracingHeaderType.B3MULTI`: [B3 マルチヘッダー](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`) 

{{% /tab %}}

{{< /tabs >}}


## RUM リソースはどのようにトレースにリンクされていますか？

Datadog は分散トレーシングプロトコルを用いて、以下の HTTP ヘッダーを設定します。デフォルトでは、トレースコンテキストと Datadog 専用の両方のヘッダーが使用されます。
{{< tabs >}} {{% tab "Datadog" %}}
`x-datadog-trace-id`
: Real User Monitoring SDK によって生成されます。Datadog がトレースと RUM リソースを関連付けるために使用されます。

`x-datadog-parent-id`
Real User Monitoring SDK から生成されます。Datadog がトレースから最初のスパンを生成できるようにします。

`x-datadog-origin: rum`
リアルユーザーモニタリングから生成されたトレースが、APM インデックススパン数に影響を与えないようにします。

`x-datadog-sampling-priority`
: トレースがサンプリングされた場合は `1`、そうでない場合は `0` が Real User Monitoring SDK によって設定されます。
{{% /tab %}}
{{% tab "W3C Trace Context" %}}

`traceparent: [version]-[trace id]-[parent id]-[trace flags]`
: `version`: 現在の仕様では常に `00`。
: `trace id`: 128 ビットのトレース ID (16 進数で 32 桁)。APM との互換性のため、ソース側のトレース ID は 64 ビット。
: `parent id`: 64 ビットのスパン ID (16 進数で 16 桁)。
: `trace flags`: サンプリングあり (`01`)/なし (`00`)。

`tracestate: dd=s:[sampling priority];o:[origin]`
: `dd`: Datadog のベンダープレフィックス。
: `sampling priority`: サンプリングされた場合は `1`、そうでない場合は `0`。
: `origin`: 常に `rum` と設定し、Real User Monitoring によって生成されたトレースが APM のインデックススパン数に影響しないようにします。

例:
: `traceparent: 00-00000000000000008448eb211c80319c-b7ad6b7169203331s-01`
: `tracestate: dd=s:1;o:rum`

{{% /tab %}}
{{% tab "b3 / b3 Multiple Headers" %}}
`b3: [trace id]-[span id]-[sampled]`
: `trace id`: 64 ビットのトレース ID (16 進数で 16 桁)。
: `span id`: 64 ビットのスパン ID (16 進数で 16 桁)。
: `sampled`: True (`1`) または False (`0`)。

b3 シングルヘッダーの例:
: `b3: 8448eb211c80319c-b7ad6b7169203331-1`

b3 マルチヘッダーの例:
: `X-B3-TraceId: 8448eb211c80319c`
: `X-B3-SpanId:  b7ad6b7169203331`
: `X-B3-Sampled: 1`
{{% /tab %}}
{{< /tabs >}}

これらの HTTP ヘッダーは CORS の safelist に含まれていないため、SDK でモニタリング対象に設定したリクエストを受け取るサーバー側で [Access-Control-Allow-Headers][17] を構成する必要があります。また、クロスサイトの URL でトレースが有効になっている場合、ブラウザが各リクエスト前に送信するプリフライトリクエスト (OPTIONS リクエスト) をサーバー側が受け付ける必要があります ([プレフライトリクエスト][18])。

## APM クオータへの影響

RUM とトレースを接続すると、APM の取り込み量が大幅に増加する可能性があります。初期化パラメーター `traceSampleRate` を使用して、ブラウザとモバイルのリクエストから始まるバックエンドのトレースのシェアを維持します。

## トレースの保持期間

これらのトレースは、[Live Search][19] エクスプローラーで 15 分間利用可能です。より長い期間、トレースを保持するには、[保持フィルター][20]を作成します。重要なページとユーザーアクションのトレースを保持するために、任意のスパンタグにこれらの保持フィルターを適用します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/dd_libraries/ios/?tab=swiftpackagemanagerspm
[2]: /ja/tracing
[3]: /ja/tracing/trace_collection/dd_libraries/python/
[4]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.22.0
[5]: /ja/tracing/trace_collection/dd_libraries/go/
[6]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.10.0
[7]: /ja/tracing/trace_collection/dd_libraries/java/
[8]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.1
[9]: /ja/tracing/trace_collection/dd_libraries/ruby/
[10]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.20.0
[11]: /ja/tracing/trace_collection/dd_libraries/nodejs/
[12]: https://github.com/DataDog/dd-trace-js/releases/tag/v0.10.0
[13]: /ja/tracing/trace_collection/dd_libraries/php/
[14]: https://github.com/DataDog/dd-trace-php/releases/tag/0.33.0
[15]: /ja/tracing/trace_collection/dd_libraries/dotnet-core/
[16]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.18.2
[17]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
[18]: https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
[19]: /ja/tracing/trace_explorer/#live-search-for-15-minutes
[20]: /ja/tracing/trace_pipeline/trace_retention/#retention-filters