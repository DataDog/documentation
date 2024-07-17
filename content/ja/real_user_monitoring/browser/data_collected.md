---
aliases:
- /ja/real_user_monitoring/data_collected/
- /ja/real_user_monitoring/data_collected/view/
- /ja/real_user_monitoring/data_collected/resource/
- /ja/real_user_monitoring/data_collected/long_task/
- /ja/real_user_monitoring/data_collected/error/
- /ja/real_user_monitoring/data_collected/user_action/
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: ブログ
  text: Datadog リアルユーザーモニタリングのご紹介
- link: /real_user_monitoring/browser/advanced_configuration
  tag: Documentation
  text: RUM データの変更とコンテキストの追加
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Datadog でビューを検索する
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentation
  text: イベントへの視覚化の適用
- link: /logs/log_configuration/attributes_naming_convention
  tag: ドキュメント
  text: Datadog 標準属性
kind: ドキュメント
title: 収集された RUM ブラウザデータ
---

## 概要

RUM ブラウザ SDK は、メトリクスと属性が関連付けられたイベントを生成します。すべての RUM イベントには、すべての[デフォルト属性](#default-attributes)があります。例: ページの URL (`view.url`) や、デバイスタイプ (`device.type`) や 国 (`geo.country`) などのユーザー情報。

追加の[特定のイベントタイプに固有のメトリクスと属性](#event-specific-metrics-and-attributes)があります。たとえば、`view.loading_time` メトリクスはビューイベントに関連付けられ、`resource.method` 属性はリソースイベントに関連付けられます。

| イベントタイプ     | 保存期間 | 説明                                                                                                                                                                                                                                                   |
|----------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| セッション   | 30 日   | ユーザーセッションは、ユーザーが Web アプリケーションの閲覧を始めると開始されます。これには、ユーザーに関する高レベルの情報 (ブラウザー、デバイス、ジオロケーション) が含まれています。これは、ユーザージャーニー中に収集されたすべての RUM イベントを一意の `session.id` 属性で集約します。**注:** セッションは、15 分間使用しないとリセットされます。 |
| ビュー      | 30 日   | ビューイベントは、ユーザーが Web アプリケーションのページにアクセスするたびに生成されます。ユーザーが同じページにいる間、リソース、ロングタスク、エラー、アクションのイベントは、`view.id` 属性を使用して関連する RUM ビューにリンクされます。                       |
| Resource  | 15 日   | リソースイベントは、Web ページにロードされた画像、XHR、Fetch、CSS、または JS ライブラリに対して生成されます。詳細なロードタイミング情報が含まれています。                                                                                                              |
| ロングタスク | 15 日   | ロングタスクイベントは、メインスレッドを 50 ミリ秒以上ブロックするブラウザ内のすべてのタスクに対して生成されます。                                                                                                                                                    |
| エラー     | 30 日   | RUM は、ブラウザによって発行されたすべてのフロントエンドエラーを収集します。                                                                                                                                                                                                     |
| アクション    | 30 日   | RUM アクションイベントは、ユーザージャーニー中のユーザーインタラクションを追跡し、カスタムユーザーアクションを監視するために手動で送信することもできます。                                                                                                                                 |

次の図は、RUM イベント階層を示しています。

{{< img src="real_user_monitoring/data_collected/event-hierarchy.png" alt="RUM イベント階層" style="width:50%;border:none" >}}

## デフォルト属性

See a complete list of [Standard Attributes][1] for RUM Browser. By default, the attributes are attached to each event type, so you can use them regardless of the RUM event type being queried.

## Event-specific metrics and attributes

### Session metrics

| Metric  | Type   | Description                |
|------------|--------|----------------------------|
| `session.time_spent` | number (ns) | Duration of the user session. |
| `session.view.count`        | number      | Count of all views collected for this session. |
| `session.error.count`      | number      | Count of all errors collected for this session.  |
| `session.resource.count`         | number      | Count of all resources collected for this session. |
| `session.action.count`      | number      | Count of all actions collected for this session. |
| `session.long_task.count`      | number      | Count of all long tasks collected for this session. |

### Session attributes

| Attribute name                 | Type   | Description                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `session.id`                      | 文字列 | Randomly generated ID for each session.                                                                      |
| `session.ip`                      | 文字列 | Client IP address. If you want to stop collecting this attribute, change the setting in your [application details][2].                                                                       |
| `session.is_active`                      | boolean | Indicates if the session is currently active. The session ends after 4 hours of activity or 15 minutes of inactivity.                                                                     |
| `session.type`                     | 文字列 | The type of session: `user` or `synthetics`. Sessions from [Synthetic Monitoring Browser Tests][3] are excluded from billing. |
| `session.referrer`                | 文字列 | The URL of the previous web page from which a link to the currently requested page was followed. |
| `session.initial_view.id`        | 文字列 | The ID of the first RUM view generated by the user. |
| `session.initial_view.url_host`        | string | The host part of the URL. |
| `session.initial_view.url_path`        | string | The path part of the URL. |
| `session.initial_view.url_path_group`  | string | The automatic URL group generated for similar URLs (for example, `/dashboard/?` for `/dashboard/123` and `/dashboard/456`). |
| `session.initial_view.url_query` | object | The query string parts of the URL decomposed as query params key/value attributes. |
| `session.initial_view.url_scheme` | object | The scheme part of the URL. |
| `session.last_view.id`        | string | The ID of the last RUM view generated by the user. |
| `session.last_view.url_host`        | string | The host part of the URL. |
| `session.last_view.url_path`        | string | The path part of the URL. |
| `session.last_view.url_path_group`  | string | The automatic URL group generated for similar URLs (for example, `/dashboard/?` for `/dashboard/123` and `/dashboard/456`). |
| `session.last_view.url_query` | object | The query string parts of the URL decomposed as query params key/value attributes. |
| `session.last_view.url_scheme` | object | The scheme part of the URL. |

### View timing metrics

**Note**: View timing metrics include time that a page is open in the background.

| Attribute                       | Type        | Description                                                                                                                                                                                                           |
|---------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`               | number (ns) | Time spent on the current view.                                                                                                                                                                                       |
| `view.first_byte`               | number (ns) | Time elapsed until the first byte of the view has been received.                                                                                                |
| `view.largest_contentful_paint` | number (ns) | Time in the page load where the largest DOM object in the viewport (visible on screen) is rendered.                                                                                                |
| `view.largest_contentful_paint_target_selector` | string (CSS selector) | CSS Selector of the element corresponding to the largest contentful paint.                                                                                     |
| `view.first_input_delay`        | number (ns) | Time elapsed between a user's first interaction with the page and the browser's response.                                                                                                                             |
| `view.first_input_delay_target_selector`      | string (CSS selector) | CSS selector of the first element the user interacted with.                                                                                                                |
| `view.interaction_to_next_paint`| number (ns) | Longest duration between a user's interaction with the page and the next paint.                                                                                                                              |
| `view.interaction_to_next_paint_target_selector`| string (CSS selector) | CSS selector of the element associated with the longest interaction to the next paint.                                                                                                          |
| `view.cumulative_layout_shift`  | number      | Quantifies unexpected page movement due to dynamically loaded content (for example, third-party ads) where `0` means that no shifts are happening.                                                                               |
| `view.cumulative_layout_shift_target_selector`  | string (CSS selector) | CSS selector of the most shifted element contributing to the page CLS.                                           |
| `view.loading_time`             | number (ns) | Time until the page is ready and no network request or DOM mutation is currently occurring. [More info from Monitoring Page Performance][4].                                                                             |
| `view.first_contentful_paint`   | number (ns) | Time when the browser first renders any text, image (including background images), non-white canvas, or SVG. For more information about browser rendering, see the [w3c definition][5].                               |
| `view.dom_interactive`          | number (ns) | Time until the parser finishes its work on the main document. [More info from the MDN documentation][6].                                                                                                         |
| `view.dom_content_loaded`       | number (ns) | Time until the load event is fired and the initial HTML document is completely loaded and parsed, without waiting for non-render blocking stylesheets, images, and subframes to finish loading. [More info from the MDN documentation][7]. |
| `view.dom_complete`             | number (ns) | Time until the page and all of the subresources are ready. The loading spinner has stopped spinning for the user. [More info from the MDN documentation][8].                                                                       |
| `view.load_event`               | number (ns) | Time until the load event is fired, indicating the page is fully loaded. Usually a trigger for additional application logic. [More info from the MDN documentation][9].                                                                             |
| `view.error.count`              | number      | Count of all errors collected for this view.                                                                                                                                                                          |
| `view.long_task.count`          | number      | Count of all long tasks collected for this view.                                                                                                                                                                      |
| `view.resource.count`           | number      | Count of all resources collected for this view.                                                                                                                                                                       |
| `view.action.count`             | number      | Count of all actions collected for this view.                                                                                                                                                                         |

### Resource timing metrics

Detailed network timing data for the loading of an application's resources are collected with the [Performance Resource Timing API][10].

| Metric                              | Type           | Description                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | number         | Entire time spent loading the resource.                                                                                                   |
| `resource.size`                | number (bytes) | Resource size.                                                                                                                            |
| `resource.connect.duration`    | number (ns)    | Time spent establishing a connection to the server (connectEnd - connectStart).                                                            |
| `resource.ssl.duration`        | number (ns)    | Time spent for the TLS handshake. If the last request is not over HTTPS, this metric does not appear (connectEnd - secureConnectionStart). |
| `resource.dns.duration`        | number (ns)    | Time spent resolving the DNS name of the last request (domainLookupEnd - domainLookupStart).                                               |
| `resource.redirect.duration`   | number (ns)    | Time spent on subsequent HTTP requests (redirectEnd - redirectStart).                                                                      |
| `resource.first_byte.duration` | number (ns)    | Time spent waiting for the first byte of response to be received (responseStart - RequestStart).                                           |
| `resource.download.duration`   | number (ns)    | Time spent downloading the response (responseEnd - responseStart).                                                                         |

### Resource attributes

| Attribute                  | Type   | Description                                                                                          |
|----------------------------|--------|------------------------------------------------------------------------------------------------------|
| `resource.type`            | string | The type of resource being collected (for example, `css`, `javascript`, `media`, `XHR`, or `image`). |
| `resource.method`          | string | The HTTP method (for example `POST` or `GET`).                                                       |
| `resource.status_code`     | number | The response status code (available for fetch/XHR resources only).                                   |
| `resource.url`             | string | The resource URL.                                                                                    |
| `resource.url_host`        | string | The host part of the URL.                                                                            |
| `resource.url_path`        | string | The path part of the URL.                                                                            |
| `resource.url_query`       | object | The query string parts of the URL decomposed as query params key/value attributes.                   |
| `resource.url_scheme`      | string | The protocol name of the URL (HTTP or HTTPS).                                                        |
| `resource.provider.name`   | string | The resource provider name. Default is `unknown`.                                                    |
| `resource.provider.domain` | string | The resource provider domain.                                                                        |
| `resource.provider.type`   | string | The resource provider type (for example, `first-party`, `cdn`, `ad`, or `analytics`).                |

### Long task timing metrics

| Metric  | Type   | Description                |
|------------|--------|----------------------------|
| `long_task.duration` | number | Duration of the long task. |

### Error attributes

| Attribute       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | string | Where the error originates from (for example, `console`). See [Error sources][11].   |
| `error.type`    | string | The error type (or error code in some cases).                   |
| `error.message` | string | A concise, human-readable, one-line message explaining the event. |
| `error.stack`   | string | The stack trace or complementary information about the error.     |

#### Source errors

Source errors include code-level information about the error. For more information about different error types, see the [MDN documentation][12].

| Attribute       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | string | The error type (or error code in some cases).                   |

### Action timing metrics

| Metric    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.loading_time` | number (ns) | The loading time of the action. See how it is calculated in the [Tracking User Actions documentation][13]. |
| `action.long_task.count`        | number      | Count of all long tasks collected for this action. |
| `action.resource.count`         | number      | Count of all resources collected for this action. |
| `action.error.count`      | number      | Count of all errors collected for this action.|

### Action attributes

| Attribute    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.id` | string | UUID of the user action. |
| `action.type` | string | Type of the user action. For [Custom User Actions][14], it is set to `custom`. |
| `action.target.name` | string | Element that the user interacted with. Only for automatically collected actions. |
| `action.name` | string | User-friendly name created (for example, `Click on #checkout`). For [Custom User Actions][14], the action name given in the API call. |

### Frustration signals fields

| Field                | Type   | Description                                                   |
|-------------------------------|--------|---------------------------------------------------------------|
| `session.frustration.count`     | number | Count of all frustration signals associated with one session. |
| `view.frustration.count`        | number | Count of all frustration signals associated with one view.    |
| `action.frustration.type:dead_click`  | string | The dead clicks detected by the RUM Browser SDK.              |
| `action.frustration.type:rage_click`  | string | The rage clicks detected by the RUM Browser SDK.              |
| `action.frustration.type:error_click` | string | The error clicks detected by the RUM Browser SDK.             |

### UTM attributes

| Field                | Type   | Description                                                   |
|-------------------------------|--------|---------------------------------------------------------------|
| `view.url_query.utm_source`     | string | The parameter in the URL tracking the source of traffic. |
| `view.url_query.utm_medium`        | string | The parameter in the URL tracking the channel where the traffic is coming from.    |
| `view.url_query.utm_campaign`  | string | The paramter in the URL identifying the specific marketing campaign tied to that view.              |
| `view.url_query.utm_content`  | string | The paramter in the URL identifying the specific element a user clicked within a marketing campaign.           |
| `view.url_query.utm_term` | string | The parameter in the URL tracking the keyword a user searched to trigger a given campaign.             |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/standard-attributes/?product=browser
[2]: /ja/data_security/real_user_monitoring/#ip-address
[3]: /ja/synthetics/browser_tests/
[4]: /ja/real_user_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[5]: https://www.w3.org/TR/paint-timing/#sec-terminology
[6]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[8]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[9]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[10]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[11]: /ja/real_user_monitoring/browser/collecting_browser_errors#error-sources
[12]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[13]: /ja/real_user_monitoring/browser/tracking_user_actions/?tab=npm#action-timing-metrics
[14]: /ja/real_user_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions