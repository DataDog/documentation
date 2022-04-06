---
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: Documentation
  text: Error Tracking
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: ブログ
  text: リアルユーザーの監視
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Datadog でビューを検索する
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentation
  text: イベントへの視覚化の適用
- link: /real_user_monitoring/dashboards/
  tag: Documentation
  text: RUM ダッシュボード
kind: documentation
title: ブラウザエラーの収集
---

フロントエンドのエラーはリアルタイムモニタリング (RUM) で収集されます。エラーメッセージとスタックトレースが利用できる場合は含まれます。

## エラーの原因
フロントエンドのエラーは、それぞれの `error.origin` により 4 つのカテゴリーに分類されます。

- **source**: 未処理の例外または未処理の約束拒否（ソースコード関連）。
- **console**: `console.error()` API 呼び出し。
- **custom**: [RUM `addError` API](#collect-errors-manually) と共に送信されるエラー。

## エラー属性

すべての RUM イベントタイプのデフォルト属性に関する詳細は、[収集されるデータ][1]をご覧ください。サンプリングまたはグローバルコンテキストの構成に関する情報は、[RUM データとコンテキストの変更][2]をご覧ください。

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
| `error.type`    | 文字列 | エラーのタイプ (場合によってはエラーコード)。                   |

## エラーを手動で収集する

処理済みの例外、処理済みのプロミス拒否、および `addError()` API を使用した RUM SDK により自動的に追跡されないその他のエラーを監視します。

{{< code-block lang="javascript" >}}
addError(
    error: unknown,
    context?: Context
);
{{< /code-block >}}

**注**: [エラー追跡][4]機能では、`custom` または `source` に設定されたソースに送信され、スタックトレースを含むエラーが処理します。その他のソース（`console` など）で送信されたエラーは、エラー追跡で処理されません。

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

DD_RUM.onReady(function() {
    DD_RUM.addError(error, {
        pageStatus: 'beta',
    });
});

// ネットワークエラーを送信
fetch('<SOME_URL>').catch(function(error) {
    DD_RUM.onReady(function() {
        DD_RUM.addError(error);
    });
})

// 処理済みの例外エラーを送信
try {
    //コードロジック
} catch (error) {
    DD_RUM.onReady(function() {
        DD_RUM.addError(error);
    })
}
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
// コンテキスト付きでカスタムエラーを送信
const error = new Error('Something wrong occurred.');

window.DD_RUM && DD_RUM.addError(error, {
    pageStatus: 'beta',
});

// ネットワークエラーを送信
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM && DD_RUM.addError(error);
})

// 処理済みの例外エラーを送信
try {
    //コードロジック
} catch (error) {
    window.DD_RUM && DD_RUM.addError(error);
}
```
{{% /tab %}}
{{< /tabs >}}

## トラブルシューティング

### スクリプトエラー

セキュリティ上の理由から、クロスオリジンスクリプトによりトリガーされるエラーの詳細はブラウザに表示されません。この場合、Error Details タブには "Script error." というエラーメッセージのみが表示されます。

{{< img src="real_user_monitoring/browser/script-error.png" alt="リアルユーザーモニタリングでのスクリプトエラーの例" style="width:75%;" >}}

クロスオリジンスクリプトについての詳細と、詳細が表示されない理由については [CORS][5] および [グローバルイベントハンドラーについてのこちらの注釈][6]を参照してください。このエラーが発生する原因としては以下のようなものがあります。
- JavaScript ファイルが異なるホスト名 (例: `example.com` に `static.example.com` からのアセットが含まれるなど) でホスティングされている。
- ウェブサイトに CDN 上でホストされる JavaScript ライブラリが含まれている。
- ウェブサイトに、プロバイダーのサーバー上でホストされるサードパーティの JavaScript ライブラリが含まれている。

以下の 2 つのステップに従ってクロスオリジンスクリプトを可視化します。
1. `crossorigin="anonymous"` で JavaScript ライブラリをコールします。

   `crossorigin="anonymous"` で、スクリプトをフェッチするリクエストが安全に実行されます。Cookie や HTTP 認証を介して機密データが転送されることはありません。

2. `Access-Control-Allow-Origin` HTTP ヘッダーを構成します。　

   このヘッダーで最も一般的な値は `Access-Control-Allow-Origin: *` で、すべてのオリジンとリソースのフェッチを許可します。代わりに、設定 (例: `Access-Control-Allow-Origin: www.example.com`) でリソースにアクセスできるオリジンの種類を制限することもできます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/real_user_monitoring/browser/data_collected/
[2]: /ja/real_user_monitoring/browser/modifying_data_and_context/
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[4]: /ja/real_user_monitoring/error_tracking
[5]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[6]: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#notes