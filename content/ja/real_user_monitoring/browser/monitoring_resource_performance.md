---
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: ブログ
  text: リアルユーザーモニタリング
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Datadog でビューを検索する
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentation
  text: イベントへの視覚化の適用
- link: /real_user_monitoring/platform/dashboards/
  tag: Documentation
  text: RUM ダッシュボード
kind: documentation
title: リソースパフォーマンスの監視
---

RUM ブラウザ SDK は、すべての RUM ビュー (ページの読み込み) のリソースとアセットを収集します。[XMLHttpRequest][1] (XHR) と Fetch リクエストだけでなく、画像、CSS ファイル、JavaScript アセット、フォントファイルも収集します。RUM リソースイベントは、詳細なタイミングとメタデータとともに、それぞれに対して生成されます。

RUM リソースは、収集時にアクティブな RUM ビューに関連するすべてのコンテキストから継承します。

## RUM リソースを APM トレースにリンクする

リクエストがスタックのレイヤー間を移動するときに、リクエストをさらに完全にエンドツーエンドで可視化するには、RUM データを対応するバックエンドトレースに接続します。これにより、次のことが可能になります。

* ユーザーが直面するエラーの原因となったバックエンドの問題を特定する。
* スタック内の問題によってユーザーが影響を受ける範囲を特定する。
* フレームグラフで完全なエンドツーエンドのリクエストを確認する。これにより、RUM と APM の間をシームレスにナビゲートし、正確なコンテキストで戻ることができます。

この機能の設定については、[RUM とトレースの接続][2]を参照してください。

{{< img src="real_user_monitoring/browser/resource_performance_graph.png" alt="RUM リソースの APM トレース情報" >}}

## リソースタイミングとメトリクス

リソースの詳細なネットワークタイミングデータは、Fetch および XHR ネイティブブラウザメソッドと [Performance Resource Timing API][3] から収集されます。

| 属性                              | タイプ           | 説明                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | 数値         | リソースのロードにかかった全時間。                                                                                                   |
| `resource.size`                | 数値（バイト） | リソースのサイズ。                                                                                                                            |
| `resource.connect.duration`    | 数値（ns）    | サーバーへの接続が確立されるまでにかかった時間 (connectEnd - connectStart)。                                                           |
| `resource.ssl.duration`        | 数値（ns）    | TLS ハンドシェイクにかかった時間。最後のリクエストが HTTPS 経由ではなかった場合、このメトリクスは収集されません (connectEnd - secureConnectionStart)。|
| `resource.dns.duration`        | 数値（ns）    | 最後のリクエストの DNS 名が解決されるまでにかかった時間 (domainLookupEnd - domainLookupStart)。                                              |
| `resource.redirect.duration`   | 数値（ns）    | 後続の HTTP リクエストにかかった時間 (redirectEnd - redirectStart)。                                                                     |
| `resource.first_byte.duration` | 数値（ns）    | 応答の最初のバイトを受信するまでにかかった時間 (responseStart - RequestStart)。                                           |
| `resource.download.duration`   | 数値（ns）    | 応答のダウンロードにかかった時間 (responseEnd - responseStart)。                                                                        |

**注**: 一部のリソースの詳細なタイミングの収集に問題がある場合は、[リソースタイミングと CORS](#resource-timing-and-cors) を参照してください。

## リソースの属性

| 属性                      | タイプ   | 説明                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `resource.type`                | 文字列 | 収集されるリソースのタイプ (`css`、`javascript`、`media`、`XHR`、`image` など)。           |
| `resource.method`                | 文字列 | HTTP メソッド (`POST`、`GET` など)。           |
| `resource.status_code`             | 数値 | 応答ステータスコード。                                                               |
| `resource.url`                     | 文字列 | リソースの URL。                                                                       |
| `resource.url_host`        | 文字列 | URL のホスト部分。                                                          |
| `resource.url_path`        | 文字列 | URL のパス部分。                                                          |
| `resource.url_query` | オブジェクト | クエリパラメーターの key/value 属性として分解された、URL のクエリ文字列部分。 |
| `resource.url_scheme`      | 文字列 | URL のプロトコル名 (HTTP または HTTPS)。                                            |
| `resource.provider.name`      | 文字列 | リソースプロバイダー名。デフォルトは `unknown` となります。                                            |
| `resource.provider.domain`      | 文字列 | リソースプロバイダーのドメイン。                                            |
| `resource.provider.type`      | 文字列 | リソースプロバイダーのタイプ (`first-party`、`cdn`、`ad`、`analytics` など)。                                            |

## サードパーティのリソースを特定する

RUM は、リソース URL ホスト部分からリソースプロバイダーの名前とカテゴリを推測します。リソース URL ホストが現在のページ URL ホストと一致する場合、カテゴリは `first party` に設定されます。それ以外の場合、カテゴリは、たとえば `cdn`、`analytics`、または `social` になります。

## リソースタイミングと CORS

[Resource Timing API][3] は、RUM リソースのタイミングを収集するために使用されます。これは、ブラウザがスクリプトに適用するクロスオリジンセキュリティ制限の対象となります。たとえば、Web アプリケーションが `www.example.com` でホストされており、`images.example.com` を介して画像をロードする場合、デフォルトでは、`www.example.com` でホストされてロードされたリソースのタイミングのみが取得されます。 

これを解決するには、クロスオリジンリソースに `Timing-Allow-Origin` HTTP 応答ヘッダーを追加して、CORS の対象となるリソースの拡張データ収集を有効にします。たとえば、任意のオリジンにリソースタイミングへのアクセスを許可するには、`Timing-Allow-Origin: *` を使用します。CORS の詳細については、[MDN Web ドキュメント][4]をご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[2]: /ja/real_user_monitoring/platform/connect_rum_and_traces
[3]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[4]: https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API#Coping_with_CORS