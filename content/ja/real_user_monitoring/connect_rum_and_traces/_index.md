---
title: RUM とトレースの接続
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: ブログ
    text: Real User Monitoring
  - link: /tracing/
    tag: Documentation
    text: APM と分散型トレーシング
---
{{< img src="real_user_monitoring/connect_rum_and_traces/rum_trace_tab.png" alt="RUM とトレース"  style="width:100%;">}}


APM と Real User Monitoring のインテグレーションにより、Web およびモバイルアプリケーションからのリクエストを対応するバックエンドトレースにリンクできます。この組み合わせにより、1 つのレンズを通してフロントエンドとバックエンドの完全なデータを確認できます。

RUM のフロントエンドデータ、トレース ID 挿入のバックエンド、インフラストラクチャー、ログ情報を使用して、スタック内の問題をすばやく特定し、ユーザーに起こっていることを完全に理解します。

## 使用方法
### 前提条件

-   RUM アプリケーションの対象となるサービスに [APM トレース][1]を設定します。
-   サービスが HTTP サーバーを使用していること。
-   HTTP サーバーで、[分散型トレーシングをサポートするライブラリ](#supported-libraries)が使用されていること。

### RUM のセットアップ
{{< tabs >}}
{{% tab "ブラウザ RUM" %}}

1.  [Browser Real User Monitoring][1] を設定します。

2. RUM SDK を初期化します。ブラウザアプリケーションによって呼び出される内部 (ファーストパーティ) オリジンのリストを使用して、`allowedTracingOrigins` 初期化パラメーターを設定します。

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    ...otherConfig,
    allowedTracingOrigins: ["https://api.example.com", /https:\/\/.*\.my-api-domain\.com/]
})
```

**注**: `allowedTracingOrigins` は Javascript 文字列と正規表現を受け入れます。

[1]: /ja/real_user_monitoring/browser/
{{% /tab %}}
{{% tab "Android RUM" %}}

1.  [Android Real User Monitoring][1] を設定します。

2.  Android アプリケーションによって呼び出される内部 (ファーストパーティ) オリジンのリストを使用して、`OkHttpClient` インターセプターを構成します。
```java
val tracedHosts =  listOf("example.com", "example.eu")

val okHttpClient = OkHttpClient.Builder()
    .addInterceptor(DatadogInterceptor(tracedHosts))
    .addNetworkInterceptor(TracingInterceptor(tracedHosts))
    .eventListenerFactory(DatadogEventListener.Factory())
    .build()
```

**注**: デフォルトでは、リストされたホストのすべてのサブドメインがトレースされます。たとえば、`example.com` を追加すると、`api.example.com` と `foo.example.com` のトレースも有効になります。

[1]: /ja/real_user_monitoring/android/
{{% /tab %}}
{{% tab "iOS RUM" %}}

1.  [iOS Real User Monitoring][1] を設定します。

2.  iOS アプリケーションによって呼び出される内部 (ファーストパーティ) オリジンのリストを使用して、`firstPartyHosts` 初期化パラメーターを設定します。
```swift
Datadog.initialize(
appContext: .init(),
configuration: Datadog.Configuration
    .builderUsing(rumApplicationID: "<rum_app_id>", clientToken: "<client_token>", environment: "<env_name>")
    .set(firstPartyHosts: ["example.com", "api.yourdomain.com"])
    .build()
)
```

3.  [セットアップドキュメント][1]に記載されているように URLSession を初期化します。
```swift
let session =  URLSession(
    configuration: ...,
    delegate: DDURLSessionDelegate(),
    delegateQueue: ...
)
```

**注**: デフォルトでは、リストされたホストのすべてのサブドメインがトレースされます。たとえば、`example.com` を追加すると、`api.example.com` と `foo.example.com` のトレースも有効になります。

[1]: /ja/real_user_monitoring/ios/
{{% /tab %}}
{{< /tabs >}}

## サポートされているライブラリ

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

| ヘッダー                         | 説明                                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `x-datadog-trace-id `            | Real User Monitoring SDK から生成されます。Datadog がトレースを RUM リソースにリンクできるようにします。   |
| `x-datadog-parent-id`            | Real User Monitoring SDK から生成されます。Datadog がトレースから最初のスパンを生成できるようにします。 |
| `x-datadog-origin: rum`          | Real User Monitoring から生成されたトレースが、APM インデックススパン数に影響を与えないようにするため。  |
| `x-datadog-sampling-priority: 1` | Agent がトレースを維持するようにします。                                                           |  
| `x-datadog-sampled: 1`           | Real User Monitoring SDK から生成されます。このリクエストがサンプリング用に選択されていることを示します。          |

## APM クオータへの影響

`x-datadog-origin: rum` ヘッダーは、トレースが Real User Monitoring から生成されることを APM バックエンドに指定します。したがって、生成されたトレースは、インデックス化スパン数に影響を与えません。

## トレースの保持期間

これらのトレースは、[従来の APM トレースと同様に][16]保持されます。

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing
[2]: /ja/tracing/setup_overview/setup/python/
[3]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.22.0
[4]: /ja/tracing/setup_overview/setup/go/
[5]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.10.0
[6]: /ja/tracing/setup_overview/setup/java/
[7]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.1
[8]: /ja/tracing/setup_overview/setup/ruby/
[9]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.20.0
[10]: /ja/tracing/setup_overview/setup/nodejs/
[11]: https://github.com/DataDog/dd-trace-js/releases/tag/v0.10.0
[12]: /ja/tracing/setup_overview/setup/php/
[13]: https://github.com/DataDog/dd-trace-php/releases/tag/0.33.0
[14]: /ja/tracing/setup_overview/setup/dotnet-core/
[15]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.18.2
[16]: /ja/tracing/trace_retention_and_ingestion/