---
algolia:
  tags:
  - rum traces
aliases:
- /ja/real_user_monitoring/connect_rum_and_traces
- /ja/real_user_monitoring/platform/connect_rum_and_traces/
description: フロントエンドの RUM データをバックエンドの APM トレースと接続し、アプリケーションスタック全体およびユーザージャーニーにわたるエンドツーエンドの可視性を確保します。
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: ブログ
  text: Real User Monitoring
- link: https://www.datadoghq.com/blog/modern-frontend-monitoring/
  tag: ブログ
  text: シングルページアプリケーションの監視を開始する
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: ガイド
  text: クロスプロダクト相関で容易にトラブルシューティング
- link: /tracing/
  tag: ドキュメント
  text: APM と分散型トレーシング
- link: /real_user_monitoring
  tag: ドキュメント
  text: RUM およびセッションリプレイ
- link: https://www.datadoghq.com/blog/troubleshoot-with-session-replay-developer-tools/
  tag: ブログ
  text: セッションリプレイブラウザ開発ツールによるトラブルシューティング
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: ブログ
  text: Datadog RUM イベントと OpenTelemetry インスツルメンテーションされたアプリケーションのトレースを相関させる
- link: https://www.datadoghq.com/blog/rum-apm-single-step
  tag: ブログ
  text: 1 つのコマンドで、Java アプリケーションのエンドツーエンドの可視性を有効化
title: RUM とトレースの接続
---
{{< img src="real_user_monitoring/connect_rum_and_traces/rum-trace-tab.png" alt="RUM とトレース" style="width:100%;">}}

## 概要 {#overview}

APM と Real User Monitoring のインテグレーションにより、Web およびモバイルアプリケーションからのリクエストを対応するバックエンドトレースにリンクできます。この組み合わせにより、1 つのレンズを通してフロントエンドとバックエンドの完全なデータを確認できます。

RUM のフロントエンドデータに加えて、トレース ID 挿入のバックエンド、インフラストラクチャー、ログ情報を使用して、スタック内の問題を特定し、ユーザーに起こっていることを理解します。

iOS アプリケーションのトレースだけを Datadog に送信し始めるには、[iOS トレース収集][1]をご覧ください。

## 使用方法 {#usage}

### 前提条件 {#prerequisites}

-   RUM アプリケーションの対象となるサービスに [APM トレーシング][2]を設定していること。
-   サービスが HTTP サーバーを使用していること。
-   HTTP サーバーで、[分散型トレーシングをサポートするライブラリ](#supported-libraries)が使用されていること。
-   ご利用の SDK に応じて次の設定を行っていること。
    - **Browser SDK** の場合は、RUM エクスプローラーで XMLHttpRequest (XHR) または Fetch リソースを `allowedTracingUrls` に追加していること。
    - **Mobile SDK** の場合は、Native または XMLHttpRequest (XHR) を `firstPartyHosts` に追加していること。
-   `allowedTracingUrls` または `firstPartyHosts` へのリクエストに対応するトレースがあること。

### RUM の設定 {#setup-rum}

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
      allowedTracingUrls: [
        "https://api.example.com",
        // Matches any subdomain of my-api-domain.com, such as https://foo.my-api-domain.com
        /^https:\/\/[^\/]+\.my-api-domain\.com/,
        // You can also use a function for advanced matching:
        (url) => url.startsWith("https://api.example.com")
      ],
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
      allowedTracingUrls: [
        "https://api.example.com",
        // Matches any subdomain of my-api-domain.com, such as https://foo.my-api-domain.com
        /^https:\/\/[^\/]+\.my-api-domain\.com/,
        // You can also use a function for advanced matching:
        (url) => url.startsWith("https://api.example.com")
      ],
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    })
   ```

    To connect RUM to Traces, you need to specify your browser application in the `service` field.

    `allowedTracingUrls` matches the full URL (`<scheme>://<host>[:<port>]/<path>[?<query>][#<fragment>]`). It accepts the following types:
      - `string`: matches any URL that starts with the value, so `https://api.example.com` matches `https://api.example.com/v1/resource`.
      - `RegExp`: matches if any substring of the URL matches the provided RegExp. For example, `/^https:\/\/[^\/]+\.my-api-domain\.com/` matches URLs like `https://foo.my-api-domain.com/path`, but not `https://notintended.com/?from=guess.my-api-domain.com`. **Note:** The RegExp is not anchored to the start of the URL unless you use `^`. Be careful, as overly broad patterns can unintentionally match unwanted URLs and cause CORS errors.
      - `function`: evaluates with the URL as parameter. Returning a `boolean` set to `true` indicates a match.

<div class="alert alert-danger">RegExp を使用する場合、パターンは URL 全体に対して部分文字列としてテストされ、プレフィックスのみではありません。意図しない一致を避けるために、`^`で RegExp をアンカーし、できるだけ具体的にしてください。</div>

3.  _(オプション)_ `traceSampleRate` 初期化パラメーターを構成して、バックエンドトレースの一定割合を保持します。設定されていない場合、ブラウザリクエストからのトレースの 100% が Datadog に送信されます。例えば、バックエンドトレースの 20 % を保持するには:

    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        ...otherConfig,
        traceSampleRate: 20
    })
    ```

**注**: `traceSampleRate` は RUM セッションのサンプリングに影響を与え**ません**。バックエンドトレースのみがサンプリングされます。

4. _(オプション)_ `traceSampleRate` を設定している場合、バックエンドサービス側のサンプリング判定が適用されるように、初期化パラメーター `traceContextInjection` を `sampled` に設定してください (デフォルトは `sampled` です)。

    例えば、Browser SDK で `traceSampleRate` を 20% に設定した場合: 
    - `traceContextInjection` が `all` に設定されている場合、バックエンドトレースの **20%** が保持され、バックエンドトレースの **80%** が破棄されます。

  {{< img src="real_user_monitoring/connect_rum_and_traces/traceContextInjection_all-2.png" alt="traceContextInjection は all に設定されています" style="width:90%;">}}

    - When `traceContextInjection` is set to `sampled`, **20%** of backend traces are kept. For the remaining **80%**, the browser SDK **does not inject** a sampling decision. The decision is made on the server side and is based on the SDK head-based sampling [configuration][2]. In the example below, the backend sample rate is set to 40%, and therefore 32% of the remaining backend traces are kept.

    {{< img src="real_user_monitoring/connect_rum_and_traces/traceContextInjection_sampled-3.png" alt="traceContextInjection は sampled に設定されています" style="width:90%;">}}

<div class="alert alert-info">エンドツーエンドトレースは、Browser SDK が初期化された後に送信されたリクエストで利用できます。初期 HTML ドキュメントおよび初期のブラウザリクエストのエンドツーエンドトレースはサポートされていません。</div>

[1]: /ja/real_user_monitoring/application_monitoring/browser/
[2]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
{{% /tab %}}
{{% tab "Android RUM" %}}

1. [RUM Android モニタリング][1]を設定します。
2. [Android トレース収集][2]を設定します。
3. モジュールレベルの `build.gradle` ファイルに `dd-sdk-android-okhttp` ライブラリへの Gradle 依存関係を追加します。

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

    By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable the tracing for `api.example.com` and `foo.example.com`.

3.  _(オプション)_ `traceSampleRate` パラメーターを構成して、バックエンドトレースの一定割合を保持します。設定されていない場合、アプリケーションリクエストからのトレースの 100% が Datadog に送信されます。バックエンドトレースの 20% を保持する場合:

    ```kotlin
    val tracedHosts = listOf("example.com")

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(
          DatadogInterceptor.Builder(tracedHosts)
              .setTraceSampleRate(20f)
              .build()
        )
        .build()
    ```

**注**:
* `traceSampleRate` は RUM セッションのサンプリングに影響を与え**ません**。バックエンドトレースのみがサンプリングされます。
* Datadog の設定でカスタムトレースヘッダータイプを定義し、`GlobalTracer` に登録されたトレーサーを使用している場合は、使用中の SDK に対して同じトレースヘッダータイプが設定されていることを確認してください。

[1]: /ja/real_user_monitoring/android/
[2]: /ja/tracing/trace_collection/dd_libraries/android/?tab=kotlin
{{% /tab %}}
{{% tab "iOS RUM" %}}

1. [RUM iOS モニタリング][1]を設定します。

2. `RUM` および URLSession のインスツルメンテーションを、`urlSessionTracking` 設定および `firstPartyHostsTracing` パラメーターで有効にします。
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
    
   デフォルトでは、リストされたホストのすべてのサブドメインがトレースされます。たとえば、`example.com` を追加すると、`api.example.com` および `foo.example.com` のトレースも有効になります。

   トレース ID の注入は、`URLSession` に `URLRequest` を提供している場合に機能します。分散トレーシングは、`URL` オブジェクトを使用している場合には機能しません。

3. _(オプション)_ DNS 解決、SSL ハンドシェイク、最初のバイトまでの時間、接続時間、ダウンロード時間などの詳細なタイミング内訳を取得するには、`SessionDelegate` タイプに対して `URLSessionInstrumentation` を有効にします。
    ```swift
    URLSessionInstrumentation.enableDurationBreakdown(
        with: .init(
            delegateClass: <YourSessionDelegate>.self
        )
    )

    let session = URLSession(
        configuration: ...,
        delegate: <YourSessionDelegate>(),
        delegateQueue: ...
    )
    ```

   **注**: 分散トレーシングは自動的に機能しますが、`URLSessionInstrumentation` を有効にした後はトレースのタイミングがより正確になります。

4. _(オプション)_ `sampleRate` パラメーターを設定して、バックエンドトレースの一定割合を保持します。設定されていない場合、アプリケーションリクエストからのトレースの 100% が Datadog に送信されます。

     バックエンドトレースの 20% を保持する場合:
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
                    sampleRate: 20
                )
            )
        )
    )
    ```
**注**: `sampleRate` は RUM セッションのサンプリングに影響を与え**ません**。バックエンドトレースのみがサンプリングされます。

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

    By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable tracing for `api.example.com` and `foo.example.com`.

3. _(オプション)_ `resourceTracingSamplingRate` 初期化パラメーターを設定して、バックエンドトレースの一定割合を保持します。設定されていない場合、アプリケーションリクエストからのトレースの 100% が Datadog に送信されます。

     バックエンドトレースの 20% を保持する場合:
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.resourceTracingSamplingRate = 20;
    ```

    **Note**: `resourceTracingSamplingRate` **does not** impact RUM sessions sampling. Only backend traces are sampled out.

[1]: /ja/real_user_monitoring/reactnative/
{{% /tab %}}
{{% tab "Flutter RUM" %}}

1. [RUM Flutter モニタリング][1]を設定します。

2. [リソースを自動追跡][2]の指示に従って、Datadog Tracking HTTP Client パッケージを含め、HTTP トラッキングを有効にします。これには、Flutter アプリケーションが呼び出す内部のファーストパーティオリジンのリストを追加するための初期化への以下の変更が含まれます。
    ```dart
    final configuration = DatadogConfiguration(
      // ...
      // added configuration
      firstPartyHosts: ['example.com', 'api.yourdomain.com'],
    )..enableHttpTracking()
    ```

[1]: /ja/real_user_monitoring/application_monitoring/flutter/setup/
[2]: /ja/real_user_monitoring/application_monitoring/flutter/advanced_configuration#automatically-track-resources
{{% /tab %}}


{{% tab "Roku RUM" %}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">RUM for Roku は、 {{< region-param key="dd_datacenter" >}} Datadog サイト上では利用できません。</div>
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

[1]: /ja/real_user_monitoring/application_monitoring/roku/setup/


{{% /tab %}}
{{% tab "Kotlin Multiplatform RUM" %}}

1. [RUM Kotlin Multiplatform モニタリング][1]を設定します。
2. [Ktor インスツルメンテーション][2]を設定します。

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

    By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable tracing for `api.example.com` and `foo.example.com`.

4. _(オプション)_ `traceSampleRate` 初期化パラメーターを設定して、バックエンドトレースの一定割合を保持します。設定されていない場合、アプリケーションリクエストからのトレースの 20% が Datadog に送信されます。

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

    **Note**: `traceSampleRate` **does not** impact RUM sessions sampling. Only backend traces are sampled out.

[1]: /ja/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup
[2]: /ja/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup?tab=rum#initialize-the-rum-ktor-plugin-to-track-network-events-made-with-ktor
{{% /tab %}}
{{< /tabs >}}

### セットアップの検証 {#verifying-setup}

RUM との APM インテグレーションが構成されていることを検証するには、RUM をインストールした SDK に基づいて以下の手順に従ってください。


{{< tabs >}}
{{% tab "Browser" %}}

1. アプリケーションのページにアクセスします。
2. ブラウザの開発者ツールで、**Network** タブを開きます。
3. 相関が期待されるリソースリクエストのリクエストヘッダーに [Datadog の相関ヘッダー][1]が含まれていることを確認します。

[1]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "Android" %}}

1. Android Studio からアプリケーションを実行します。
2. アプリケーションの画面にアクセスします。
3. Android Studio の [Network Inspector][1] を開きます。
4. RUM リソースのリクエストヘッダーをチェックし、[SDK によって必要なヘッダーが設定されている][2]ことを検証します。

[1]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[2]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm?tab=androidrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "iOS" %}}

1. Xcode からアプリケーションを実行します。
2. アプリケーションの画面にアクセスします。
3. Xcode の [Network Connections and HTTP Traffic instrument][1] を開きます。
4. RUM リソースのリクエストヘッダーをチェックし、[SDK によって必要なヘッダーが設定されている][2]ことを検証します。

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=iosrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "React Native" %}}

1. Xcode (iOS) または Android Studio (Android) からアプリケーションを実行します。
2. アプリケーションの画面にアクセスします。
3. Xcode の [Network Connections and HTTP Traffic instrument][1] または Android Studio の [Network Inspector][2] を開きます。
4. RUM リソースのリクエストヘッダーをチェックし、[SDK によって必要なヘッダーが設定されている][3]ことを検証します。

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[3]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=reactnativerum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "Flutter" %}}

1. 希望の IDE または `flutter run` を使ってアプリケーションを実行します。
2. アプリケーションの画面にアクセスします。
3. Flutter の [Dev Tools][1] を開き、[Network View][2] に移動します。
4. RUM リソースのリクエストヘッダーをチェックし、[SDK によって必要なヘッダーが設定されている][3]ことを検証します。

[1]: https://docs.flutter.dev/tools/devtools/overview
[2]: https://docs.flutter.dev/tools/devtools/network
[3]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=reactnativerum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

1. Xcode (iOS) または Android Studio (Android) からアプリケーションを実行します。
2. アプリケーションの画面にアクセスします。
3. Xcode の [Network Connections and HTTP Traffic instrument][1] または Android Studio の [Network Inspector][2] を開きます。
4. RUM リソースのリクエストヘッダーをチェックし、[SDK によって必要なヘッダーが設定されている][3]ことを検証します。

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[3]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=kotlinmultiplatformrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{< /tabs >}}

## RUM Explorer からトレースへ {#rum-explorer-to-traces}

{{< img src="real_user_monitoring/connect_rum_and_traces/rum-trace-apm-link.png" alt="RUM とトレース" style="width:100%;">}}

RUM Explorer からトレースを表示するには:

1. [list of sessions][22] に移動し、トレースが利用可能なセッションをクリックします。`@_dd.trace_id:*` を使用して、トレースを持つリソースをクエリすることもできます。

セッションを選択すると、リクエストの所要時間の内訳、各スパンのフレームグラフ、および **View Trace in APM** リンクが表示されます。

## トレースから RUM Explorer へ {#traces-to-rum-explorer}

{{< img src="real_user_monitoring/connect_rum_and_traces/rum-traces-to-rum.png" alt="RUM とトレース" style="width:100%;">}}

トレースから RUM イベントを表示するには:

1. トレースビュー内で、**VIEW** をクリックするとビューのライフサイクル中に作成されたすべてのトレースを表示でき、**RESOURCE** をクリックすると概要タブから特定のリソースに関連するトレースを表示できます。
1. **See View in RUM** または **See Resource in RUM** をクリックして、RUM Explorer で対応するイベントを開きます。

## サポートされているライブラリ {#supported-libraries}

サポートされているバックエンドライブラリは、ネットワークリクエストを受け取るサービス上に導入する必要があります。

| ライブラリ          | 最小バージョン |
| ---------------- | --------------- |
| [Python][3]      | [0.22.0][4]     |
| [Go][5]          | [1.10.0][6]     |
| [Java][7]        | [0.24.1][8]     |
| [Ruby][9]        | [0.20.0][10]    |
| [JavaScript][11] | [0.10.0][12]    |
| [PHP][13]        | [0.33.0][14]    |
| [.NET][15]       | [1.18.2][16]    |


## OpenTelemetry のサポート {#opentelemetry-support}

RUM は、OpenTelemetry ライブラリを使ってインスツルメントされたバックエンドとリソースを接続するため、複数のプロパゲータータイプをサポートしています。

デフォルトのインジェクションスタイルは `tracecontext`、`Datadog` です。

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
    `match` accepts the same parameter types (`string`, `RegExp` or `function`) as when used in its simple form, described above.

    `propagatorTypes` accepts a list of strings for desired propagators:
      - `datadog`: Datadog's propagator (`x-datadog-*`)
      - `tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`, `tracestate`)
      - `b3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `b3multi`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}
{{% tab "iOS RUM" %}}

1. 上記に従い、RUM を APM に接続するためのセットアップを行います。

2. `.traceWithHeaders(hostsWithHeaders:sampleRate:)` を `.trace(hosts:sampleRate:)` の代わりに次のように使用します。
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
    `.traceWithHeaders(hostsWithHeaders:sampleRate:)` takes `Dictionary<String, Set<TracingHeaderType>>` as a parameter, where the key is a host and the value is a list of supported tracing header types.

    `TracingHeaderType` in an enum representing the following tracing header types:
      - `.datadog`: Datadog's propagator (`x-datadog-*`)
      - `.tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `.b3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `.b3multi`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)
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

    `TracingHeaderType` is an enum representing the following tracing header types:
      - `.DATADOG`: Datadog's propagator (`x-datadog-*`)
      - `.TRACECONTEXT`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `.B3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `.B3MULTI`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

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

    `PropagatorType` is an enum representing the following tracing header types:
      - `PropagatorType.DATADOG`: Datadog's propagator (`x-datadog-*`)
      - `PropagatorType.TRACECONTEXT`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `PropagatorType.B3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `PropagatorType.B3MULTI`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{% tab "Flutter RUM" %}}
1. 上記に従い、RUM を APM に接続するためのセットアップを行います。

2. `firstPartyHostsWithTracingHeaders` を `firstPartyHosts` の代わりに次のように使用します。
    ```dart
    final configuration = DatadogConfiguration(
      // ...
      // added configuration
      firstPartyHostsWithTracingHeaders: {
        'example.com': { TracingHeaderType.tracecontext },
      },
    )..enableHttpTracking()
    ```

    `firstPartyHostsWithTracingHeaders` takes `Map<String, Set<TracingHeaderType>>` as a parameter, where the key is a host and the value is a list of supported tracing header types.

    `TracingHeaderType` in an enum representing the following tracing header types:
      - `TracingHeaderType.datadog`: Datadog's propagator (`x-datadog-*`)
      - `TracingHeaderType.tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `TracingHeaderType.b3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `TracingHeaderType.b3multi`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

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

    `TracingHeaderType` is an enum representing the following tracing header types:
      - `TracingHeaderType.DATADOG`: Datadog's propagator (`x-datadog-*`)
      - `TracingHeaderType.TRACECONTEXT`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `TracingHeaderType.B3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `TracingHeaderType.B3MULTI`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{< /tabs >}}


## RUM リソースがトレースにリンクされる仕組み {#how-rum-resources-are-linked-to-traces}

Datadog は、分散型トレーシングプロトコルを使用し、以下の HTTP ヘッダーを設定します。デフォルトでは、トレースコンテキストと Datadog 固有のヘッダーの両方が使用されます。
{{< tabs >}} {{% tab "Datadog" %}}
`x-datadog-trace-id`
: Real User Monitoring SDK から生成されました。Datadog がトレースを RUM リソースにリンクできるようにします。

`x-datadog-parent-id`
: Real User Monitoring SDK から生成されました。Datadog がトレースの最初のスパンを生成できるようにします。

`x-datadog-origin: rum`
: Real User Monitoring SDK から生成されました。Datadog がトレースの発生元を検出できるようにします。

`x-datadog-sampling-priority`
: トレースがサンプリングされた場合は `1`、サンプリングされていない場合は `0` に設定されます。
{{% /tab %}}
{{% tab "W3C Trace Context" %}}

`traceparent: [version]-[trace id]-[parent id]-[trace flags]`
: `version`: 現在の仕様では、バージョンは `00` に設定されていると想定されています。
: `trace id`: 128 ビットのトレース ID (32 文字の 16 進数)。ソーストレース ID は 64 ビットで、APM との互換性を保つためです。
: `parent id`: 64 ビットのスパン ID (16 文字の 16 進数)。
: `trace flags`: サンプリングされた (`01`) またはサンプリングされていない (`00`)

**トレース ID 変換**: 128 ビットの W3C トレース ID は、元の 64 ビットのソーストレース ID に先頭のゼロを追加して作成されます。これにより、APM との互換性が確保され、W3C Trace Context 仕様に準拠します。元の 64 ビットのトレース ID は、128 ビットの W3C Trace Context トレース ID の下位 64 ビットになります。

`tracestate: dd=s:[sampling priority];o:[origin]`
: `dd`: Datadogのベンダープレフィックス。
: `sampling priority`: トレースがサンプリングされた場合は `1`、サンプリングされていない場合は `0` に設定されます。
: `origin`: 生成されたトレースが Real User Monitoring から APM インデックススパン数に影響を与えないように、常に `rum` に設定します。

**例**:

ソーストレース ID (64ビット): `8448eb211c80319c`

W3C Trace Context (128 ビット): `00000000000000008448eb211c80319c`

関係は、元の 64 ビットのトレース ID `8448eb211c80319c` に 16 個の先頭ゼロ (`0000000000000000`) を付加して 128 ビットの W3C トレース ID が作成されることを示しています。

traceparent の完全な例:
: `traceparent: 00-00000000000000008448eb211c80319c-b7ad6b7169203331-01`
: `tracestate: dd=s:1;o:rum`

{{% /tab %}}
{{% tab "b3 / b3 複数ヘッダー" %}}
`b3: [trace id]-[span id]-[sampled]`
: `trace id`: 64 ビットのスパン ID (16 文字の 16 進数)。
: `span id`: 64 ビットのスパン ID (16 文字の 16 進数)。
: `sampled`: True (`1`) または False (`0`)

b3 単一ヘッダーの例:
: `b3: 8448eb211c80319c-b7ad6b7169203331-1`

b3 複数ヘッダーの例:
: `X-B3-TraceId: 8448eb211c80319c`
: `X-B3-SpanId:  b7ad6b7169203331`
: `X-B3-Sampled: 1`
{{% /tab %}}
{{< /tabs >}}

これらの HTTP ヘッダーは CORS セーフリストに含まれていないため、SDK が監視対象として設定されているリクエストを処理するサーバーで [Access-Control-Allow-Headers][17] を構成する必要があります。サーバーはまた、クロスサイト URL でトレースが許可されている場合、ブラウザが各リクエストの前に行う [preflight requests][18] (OPTIONS リクエスト) を受け入れる必要があります。

## トレースの保持 {#trace-retention}

取り込まれたトレースは、[Live Search][19] エクスプローラーで 15 分間利用可能です。トレースをより長い期間保持するには、[APM 保持フィルター][20]を作成してください。これらの保持フィルターを任意のスパンタグにスコープして、重要なページやユーザーアクションのトレースを保持します。

RUM Without Limits を使用する場合、特定の RUM セッションに関連する APM トレースを保持するために[クロスプロダクト保持フィルター][21]を使用することもでき、フロントエンドとバックエンドの相関を最適化します。デフォルトでは、RUM の[セッションとそのトレースは自動的に保持される][23]の 1 % が自動的に保持され、追加費用はかかりません。

## APM クォータへの影響 {#effect-on-apm-quotas}

RUM とトレースを接続することで、APM に取り込まれるボリュームが大幅に増加する可能性があります。初期化パラメーター `traceSampleRate` を使用して、ブラウザおよびモバイルリクエストから取り込むバックエンドトレースの割合を制御します。

cross-product retention filters を設定することで、APM にインデックスされるボリュームが増加する可能性もあります。cross-product retention filters の保持率を使用して、インデックスするバックエンドトレースの割合を制御します。

## 参考資料 {#further-reading}

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
[21]: /ja/real_user_monitoring/rum_without_limits/retention_filters/#cross-product-retention-filters
[22]: https://app.datadoghq.com/rum/explorer
[23]: /ja/tracing/trace_pipeline/trace_retention/#one-percent-flat-sampling