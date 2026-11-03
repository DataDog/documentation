---
description: Datadog Feature Flag SDK のネットワークリクエストを独自のドメイン上のプロキシ経由でルーティングします。
further_reading:
- link: /feature_flags/guide/proxy_server_setup/
  tag: ガイド
  text: Feature Flag SDK トラフィック用のプロキシサーバーをセットアップする
- link: /feature_flags/client/
  tag: ドキュメント
  text: クライアントサイドの Feature Flags
- link: /real_user_monitoring/guide/proxy-rum-data/
  tag: ガイド
  text: ブラウザの RUM データをプロキシする
title: Feature Flag SDK トラフィックのプロキシ
---
## 概要 {#overview}

Datadog Feature Flag SDK は、アプリケーションから 2 種類の送信ネットワークリクエストを行います。

1. **フラグ構成のダウンロード**: SDK は、起動時および評価コンテキストが変更されたときに、Datadog CDN から事前計算されたフラグ割り当てを取得します。このリクエストにより、どのフラグバリアントがアプリケーションに返されるかが決定されます。
2. **イベントのアップロード**: SDK は、エクスポージャーおよび評価イベントデータを Datadog インテークエンドポイントに送信します。

これらのリクエストタイプのいずれかまたは両方を、独自のドメイン上のプロキシ経由でルーティングできます。プロキシを使用する一般的な理由には以下が含まれます。

- クライアントデバイスからサードパーティドメインへの直接アクセスを制限するネットワークポリシー
- データレジデンシーまたはコンプライアンス要件
- ブラウザアプリケーションでの広告ブロッカーの回避

<div class="alert alert-info">このページのコードサンプルでは、US1 サイト (<code>datadoghq.com</code>) を例として使用しています。Datadog ドメインを <a href="/getting_started/site/">Datadog サイト</a>の対応する値に置き換えてください。</div>

## プロキシを構成する {#configure-the-proxy}

{{< tabs >}}

{{% tab "Android" %}}

`Flags.enable()` を呼び出す前にカスタムエンドポイント URL を `FlagsConfiguration.Builder` に渡します。

### フラグ構成プロキシ {#flag-configuration-proxy}

フラグ構成のダウンロードをプロキシ経由でルーティングするには、プロキシが公開する完全な URL を指定して `useCustomFlagEndpoint` を呼び出してください。SDK は、評価コンテキストをボディに含めてこの URL に POST リクエストを送信します。

{{< code-block lang="kotlin" filename="Application.kt" >}}
import com.datadog.android.flags.FlagsConfiguration

val flagsConfig = FlagsConfiguration.Builder()
    .useCustomFlagEndpoint("https://proxy.example.com/precompute-assignments")
    .build()

Flags.enable(flagsConfig)
{{< /code-block >}}

プロキシは、このリクエストを Datadog CDN (`https://preview.ff-cdn.datadoghq.com/precompute-assignments`) に転送する必要があります ([Datadog サイト][1] に合わせてサブドメインを適宜置き換えてください)。リクエストボディとすべてのヘッダーはそのまま転送してください。

### イベントアップロードプロキシ {#event-upload-proxy}

エクスポージャーおよび評価イベントのアップロードをプロキシ経由でルーティングするには、プロキシエンドポイントの完全な URL を指定して、対応するビルダーメソッドを呼び出してください。

{{< code-block lang="kotlin" filename="Application.kt" >}}
import com.datadog.android.flags.FlagsConfiguration

val flagsConfig = FlagsConfiguration.Builder()
    .useCustomFlagEndpoint("https://proxy.example.com/precompute-assignments")
    .useCustomExposureEndpoint("https://proxy.example.com/api/v2/exposures")
    .useCustomEvaluationEndpoint("https://proxy.example.com/api/v2/flagevaluation")
    .build()

Flags.enable(flagsConfig)
{{< /code-block >}}

プロキシは、各リクエストを [Datadog サイト][1] の対応する Datadog インテークエンドポイントへ転送する必要があります (以下のテーブルでは例として US1 サイトを使用しています)。

| プロキシパス | 転送先 |
|---|---|
| `/api/v2/exposures` | `https://api.datadoghq.com/api/v2/exposures` |
| `/api/v2/flagevaluation` | `https://api.datadoghq.com/api/v2/flagevaluation` |

[1]: /ja/getting_started/site/

{{% /tab %}}

{{% tab "iOS" %}}

`Flags.enable(with:)` を呼び出す前にカスタムエンドポイント URL を `Flags.Configuration` に設定してください。

### フラグ構成プロキシ {#flag-configuration-proxy-1}

フラグ構成のダウンロードをプロキシ経由でルーティングするには、プロキシが公開する完全な URL に `customFlagsEndpoint` を設定してください。SDK は、評価コンテキストをボディに含めてこの URL に POST リクエストを送信します。

{{< code-block lang="swift" filename="AppDelegate.swift" >}}
import DatadogFlags

let flagsConfig = Flags.Configuration(
    customFlagsEndpoint: URL(string: "https://proxy.example.com/precompute-assignments")
)

Flags.enable(with: flagsConfig)
{{< /code-block >}}

プロキシは、このリクエストを Datadog CDN (`https://preview.ff-cdn.datadoghq.com/precompute-assignments`) に転送する必要があります ([Datadog サイト][1] に合わせてサブドメインを適宜置き換えてください)。リクエストボディとすべてのヘッダーはそのまま転送してください。

フラグ構成リクエストに追加の HTTP ヘッダーを付与するには (プロキシでの認証用など)、`customFlagsHeaders` を設定してください。

{{< code-block lang="swift" filename="AppDelegate.swift" >}}
let flagsConfig = Flags.Configuration(
    customFlagsEndpoint: URL(string: "https://proxy.example.com/precompute-assignments"),
    customFlagsHeaders: ["X-Proxy-Token": "<YOUR_PROXY_TOKEN>"]
)
{{< /code-block >}}

### イベントアップロードプロキシ {#event-upload-proxy-1}

エクスポージャーおよび評価イベントのアップロードをプロキシ経由でルーティングするには、`customExposureEndpoint` および `customEvaluationEndpoint` を設定してください。

{{< code-block lang="swift" filename="AppDelegate.swift" >}}
let flagsConfig = Flags.Configuration(
    customFlagsEndpoint: URL(string: "https://proxy.example.com/precompute-assignments"),
    customExposureEndpoint: URL(string: "https://proxy.example.com/api/v2/exposures"),
    customEvaluationEndpoint: URL(string: "https://proxy.example.com/api/v2/flagevaluation")
)

Flags.enable(with: flagsConfig)
{{< /code-block >}}

プロキシは、各リクエストを [Datadog サイト][1] の対応する Datadog インテークエンドポイントへ転送する必要があります (以下のテーブルでは例として US1 サイトを使用しています)。

| プロキシパス | 転送先 |
|---|---|
| `/api/v2/exposures` | `https://api.datadoghq.com/api/v2/exposures` |
| `/api/v2/flagevaluation` | `https://api.datadoghq.com/api/v2/flagevaluation` |

[1]: /ja/getting_started/site/

{{% /tab %}}

{{% tab "React Native" %}}

`FlagsConfiguration` オブジェクトを `DdFlags.enable()` に渡します。

### フラグ構成プロキシ {#flag-configuration-proxy-2}

フラグ構成のダウンロードをプロキシ経由でルーティングするには、プロキシのベース URL に `customFlagsEndpoint` を設定してください。SDK はこの値に自動的に `/precompute-assignments` を付与し、評価コンテキストをボディに含めて POST リクエストを送信します。

{{< code-block lang="typescript" filename="App.tsx" >}}
import { DdFlags } from '@datadog/mobile-react-native';

await DdFlags.enable({
    customFlagsEndpoint: 'https://proxy.example.com',
    // SDK sends POST to: https://proxy.example.com/precompute-assignments
});
{{< /code-block >}}

プロキシは、このリクエストを Datadog CDN (`https://preview.ff-cdn.datadoghq.com/precompute-assignments`) に転送する必要があります ([Datadog サイト][1] に合わせてサブドメインを適宜置き換えてください)。リクエストボディとすべてのヘッダーはそのまま転送してください。

### イベントアップロードプロキシ {#event-upload-proxy-2}

エクスポージャーイベントのアップロードをプロキシ経由でルーティングするには、プロキシのベース URL に `customExposureEndpoint` を設定してください。SDK はこの値に `/api/v2/exposures` を自動的に付与します。

{{< code-block lang="typescript" filename="App.tsx" >}}
await DdFlags.enable({
    customFlagsEndpoint: 'https://proxy.example.com',
    customExposureEndpoint: 'https://proxy.example.com',
    // SDK sends POST to: https://proxy.example.com/api/v2/exposures
});
{{< /code-block >}}

プロキシは、[Datadog サイト][1] の対応する Datadog インテークエンドポイントにエクスポージャーリクエストを転送する必要があります。たとえば、US1 サイトの場合は `https://api.datadoghq.com/api/v2/exposures` を使用します。

<div class="alert alert-info">React Native SDK は、 <code>customEvaluationEndpoint</code> オプションを公開していません。評価イベントは、基盤となるネイティブ Android または iOS SDK を通じて送信されるため、カスタムプロキシエンドポイント経由でルーティングすることはできません。</div>

[1]: /ja/getting_started/site/

{{% /tab %}}

{{% tab "ブラウザ" %}}

コンフィギュレーションオプションを `DatadogBrowserFlagging.init()` に渡します。

### フラグ構成プロキシ {#flag-configuration-proxy-3}

フラグ構成のダウンロードをプロキシ経由でルーティングするには、プロキシエンドポイントの URL に `flaggingProxy` を設定してください。SDK は、評価コンテキストをボディに含めた POST リクエストをこの URL に直接送信し、デフォルトの Datadog CDN エンドポイントを置き換えます。

{{< code-block lang="javascript" filename="index.js" >}}
import { DatadogBrowserFlagging } from '@datadog/browser-flagging';

DatadogBrowserFlagging.init({
    clientToken: '<CLIENT_TOKEN>',
    site: 'datadoghq.com',
    flaggingProxy: 'https://proxy.example.com/precompute-assignments',
});
{{< /code-block >}}

プロキシは、このリクエストを Datadog CDN (`https://preview.ff-cdn.datadoghq.com/precompute-assignments`) に転送する必要があります ([Datadog サイト][1] に合わせてサブドメインを適宜置き換えてください)。リクエストボディとヘッダーはそのまま転送してください。SDK は `dd-client-token` ヘッダーと `dd-application-id` ヘッダーを自動的に含めます。

フラグ構成リクエストにカスタムヘッダーを追加するには (プロキシでの認証用など)、`customHeaders` を使用してください。

{{< code-block lang="javascript" filename="index.js" >}}
DatadogBrowserFlagging.init({
    clientToken: '<CLIENT_TOKEN>',
    site: 'datadoghq.com',
    flaggingProxy: 'https://proxy.example.com/precompute-assignments',
    customHeaders: { 'X-Proxy-Token': '<YOUR_PROXY_TOKEN>' },
});
{{< /code-block >}}

### イベントアップロードプロキシ {#event-upload-proxy-3}

ブラウザのフラグイベントデータ (エクスポージャーおよび評価) は、標準の Browser SDK インテークパイプラインを通じて送信されます。このトラフィックをプロキシ経由でルーティングするには、`proxy` オプションをドメイン上の URL に設定してください。

{{< code-block lang="javascript" filename="index.js" >}}
DatadogBrowserFlagging.init({
    clientToken: '<CLIENT_TOKEN>',
    site: 'datadoghq.com',
    flaggingProxy: 'https://proxy.example.com/precompute-assignments',
    proxy: 'https://proxy.example.com/intake',
});
{{< /code-block >}}

SDK は、プロキシに送信される各リクエストに `ddforward` クエリパラメーターを追加します。このパラメーターには、プロキシが転送先とする URL エンコードされたパスとクエリ文字列が含まれています。例:

```
POST https://proxy.example.com/intake?ddforward=%2Fapi%2Fv2%2Fexposures%3Fddsource%3Dbrowser...
```

プロキシは `ddforward` 値をデコードし、Datadog インテーク URL を構築します。

```
https://browser-intake-datadoghq.com/api/v2/exposures?ddsource=browser...
```

インテークの送信元は [Datadog サイト][1] によって異なります。たとえば、`datadoghq.eu` の場合は `https://browser-intake-datadoghq.eu` です。正確な位置情報を使用して、POST ボディをそのまま転送し、クライアント IP を含む `X-Forwarded-For` ヘッダーを追加してください。転送前に `cookie` などの機密ヘッダーを削除してください。

`proxy` オプションは、デコードされた `path` および `parameters` を受け取り、完全なプロキシ URL を返す関数も受け入れます。完全な関数シグネチャについては、[Proxy Browser RUM Data][2] を参照してください。

[1]: /ja/getting_started/site/
[2]: /ja/real_user_monitoring/guide/proxy-rum-data/

{{% /tab %}}

{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}