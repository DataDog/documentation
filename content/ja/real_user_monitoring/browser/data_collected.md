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

これらの各イベントタイプには、デフォルトで次の属性が付加されています。したがって、照会される RUM イベントタイプに関係なくそれらを使用できます。

### コア

| 属性名   | タイプ   | 説明                 |
|------------------|--------|-----------------------------|
| `type`     | 文字列 | イベントのタイプ (`view` や `resource` など)。             |
| `application.id` | 文字列 | RUM アプリケーションを作成する際に生成される Datadog アプリケーション ID。 |
| `application.name` | 文字列 | Datadog アプリケーションの名前。 |
| `service`     | 文字列 | サービスとは、ブラウザアプリケーションで特定の機能を提供するチームによって構築された一連のページを指します。Web ページをサービスに割り当てるには、[手動ビュー追跡][1]を使用します。             |

### ビュー属性

RUM アクション、エラー、リソース、ロングタスクのイベントには、収集時のアクティブな RUM ビューイベントに関する情報が含まれています。

| 属性名                 | タイプ   | 説明                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `view.id`                      | 文字列 | ページビューごとにランダムに生成された ID。                                                                      |
| `view.loading_type`                     | 文字列 | ページ読み込みのタイプ: `initial_load` または `route_change`。詳細については、[シングルページアプリケーションサポートドキュメント][2]を参照してください。|
| `view.referrer`                | 文字列 | 現在リクエストされているページへのリンクがたどられた前のウェブページの URL。               |
| `view.url`                     | 文字列 | ビューの URL。                                                                                                  |
| `view.url_hash`                     | 文字列 | URL のハッシュ部分。|
| `view.url_host`        | 文字列 | URL のホスト部分。                                                                                |
| `view.url_path`        | 文字列 | URL のパス部分。                                                                                 |
| `view.url_path_group`  | 文字列 | 同様の URL に対して生成された自動 URL グループ。( `/dashboard/123` と `/dashboard/456` に対する `/dashboard/?`　など)。 |
| `view.url_query` | オブジェクト | クエリパラメーターの key/value 属性として分解された、URL のクエリ文字列部分。                        |
| `view.url_scheme` | オブジェクト | URL のスキーム部分。                        |

### デバイス

以下のデバイス関連属性は、Datadog により収集されるすべてのイベントに自動的にアタッチされます。

| 属性名                           | タイプ   | 説明                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `device.type`       | 文字列 | デバイスによって報告されたデバイスタイプ (User-Agent HTTP ヘッダー)。      |
| `device.brand`  | 文字列 | デバイスによって報告されたデバイスブランド (User-Agent HTTP ヘッダー)。  |
| `device.model`   | 文字列 | デバイスによって報告されたデバイスモデル (User-Agent HTTP ヘッダー)。   |
| `device.name` | 文字列 | デバイスによって報告されたデバイス名 (User-Agent HTTP ヘッダー)。 |

### 接続性

以下のネットワーク関連属性は、Datadog により収集されるすべてのイベントに自動的にアタッチされます。

| 属性名                       | タイプ   | 説明                                                                                                               |
|--------------------------------------|--------|---------------------------------------------------------------------------------------------------------------------------|
| `connectivity.status`                | 文字列 | デバイスのネットワーク到達可能性の状態 (`connected` または `not connected`)。                                       |
| `connectivity.interfaces`            | array  | 利用可能なネットワークインターフェースのリスト (`bluetooth`、`cellular`、`ethernet`、または `wifi` など)。                   |
| `connectivity.effective_type`        | 文字列 | [効果的な接続タイプ][18]、測定されたネットワークパフォーマンスを反映 (`slow-2g`、`2g`、`3g`、または `4g`)。 |


### オペレーティングシステム

以下の OS 関連属性は、Datadog により収集されるすべてのイベントに自動的にアタッチされます。

| 属性名                           | タイプ   | 説明                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `os.name`       | 文字列 | デバイスによって報告された OS 名 (User-Agent HTTP ヘッダー)。       |
| `os.version`  | 文字列 | デバイスによって報告された OS バージョン (User-Agent HTTP ヘッダー)。  |
| `os.version_major`   | 文字列 | デバイスによって報告された OS バージョンメジャー (User-Agent HTTP ヘッダー)。   |

### 地理的位置

次の属性は、IP アドレスの地理的位置に関連しています。

| 完全名                                    | タイプ   | 説明                                                                                                                          |
|:--------------------------------------------|:-------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `geo.country`         | 文字列 | 国名。                                                                                                                  |
| `geo.country_iso_code`     | 文字列 | 国の [ISO コード][3] (米国は `US`、フランスは `FR` など)。                                                  |
| `geo.country_subdivision`     | 文字列 | その国で最大規模の地方区分 (米国は `California` 州、フランスは `Sarthe` 県など)。 |
| `geo.continent_code`       | 文字列 | 大陸の ISO コード (`EU`、`AS`、`NA`、`AF`、`AN`、`SA`、`OC`)。                                                                 |
| `geo.continent`       | 文字列 | 大陸名 (`Europe`、`Australia`、`North America`、`Africa`、`Antarctica`、`South America`、`Oceania`)。                    |
| `geo.city`            | 文字列 | 都市名 (`Paris`、`New York` など)。                                                                                   |

**注**: デフォルトでは、Datadog はクライアントの IP アドレスを保存します。ユーザーデータの自動収集を管理する方法については、[リアルユーザーモニタリングデータセキュリティ][4]で詳しく説明しています。

### ユーザー属性

デフォルトの属性に加えて、[ユーザーセッションを識別][5]することで、すべての RUM イベントタイプにユーザー関連データを追加できます。これにより、特定のユーザーの移動を追跡し、エラーの影響を最も受けているユーザーを特定し、最も重要なユーザーのパフォーマンスを監視できます。

### 機能フラグ属性


[RUM イベントデータを機能フラグでリッチ化する][6]ことで、パフォーマンスモニタリングにさらなるコンテキストと可視性を得ることができます。これにより、どのユーザーに特定のユーザーエクスペリエンスが表示され、それがユーザーのパフォーマンスに悪影響を及ぼしているかどうかを判断することができます。

## イベント固有のメトリクスと属性

### セッションメトリクス

| メトリクス  | タイプ   | 説明                |
|------------|--------|----------------------------|
| `session.time_spent` | 数値 (ns) | ユーザーセッションの期間。 |
| `session.view.count`        | 数値      | このセッションで収集されたすべてのビューの数。 |
| `session.error.count`      | 数値      | このセッションで収集されたすべてのエラーの数。  |
| `session.resource.count`         | 数値      | このセッションで収集されたすべてのリソースの数。 |
| `session.action.count`      | 数値      | このセッションで収集されたすべてのアクションの数。 |
| `session.long_task.count`      | 数値      | このセッションで収集されたすべてのロングタスクの数。 |

### セッション属性

| 属性名                 | タイプ   | 説明                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `session.id`                      | 文字列 | セッションごとにランダムに生成された ID。                                                                      |
| `session.ip`                      | 文字列 | クライアントの IP アドレス。この属性の収集を停止したい場合は、[アプリケーションの詳細][7]で設定を変更してください。                                                                       |
| `session.is_active`                      | ブール値 | セッションが現在アクティビティであるかどうかを示します。セッションは、4 時間のアクティビティまたは 15 分の非アクティブの後に終了します。                                                                     |
| `session.type`                     | 文字列 | セッションのタイプ: `user` または `synthetics`。[Synthetic モニタリングブラウザテスト][8]のセッションは請求から除外されます。 |
| `session.referrer`                | 文字列 | 現在リクエストされているページにリンクされた前のウェブページの URL。 |
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

### ビュータイミングメトリクス

**注**: ビュータイミングメトリクスには、バックグラウンドでページを開いている時間が含まれます。

| 属性                       | タイプ        | 説明                                                                                                                                                                                                           |
|---------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`               | 数値 (ns) | 現在のビューで過ごした時間。                                                                                                                                                                                       |
| `view.first_byte`               | 数値 (ns) | ビューの 1 バイト目を受信した時点までの経過時間。                                                                                                |
| `view.largest_contentful_paint` | 数値 (ns) | ビューポート内の最大の DOM オブジェクト (画面に表示される) がレンダリングされるページ読み込みの時間。                                                                                                |
| `view.largest_contentful_paint_target_selector` | 文字列 (CSS セレクタ) | 最大のコンテンツ描画に対応する要素の CSS セレクタ。                                                                                     |
| `view.first_input_delay`        | 数値 (ns) | ユーザーがページを最初に操作してからブラウザが応答するまでの経過時間。                                                                                                                             |
| `view.first_input_delay_target_selector`      | 文字列 (CSS セレクタ) | ユーザーが最初に操作した要素の CSS セレクタ。                                                                                                                |
| `view.interaction_to_next_paint`| 数値 (ns) | ユーザーがページを操作してから次の描画までの最長の所要時間。                                                                                                                              |
| `view.interaction_to_next_paint_target_selector`| 文字列 (CSS セレクタ) | 次の描画までの最長のインタラクションに関連する要素の CSS セレクタ。                                                                                                          |
| `view.cumulative_layout_shift`  | 数値      | 動的に読み込まれるコンテンツ (サードパーティの広告など) による予期しないページ移動を定量化します。`0` はシフトが発生していないことを意味します。                                                                               |
| `view.cumulative_layout_shift_target_selector`  | 文字列 (CSS セレクタ) | ページの CLS に最も影響を与えるシフトした要素の CSS セレクタ。                                           |
| `view.loading_time`             | 数値 (ns) | ページの準備が整い、ネットワークリクエストまたは DOM ミューテーションが現在発生していない状態になるまでの時間。[詳しくはページパフォーマンスの監視をご覧ください][9]。                                                                             |
| `view.first_contentful_paint`   | 数値 (ns) | ブラウザによりテキスト、画像（背景画像を含む）、白以外のキャンバス、または SVG が最初にレンダリングする時間。ブラウザのレンダリングの詳細については、[w3c 定義][10]を参照してください。                               |
| `view.dom_interactive`          | 数値 (ns) | パーサーによりメインドキュメントの作業が終了するまでの時間。[MDN ドキュメントの詳細][11]。                                                                                                         |
| `view.dom_content_loaded`       | 数値 (ns) | 読み込みイベントが発生し、最初の HTML ドキュメントがレンダリング以外のブロッキングスタイルシート、画像、サブフレームの読み込み完了を待たずに完全に読み込まれ解析されるまでの時間。[MDN ドキュメントの詳細][12]。 |
| `view.dom_complete`             | 数値 (ns) | ページとすべてのサブリソースの準備が整うまでの時間。ユーザーのためにローディングスピナーの回転が停止した状態。[詳細は MDN ドキュメントを参照してください][13]。                                                                       |
| `view.load_event`               | 数値 (ns) | ページが完全に読み込まれたことを示す読み込みイベントが発生するまでの時間。通常は追加のアプリケーションロジックのトリガー。[MDN ドキュメントの詳細][14]。                                                                             |
| `view.error.count`              | 数値      | このビューについて収集されたすべてのエラーの数。                                                                                                                                                                          |
| `view.long_task.count`          | 数値      | このビューについて収集されたすべてのロングタスクの数。                                                                                                                                                                      |
| `view.resource.count`           | 数値      | このビューについて収集されたすべてのリソースの数。                                                                                                                                                                       |
| `view.action.count`             | 数値      | このビューについて収集されたすべてのアクションの数。                                                                                                                                                                         |

### リソースタイミングメトリクス

アプリケーションリソースのロードについて、ネットワークの詳細なタイミングデータが、[Performance Resource Timing API][15] を使用して収集されます。

| メトリクス                              | タイプ           | 説明                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | 数値         | リソースのロードにかかった全時間。                                                                                                   |
| `resource.size`                | 数値（バイト） | リソースのサイズ。                                                                                                                            |
| `resource.connect.duration`    | 数値 (ns)    | サーバーへの接続が確立されるまでにかかった時間 (connectEnd - connectStart)。                                                            |
| `resource.ssl.duration`        | 数値 (ns)    | TLS ハンドシェイクにかかった時間。最後のリクエストが HTTPS 経由ではなかった場合、このメトリクスは収集されません (connectEnd - secureConnectionStart)。 |
| `resource.dns.duration`        | 数値 (ns)    | 最後のリクエストの DNS 名が解決されるまでにかかった時間 (domainLookupEnd - domainLookupStart)。                                               |
| `resource.redirect.duration`   | 数値 (ns)    | 後続の HTTP リクエストにかかった時間 (redirectEnd - redirectStart)。                                                                      |
| `resource.first_byte.duration` | 数値 (ns)    | 応答の最初のバイトを受信するまでにかかった時間 (responseStart - RequestStart)。                                           |
| `resource.download.duration`   | 数値 (ns)    | 応答のダウンロードにかかった時間 (responseEnd - responseStart)。                                                                         |

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
| `error.source`  | 文字列 | エラーの発生元 (`console` など)。[エラーソース][19]を参照してください。   |
| `error.type`    | 文字列 | エラーのタイプ (場合によってはエラーコード)。                   |
| `error.message` | 文字列 | イベントについて簡潔にわかりやすく説明する 1 行メッセージ。 |
| `error.stack`   | 文字列 | スタックトレースまたはエラーに関する補足情報。     |

#### ソースエラー

ソースエラーには、エラーに関するコードレベルの情報が含まれます。エラーの種類に関する詳細は、 [MDN ドキュメント][15]を参照してください。

| 属性       | タイプ   | 説明                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | 文字列 | エラーのタイプ (場合によってはエラーコード)。                   |

### アクションタイミングメトリクス

| メトリクス    | タイプ   | 説明              |
|--------------|--------|--------------------------|
| `action.loading_time` | 数値 (ns) | アクションのロード時間。[ユーザーアクション追跡のドキュメント][16]で計算方法を確認してください。 |
| `action.long_task.count`        | 数値      | このアクションについて収集されたすべてのロングタスクの数。 |
| `action.resource.count`         | 数値      | このアクションについて収集されたすべてのリソースの数。 |
| `action.error.count`      | 数値      | このアクションについて収集されたすべてのエラーの数。|

### アクションの属性

| 属性    | タイプ   | 説明              |
|--------------|--------|--------------------------|
| `action.id` | 文字列 | ユーザーアクションの UUID。 |
| `action.type` | 文字列 | ユーザーアクションのタイプ。[カスタムユーザーアクション][17]の場合、`custom` に設定されます。 |
| `action.target.name` | 文字列 | ユーザーが操作したエレメント。自動収集されたアクションのみ対象。 |
| `action.name` | 文字列 | 作成されたユーザーフレンドリーな名称 (`Click on #checkout` など)。[カスタムユーザーアクション][17]の場合は、API コールで提供されたアクション名。 |

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

[1]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names
[2]: /ja/real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa
[3]: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
[4]: /ja/data_security/real_user_monitoring/#ip-address
[5]: /ja/real_user_monitoring/browser/advanced_configuration/#user-sessions
[6]: /ja/real_user_monitoring/guide/setup-feature-flag-data-collection
[7]: /ja/data_security/real_user_monitoring/#ip-address
[8]: /ja/synthetics/browser_tests/
[9]: /ja/real_user_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[10]: https://www.w3.org/TR/paint-timing/#sec-terminology
[11]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[14]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[15]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[16]: /ja/real_user_monitoring/browser/tracking_user_actions/?tab=npm#action-timing-metrics
[17]: /ja/real_user_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions
[18]: https://developer.mozilla.org/en-US/docs/Glossary/Effective_connection_type
[19]: /ja/real_user_monitoring/browser/collecting_browser_errors#error-sources