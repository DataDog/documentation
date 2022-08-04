---
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: ブログ
  text: Real User Monitoring
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
kind: documentation
title: RUM とトレースの接続
---

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_trace_tab.png" alt="RUM とトレース"  style="width:100%;">}}

APM と Real User Monitoring のインテグレーションにより、Web およびモバイルアプリケーションからのリクエストを対応するバックエンドトレースにリンクできます。この組み合わせにより、1 つのレンズを通してフロントエンドとバックエンドの完全なデータを確認できます。

RUM のフロントエンドデータに加えて、トレース ID 挿入のバックエンド、インフラストラクチャー、ログ情報を使用して、スタック内の問題を特定し、ユーザーに起こっていることを理解します。

## 使用方法

### 前提条件

-   RUM アプリケーションの対象となるサービスに [APM トレース][1]を設定していること。
-   サービスが HTTP サーバーを使用していること。
-   HTTP サーバーで、[分散型トレーシングをサポートするライブラリ](#supported-libraries)が使用されていること。
-   RUM エクスプローラーで XMLHttpRequest (XHR) または Fetch リソースを `allowedTracingOrigins` に設定していること。
-   `allowedTracingOrigins` へのリクエストに対応するトレースがあること。

### RUM の設定

{{< tabs >}}
{{% tab "ブラウザ RUM" %}}

1.  [RUM ブラウザモニタリング][1]を設定します。

2.  RUM SDK を初期化します。ブラウザアプリケーションによって呼び出される内部のファーストパーティオリジンのリストを使用して、`allowedTracingOrigins` 初期化パラメーターを設定します。

    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        applicationId: '<DATADOG_APPLICATION_ID>',
        clientToken: '<DATADOG_CLIENT_TOKEN>',
        ...otherConfig,
        service: "my-web-application",
        allowedTracingOrigins: ["https://api.example.com", /https:\/\/.*\.my-api-domain\.com/]
    })
    ```

RUM をトレースに接続するには、`service` フィールドにブラウザアプリケーションを指定する必要があります。

**注:** `allowedTracingOrigins` は、`<scheme> "://" <hostname> [ ":" <port> ]` と定義された、ブラウザアプリケーションにより呼び出された呼び出し元と一致する Javascript 文字列および正規表現を受け入れます。

3.  _(オプション)_ `tracingSampleRate` 初期化パラメータを構成して、バックエンドトレースの定義されたパーセンテージを保持するように設定します。設定しない場合、ブラウザのリクエストから来るトレースの 100% が Datadog に送信されます。バックエンドトレースの 20% を保持する場合:

    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        ...otherConfig,
        tracingSampleRate: 20
    })
    ```

**注**: `tracingSampleRate` は RUM セッションのサンプリングには影響**しません**。バックエンドのトレースのみがサンプリングされます。

<div class="alert alert-info">ブラウザ SDK の初期化後に生成されたリクエストには、エンドツーエンドのトレーシングを利用できます。初めの HTML 文書のエンドツーエンドトレースおよび始めのブラウザリクエストはサポートされません。</div>

[1]: /ja/real_user_monitoring/browser/
{{% /tab %}}
{{% tab "Android RUM" %}}

1.  [RUM Android モニタリング][1]を設定します。

2.  Android アプリケーションによって呼び出される内部のファーストパーティオリジンのリストを使用して、`OkHttpClient` インターセプターを構成します。
    ```java
    val tracedHosts =  listOf("example.com", "example.eu")

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor(tracedHosts))
        .addNetworkInterceptor(TracingInterceptor(tracedHosts))
        .eventListenerFactory(DatadogEventListener.Factory())
       .build()
    ```

**注**: デフォルトでは、リストされたホストのすべてのサブドメインがトレースされます。たとえば、`example.com` を追加すると、`api.example.com` と `foo.example.com` のトレースも有効になります。

3.  _(オプション)_ `traceSamplingRate` パラメータを構成して、バックエンドトレースの定義されたパーセンテージを保持するように設定します。設定しない場合、アプリケーションのリクエストから来るトレースの 100% が Datadog に送信されます。バックエンドトレースの 20% を保持する場合:

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

2.  iOS アプリケーションによって呼び出される内部のファーストパーティオリジンのリストを使用して、`firstPartyHosts` 初期化パラメーターを設定します。
    ```swift
    Datadog.initialize(
    appContext: .init(),
    configuration: Datadog.Configuration
        .builderUsing(rumApplicationID: "<rum_app_id>", clientToken: "<client_token>", environment: "<env_name>")
        .set(firstPartyHosts: ["example.com", "api.yourdomain.com"])
        .build()
    )
    ```

3.  [セットアップ][1]にあるように、URLSession を初期化します。
    ```swift
    let session =  URLSession(
        configuration: ...,
        delegate: DDURLSessionDelegate(),
        delegateQueue: ...
    )
    ```

**注**: デフォルトでは、リストされたホストのすべてのサブドメインがトレースされます。たとえば、`example.com` を追加すると、`api.example.com` と `foo.example.com` のトレースも有効になります。

4.  _(オプション)_ `tracingSampleRate` 初期化パラメータを設定して、バックエンドトレースの定義されたパーセンテージを保持するように設定します。設定しない場合、アプリケーションのリクエストから来るトレースの 100% が Datadog に送信されます。バックエンドトレースの 20% を保持する場合:
    ```swift
    Datadog.initialize(
    appContext: .init(),
    configuration: Datadog.Configuration
        .builderUsing(rumApplicationID: "<rum_app_id>", clientToken: "<client_token>", environment: "<env_name>")
        .set(tracingSamplingRate: 20)
        .build()
    )
    ```

**注**: `tracingSamplingRate` は RUM セッションのサンプリングには影響**しません**。バックエンドのトレースのみがサンプリングされます。

[1]: /ja/real_user_monitoring/ios/
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


## RUM リソースはどのようにトレースにリンクされていますか？

Datadog は、分散型トレーシングプロトコルを使用し、以下の HTTP ヘッダーを設定します。

`x-datadog-trace-id`
Real User Monitoring SDK から生成されます。Datadog がトレースを RUM リソースにリンクできるようにします。

`x-datadog-parent-id`
Real User Monitoring SDK から生成されます。Datadog がトレースから最初のスパンを生成できるようにします。

`x-datadog-origin: rum`
Real User Monitoring から生成されたトレースが、APM インデックススパン数に影響を与えないようにします。

`x-datadog-sampling-priority: 1`
: Agent がトレースを維持するようにします。

**注**: 上記 HTTP ヘッダーは CORS セーフリストに登録されていないため、SDK が監視するように設定されているリクエストを扱うサーバーで [Access-Control-Allow-Headers を構成][16]する必要があります。サーバーは、すべてのリクエストの前に SDK によって作られる[プレフライトリクエスト][17]も許可する必要があります (OPTIONS リクエスト)。

## APM クオータへの影響

RUM とトレースを接続すると、APM の取り込み量が大幅に増加する可能性があります。初期化パラメータ `tracingSampleRate` を使用して、ブラウザとモバイルのリクエストから始まるバックエンドのトレースのシェアを維持します。

## トレースの保持期間

これらのトレースは、[Live Search][18] エクスプローラーで 15 分間利用可能です。より長い期間、トレースを保持するには、[保持フィルター][19]を作成します。重要なページとユーザーアクションのトレースを保持するために、任意のスパンタグにこれらの保持フィルターを適用します。

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