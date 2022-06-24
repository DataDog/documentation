---
further_reading:
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM データを Explorer で確認
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: ブログ
  text: Datadog Session Replay を使用してユーザージャーニーをリアルタイムで表示
kind: ガイド
title: RUM ブラウザ SDK のアップグレード
---

## 概要 

RUM と Logs Browser SDK のメジャーバージョン間の移行は、このガイドに従ってください。

## v3〜v4

v4 では、RUM と Logs Browser SDK にいくつかの重大な変更が加えられました。

### 変更

#### 取込先 URL

RUM Browser SDK のデータ送信先 URL が変更になりました。[コンテンツセキュリティポリシーが最新である][1]ことを確認してください。

#### 最小限の Typescript のバージョンサポート

RUM Browser SDK v4 は、v3.8.2 より前の TypeScript と互換性がありません。TypeScript を使用する場合は、バージョンが v3.8.2 以上であることを確認してください。

#### タグの構文

`version`、`env`、`service`の初期化パラメーターは、Datadog にタグとして送信されます。RUM Browser SDK は、複数のタグが生成されないように、それらをわずかにサニタイズし、それらの値がタグの要件構文に適合しない場合は警告を表示します。

#### 初期化パラメーターの型の厳格化

TypeScript の初期化パラメーターを表す型はより厳しくなっており、以前受け取ったサポートされていないパラメーターは拒否されることがあります。もし型チェックのエラーが発生した場合は、サポートされている初期化パラメーターを指定していることを確認してください。

#### プライバシーオプションの優先順位

複数のプライバシーオプションが同じ要素に指定されている場合、Datadog は最も制限の厳しいオプションを適用し、機密データの予期せぬ漏えいを回避します。例えば、同じ要素に `dd-privacy-allow` と `dd-privacy-hidden` の両方のクラスが指定されている場合、allow の代わりに hidden が適用されます。

#### アクション名計算

RUM Browser SDK は、アクション名を計算する際に、`data-dd-action-name` 属性を持つ子要素のテキストを内側のテキストから削除しています。

例えば、次の `container` 要素の場合、以前は計算されるアクション名は `Container sensitive data` でしたが、v4 では計算されるアクション名は `Container` になります。
```html
<div id="container">
  Container
  <div data-dd-action-name="sensitive">sensitive data</div>
</div>
```


### 削除

#### XHR `_datadog_xhr` フィールド

RUM Browser SDK は、以前は `XMLHttpRequest` オブジェクトの内部状態を表す `_datadog_xhr` プロパティを使用していました。このプロパティは、外部で使用されることを想定していなかったため、代替することなく削除されました。

#### `proxyHost` 初期化パラメーター

初期化パラメーター `proxyHost` は削除されました。代わりに初期化パラメーター `proxyUrl` を使用してください。

#### プライバシーオプション対応

プライバシーオプションの `input-ignored` と `input-masked` はもはや有効ではありません。代わりに、`mask-user-input` プライバシーオプションを使用してください。

具体的には、以下のように置き換えてください。

* `dd-privacy-input-ignored` および `dd-privacy-input-masked` クラス名を `dd-privacy-mask-user-input` に置き換えます。
* `dd-privacy="input-masked"` および `dd-privacy="input-ignored"` 属性値を `dd-privacy="mask-user-input"` に置き換えます。

## v2〜v3

Browser SDK v3 に [Session Replay][2] が新登場。この大きなバージョンアップデートにより、RUM および Logs Browser SDK が大きく変わります。

### 変更
#### RUM エラー

RUM Browser SDK では、失敗した XHR および Fetch 呼び出しに対する [RUM エラー][3]が作成されなくなります。このような失敗したネットワークリクエストは、依然として [RUM リソース][4]として収集され、ステータスコード属性を含みます。

引き続き、失敗したネットワークリクエストを RUM エラーとして表示するには、Datadog では [beforeSend API][5] を使用したリソースの傍受、`status_code` プロパティのチェック、そして [addError API][6] を使用したエラーの手動送信をおすすめします。

```javascript
beforeSend: (event) => {
    if (event.type === 'resource' && event.resource.status_code >= 500) {
        datadogRum.addError(`${event.resource.method} ${event.resource.url} ${event.resource.status_code}`); // "GET https://www.example.com/ 504"
    }
}
```

#### RUM エラーソース属性

RUM Browser SDK では、[addError API][6] で収集されたエラーのソースの特定ができなくなります。この API で収集されたすべてのエラーは、ソース属性が `custom` に設定されます。[addError API][6] は、コンテキストオブジェクトをその 2 番目のパラメーターとして受容し、エラーに関する追加コンテキストを渡すために使用されます。

### 削除
#### RUM API

| 旧 API       | 新 API   |
| ------------- | --------- |
| addUserAction | addAction |

#### 初期化オプション

| 旧オプション        | 新オプション |
| ------------------ | ----------- |
| publicApiKey       | clientToken |
| datacenter         | site        |
| resourceSampleRate | なし        |

#### TypeScript タイプ

| 旧タイプ                    | 新タイプ                    |
| ---------------------------- | ---------------------------- |
| RumUserConfiguration         | RumInitConfiguration         |
| RumRecorderUserConfiguration | RumRecorderInitConfiguration |
| LogsUserConfiguration        | LogsInitConfiguration        |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/faq/content_security_policy
[2]: /ja/real_user_monitoring/session_replay
[3]: /ja/real_user_monitoring/browser/collecting_browser_errors/
[4]: /ja/real_user_monitoring/browser/monitoring_resource_performance/
[5]: /ja/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#enrich-and-control-rum-data
[6]: /ja/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually