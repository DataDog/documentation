---
title: RUM リソース
kind: ドキュメント
further_reading:
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
  tag: ブログ
  text: リアルユーザーモニタリング
- link: /real_user_monitoring/dashboards/
  tag: ドキュメント
  text: 追加設定なしで使用できるダッシュボードでRUMデータを視覚化します
- link: /real_user_monitoring/explorer/
  tag: ドキュメント
  text: Datadog でビューを検索する
- link: /logs/processing/attributes_naming_convention/
  tag: ドキュメント
  text: Datadog標準属性
---

デフォルトで、Web サイトのすべてのリソース（画像、XHR、[XMLHttpRequest][1]、CSS の各ファイル、JS アセット、およびフォントファイル）が収集されます。

アプリケーションリソースのロードに関して、ネットワークの詳細なタイミングデータが、[Performance Resource Timing API][2] を使用して収集されます。

{{< img src="real_user_monitoring/data_collected/resource/resource_metric.png" alt="リソースメトリクス" responsive="true" >}}

## 収集されるメジャー

| 属性                              | 型           | 説明                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | 数値         | リソースのロードにかかった全時間。                                                                                                   |
| `network.bytes_written`                | 数値（バイト） | リソースのサイズ。                                                                                                                            |
| `http.performance.connect.duration`    | 数値（ns）    | サーバーへの接続が確立されるまでにかかった時間（connectEnd - connectStart）。                                                            |
| `http.performance.ssl.duration`        | 数値（ns）    | TLS ハンドシェイクにかかった時間。最後のリクエストが HTTPS 経由ではなかった場合、このメトリクスは収集されません（connectEnd - secureConnectionStart）。 |
| `http.performance.dns.duration`        | 数値（ns）    | 最後のリクエストの DNS 名が解決されるまでにかかった時間（domainLookupEnd - domainLookupStart）。                                               |
| `http.performance.redirect.duration`   | 数値（ns）    | 後続の HTTP リクエストにかかった時間（redirectEnd - redirectStart）。                                                                      |
| `http.performance.first_byte.duration` | 数値（ns）    | 応答の最初のバイトを受信するまでにかかった時間（responseStart - RequestStart）。                                           |
| `http.performance.download.duration`   | 数値（ns）    | 応答のダウンロードにかかった時間（responseEnd - responseStart）。                                                                         |

## 収集されるファセット

| 属性                      | 型   | 説明                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `resource.kind`                | 文字列 | 収集されるリソースの種類またはタイプ（CSS、JS、メディア、XHR、画像）           |
| `http.status_code`             | 数値 | 応答ステータスコード。                                                               |
| `http.url`                     | 文字列 | リソースの URL。                                                                       |
| `http.url_details.host`        | 文字列 | URL の HTTP ホスト部分。                                                          |
| `http.url_details.path`        | string | URL の HTTP パス部分。                                                          |
| `http.url_details.queryString` | object | クエリパラメーターの key/value 属性として分解された、URL の HTTP クエリ文字列部分。 |
| `http.url_details.scheme`      | 文字列 | URL のプロトコル名 (HTTP または HTTPS)                                            |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[2]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
