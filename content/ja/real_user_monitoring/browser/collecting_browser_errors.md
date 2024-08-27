---
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: Documentation
  text: エラー追跡
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: ブログ
  text: リアルユーザーの監視
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Datadog でビューを検索する
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentation
  text: イベントへの視覚化の適用
- link: /real_user_monitoring/platform/dashboards/
  tag: Documentation
  text: RUM ダッシュボード
title: ブラウザエラーの収集
---
## 概要

Front-end errors are collected with with Browser SDK. The error message and stack trace are included when available.

## エラーソース
フロントエンドのエラーは、いくつかの異なるソースから発生します。

- **agent**: SDK の実行から
- **console**: `console.error()` API コールから
- **custom**: Sent with the [`addError` API](#collect-errors-manually)
- **report**: `ReportingObserver` API から
- **source**: ソースコードの未処理の例外または未処理の約束拒否から

## エラー属性

For information about the default attributes for all event types, see [Data Collected][1]. For information about configuring for sampling or global context see [Modifying Data and Context][2].

| 属性       | タイプ   | 説明                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | 文字列 | エラーの発生元 (`console` など)。         |
| `error.type`    | 文字列 | エラーのタイプ (場合によってはエラーコード)。                     |
| `error.message` | 文字列 | イベントについて簡潔にわかりやすく説明する 1 行メッセージ。 |
| `error.stack`   | 文字列 | スタックトレースまたはエラーに関する補足情報。     |

### ソースエラー

ソースエラーには、エラーに関するコードレベルの情報が含まれます。エラーの種類に関する詳細は、 [MDN ドキュメント][3]を参照してください。

| 属性       | タイプ   | 説明                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | 文字列 | エラーのタイプ (場合によってはエラーコード)。                     |

## エラーを手動で収集する

Monitor handled exceptions, handled promise rejections, and other errors not tracked automatically by the Browser SDK with the `addError()` API:

{{< code-block lang="javascript" >}}
addError(
    error: unknown,
    context?: Context
);
{{< /code-block >}}

**Note**: [Error Tracking][4] processes errors that are sent with the source set to `custom`, `source` or `report`, and contain a stack trace. Errors sent with any other source (such as `console`) or sent from browser extensions are not processed by Error Tracking.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

// コンテキスト付きでカスタムエラーを送信
const error = new Error('Something wrong occurred.');

datadogRum.addError(error, {
    pageStatus: 'beta',
});

// ネットワークエラーを送信
fetch('<SOME_URL>').catch(function(error) {
    datadogRum.addError(error);
})

// 処理済みの例外エラーを送信
try {
    //コードロジック
} catch (error) {
    datadogRum.addError(error);
}
```
{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
// コンテキスト付きでカスタムエラーを送信
const error = new Error('Something wrong occurred.');

window.DD_RUM.onReady(function() {
    window.DD_RUM.addError(error, {
        pageStatus: 'beta',
    });
});

// ネットワークエラーを送信
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addError(error);
    });
})

// 処理済みの例外エラーを送信
try {
    //コードロジック
} catch (error) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addError(error);
    })
}
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
// コンテキスト付きでカスタムエラーを送信
const error = new Error('Something wrong occurred.');

window.DD_RUM && window.DD_RUM.addError(error, {
    pageStatus: 'beta',
});

// ネットワークエラーを送信
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM && window.DD_RUM.addError(error);
})

// 処理済みの例外エラーを送信
try {
    //コードロジック
} catch (error) {
    window.DD_RUM && window.DD_RUM.addError(error);
}
```
{{% /tab %}}
{{< /tabs >}}

### React error boundaries instrumentation

React [エラー境界][5]をインスツルメンテーションして、RUM ブラウザ SDK の `addError()` API を使用して React のレンダリングエラーを監視できます。

収集されたレンダリングエラーにはコンポーネントスタックが含まれます。コンポーネントスタックは、[ソースマップをアップロード][6]した後は、他のエラースタックトレースと同様に非縮小化されます。

React のエラー境界を監視用にインスツルメンテーションするには、以下を使用します。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

class ErrorBoundary extends React.Component {
  ...

  componentDidCatch(error, info) {
    const renderingError = new Error(error.message);
    renderingError.name = `ReactRenderingError`;
    renderingError.stack = info.componentStack;
    renderingError.cause = error;

    datadogRum.addError(renderingError);
  }

  ...
}
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
class ErrorBoundary extends React.Component {
  ...

  componentDidCatch(error, info) {
    const renderingError = new Error(error.message);
    renderingError.name = `ReactRenderingError`;
    renderingError.stack = info.componentStack;
    renderingError.cause = error;

    DD_RUM.onReady(function() {
       DD_RUM.addError(renderingError);
    });
  }

  ...
}
```

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
class ErrorBoundary extends React.Component {
  ...

  componentDidCatch(error, info) {
    const renderingError = new Error(error.message);
    renderingError.name = `ReactRenderingError`;
    renderingError.stack = info.componentStack;
    renderingError.cause = error;

     window.DD_RUM &&
       window.DD_RUM.addError(renderingError);

  }

  ...
}
```

{{% /tab %}}
{{< /tabs >}}


## トラブルシューティング

### スクリプトエラー

セキュリティ上の理由から、クロスオリジンスクリプトによりトリガーされるエラーの詳細はブラウザに表示されません。この場合、Error Details タブには "Script error." というエラーメッセージのみが表示されます。

{{< img src="real_user_monitoring/browser/script-error.png" alt="リアルユーザーモニタリングでのスクリプトエラーの例" style="width:75%;" >}}

クロスオリジンスクリプトについての詳細と、詳細が表示されない理由については [CORS][7] および [グローバルイベントハンドラーについてのこちらの注釈][8]を参照してください。このエラーが発生する原因としては以下のようなものがあります。
- JavaScript ファイルが異なるホスト名 (例: `example.com` に `static.example.com` からのアセットが含まれるなど) でホスティングされている。
- ウェブサイトに CDN 上でホストされる JavaScript ライブラリが含まれている。
- ウェブサイトに、プロバイダーのサーバー上でホストされるサードパーティの JavaScript ライブラリが含まれている。

以下の 2 つのステップに従ってクロスオリジンスクリプトを可視化します。
1. [`crossorigin="anonymous"`][9] で JavaScript ライブラリを呼び出します。

   `crossorigin="anonymous"` で、スクリプトをフェッチするリクエストが安全に実行されます。Cookie や HTTP 認証を通じて機密データが転送されることはありません。

2. [`Access-Control-Allow-Origin`][10] HTTP レスポンスヘッダーを構成します。

    - すべてのオリジンがリソースを取得できるようになる `Access-Control-Allow-Origin: *` 
    - 許可された 1 つのオリジンを指定する `Access-Control-Allow-Origin: example.com`。サーバーが複数のオリジンのクライアントをサポートする場合、リクエストを行う特定のクライアントのオリジンを返さなければなりません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/real_user_monitoring/browser/data_collected/
[2]: /ja/real_user_monitoring/browser/advanced_configuration/
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[4]: /ja/real_user_monitoring/error_tracking
[5]: https://legacy.reactjs.org/docs/error-boundaries.html
[6]: /ja/real_user_monitoring/guide/upload-javascript-source-maps/?tab=webpackjs#upload-your-source-maps
[7]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[8]: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#notes
[9]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
[10]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
[11]: /ja/real_user_monitoring/guide/upload-javascript-source-maps/?tab=webpackjs