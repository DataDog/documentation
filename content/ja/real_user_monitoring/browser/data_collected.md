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

- [View][1]: ユーザーがセットアップアプリケーションのページにアクセスするたびに、ビューイベントが作成されます。ユーザーがそのビューにとどまっている間、収集されたすべてのデータは、`view.id` 属性でそのビューにアタッチされます。
- [Resource][2]: 画像、XHR/Fetch、CSS、または JS ライブラリのリソースイベントを生成できます。名前や関連付けられている読み込み時間など、リソースに関する情報が含まれています。
- [Long task][3]: メインスレッドを 50 ミリ秒以上ブロックするブラウザのタスクはすべて、ロングタスクと見なされ、特定のイベントが生成されます。
- [Error][4]: ブラウザによってフロントエンドエラーが発生するたびに、RUM はそれをキャッチし、Error Event として Datadog に送信します。
- [User Action][5]: User Action イベントは、特定のユーザーアクションに対して生成できるカスタムイベントです。

特定のイベントタイプに固有のメトリクスと属性があります。たとえば、メトリクス `view.loading_time` は "view" RUM イベントに関連付けられ、属性 `resource.method` は "resource" RUM イベントに関連付けられます。ユーザーがいる元のページ (`view.url`) や `device` や `geolocation` などのユーザー情報などの[デフォルト属性][9]があり、これらはすべての RUM イベントに存在します。

{{< tabs >}}
{{% tab "ビュー" %}}

ページビューとは、ウェブサイトからページへアクセスするユーザー数のことです。一意の属性 `view.id` を使うと、ページビューの間の[エラー][1]、[リソース][2]、[ロングタスク][3]、[ユーザーアクション][4]がそのページビューにアタッチされます。新しいイベントが収集されると、ページビューは更新されます。

ページビューには、読み込みパフォーマンスのメトリクスが [Paint Timing API][5] と [Navigation Timing API][6] の両方から収集されます。

## シングルページアプリケーション

シングルページアプリケーション (SPA) の場合、RUM SDK は、`loading_type` 属性を使用して、`initial_load` ナビゲーションと `route_change` ナビゲーションを区別します。ウェブページをクリックすると、ページが完全に更新されずに新しいページが表示される場合、RUM SDK は、`loading_type:route_change` を使用して新しいビューイベントを開始します。RUM は、[履歴 API][7]を使用してページの変更を追跡します。

Datadog は、ページの読み込みに必要な時間を計算する独自のパフォーマンスメトリクス、`loading_time` を提供します。このメトリクスは、`initial_load` と `route_change` の両方のナビゲーションで機能します。

### 読み込み時間はどのように計算されますか？
最新のウェブアプリケーションを考慮するために、読み込み時間はネットワークリクエストと DOM のミューテーションを監視します。

* **Initial Load**: 読み込み時間は、次の*どちらか長い方*になります*。

    - `navigationStart` と `loadEventEnd` の差。
    - または、`navigationStart` と、ページに 100 ミリ秒を超えて初めてアクティビティがないときの差 (アクティビティは、進行中のネットワークリクエストまたは DOM ミューテーションとして定義)。

* **SPA Route Change**: 読み込み時間は、ユーザーのクリックと、ページに 100 ミリ秒を超えて初めてアクティビティがないときの差に等しくなります (アクティビティは、進行中のネットワークリクエストまたは DOM ミューテーションとして定義)。

### Hash SPA ナビゲーション

ハッシュ (`#`) ナビゲーションは RUM SDK によって自動で監視されます。SDK は `HashChangeEvent` を監視し、新しいビューを表示します。現在のビューのコンテキストに影響しない HTML アンカータグからくるイベントは無視されます。

## ビュータイミングメトリクス

{{< img src="real_user_monitoring/data_collected/view/timing_overview.png" alt="タイミングの概要"  >}}

| メトリクス                              | タイプ        | 説明                                                                                                                                                                                                                 |
|----------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`                             | 数値（ns） | 現在のビューに費やした時間。                                                                                                                                                                                                  |
| `view.loading_time`                             | 数値（ns） | ページの準備が整い、ネットワークリクエストまたは DOM ミューテーションが現在発生していない状態になるまでの時間。[収集データドキュメントの詳細][8]|
| `view.first_contentful_paint` | 数値（ns） | ブラウザによりテキスト、画像（背景画像を含む）、白以外のキャンバス、または SVG が最初にレンダリングする時間。ブラウザのレンダリングの詳細については、[w3 定義][9]を参照してください。                                                                                            |
| `view.dom_interactive`        | 数値（ns） | パーサーによりメインドキュメントの作業が終了する瞬間。[MDN ドキュメントの詳細][10]                                                                                                               |
| `view.dom_content_loaded`     | 数値（ns） | 最初の HTML ドキュメントがレンダリング以外のブロッキングスタイルシート、画像、サブフレームの読み込み完了を待たずに完全に読み込まれ解析される際に発生するイベント。[MDN ドキュメントの詳細][11]。 |
| `view.dom_complete`           | 数値（ns） | ページとすべてのサブリソースの準備が完了。ユーザー側では、ローディングスピナーの回転が停止。[MDN ドキュメントの詳細][12]                                                                             |
| `view.load_event_end`         | 数値（ns） | ページが完全に読み込まれた際に発生するイベント。通常は追加のアプリケーションロジックのトリガー。[MDN ドキュメントの詳細][13]                                                                                   |
| `view.error.count`            | 数値      | このビューについて収集されたすべてのエラーの数。                                                                                                                                                                        |
| `view.long_task.count`        | 数値      | このビューについて収集されたすべてのロングタスクの数。                                                                                                                                                                           |
| `view.resource.count`         | 数値      | このビューについて収集されたすべてのリソースの数。                                                                                                                                                                            |
| `view.action.count`      | 数値      | このビューについて収集されたすべてのアクションの数。

[1]: /ja/real_user_monitoring/data_collected/error/
[2]: /ja/real_user_monitoring/data_collected/resource/
[3]: /ja/real_user_monitoring/data_collected/long_task/
[4]: /ja/real_user_monitoring/data_collected/user_action/
[5]: https://www.w3.org/TR/paint-timing/
[6]: https://www.w3.org/TR/navigation-timing/#sec-navigation-timing
[7]: https://developer.mozilla.org/en-US/docs/Web/API/History
[8]: /ja/real_user_monitoring/data_collected/view/#how-is-loading-time-calculated
[9]: https://www.w3.org/TR/paint-timing/#sec-terminology
[10]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
{{% /tab %}}
{{% tab "リソース" %}}

デフォルトで、Web サイトのすべてのリソース（画像、XHR、[XMLHttpRequest][1]、CSS の各ファイル、JS アセット、およびフォントファイル）が収集されます。

アプリケーションリソースのロードについて、ネットワークの詳細なタイミングデータが、[Performance Resource Timing API][2] を使用して収集されます。

{{< img src="real_user_monitoring/data_collected/resource/resource_metric.png" alt="リソースメトリクス"  >}}

## リソースタイミングメトリクス

| メトリクス                              | タイプ           | 説明                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | 数値         | リソースのロードにかかった全時間。                                                                                                   |
| `resource.size`                | 数値（バイト） | リソースのサイズ。                                                                                                                            |
| `resource.connect.duration`    | 数値（ns）    | サーバーへの接続が確立されるまでにかかった時間（connectEnd - connectStart）。                                                            |
| `resource.ssl.duration`        | 数値（ns）    | TLS ハンドシェイクにかかった時間。最後のリクエストが HTTPS 経由ではなかった場合、このメトリクスは収集されません（connectEnd - secureConnectionStart）。 |
| `resource.dns.duration`        | 数値（ns）    | 最後のリクエストの DNS 名が解決されるまでにかかった時間（domainLookupEnd - domainLookupStart）。                                               |
| `resource.redirect.duration`   | 数値（ns）    | 後続の HTTP リクエストにかかった時間（redirectEnd - redirectStart）。                                                                      |
| `resource.first_byte.duration` | 数値（ns）    | 応答の最初のバイトを受信するまでにかかった時間（responseStart - RequestStart）。                                           |
| `resource.download.duration`   | 数値（ns）    | 応答のダウンロードにかかった時間（responseEnd - responseStart）。                                                                         |

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


[1]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[2]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
{{% /tab %}}
{{% tab "ロングタスク" %}}

[ロングタスク][1]とは、メインスレッドを 50 ミリ秒以上ブロックするタスクのことです。インプットの高レイテンシーやインタラクションの遅延などの原因となります。ブラウザのパフォーマンスプロファイラーで、ロングタスクの原因を理解しましょう。

## ロングタスクタイミングメトリクス

| メトリクス  | タイプ   | 説明                |
|------------|--------|----------------------------|
| `long_task.duration` | 数値 | ロングタスクの時間。 |


[1]: https://developer.mozilla.org/en-US/docs/Web/API/Long_Tasks_API
{{% /tab %}}
{{% tab "エラー" %}}

フロントエンドのエラーはリアルタイムモニタリング (RUM) で収集されます。エラーメッセージとスタックトレースが利用できる場合は含まれます。

## エラーの原因
フロントエンドのエラーは、それぞれの `error.origin` により 4 つのカテゴリーに分類されます。

- **network**: AJAX リクエストが原因の XHR または Fetch エラー。ネットワークエラーの特定の属性は[ドキュメント][1]を参照してください。
- **source**: 未処理の例外または未処理の約束拒否（ソースコード関連）。
- **console**: `console.error()` API 呼び出し。
- **custom**: [RUM `addError` API][2] (デフォルトは `custom`) と共に送信されるエラー。

## エラー属性

| 属性       | タイプ   | 説明                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | 文字列 | エラーの発生元 (`console`、`network` など)。     |
| `error.type`    | 文字列 | エラーのタイプ (場合によってはエラーコード)。                   |
| `error.message` | 文字列 | イベントについて簡潔にわかりやすく説明する 1 行メッセージ。 |
| `error.stack`   | 文字列 | スタックトレースまたはエラーに関する補足情報。     |

### ネットワークエラー

ネットワークエラーには失敗した HTTP リクエストに関する情報が含まれます。次のファセットも収集されます。

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

ソースエラーには、エラーに関するコードレベルの情報が含まれます。エラーの種類に関する詳細は、 [MDN ドキュメント][3]を参照してください。

| 属性       | タイプ   | 説明                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | 文字列 | エラーのタイプ (場合によってはエラーコード)。                   |


[1]: /ja/real_user_monitoring/data_collected/error/#network-errors
[2]: /ja/real_user_monitoring/browser/advanced_configuration#custom-errors
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
{{% /tab %}}
{{% tab "ユーザーアクション" %}}

## アクションの自動収集
Real User Monitoring (RUM) SDK は、ユーザージャーニー中に実行されるユーザーのインタラクションを検出します。この機能を有効にするには、`trackInteractions` [初期化パラメーター][1]を `true` に設定します。

**注**: 初期化パラメーター `trackInteractions` は、アプリケーション内のユーザークリックの収集を有効にします。ページに含まれている**機密データと非公開データ**は、やり取りされた要素を特定するために含まれる場合があります。

インタラクションが検出されると、すべての新しい RUM イベントは、完了したと見なされるまで、進行中のアクションにアタッチされます。アクションは、その親ビュー属性 (ブラウザ情報、ジオロケーションデータ、[グローバルコンテキスト][2]など) からも恩恵を受けます。

### アクションの読み込み時間はどのように計算されますか？
インタラクションが検出されると、RUM SDK は DOM ミューテーションのネットワークリクエストを監視します。100 ミリ秒を超えてページにアクティビティがない場合、インタラクションは完了したと見なされます (アクティビティは、進行中のネットワークリクエストまたは DOM ミューテーションとして定義)。

## カスタムユーザーアクション
カスタムユーザーアクションは、[`addUserAction` API][3] を介して手動で宣言および送信されるユーザーアクションです。カスタムタイミングや顧客のカート情報など、ユーザージャーニー中に発生するイベントに関連する情報を送信できます。

## アクションタイミングメトリクス

| メトリクス    | タイプ   | 説明              |
|--------------|--------|--------------------------|
| `action.loading_time` | 数値（ns） | アクションの読み込み時間。[ユーザーアクションのドキュメント][4]で計算方法を確認してください。 |
| `action.long_task.count`        | 数値      | このアクションについて収集されたすべてのロングタスクの数。 |
| `action.resource.count`         | 数値      | このアクションについて収集されたすべてのリソースの数。 |
| `action.error.count`      | 数値      | このアクションについて収集されたすべてのエラーの数。|

## アクションの属性

| 属性    | タイプ   | 説明              |
|--------------|--------|--------------------------|
| `action.id` | 文字列 | ユーザーアクションの UUID。 |
| `action.type` | 文字列 | ユーザーアクションのタイプ。[カスタムユーザーアクション][5]の場合、`custom` に設定されます。 |
| `action.target.name` | 文字列 | ユーザーが操作したエレメント。自動収集されたアクションのみ対象 |
| `action.name` | 文字列 | 作成されたユーザーフレンドリーな名称 (`Click on #checkout` など)。[カスタムユーザーアクション][5]の場合は、API コールで提供されたアクション名。 |

[1]: /ja/real_user_monitoring/browser/?tab=us#initialization-parameters
[2]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#add-global-context
[3]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#custom-user-actions
[4]: /ja/real_user_monitoring/data_collected/user_action#how-is-the-user-action-duration-calculated
[5]: /ja/real_user_monitoring/data_collected/user_action#custom-user-actions
{{% /tab %}}
{{< /tabs >}}

## デフォルト属性

これらの各イベントタイプには、デフォルトで次の属性が付加されています。したがって、照会される RUM イベントタイプに関係なくそれらを使用できます。

### コア

| 属性名   | タイプ   | 説明                 |
|------------------|--------|-----------------------------|
| `type`     | 文字列 | イベントのタイプ (`view` や `resource` など)。             |
| `application.id` | 文字列 | Datadog アプリケーション ID。 |

### ビュー属性

| 属性名                 | タイプ   | 説明                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `view.id`                      | 文字列 | ページビューごとにランダムに生成された ID。                                                                      |
| `view.loading_type`                     | 文字列 | ページ読み込みのタイプ: `initial_load` または `route_change`。詳細については、[シングルページアプリケーションサポートドキュメント][6]を参照してください。|
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
| `device.type`       | 文字列 | User-Agent によって報告されたデバイスタイプ       |
| `device.brand`  | 文字列 | User-Agent によって報告されたデバイスブランド。  |
| `device.model`   | 文字列 | User-Agent によって報告されたデバイスモデル。   |
| `device.name` | 文字列 | User-Agent によって報告されたデバイス名。 |

### オペレーティングシステム

以下の OS 関連属性は、Datadog により収集されるすべてのイベントに自動的にアタッチされます。

| 属性名                           | タイプ   | 説明                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `os.name`       | 文字列 | User-Agent によって報告された OS 名。       |
| `os.version`  | 文字列 | User-Agent によって報告された OS バージョン。  |
| `os.version_major`   | 文字列 | User-Agent によって報告された OS のメジャーバージョン。   |

### 位置情報

以下は、IP アドレスのジオロケーションに関連する属性です。

| 完全名                                    | タイプ   | 説明                                                                                                                          |
|:--------------------------------------------|:-------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `geo.country`         | 文字列 | 国の名前。                                                                                                                  |
| `geo.country_iso_code`     | 文字列 | 国の [ISO コード][7] (米国は `US`、フランスは `FR` など)。                                                  |
| `geo.country_subdivision`     | 文字列 | その国で最大規模の地方区分 (米国は `California` 州、フランスは `Sarthe` 県など)。 |
| `geo.country_subdivision_iso_code` | 文字列 | その国で最大規模の地方区分の [ISO コード][7] (米国は `CA`、フランスは `SA` など)。    |
| `geo.continent_code`       | 文字列 | 大陸の ISO コード (`EU`、`AS`、`NA`、`AF`、`AN`、`SA`、`OC`)。                                                                 |
| `geo.continent`       | 文字列 | 大陸名 (`Europe`、`Australia`、`North America`、`Africa`、`Antartica`、`South America`、`Oceania`)。                    |
| `geo.city`            | 文字列 | 都市名 (`Paris`、`New York` など)。                                                                                   |

## 追加属性

デフォルトの属性に加えて、収集されたすべてのイベントに[特定のグローバルコンテキスト][8]を追加します。これにより、ユーザーのサブセットのデータを分析することができます。たとえば、ユーザーメール別のグループエラー、パフォーマンスが最も悪い顧客の把握などです。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/real_user_monitoring/browser/data_collected/?tab=view
[2]: /ja/real_user_monitoring/browser/data_collected/?tab=resource
[3]: /ja/real_user_monitoring/browser/data_collected/?tab=longtask
[4]: /ja/real_user_monitoring/browser/data_collected/?tab=error
[5]: /ja/real_user_monitoring/browser/data_collected/?tab=useraction
[6]: /ja/real_user_monitoring/data_collected/view#single-page-applications
[7]: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
[8]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#add-global-context
[9]: /ja/real_user_monitoring/browser/data_collected/?tab=view#default-attributes