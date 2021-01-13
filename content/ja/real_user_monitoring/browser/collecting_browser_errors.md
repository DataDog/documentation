---
title: ブラウザエラーの収集
kind: documentation
further_reading:
  - link: /real_user_monitoring/error_tracking/
    tag: Documentation
    text: Error Tracking
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: ブログ
    text: リアルユーザーの監視
  - link: /real_user_monitoring/explorer/
    tag: Documentation
    text: Datadog でビューを検索する
  - link: /real_user_monitoring/explorer/analytics/
    tag: Documentation
    text: イベントに関する分析論を組み立てる
  - link: /real_user_monitoring/dashboards/
    tag: Documentation
    text: RUM ダッシュボード
---
フロントエンドのエラーはリアルタイムモニタリング (RUM) で収集されます。エラーメッセージとスタックトレースが利用できる場合は含まれます。

## エラーの原因
フロントエンドのエラーは、それぞれの `error.origin` により 4 つのカテゴリーに分類されます。

- **network**: AJAX リクエストが原因の XHR または Fetch エラー。ネットワークエラーの特定の属性は[ネットワークエラーのドキュメント][1]を参照してください。
- **source**: 未処理の例外または未処理の約束拒否（ソースコード関連）。
- **console**: `console.error()` API 呼び出し。
- **custom**: [RUM `addError` API](#collect-errors-manually) (デフォルトは `custom`) と共に送信されるエラー。

## エラー属性

すべての RUM イベントタイプのデフォルト属性に関する詳細は、[収集されるデータ][2]をご覧ください。サンプリング、グローバルコンテキスト、カスタムユーザーアクションの構成に関する情報は、[高度なコンフィギュレーション][3]をご覧ください。

| 属性       | タイプ   | 説明                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | 文字列 | エラーの発生元 (`console`、`network` など)。     |
| `error.type`    | 文字列 | エラーのタイプ (場合によってはエラーコード)。                   |
| `error.message` | 文字列 | イベントについて簡潔にわかりやすく説明する 1 行メッセージ。 |
| `error.stack`   | 文字列 | スタックトレースまたはエラーに関する補足情報。     |

### ネットワークエラー

ネットワークエラーには失敗した HTTP リクエストに関する情報が含まれます。次のファセットが収集されます。

| 属性                      | タイプ   | 説明                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `error.resource.status_code`             | 数値 | 応答ステータスコード。                                                               |
| `error.resource.method`                | 文字列 | HTTP メソッド (`POST`、`GET` など)。           |
| `error.resource.url`                     | 文字列 | リソースの URL。                                                                       |
| `error.resource.url_host`        | 文字列 | URL のホスト部分。                                                          |
| `error.resource.url_path`        | 文字列 | URL のパス部分。                                                          |
| `error.resource.url_query` | オブジェクト | クエリパラメーターの key/value 属性として分解された、URL のクエリ文字列部分。 |
| `error.resource.url_scheme`      | 文字列 | URL のプロトコル名 (HTTP または HTTPS)。                                            |
| `error.resource.provider.name`      | 文字列 | リソースプロバイダー名。デフォルトは `unknown` となります。                                            |
| `error.resource.provider.domain`      | 文字列 | リソースプロバイダーのドメイン。                                            |
| `error.resource.provider.type`      | 文字列 | リソースプロバイダーのタイプ (`first-party`、`cdn`、`ad`、`analytics` など)。                                            |

### ソースエラー

ソースエラーには、エラーに関するコードレベルの情報が含まれます。エラーの種類に関する詳細は、 [MDN ドキュメント][4]を参照してください。

| 属性       | タイプ   | 説明                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | 文字列 | エラーのタイプ (場合によってはエラーコード)。                   |

## エラーを手動で収集する

処理済みの例外、処理済みのプロミス拒否、および `addError()` API を使用した RUM SDK により自動的に追跡されないその他のエラーを監視します。

{{< code-block lang="javascript" >}}
addError(
    error: unknown,
    context?: Context,
    source: ErrorSource.CUSTOM | ErrorSource.NETWORK | ErrorSource.SOURCE = ErrorSource.CUSTOM
);
{{< /code-block >}}

**注**: [エラー追跡][5]機能では、`custom` または `source` に設定されたソースに送信され、スタックトレースを含むエラーが処理します。

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
    datadogRum.addError(error, undefined, 'network');
})

// 処理済みの例外エラーを送信
try {
    //Some code logic
} catch (error) {
    datadogRum.addError(error, undefined, 'source');
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
        DD_RUM.addError(error, undefined, 'network');
    });
})

// 処理済みの例外エラーを送信
try {
    //Some code logic
} catch (error) {
    DD_RUM.onReady(function() {
        DD_RUM.addError(error, undefined, 'source');
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
    window.DD_RUM && DD_RUM.addError(error, undefined, 'network');
})

// 処理済みの例外エラーを送信
try {
    //コードロジック
} catch (error) {
    window.DD_RUM && DD_RUM.addError(error, undefined, 'source');
}
```
{{% /tab %}}
{{< /tabs >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/real_user_monitoring/data_collected/error/#network-errors
[2]: /ja/real_user_monitoring/browser/data_collected/
[3]: /ja/real_user_monitoring/browser/advanced_configuration/
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[5]: /ja/real_user_monitoring/error_tracking