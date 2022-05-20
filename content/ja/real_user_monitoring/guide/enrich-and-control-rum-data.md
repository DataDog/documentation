---
title: beforeSend を使用してブラウザ RUM データを強化および制御する
kind: ガイド
further_reading:
  - link: /real_user_monitoring/explorer
    tag: ドキュメント
    text: RUM データを Explorer で確認
---
## 概要

RUM ブラウザ SDK は RUM イベントをキャプチャし、それらの主な属性を設定します。`beforeSend` コールバック関数を使用すると、RUM SDK によって収集されたすべてのイベントにアクセスしてから Datadog に送信できます。RUM イベントをインターセプトすると、次のことが可能になります。
* 追加のコンテキスト属性で RUM イベントを強化する
* RUM イベントを変更してコンテンツを変更するか、機密性の高いシーケンスを編集する ([編集可能なプロパティのリスト][1]を参照)
* 選択した RUM イベントを破棄する

## イベントとコンテキストの構造
`beforeSend` コールバック関数を使用すると、`event` と `context` の 2 つのオブジェクトにアクセスできます。

```javascript
function beforeSend(event, context)
```

### イベント
イベントは RUM SDK によって生成されます。さまざまなイベントタイプと収集された属性の詳細については、[収集された RUM データ][2]のドキュメントをご覧ください。

`event.type` プロパティを使用すると、イベントのタイプを識別できます。
```json
{
    ...,
    "event.type": "resource",
    ...
}
```

### コンテキスト
コンテキストは、イベントの作成をトリガーする Browser API で構成されます。コンテキスト値は `event.type` に依存します。
| RUM イベントタイプ       | コンテキスト                                                         |
|----------------------|-----------------------------------------------------------------|
| View                 | [Location][3]                                                   |
| Action               | [Event][4]                                                      |
| Resource (XHR)       | [XMLHttpRequest][5] および [PerformanceResourceTiming][6]          |
| Resource (Fetch)     | [Request][7]、[Response][8]、および [PerformanceResourceTiming][6] |
| Resource (Other)     | [PerformanceResourceTiming][6]                                  |
| Error                | [Error][9] またはエラーとして発生するその他の値                |
| Long Task            | [PerformanceLongTaskTiming][10]                                 |

コンテキストオブジェクトの構造の詳細については、[Browser SDK リポジトリ][11]を参照してください。

## 例

### Fetch 応答から HTTP ヘッダーを収集する

次の `beforeSend` コンフィギュレーションを使用して、Fetch 応答から HTTP ヘッダーを収集します。追加のコンテキスト属性は、`event.context` オブジェクトに保存する**必要があります**。

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    beforeSend: (event, context) => {
        // RUM リソースの応答ヘッダーを収集します
        if (event.type === 'resource' && event.resource.type === 'fetch') {
            event.context = {...event.context, responseHeaders: context.response.headers}
        }
    },
    ...
});
```

次のタブは、この例の `beforeSend` イベントおよびコンテキストオブジェクトに含まれる情報を示しています。

{{< tabs >}}
{{% tab "イベント" %}}

```json
{
    "application": {
        "id": "<YOUR_APPLICATION_ID>"
    },
    "date": 1623933472075,
    "service": "shopist-web-ui",
    "session": {
        "type": "user",
        "id": "308f14ac-2a27-4b50-945c-be345778994f",
        "has_replay": true
    },
    "view": {
        "id": "768f0eb9-39c5-4a1f-9c13-476bd08166bb",
        "referrer": "http://localhost:3000/",
        "url": "http://localhost:3000/"
    },
    "resource": {
        "id": "e5d1d3a4-7240-4910-bd0a-af253e06d301",
        "type": "fetch",
        "duration": 2577300000,
        "method": "get",
        "status_code": 200,
        "url": "https://api.shopist.io/products.json",
        "size": 10307,
        "download": {
            "duration": 1800000,
            "start": 2575500000
        },
        "first_byte": {
            "duration": 2574600000,
            "start": 900000
        }
    },
    "type": "resource",
    "context": {
        "browser_test": false,
        "usr.email": "jane@doe.com",
        "usr.id": "f57eg30cc9"
    }
}
```
{{% /tab %}}
{{% tab "コンテキスト" %}}
```json
{
    "performanceEntry": {
        "name": "https://api.shopist.io/products.json",
        "entryType": "resource",
        "startTime": 230,
        "duration": 2577.300000011921,
        "initiatorType": "fetch",
        "nextHopProtocol": "h2",
        "workerStart": 0,
        "redirectStart": 0,
        "redirectEnd": 0,
        "fetchStart": 230,
        "domainLookupStart": 230,
        "domainLookupEnd": 230,
        "connectStart": 230,
        "connectEnd": 230,
        "secureConnectionStart": 230,
        "requestStart": 230.90000000596046,
        "responseStart": 2805.5,
        "responseEnd": 2807.300000011921,
        "transferSize": 10743,
        "encodedBodySize": 10307,
        "decodedBodySize": 10307,
        "serverTiming": [],
        "workerTiming": []
    },
    "response": {
        "body": (...),
        "bodyUsed": true,
        "headers": Headers {},
        "ok": true,
        "redirected": false,
        "status": 200,
        "statusText": "",
        "type": "basic",
        "url": "https://api.shopist.io/products.json"
    },
    "requestInput": "https://api.shopist.io/products.json",
    "requestInit": {
        "headers": [
            [
                "Content-Type",
                "application/json; charset=utf-8"
            ],
            [
                "x-datadog-origin",
                "rum"
            ],
            [
                "x-datadog-parent-id",
                "595857188965892467"
            ],
            [
                "x-datadog-sampled",
                "1"
            ],
            [
                "x-datadog-sampling-priority",
                "1"
            ],
            [
                "x-datadog-trace-id",
                "796856647783126791"
            ]
        ],
        "method": "get",
        "cache": "no-cache"
    }
}
```
{{% /tab %}}
{{< /tabs >}}

### フロントエンドエラーを破棄する

次の `beforeSend` コンフィギュレーションでメッセージに "profile is not defined" (プロファイルが定義されていません) が含まれている場合は、フロントエンドエラーを破棄します。

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    beforeSend: (event, context) => {
        // メッセージに 'profile is not defined' が含まれている場合は、RUM エラーを破棄します
        if (event.type === 'error' && event.error.message.includes('profile is not defined')) {
            return false
        }
    },
    ...
});
```

次のタブは、この例の `beforeSend` イベントおよびコンテキストオブジェクトに含まれる情報を示しています。

{{< tabs >}}
{{% tab "イベント" %}}

```json
{
    "application": {
        "id": "75d50c62-8b66-403c-a453-aaa1c44d64bd"
    },
    "date": 1623941859639,
    "service": "shopist-web-ui",
    "session": {
        "type": "user",
        "id": "4203a142-1e3c-41b0-822d-316705d98f19",
        "has_replay": true
    },
    "view": {
        "id": "0a771c95-9bc4-4640-978e-ad28da64da45",
        "referrer": "http://localhost:3000/profile",
        "url": "http://localhost:3000/profile-edit"
    },
    "action": {
        "id": "7b30e681-ce5c-47a8-ac22-6aff8be59744"
    },
    "error": {
        "id": "3c0295b1-da48-4827-93c9-ea06be4aafd9",
        "message": "profile is not defined",
        "source": "source",
        "stack": "ReferenceError: profile is not defined\n  at VueComponent.discardEdit @ http://localhost:3000/_nuxt/pages/profile-edit.js:911:41\n  at invokeWithErrorHandling @ http://localhost:3000/_nuxt/commons.app.js:12167:26\n  at VueComponent.invoker @ http://localhost:3000/_nuxt/commons.app.js:12492:14\n  at invokeWithErrorHandling @ http://localhost:3000/_nuxt/commons.app.js:12167:26\n  at VueComponent.Vue.$emit @ http://localhost:3000/_nuxt/commons.app.js:14196:9\n  at VueComponent.cancelDraft @ http://localhost:3000/_nuxt/pages/profile-edit.js:828:12\n  at invokeWithErrorHandling @ http://localhost:3000/_nuxt/commons.app.js:12167:26\n  at HTMLButtonElement.invoker @ http://localhost:3000/_nuxt/commons.app.js:12492:14\n  at HTMLButtonElement.original._wrapper @ http://localhost:3000/_nuxt/commons.app.js:17221:25",
        "type": "ReferenceError",
        "handling": "unhandled"
    },
    "type": "error",
    "context": {
        "browser_test": false,
        "usr.email": "jane@doe.com",
        "usr.id": "f57eg30cc9"
    }
}
```
{{% /tab %}}
{{% tab "コンテキスト" %}}
```json
{
    "error": {
        "message": "profile is not defined",
        "stack": "ReferenceError: profile is not defined\n  at VueComponent.discardEdit @ http://localhost:3000/_nuxt/pages/profile-edit.js:911:41\n  at invokeWithErrorHandling @ http://localhost:3000/_nuxt/commons.app.js:12167:26\n  at VueComponent.invoker @ http://localhost:3000/_nuxt/commons.app.js:12492:14\n  at invokeWithErrorHandling @ http://localhost:3000/_nuxt/commons.app.js:12167:26\n  at VueComponent.Vue.$emit @ http://localhost:3000/_nuxt/commons.app.js:14196:9\n  at VueComponent.cancelDraft @ http://localhost:3000/_nuxt/pages/profile-edit.js:828:12\n  at invokeWithErrorHandling @ http://localhost:3000/_nuxt/commons.app.js:12167:26\n  at HTMLButtonElement.invoker @ http://localhost:3000/_nuxt/commons.app.js:12492:14\n  at HTMLButtonElement.original._wrapper @ http://localhost:3000/_nuxt/commons.app.js:17221:25"
    }
}
```
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#modify-the-content-of-a-rum-event
[2]: /ja/real_user_monitoring/browser/data_collected/
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Location
[4]: https://developer.mozilla.org/en-US/docs/Web/API/Event
[5]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[6]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[8]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[9]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[10]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming
[11]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum-core/src/domainContext.types.ts