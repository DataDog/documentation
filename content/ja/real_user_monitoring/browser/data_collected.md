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
  tag: ドキュメント
  text: RUM データの変更とコンテキストの追加
- link: /real_user_monitoring/explorer/
  tag: ドキュメント
  text: Datadog 内でビューを探索する
- link: /real_user_monitoring/explorer/visualize/
  tag: ドキュメント
  text: イベントへの視覚化の適用
- link: /logs/log_configuration/attributes_naming_convention
  tag: ドキュメント
  text: Datadog 標準属性
title: 収集された RUM ブラウザデータ
---

## 概要

RUM Browser SDK は、関連するテレメトリと属性を持つイベントを生成します。各 RUM イベントには、[デフォルト属性](#default-attributes) がすべて含まれます。たとえば、ページの URL (`view.url`)、ユーザー情報であるデバイス タイプ (`device.type`) や国 (`geo.country`) などです。

さらに、[イベント タイプ固有の属性](#event-specific-attributes) もあります。たとえば、テレメトリ `view.loading_time` はビュー イベントに関連し、属性 `resource.method` はリソース イベントに関連します。

| イベントタイプ     | 保持期間 | Description                                                                                                                                                                                                                                                   |
|----------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| セッション   | 30 日   | ユーザーセッションは、ユーザーが Web アプリケーションの閲覧を始めると開始されます。これには、ユーザーに関する高レベルの情報 (ブラウザー、デバイス、ジオロケーション) が含まれています。これは、ユーザージャーニー中に収集されたすべての RUM イベントを一意の `session.id` 属性で集約します。**注:** セッションは、15 分間使用しないとリセットされます。 |
| ビュー      | 30 日   | ビューイベントは、ユーザーが Web アプリケーションのページにアクセスするたびに生成されます。ユーザーが同じページにいる間、リソース、ロングタスク、エラー、アクションのイベントは、`view.id` 属性を使用して関連する RUM ビューにリンクされます。                       |
| Resource  | 15 日   | リソースイベントは、Web ページにロードされた画像、XHR、Fetch、CSS、または JS ライブラリに対して生成されます。詳細なロードタイミング情報が含まれています。                                                                                                              |
| ロングタスク | 15 日   | ロングタスクイベントは、メインスレッドを 50 ミリ秒以上ブロックするブラウザ内のすべてのタスクに対して生成されます。                                                                                                                                                    |
| Error     | 30 日   | RUM は、ブラウザによって発行されたすべてのフロントエンドエラーを収集します。                                                                                                                                                                                                     |
| アクション    | 30 日   | RUM アクションイベントは、ユーザージャーニー中のユーザーインタラクションを追跡し、カスタムユーザーアクションを監視するために手動で送信することもできます。                                                                                                                                 |

次の図は、RUM イベント階層を示しています。

{{< img src="real_user_monitoring/data_collected/event-hierarchy.png" alt="RUM イベント階層" style="width:50%;border:none" >}}

## デフォルト属性

RUM ブラウザの[標準属性][1]の完全なリストをご覧ください。デフォルトでは、属性は各イベントタイプに関連付けられているため、クエリされる RUM イベントタイプに関係なく使用できます。

## イベント固有の属性

### セッション属性

| 属性  | タイプ   | Description                |
|------------|--------|----------------------------|
| `session.time_spent` | 数値（ns） | ユーザーセッションの期間。 |
| `session.view.count`        | 数値      | このセッションで収集されたすべてのビューの数。 |
| `session.error.count`      | 数値      | このセッションで収集されたすべてのエラーの数。  |
| `session.resource.count`         | 数値      | このセッションで収集されたすべてのリソースの数。 |
| `session.action.count`      | 数値      | このセッションで収集されたすべてのアクションの数。 |
| `session.long_task.count`      | 数値      | このセッションで収集されたすべてのロングタスクの数。 |

### セッション属性

| 属性名                 | タイプ   | Description                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `session.id`                      | 文字列 | セッションごとにランダムに生成された ID。                                                                      |
| `session.ip`                      | 文字列 | クライアントの IP アドレス。この属性の収集を停止したい場合は、[アプリケーションの詳細][2]で設定を変更してください。                                                                       |
| `session.is_active`                      | ブール値 | セッションが現在アクティビティであるかどうかを示します。セッションは、4 時間のアクティビティまたは 15 分の非アクティブの後に終了します。                                                                     |
| `session.type`                     | 文字列 | セッションのタイプ: `user` または `synthetics`。[Synthetic Monitoring Browser Tests][3] のセッションは請求対象外です。 |
| `session.referrer`                | 文字列 | 現在リクエストされているページへのリンクがたどられた前のウェブページの URL。 |
| `session.initial_view.id`        | 文字列 | ユーザーによって生成された最初の RUM ビューの ID。 |
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

### ビュー タイミング属性 

**注**: ビュー タイミングのテレメトリには、ページがバックグラウンドで開かれている時間も含まれます。

| 属性                       | タイプ        | Description                                                                                                                                                                                                           |
|---------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`               | 数値（ns） | 現在のビューに費やした時間。                                                                                                                                                                                       |
| `view.first_byte`               | 数値（ns） | ビューの 1 バイト目を受信した時点までの経過時間。                                                                                                |
| `view.largest_contentful_paint` | 数値（ns） | ビューポート内の最大の DOM オブジェクト (画面に表示される) がレンダリングされるページ読み込みの時間。                                                                                                |
| `view.largest_contentful_paint_target_selector` | 文字列 (CSS セレクタ) | 最大のコンテンツ描画に対応する要素の CSS セレクタ。                                                                                     |
| `view.first_input_delay`        | 数値（ns） | ユーザーがページを最初に操作してからブラウザが応答するまでの経過時間。                                                                                                                             |
| `view.first_input_delay_target_selector`      | 文字列 (CSS セレクタ) | ユーザーが最初に操作した要素の CSS セレクタ。                                                                                                                |
| `view.interaction_to_next_paint`| 数値（ns） | ユーザーがページとやり取りしてから次の描画が行われるまでの最長時間                                                                                                                              |
| `view.interaction_to_next_paint_target_selector`| 文字列 (CSS セレクタ) | 次の描画が行われるまでの最長インタラクションに関連する要素の CSS セレクタ。                                                                                                          |
| `view.cumulative_layout_shift`  | 数値      | 動的に読み込まれるコンテンツ (サードパーティの広告など) による予期しないページ移動を定量化します。`0` はシフトが発生していないことを意味します。                                                                               |
| `view.cumulative_layout_shift_target_selector`  | 文字列 (CSS セレクタ) | ページの CLS に最も寄与する要素の CSS セレクタ。                                           |
| `view.loading_time`             | 数値（ns） | ページの準備が整い、ネットワークリクエストや DOM ミューテーションが発生しなくなるまでの時間。[詳しくはページパフォーマンスの監視をご覧ください][4]。                                                                             |
| `view.first_contentful_paint`   | 数値（ns） | ブラウザによりテキスト、画像（背景画像を含む）、白以外のキャンバス、または SVG が最初にレンダリングする時間。ブラウザのレンダリングの詳細については、[w3c 定義][5]を参照してください。                               |
| `view.dom_interactive`          | 数値（ns） | パーサーによりメインドキュメントの作業が終了するまでの時間。[MDN ドキュメントの詳細][6]。                                                                                                         |
| `view.dom_content_loaded`       | 数値（ns） | 読み込みイベントが発生し、最初の HTML ドキュメントがレンダリング以外のブロッキングスタイルシート、画像、サブフレームの読み込み完了を待たずに完全に読み込まれ解析されるまでの時間。[MDN ドキュメントの詳細][7]。 |
| `view.dom_complete`             | 数値（ns） | ページとすべてのサブリソースの準備が整うまでの時間。ユーザーのためにローディングスピナーの回転が停止した状態。[詳細は MDN ドキュメントを参照してください][8]。                                                                       |
| `view.load_event`               | 数値（ns） | ページが完全に読み込まれたことを示す読み込みイベントが発生するまでの時間。通常は追加のアプリケーションロジックのトリガー。[MDN ドキュメントの詳細][9]。                                                                             |
| `view.error.count`              | 数値      | このビューについて収集されたすべてのエラーの数。                                                                                                                                                                          |
| `view.long_task.count`          | 数値      | このビューについて収集されたすべてのロングタスクの数。                                                                                                                                                                      |
| `view.resource.count`           | 数値      | このビューについて収集されたすべてのリソースの数。                                                                                                                                                                       |
| `view.action.count`             | 数値      | このビューについて収集されたすべてのアクションの数。                                                                                                                                                                         |

### リソース タイミング属性 

アプリケーションリソースのロードについて、ネットワークの詳細なタイミングデータが、[Performance Resource Timing API][10] を使用して収集されます。

| 属性                              | タイプ           | Description                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `resource.duration`            | 数値         | リソースのロードにかかった全時間。                                                                                                   |
| `resource.size`                | 数値（バイト） | リソースのサイズ。                                                                                                                            |
| `resource.connect.duration`    | 数値（ns）    | サーバーへの接続が確立されるまでにかかった時間 (connectEnd - connectStart)。                                                            |
| `resource.ssl.duration`        | 数値（ns）    | TLS ハンドシェイクに要した時間。最後のリクエストが HTTPS でない場合、この属性は表示されません (connectEnd - secureConnectionStart)。 |
| `resource.dns.duration`        | 数値（ns）    | 最後のリクエストの DNS 名が解決されるまでにかかった時間 (domainLookupEnd - domainLookupStart)。                                               |
| `resource.redirect.duration`   | 数値（ns）    | 後続の HTTP リクエストにかかった時間 (redirectEnd - redirectStart)。                                                                      |
| `resource.first_byte.duration` | 数値（ns）    | 応答の最初のバイトを受信するまでにかかった時間 (responseStart - RequestStart)。                                           |
| `resource.download.duration`   | 数値（ns）    | 応答のダウンロードにかかった時間 (responseEnd - responseStart)。                                                                         |

### リソースの属性

| 属性                  | タイプ   | Description                                                                                          |
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

### ロング タスク タイミング属性

| 属性  | タイプ   | Description                |
|------------|--------|----------------------------|
| `long_task.duration` | 数値 | ロングタスクの時間。 |

### エラー属性

| 属性       | タイプ   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | 文字列 | エラーの発生元 (`console` など)。[エラーソース][11]を参照してください。   |
| `error.type`    | 文字列 | エラーのタイプ (場合によってはエラーコード)。                   |
| `error.message` | 文字列 | イベントについて簡潔にわかりやすく説明する 1 行メッセージ。 |
| `error.stack`   | 文字列 | スタックトレースまたはエラーに関する補足情報。     |

#### ソースエラー

ソースエラーには、エラーに関するコードレベルの情報が含まれます。エラーの種類に関する詳細は、 [MDN ドキュメント][12]を参照してください。

| 属性       | タイプ   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | 文字列 | エラーのタイプ (場合によってはエラーコード)。                   |

### アクション タイミング属性

| 属性    | タイプ   | Description              |
|--------------|--------|--------------------------|
| `action.loading_time` | 数値（ns） | アクションのロード時間。[ユーザーアクション追跡のドキュメント][13]で計算方法を確認してください。 |
| `action.long_task.count`        | 数値      | このアクションについて収集されたすべてのロングタスクの数。 |
| `action.resource.count`         | 数値      | このアクションについて収集されたすべてのリソースの数。 |
| `action.error.count`      | 数値      | このアクションについて収集されたすべてのエラーの数。|

### アクションの属性

| 属性    | タイプ   | Description              |
|--------------|--------|--------------------------|
| `action.id` | 文字列 | ユーザーアクションの UUID。 |
| `action.type` | 文字列 | ユーザーアクションのタイプ。[カスタムユーザーアクション][14]の場合、`custom` に設定されます。 |
| `action.target.name` | 文字列 | ユーザーが操作したエレメント。自動収集されたアクションのみ対象。 |
| `action.name` | 文字列 | 作成されたユーザーフレンドリーな名称 (`Click on #checkout` など)。[カスタムユーザーアクション][14]の場合は、API コールで提供されたアクション名。 |

### フラストレーションシグナルフィールド

| フィールド                | タイプ   | Description                                                   |
|-------------------------------|--------|---------------------------------------------------------------|
| `session.frustration.count`     | 数値 | 1 つのセッションに関連するすべてのフラストレーションシグナルの数。 |
| `view.frustration.count`        | 数値 | 1 つのビューに関連するすべてのフラストレーションシグナルの数。    |
| `action.frustration.type:dead_click`  | 文字列 | RUM ブラウザ SDK で検出されたデッドクリック。              |
| `action.frustration.type:rage_click`  | 文字列 | RUM ブラウザ SDK で検出されたレイジークリック。              |
| `action.frustration.type:error_click` | 文字列 | RUM ブラウザ SDK で検出されたエラークリック。             |

### UTM 属性

| フィールド                | タイプ   | Description                                                   |
|-------------------------------|--------|---------------------------------------------------------------|
| `view.url_query.utm_source`     | 文字列 | トラフィックのソースを追跡する URL のパラメーター。 |
| `view.url_query.utm_medium`        | 文字列 | トラフィックの発信元チャンネルを追跡する URL のパラメーター。    |
| `view.url_query.utm_campaign`  | 文字列 | そのビューに関連付けられた特定のマーケティングキャンペーンを識別する URL のパラメーター。              |
| `view.url_query.utm_content`  | 文字列 | マーケティングキャンペーン内でユーザーがクリックした特定の要素を特定する URL 内のパラメーター。           |
| `view.url_query.utm_term` | 文字列 | ユーザーが特定のキャンペーンをトリガーするために検索したキーワードを追跡する URL のパラメーター。             |

## 参考情報

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
[13]: /ja/real_user_monitoring/browser/tracking_user_actions/?tab=npm#action-timing-telemetry
[14]: /ja/real_user_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions