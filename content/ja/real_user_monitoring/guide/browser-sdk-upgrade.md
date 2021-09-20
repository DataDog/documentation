---
title: Browser SDK のアップグレード
kind: ガイド
further_reading:
  - link: /real_user_monitoring/explorer
    tag: ドキュメント
    text: RUM データを Explorer で確認
  - link: 'https://www.datadoghq.com/blog/session-replay-datadog/'
    tag: ブログ
    text: Datadog Session Replay を使用してユーザージャーニーをリアルタイムで表示
---
## 概要

RUM Browser SDK v3 に [Session Replay][1] が新登場。この大きなバージョンアップデートにより、Browser SDK が大きく変わります。

## 変更
### RUM エラー

Browser SDK では、失敗した XHR および Fetch 呼び出しに対する [RUM エラー][2]が作成されなくなります。このような失敗したネットワークリクエストは、依然として [RUM リソース][3]として収集され、ステータスコード属性を含みます。


引き続き、失敗したネットワークリクエストを RUM エラーとして表示するには、Datadog では [beforeSend API][4] を使用したリソースの傍受、`status_code` プロパティのチェック、そして [addError API][5] を使用したエラーの手動送信をおすすめします。

```javascript
beforeSend: (event) => {
    if (event.type === 'resource' && event.resource.status_code >= 500) {
        datadogRum.addError(`${event.resource.method} ${event.resource.url} ${event.resource.status_code}`); // "GET https://www.example.com/ 504"
    }
}
```

### ソース属性

Browser SDK では、[addError API][5] で収集されたエラーのソースの特定ができなくなります。この API で収集されたすべてのエラーは、ソース属性が `custom` に設定されます。[addError API][5] は、コンテキストオブジェクトをその 2 番目のパラメーターとして受容し、エラーに関する追加コンテキストを渡すために使用されます。

## 非推奨
### TypeScript タイプ

| 旧タイプ                    | 新タイプ                    |
| ---------------------------- | ---------------------------- |
| RumUserConfiguration         | RumInitConfiguration         |
| RumRecorderUserConfiguration | RumRecorderInitConfiguration |

### 初期化オプション

| 旧オプション        | 新オプション |
| ------------------ | ----------- |
| publicApiKey       | clientToken |
| datacenter         | site        |
| resourceSampleRate | なし        |

### API

| 旧 API       | 新 API   |
| ------------- | --------- |
| addUserAction | addAction |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/guide/session-replay-getting-started/
[2]: /ja/real_user_monitoring/browser/collecting_browser_errors/
[3]: /ja/real_user_monitoring/browser/monitoring_resource_performance/
[4]: /ja/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#enrich-and-control-rum-data
[5]: /ja/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually