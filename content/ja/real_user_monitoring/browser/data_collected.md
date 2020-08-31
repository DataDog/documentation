---
title: 収集された RUM ブラウザデータ
kind: ドキュメント
aliases:
  - /ja/real_user_monitoring/data_collected/
  - /ja/real_user_monitoring/data_collected/view/
  - /ja/real_user_monitoring/data_collected/resource/
  - /ja/real_user_monitoring/data_collected/long_task/
  - /ja/real_user_monitoring/data_collected/error/
  - /ja/real_user_monitoring/data_collected/user_action/
further_reading:
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: ブログ
    text: リアルユーザーモニタリング
  - link: /real_user_monitoring/explorer/
    tag: Documentation
    text: Datadog でビューを検索する
  - link: /real_user_monitoring/explorer/analytics/
    tag: Documentation
    text: イベントに関する分析論を組み立てる
  - link: /logs/processing/attributes_naming_convention/
    tag: Documentation
    text: Datadog 標準属性
---
デフォルトでは、収集されたすべてのデータは詳細な粒度で 15 日間保持されます。Datadog リアルユーザーモニタリングのスクリプトが、Datadog に 5 種類の主なイベントタイプを送信します。

- [View][4]: ユーザーがセットアップアプリケーションのページにアクセスするたびに、ビューイベントが作成されます。ユーザーがそのビューにとどまっている間、収集されたすべてのデータは、`view.id` 属性でそのビューにアタッチされます。
- [Resource][5]: 画像、XHR/Fetch、CSS、または JS ライブラリのリソースイベントを生成できます。名前や関連付けられている読み込み時間など、リソースに関する情報が含まれています。
- [Long task][6]: メインスレッドを 50 ミリ秒以上ブロックするブラウザのタスクはすべて、ロングタスクと見なされ、特定のイベントが生成されます。
- [Error][7]: ブラウザによってフロントエンドエラーが発生するたびに、RUM はそれをキャッチし、Error Event として Datadog に送信します。
- [User Action][8]: User Action イベントは、特定のユーザーアクションに対して生成できるカスタムイベントです。

{{< tabs >}}
{{% tab "ビュー" %}}

ページビューとは、ウェブサイトからページへアクセスするユーザー数のことです。一意の属性 `view.id` を使うと、ページビューの間の[エラー][1]、[リソース][2]、[ロングタスク][3]、[ユーザーアクション][4]がそのページビューにアタッチされます。新しいイベントが収集されると、ページビューは更新されます。

ページビューには、読み込みパフォーマンスのメトリクスが [Paint Timing API][5] と [Navigation Timing API][6] の両方から収集されます。

シングルページアプリケーション（SPA）では、最初にアクセスしたページでのみパフォーマンスメトリクスを使用できます。ReactJS、AngularJS、VueJS といった最新の Web フレームワークでは、ページをリロードせずにウェブサイトのコンテンツが更新されるため、Datadog は従来のパフォーマンスメトリクスを収集できません。RUM は、[履歴 API][7] を使用してページの変更を追跡できます。

## 収集される測定値

{{< img src="real_user_monitoring/data_collected/view/timing_overview.png" alt="タイミングの概要"  >}}

| 属性                              | タイプ        | 説明                                                                                                                                                                                                                 |
|----------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | 数値（ns） | 現在のビューに費やした時間。                                                                                                                                                                                                  |
| `view.measures.first_contentful_paint` | 数値（ns） | ブラウザによりテキスト、画像（背景画像を含む）、白以外のキャンバス、または SVG が最初にレンダリングされた時間。[詳細][8]                                                                                                |
| `view.measures.dom_interactive`        | 数値（ns） | パーサーによりメインドキュメントの作業が終了された瞬間。[MDN ドキュメントの詳細][9]                                                                                                              |
| `view.measures.dom_content_loaded`     | 数値（ns） | 最初の HTML ドキュメントがレンダリング以外のブロッキングスタイルシート、画像、サブフレームの読み込み完了を待たずに完全に読み込まれ解析される際に発生するイベント。[MDN ドキュメントの詳細][10]。 |
| `view.measures.dom_complete`           | 数値（ns） | ページとすべてのサブリソースの準備が完了。ユーザー側では、ローディングスピナーの回転が停止。[MDN ドキュメントの詳細][11]                                                                             |
| `view.measures.load_event_end`         | 数値（ns） | ページが完全に読み込まれた際に発生するイベント。通常は追加のアプリケーションロジックのトリガー。[MDN ドキュメントの詳細][12]                                                                                   |
| `view.measures.error_count`            | 数値      | このビューについてこれまでに収集されたすべてのエラーの数。                                                                                                                                                                        |
| `view.measures.long_task_count`        | 数値      | このビューについて収集されたすべてのロングタスクの数。                                                                                                                                                                           |
| `view.measures.resource_count`         | 数値      | このビューについて収集されたすべてのリソースの数。                                                                                                                                                                            |
| `view.measures.user_action_count`      | 数値      | このビューについて収集されたすべてのユーザーアクションの数。                                                                                                                                                                         |


[1]: /ja/real_user_monitoring/data_collected/error/
[2]: /ja/real_user_monitoring/data_collected/resource/
[3]: /ja/real_user_monitoring/data_collected/long_task/
[4]: /ja/real_user_monitoring/data_collected/user_action/
[5]: https://www.w3.org/TR/paint-timing/
[6]: https://www.w3.org/TR/navigation-timing/#sec-navigation-timing
[7]: https://developer.mozilla.org/en-US/docs/Web/API/History
[8]: https://www.w3.org/TR/paint-timing/#sec-terminology
[9]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[10]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
{{% /tab %}}
{{% tab "リソース" %}}

デフォルトで、Web サイトのすべてのリソース（画像、XHR、[XMLHttpRequest][1]、CSS の各ファイル、JS アセット、およびフォントファイル）が収集されます。

アプリケーションリソースのロードに関して、ネットワークの詳細なタイミングデータが、[Performance Resource Timing API][2] を使用して収集されます。

{{< img src="real_user_monitoring/data_collected/resource/resource_metric.png" alt="リソースメトリクス"  >}}

## 収集されるメジャー

| 属性                              | タイプ           | 説明                                                                                                                               |
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

| 属性                      | タイプ   | 説明                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `resource.kind`                | 文字列 | 収集されるリソースの種類またはタイプ（CSS、JS、メディア、XHR、画像）           |
| `http.status_code`             | 数値 | 応答ステータスコード。                                                               |
| `http.url`                     | 文字列 | リソースの URL。                                                                       |
| `http.url_details.host`        | 文字列 | URL の HTTP ホスト部分。                                                          |
| `http.url_details.path`        | 文字列 | URL の HTTP パス部分。                                                          |
| `http.url_details.queryString` | オブジェクト | クエリパラメーターの key/value 属性として分解された、URL の HTTP クエリ文字列部分。 |
| `http.url_details.scheme`      | 文字列 | URL のプロトコル名 (HTTP または HTTPS)                                            |


[1]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[2]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
{{% /tab %}}
{{% tab "ロングタスク" %}}

[ロングタスク][1]とは、メインスレッドを 50 ミリ秒以上ブロックするタスクのことです。インプットの高レイテンシーやインタラクションの遅延などの原因となります。ブラウザのパフォーマンスプロファイラーで、ロングタスクの原因を理解しましょう。

## 収集されるメジャー

| 属性  | タイプ   | 説明                |
|------------|--------|----------------------------|
| `duration` | 数値 | ロングタスクの時間。 |


[1]: https://developer.mozilla.org/en-US/docs/Web/API/Long_Tasks_API
{{% /tab %}}
{{% tab "エラー" %}}


ユーザーコンソールに表示されるすべてのエラーが収集されます。

## 収集されるファセット

| 属性       | タイプ   | 説明                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.kind`    | 文字列 | エラーのタイプまたは種類 (場合によってはコード)。                   |
| `error.message` | 文字列 | イベントについて簡潔にわかりやすく説明する 1 行メッセージ。 |
| `error.stack`   | 文字列 | スタックトレースまたはエラーに関する補足情報。     |
| `error.origin`  | 文字列 | エラーの発生元（コンソール、ネットワークなど）          |

### ネットワークエラー

ネットワークエラーの場合、次のファセットも収集されます。

| 属性                      | タイプ   | 説明                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `http.status_code`             | 数値 | 応答ステータスコード。                                                               |
| `http.url`                     | 文字列 | リソースの URL。                                                                       |
| `http.url_details.host`        | 文字列 | URL の HTTP ホスト部分。                                                          |
| `http.url_details.path`        | 文字列 | URL の HTTP パス部分。                                                          |
| `http.url_details.queryString` | オブジェクト | クエリパラメーターの key/value 属性として分解された、URL の HTTP クエリ文字列部分。 |
| `http.url_details.scheme`      | 文字列 | URL のプロトコル名 (HTTP または HTTPS)                                            |

{{% /tab %}}
{{% tab "ユーザーアクション" %}}

カスタムユーザーアクションは、指定したユーザーアクションに対して生成されたカスタムイベントです。[コードをインスツルメントして追加します][1]。

## 収集されるファセット

| 属性    | タイプ   | 説明              |
|--------------|--------|--------------------------|
| `event.name` | 文字列 | ユーザーアクションの名前。 |


[1]: /ja/real_user_monitoring/installation/advanced_configuration/
{{% /tab %}}
{{< /tabs >}}

## デフォルト属性

以下の 5 つのイベントカテゴリには、デフォルトで属性がアタッチされています。

### コア

| 属性名   | タイプ   | 説明                 |
|------------------|--------|-----------------------------|
| `application_id` | 文字列 | Datadog アプリケーション ID。 |
| `session_id`     | 文字列 | セッション ID。             |

### ビュー属性

| 属性名                 | タイプ   | 説明                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `view.id`                      | 文字列 | ページビューごとにランダムに生成された ID。                                                                      |
| `view.url`                     | 文字列 | ビューの URL。                                                                                                  |
| `view.referrer`                | 文字列 | 現在リクエストされているページへのリンクがたどられた前のウェブページの URL。               |
| `view.url_details.host`        | 文字列 | URL の HTTP ホスト部分。                                                                                 |
| `view.url_details.path`        | 文字列 | URL の HTTP パス部分。                                                                                 |
| `view.url_details.path_group`  | 文字列 | 同様の URL に対して生成された自動 URL グループ。（例: `/dashboard/123` と `/dashboard/456` に対する `/dashboard/?`） |
| `view.url_details.queryString` | オブジェクト | クエリパラメーターの key/value 属性として分解された、URL の HTTP クエリ文字列部分。                        |

### ユーザーエージェント

[Datadog 標準属性][1]ロジックに続く次のコンテキストは、Datadog に送信されるすべてのイベントに自動的にアタッチされます。

| 属性名                           | タイプ   | 説明                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `http.useragent_details.os.family`       | 文字列 | User-Agent によって報告された OS ファミリー。       |
| `http.useragent_details.browser.family`  | 文字列 | User-Agent によって報告されたブラウザファミリー。  |
| `http.useragent_details.device.family`   | 文字列 | User-Agent によって報告されたデバイスファミリー。   |
| `http.useragent_details.device.category` | 文字列 | User-Agent によって報告されたデバイスカテゴリ。 |

### 位置情報

以下は、ネットワーク通信で使用される IP アドレスの位置情報に関連する属性です。すべてのフィールドに `network.client.geoip` または `network.destination.geoip` というプレフィックスが付きます。

| 完全名                                    | タイプ   | 説明                                                                                                                          |
|:--------------------------------------------|:-------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `network.client.geoip.country.name`         | 文字列 | 国の名前。                                                                                                                  |
| `network.client.geoip.country.iso_code`     | 文字列 | 国の [ISO コード][2] (米国は `US`、フランスは `FR` など)。                                                  |
| `network.client.geoip.continent.code`       | 文字列 | 大陸の ISO コード (`EU`、`AS`、`NA`、`AF`、`AN`、`SA`、`OC`)                                                                 |
| `network.client.geoip.continent.name`       | 文字列 | 大陸名 (`Europe`、`Australia`、`North America`、`Africa`、`Antartica`、`South America`、`Oceania`)                    |
| `network.client.geoip.subdivision.name`     | 文字列 | その国で最大規模の地方区分 (米国は `California` 州、フランスは `Sarthe` 県など) |
| `network.client.geoip.subdivision.iso_code` | 文字列 | その国で最大規模の地方区分の [ISO コード][2] (米国は `CA`、フランスは `SA` など)    |
| `network.client.geoip.city.name`            | 文字列 | 都市名 (`Paris`、`New York` など)                                                                                   |

## 追加属性

デフォルトの属性に加えて、収集されたすべてのイベントに[特定のグローバルコンテキスト][3]を追加できます。これにより、ユーザーのサブセットのデータを分析することができます。ユーザーメール別のグループエラー、パフォーマンスが最も悪い顧客の把握などです。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/processing/attributes_naming_convention/
[2]: /ja/logs/processing/attributes_naming_convention/#user-agent-attributes
[3]: /ja/real_user_monitoring/installation/advanced_configuration/
[4]: /ja/real_user_monitoring/browser/data_collected/?tab=view
[5]: /ja/real_user_monitoring/browser/data_collected/?tab=resource
[6]: /ja/real_user_monitoring/browser/data_collected/?tab=longtask
[7]: /ja/real_user_monitoring/browser/data_collected/?tab=error
[8]: /ja/real_user_monitoring/browser/data_collected/?tab=useraction