---
aliases:
- /ja/error_tracking/standalone_frontend/collecting_browser_errors
- /ja/real_user_monitoring/browser/collecting_browser_errors/
description: RUM Browser SDK を使用して、手動エラー収集や React エラー境界を含む複数のソースからフロントエンドエラーを収集および追跡する方法を学びます。
further_reading:
- link: /error_tracking/explorer/
  tag: ドキュメント
  text: Datadog 内でエラーを探索する
- link: /error_tracking/monitors/
  tag: ドキュメント
  text: 影響の大きい問題について積極的にアラートを発信する
- link: /real_user_monitoring
  tag: ドキュメント
  text: パフォーマンスとユーザーへの影響を測定する
title: ブラウザエラーの収集
---
## 概要 {#overview}

Browser SDK は、エラーメッセージやスタックトレースを含むフロントエンドエラーを収集します (利用可能な場合)。Error Tracking 製品でこれらのエラーをトリアージおよび管理する方法については、[Browser Error Tracking][4] を参照してください。

Browser SDK がエラーを収集する場合:

* エラーは RUM の[エラーイベント][14]としてキャプチャされます。
* エラーイベントを含むセッションを対象とする[保持フィルター][15]は、現在のセッションを保持します。
* [RUM メトリクス][16] `rum.measure.error`、`rum.measure.session.error`、および `rum.measure.view.error_free` は、セッションが保持されるかどうかにかかわらず更新されます。
* エラーは [Error Tracking][4] でキャプチャされます。

[Error Tracking ルール][17]は_エラーイベント_には適用されず、RUM は Error Tracking の[無視および除外された問題][18]に一致するエラーイベントを引き続き記録します。エラーがエラーイベントとして記録されないようにするには、`beforeSend` [コールバックを使用して][19] Datadog に送信される前にエラーを破棄する必要があります。

## エラーソース {#error-sources}
フロントエンドのエラーは、いくつかの異なるソースから発生します。

- **エージェント**: SDK の実行から
- **コンソール**: `console.error()` API 呼び出しから
- **カスタム**: [`addError` API](#collect-errors-manually)で送信
- **レポート**: `ReportingObserver` API から
- **ソース**: ソースコードの未処理の例外または未処理の約束拒否から

## エラー属性 {#error-attributes}

すべてのイベントタイプのデフォルト属性については、[データ収集][1]を参照してください。サンプリングまたはグローバルコンテキストに対する構成の詳細については、[データおよびコンテキストの変更][2]を参照してください。

| 属性       | タイプ   | 説明                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | 文字列 | エラーの発生元 (`console` など)。        |
| `error.type`    | 文字列 | エラーのタイプ (場合によってはエラーコード)。                    |
| `error.message` | 文字列 | イベントについて簡潔にわかりやすく説明する 1 行メッセージ。|
| `error.stack`   | 文字列 | スタックトレースまたはエラーに関する補足情報。    |
| `error.causes` | [配列][12] | 追加のコンテキストを提供するエラーのリスト (オプション)。この属性は、エラーを個別に表示し、フォーマットを強化するために使用されます。詳細については、[MDN ドキュメント][13]を参照してください。|

### ソースエラー {#source-errors}

ソースエラーには、エラーに関するコードレベルの情報が含まれます。さまざまなエラータイプの詳細については、[MDN ドキュメント][3]を参照してください。

| 属性       | タイプ   | 説明                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | 文字列 | エラーのタイプ (場合によってはエラーコード)。                    |

## WebAssembly Error Tracking を構成する {#configure-webassembly-error-tracking}

WebAssembly (WASM) エラーを追跡するには、Browser SDK WASM プラグインをインストールします。プラグインと RUM Browser SDK には同じバージョンを使用してください。

```shell
npm install --save-exact \
  @datadog/browser-rum@<VERSION> \
  @datadog/browser-plugin-wasm@<VERSION>
```

RUM を初期化する際にプラグインを登録します。

```javascript
import { makeWasmPlugin } from '@datadog/browser-plugin-wasm';
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  // ...
  plugins: [makeWasmPlugin()],
});
```

WASM モジュールを読み込む前に RUM を初期化します。このプラグインは、ブラウザの `WebAssembly` API で作成されたモジュールを監視し、WASM スタックフレームを含むエラーにそれらの URL とビルド ID を追加します。これにより、アプリケーションが複数のモジュールを読み込む際に、Datadog が正しいビルド ID を選択できるようになります。

未処理のエラーは自動的に収集されます。処理済みの WASM エラーを報告するには、`Error` オブジェクトを [`addError()`](#collect-errors-manually) に渡します。

次に、[WebAssembly シンボルをアップロード][20]して、エラーをシンボル化します。

## エラーを手動で収集する {#collect-errors-manually}

処理済みの例外、処理済みのプロミス拒否、および Browser SDK で自動的に追跡されないその他のエラーを、`addError()` API を使用して監視します。

{{< code-block lang="javascript" >}}
addError(
    error: unknown,
    context?: Context
);
{{< /code-block >}}

**注**: [Error Tracking][4] は、ソースが `custom`、`source`、`report`、または `console` に設定されて送信され、スタックトレースを含むエラーを処理します。他のソース (例: `network`) で送信されたエラーや、ブラウザ拡張機能から送信されたエラーは、Error Tracking では処理されません。

{{< tabs >}}
{{% tab "npm" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

// Send a custom error with context
const error = new Error('Something wrong occurred.');

datadogRum.addError(error, {
    pageStatus: 'beta',
});

// Send a network error
fetch('<SOME_URL>').catch(function(error) {
    datadogRum.addError(error);
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    datadogRum.addError(error);
}
```
{{% /tab %}}
{{% tab "CDN 非同期" %}}

```javascript
// Send a custom error with context
const error = new Error('Something wrong occurred.');

window.DD_RUM.onReady(function() {
    window.DD_RUM.addError(error, {
        pageStatus: 'beta',
    });
});

// Send a network error
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addError(error);
    });
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addError(error);
    })
}
```
{{% /tab %}}
{{% tab "CDN 同期" %}}

```javascript
// Send a custom error with context
const error = new Error('Something wrong occurred.');

window.DD_RUM && window.DD_RUM.addError(error, {
    pageStatus: 'beta',
});

// Send a network error
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM && window.DD_RUM.addError(error);
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    window.DD_RUM && window.DD_RUM.addError(error);
}
```
{{% /tab %}}
{{< /tabs >}}

### React エラー境界のインスツルメンテーション {#react-error-boundaries-instrumentation}

React [エラー境界][5]をインスツルメンテーションし、RUM ブラウザ SDK の `addError()` API を使用して React のレンダリングエラーを監視できます。

収集されたレンダリングエラーにはコンポーネントスタックが含まれます。コンポーネントスタックは、[ソースマップをアップロード][6]した後は他のエラースタックトレースと同様に非縮小化されます。

React のエラー境界を監視用にインスツルメンテーションするには、以下を使用します。

{{< tabs >}}
{{% tab "npm" %}}

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
{{% tab "CDN 非同期" %}}

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
{{% tab "CDN 同期" %}}

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


## トラブルシューティング {#troubleshooting}

### スクリプトエラー {#script-error}

セキュリティ上の理由から、クロスオリジンスクリプトによってトリガーされたエラーの詳細はブラウザに表示されません。この場合、{{< ui >}}Error Details{{< /ui >}} タブには "Script error." というエラーメッセージのみが表示されます。

{{< img src="real_user_monitoring/browser/script-error.png" alt="Real User Monitoring スクリプトエラーの例" style="width:75%;" >}}

クロスオリジンスクリプトについての詳細と、詳細が表示されない理由については、[CORS][7] および[グローバルイベントハンドラーについてのこちらの注釈][8]を参照してください。このエラーが発生する原因としては以下のようなものがあります。
- JavaScript ファイルが異なるホスト名 (例: `example.com` に `static.example.com` からのアセットが含まれるなど) でホスティングされている。
- ウェブサイトに CDN 上でホストされる JavaScript ライブラリが含まれている。
- ウェブサイトに、プロバイダーのサーバーをホストとするサードパーティの JavaScript ライブラリが含まれている。

以下の 2 つのステップに従ってクロスオリジンスクリプトを可視化します。
1. [`crossorigin="anonymous"`][9] を使用して JavaScript ライブラリを呼び出します。

    `crossorigin="anonymous"` で、スクリプトを取得するリクエストが安全に実行されます。Cookie や HTTP 認証を介して機密データが転送されることはありません。

2. [`Access-Control-Allow-Origin`][10] HTTP レスポンスヘッダーを構成します。

    - `Access-Control-Allow-Origin: *` すべてのオリジンがリソースを取得できるようになります。
    - `Access-Control-Allow-Origin: example.com` 許可する 1 つのオリジンを指定します。サーバーが複数のオリジンのクライアントをサポートする場合、リクエストを行う特定のクライアントのオリジンを返さなければなりません。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/real_user_monitoring/application_monitoring/browser/data_collected/
[2]: /ja/real_user_monitoring/application_monitoring/browser/advanced_configuration/
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[4]: /ja/real_user_monitoring/error_tracking
[5]: https://legacy.reactjs.org/docs/error-boundaries.html
[6]: /ja/real_user_monitoring/guide/upload-javascript-source-maps/?tab=webpackjs#upload-your-source-maps
[7]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[8]: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#notes
[9]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
[10]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
[11]: /ja/real_user_monitoring/guide/upload-javascript-source-maps/?tab=webpackjs
[12]: https://github.com/DataDog/rum-events-format/blob/69147431d689b3e59bff87e15bb0088a9bb319a9/lib/esm/generated/rum.d.ts#L185-L203
[13]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause
[14]: /ja/real_user_monitoring/explorer/search/#event-types
[15]: /ja/real_user_monitoring/rum_without_limits/retention_filters
[16]: /ja/real_user_monitoring/rum_without_limits/metrics
[17]: /ja/error_tracking/manage_data_collection
[18]: /ja/error_tracking/issue_states#excluding-an-issue
[19]: /ja/real_user_monitoring/guide/enrich-and-control-rum-data/?tab=event#discard-a-frontend-error
[20]: /ja/real_user_monitoring/guide/upload-webassembly-symbols/