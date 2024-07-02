---
title: RUM Browser Data Collected
kind: documentation
aliases:
  - /real_user_monitoring/data_collected/
  - /real_user_monitoring/data_collected/view/
  - /real_user_monitoring/data_collected/resource/
  - /real_user_monitoring/data_collected/long_task/
  - /real_user_monitoring/data_collected/error/
  - /real_user_monitoring/data_collected/user_action/
further_reading:
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
  tag: Blog
  text: Introducing Datadog Real User Monitoring
- link: /real_user_monitoring/browser/advanced_configuration
  tag: Documentation
  text: Modifying RUM data and adding context
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Explore your views within Datadog
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentation
  text: Apply visualizations on your events
- link: /logs/log_configuration/attributes_naming_convention
  tag: Documentation
  text: Datadog standard attributes
---

## Overview

The RUM Browser SDK generates events that have associated metrics and attributes. Every RUM event has all of the [default attributes](#default-attributes), for example, the URL of the page (`view.url`) and user information such as their device type (`device.type`) and their country (`geo.country`).

There are additional [metrics and attributes specific to a given event type](#event-specific-metrics-and-attributes). For example, the `view.loading_time` metric is associated with view events, and the `resource.method` attribute is associated with resource events.

| Event Type     | Retention | Description                                                                                                                                                                                                                                                   |
|----------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Session   | 30 days   | A user session begins when a user starts browsing the web application. It contains high-level information about the user (browser, device, geo-location). It aggregates all RUM events collected during the user journey with a unique `session.id` attribute. **Note:** The session resets after 15 minutes of inactivity. |
| View      | 30 days   | A view event is generated each time a user visits a page of the web application. While the user remains on the same page, resource, long-task, error, and action events are linked to the related RUM view with the `view.id` attribute.                       |
| Resource  | 15 days   | A resource event is generated for images, XHR, Fetch, CSS, or JS libraries loaded on a webpage. It includes detailed loading timing information.                                                                                                              |
| Long Task | 15 days   | A long task event is generated for any task in the browser that blocks the main thread for more than 50ms.                                                                                                                                                    |
| Error     | 30 days   | RUM collects every frontend error emitted by the browser.                                                                                                                                                                                                     |
| Action    | 30 days   | RUM action events track user interactions during a user journey and can also be manually sent to monitor custom user actions.                                                                                                                                 |

The following diagram illustrates the RUM event hierarchy:

{{< img src="real_user_monitoring/data_collected/event-hierarchy.png" alt="RUM Event hierarchy" style="width:50%;border:none" >}}

## Default attributes

See a complete list of [Standard Attributes][1] for RUM Browser. By default, the attributes are attached to each event type, so you can use them regardless of the RUM event type being queried.

## イベント固有のメトリクスと属性

### セッションメトリクス

| メトリクス  | タイプ   | 説明                |
|------------|--------|----------------------------|
| `session.time_spent` | 数値（ns） | ユーザーセッションの期間。 |
| `session.view.count`        | 数値      | このセッションで収集されたすべてのビューの数。 |
| `session.error.count`      | 数値      | このセッションで収集されたすべてのエラーの数。  |
| `session.resource.count`         | 数値      | このセッションで収集されたすべてのリソースの数。 |
| `session.action.count`      | 数値      | このセッションで収集されたすべてのアクションの数。 |
| `session.long_task.count`      | 数値      | このセッションで収集されたすべてのロングタスクの数。 |

### セッション属性

| 属性名                 | タイプ   | 説明                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `session.id`                      | string | セッションごとにランダムに生成された ID。                                                                      |
| `session.ip`                      | string | Client IP address. If you want to stop collecting this attribute, change the setting in your [application details][2].                                                                       |
| `session.is_active`                      | ブール値 | セッションが現在アクティビティであるかどうかを示します。セッションは、4 時間のアクティビティまたは 15 分の非アクティブの後に終了します。                                                                     |
| `session.type`                     | string | The type of session: `user` or `synthetics`. Sessions from [Synthetic Monitoring Browser Tests][3] are excluded from billing. |
| `session.referrer`                | string | 現在リクエストされているページへのリンクがたどられた前のウェブページの URL。 |
| `session.initial_view.id`        | string | ユーザーによって生成された最初の RUM ビューの ID。 |
| `session.initial_view.url_host`        | 文字列 | URL のホスト部分。 |
| `session.initial_view.url_path`        | 文字列 | URL のパス部分。 |
| `session.initial_view.url_path_group`  | 文字列 | 同様の URL に対して生成された自動 URL グループ。( `/dashboard/123` と `/dashboard/456` に対する `/dashboard/?`　など)。 |
| `session.initial_view.url_query` | オブジェクト | クエリパラメーターの key/value 属性として分解された、URL のクエリ文字列部分。 |
| `session.initial_view.url_scheme` | オブジェクト | URL のスキーム部分。 |
| `session.last_view.id`        | 文字列 | ユーザーによって生成された最後の RUM ビューの ID。 |
| `session.last_view.url_host`        | 文字列 | URL のホスト部分。 |
| `session.last_view.url_path`        | 文字列 | URL のパス部分。 |
| `session.last_view.url_path_group`  | 文字列 | 同様の URL に対して生成された自動 URL グループ。( `/dashboard/123` と `/dashboard/456` に対する `/dashboard/?`　など)。 |
| `session.last_view.url_query` | オブジェクト | クエリパラメーターの key/value 属性として分解された、URL のクエリ文字列部分。 |
| `session.last_view.url_scheme` | オブジェクト | URL のスキーム部分。 |

### ビュータイミングメトリクス

**注**: ビュータイミングメトリクスには、バックグラウンドでページを開いている時間が含まれます。

| 属性                       | タイプ        | 説明                                                                                                                                                                                                           |
|---------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`               | 数値（ns） | 現在のビューに費やした時間。                                                                                                                                                                                       |
| `view.first_byte`               | 数値（ns） | ビューの 1 バイト目を受信した時点までの経過時間。                                                                                                |
| `view.largest_contentful_paint` | 数値（ns） | ビューポート内の最大の DOM オブジェクト (画面に表示される) がレンダリングされるページ読み込みの時間。                                                                                                |
| `view.largest_contentful_paint_target_selector` | string (CSS selector) | 最大のコンテンツ描画に対応する要素の CSS セレクタ。                                                                                     |
| `view.first_input_delay`        | 数値（ns） | ユーザーがページを最初に操作してからブラウザが応答するまでの経過時間。                                                                                                                             |
| `view.first_input_delay_target_selector`      | string (CSS selector) | CSS selector of the first element the user interacted with.                                                                                                                |
| `view.interaction_to_next_paint`| 数値（ns） | Longest duration between a user's interaction with the page and the next paint.                                                                                                                              |
| `view.interaction_to_next_paint_target_selector`| string (CSS selector) | CSS selector of the element associated with the longest interaction to the next paint.                                                                                                          |
| `view.cumulative_layout_shift`  | 数値      | 動的に読み込まれるコンテンツ (サードパーティの広告など) による予期しないページ移動を定量化します。`0` はシフトが発生していないことを意味します。                                                                               |
| `view.cumulative_layout_shift_target_selector`  | string (CSS selector) | CSS selector of the most shifted element contributing to the page CLS.                                           |
| `view.loading_time`             | 数値（ns） | Time until the page is ready and no network request or DOM mutation is currently occurring. [More info from Monitoring Page Performance][4].                                                                             |
| `view.first_contentful_paint`   | 数値（ns） | ブラウザによりテキスト、画像（背景画像を含む）、白以外のキャンバス、または SVG が最初にレンダリングする時間。ブラウザのレンダリングの詳細については、[w3c 定義][5]を参照してください。                               |
| `view.dom_interactive`          | 数値（ns） | Time until the parser finishes its work on the main document. [More info from the MDN documentation][6].                                                                                                         |
| `view.dom_content_loaded`       | 数値（ns） | Time until the load event is fired and the initial HTML document is completely loaded and parsed, without waiting for non-render blocking stylesheets, images, and subframes to finish loading. [More info from the MDN documentation][7]. |
| `view.dom_complete`             | 数値（ns） | Time until the page and all of the subresources are ready. The loading spinner has stopped spinning for the user. [More info from the MDN documentation][8].                                                                       |
| `view.load_event`               | 数値（ns） | Time until the load event is fired, indicating the page is fully loaded. Usually a trigger for additional application logic. [More info from the MDN documentation][9].                                                                             |
| `view.error.count`              | 数値      | このビューについて収集されたすべてのエラーの数。                                                                                                                                                                          |
| `view.long_task.count`          | 数値      | このビューについて収集されたすべてのロングタスクの数。                                                                                                                                                                      |
| `view.resource.count`           | 数値      | このビューについて収集されたすべてのリソースの数。                                                                                                                                                                       |
| `view.action.count`             | 数値      | このビューについて収集されたすべてのアクションの数。                                                                                                                                                                         |

### リソースタイミングメトリクス

Detailed network timing data for the loading of an application's resources are collected with the [Performance Resource Timing API][10].

| メトリクス                              | タイプ           | 説明                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | 数値         | リソースのロードにかかった全時間。                                                                                                   |
| `resource.size`                | 数値（バイト） | リソースのサイズ。                                                                                                                            |
| `resource.connect.duration`    | 数値（ns）    | サーバーへの接続が確立されるまでにかかった時間 (connectEnd - connectStart)。                                                            |
| `resource.ssl.duration`        | 数値（ns）    | TLS ハンドシェイクにかかった時間。最後のリクエストが HTTPS 経由ではなかった場合、このメトリクスは収集されません (connectEnd - secureConnectionStart)。 |
| `resource.dns.duration`        | 数値（ns）    | 最後のリクエストの DNS 名が解決されるまでにかかった時間 (domainLookupEnd - domainLookupStart)。                                               |
| `resource.redirect.duration`   | 数値（ns）    | 後続の HTTP リクエストにかかった時間 (redirectEnd - redirectStart)。                                                                      |
| `resource.first_byte.duration` | 数値（ns）    | 応答の最初のバイトを受信するまでにかかった時間 (responseStart - RequestStart)。                                           |
| `resource.download.duration`   | 数値（ns）    | 応答のダウンロードにかかった時間 (responseEnd - responseStart)。                                                                         |

### リソースの属性

| 属性                  | タイプ   | 説明                                                                                          |
|----------------------------|--------|------------------------------------------------------------------------------------------------------|
| `resource.type`            | 文字列 | 収集されるリソースのタイプ (`css`、`javascript`、`media`、`XHR`、または `image` など)。 |
| `resource.method`          | 文字列 | HTTP メソッド (`POST` または `GET` など)。                                                       |
| `resource.status_code`     | 数値 | 応答ステータスコード (fetch/XHR リソースにのみ適用)。                                   |
| `resource.url`             | 文字列 | リソースの URL。                                                                                    |
| `resource.url_host`        | 文字列 | URL のホスト部分。                                                                            |
| `resource.url_path`        | 文字列 | URL のパス部分。                                                                            |
| `resource.url_query`       | オブジェクト | クエリパラメーターの key/value 属性として分解された、URL のクエリ文字列部分。                   |
| `resource.url_scheme`      | 文字列 | URL のプロトコル名 (HTTP または HTTPS)。                                                        |
| `resource.provider.name`   | 文字列 | リソースプロバイダー名。デフォルトは `unknown` となります。                                                    |
| `resource.provider.domain` | 文字列 | リソースプロバイダーのドメイン。                                                                        |
| `resource.provider.type`   | 文字列 | リソースプロバイダーのタイプ (`first-party`、`cdn`、`ad`、または `analytics` など)。                |

### ロングタスクタイミングメトリクス

| メトリクス  | タイプ   | 説明                |
|------------|--------|----------------------------|
| `long_task.duration` | 数値 | ロングタスクの時間。 |

### エラー属性

| 属性       | タイプ   | 説明                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | 文字列 | Where the error originates from (for example, `console`). See [Error sources][11].   |
| `error.type`    | 文字列 | エラーのタイプ (場合によってはエラーコード)。                   |
| `error.message` | 文字列 | イベントについて簡潔にわかりやすく説明する 1 行メッセージ。 |
| `error.stack`   | 文字列 | スタックトレースまたはエラーに関する補足情報。     |

#### ソースエラー

Source errors include code-level information about the error. For more information about different error types, see the [MDN documentation][12].

| 属性       | タイプ   | 説明                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | 文字列 | エラーのタイプ (場合によってはエラーコード)。                   |

### アクションタイミングメトリクス

| メトリクス    | タイプ   | 説明              |
|--------------|--------|--------------------------|
| `action.loading_time` | 数値（ns） | The loading time of the action. See how it is calculated in the [Tracking User Actions documentation][13]. |
| `action.long_task.count`        | 数値      | このアクションについて収集されたすべてのロングタスクの数。 |
| `action.resource.count`         | 数値      | このアクションについて収集されたすべてのリソースの数。 |
| `action.error.count`      | 数値      | このアクションについて収集されたすべてのエラーの数。|

### アクションの属性

| 属性    | タイプ   | 説明              |
|--------------|--------|--------------------------|
| `action.id` | 文字列 | ユーザーアクションの UUID。 |
| `action.type` | 文字列 | Type of the user action. For [Custom User Actions][14], it is set to `custom`. |
| `action.target.name` | 文字列 | ユーザーが操作したエレメント。自動収集されたアクションのみ対象。 |
| `action.name` | 文字列 | User-friendly name created (for example, `Click on #checkout`). For [Custom User Actions][14], the action name given in the API call. |

### フラストレーションシグナルフィールド

| フィールド                | タイプ   | 説明                                                   |
|-------------------------------|--------|---------------------------------------------------------------|
| `session.frustration.count`     | 数値 | 1 つのセッションに関連するすべてのフラストレーションシグナルの数。 |
| `view.frustration.count`        | 数値 | 1 つのビューに関連するすべてのフラストレーションシグナルの数。    |
| `action.frustration.type:dead_click`  | 文字列 | RUM ブラウザ SDK で検出されたデッドクリック。              |
| `action.frustration.type:rage_click`  | 文字列 | RUM ブラウザ SDK で検出されたレイジークリック。              |
| `action.frustration.type:error_click` | 文字列 | RUM ブラウザ SDK で検出されたエラークリック。             |

### UTM 属性

| フィールド                | タイプ   | 説明                                                   |
|-------------------------------|--------|---------------------------------------------------------------|
| `view.url_query.utm_source`     | 文字列 | トラフィックのソースを追跡する URL のパラメーター。 |
| `view.url_query.utm_medium`        | 文字列 | トラフィックの発信元チャンネルを追跡する URL のパラメーター。    |
| `view.url_query.utm_campaign`  | 文字列 | そのビューに関連付けられた特定のマーケティングキャンペーンを識別する URL のパラメーター。              |
| `view.url_query.utm_content`  | 文字列 | マーケティングキャンペーン内でユーザーがクリックした特定の要素を特定する URL 内のパラメーター。           |
| `view.url_query.utm_term` | 文字列 | ユーザーが特定のキャンペーンをトリガーするために検索したキーワードを追跡する URL のパラメーター。             |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /standard-attributes/?product=browser
[2]: /data_security/real_user_monitoring/#ip-address
[3]: /synthetics/browser_tests/
[4]: /real_user_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[5]: https://www.w3.org/TR/paint-timing/#sec-terminology
[6]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[8]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[9]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[10]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[11]: /real_user_monitoring/browser/collecting_browser_errors#error-sources
[12]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[13]: /real_user_monitoring/browser/tracking_user_actions/?tab=npm#action-timing-metrics
[14]: /real_user_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions
