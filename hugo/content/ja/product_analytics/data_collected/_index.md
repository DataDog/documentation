---
description: Product Analytics が収集するイベントタイプ、測定値、および属性 (セッション、ビュー、アクションを含む) について学びます。
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: ラーニングセンター
  text: Product Analytics の利用を開始する
- link: https://learn.datadoghq.com/courses/define-user-behavior-with-labeled-actions-in-product-analytics
  tag: ラーニングセンター
  text: Product Analytics でラベル付きアクションを使用してユーザーの行動を定義する
- link: /real_user_monitoring/application_monitoring/browser/data_collected/
  tag: ドキュメント
  text: 収集された RUM ブラウザデータ
- link: /real_user_monitoring/application_monitoring/ios/data_collected/
  tag: ドキュメント
  text: 収集された RUM iOS データ
- link: /real_user_monitoring/application_monitoring/android/data_collected/
  tag: ドキュメント
  text: 収集された RUM Android データ
- link: /product_analytics/data_collected/server_side_events/
  tag: ドキュメント
  text: サーバー側イベントの追跡
title: 収集された Product Analytics データ
---
## 概要{#overview}

Product Analytics は、ユーザーのアクティビティデータをイベントとして収集します。各イベントには 2 種類のデータがあります。

- **テレメトリ**: アクティビティの追跡と比較に使用される定量化可能な値 (`view.time_spent` など)。
- **属性**: 分析で測定値のフィルタリングと分類に使用される記述的な値 (`device.type` や `geo.country` など)。

すべてのイベントには [デフォルト属性](#default-attributes) が含まれます。各イベントタイプには、[固有のテレメトリと属性](#event-specific-attributes)もあります。

セッション間で個々のユーザーを識別するために、Product Analytics は `usr.id` 属性と `usr.email` 属性を使用します。認証されていないユーザーやログインしない訪問者の場合、RUM SDK はアクティビティを追跡するために自動的に `usr.anonymous_id` を割り当てます。詳細については、[認証されていないユーザーの追跡][4]を参照してください。

<div class="alert alert-info">Product Analytics は、Real User Monitoring (RUM) と同じ SDK および構成を使用してデータを収集します。RUM とは異なり、Product Analytics はエラー、リソース、ロングタスク、またはバイタルイベントを収集しません。RUM イベントのタイプと属性の完全なリストについては、<a href="/real_user_monitoring/application_monitoring/browser/data_collected/">ブラウザ</a>、<a href="/real_user_monitoring/application_monitoring/ios/data_collected/">iOS</a>、および <a href="/real_user_monitoring/application_monitoring/android/data_collected/">Android</a> の収集データページを参照してください。</div>

| イベントタイプ | 保持期間 | 説明|
|------------|-----------|-------------|
| セッション | 15 か月 | セッションとは、アプリケーションを通じた実際のユーザーのジャーニーのことです。これはユーザーがアプリケーションを開いたときに開始され、ユーザーがアクティブである限り開いたままになります。セッション中に生成されたすべてのイベントは、同じ `session.id` 属性を共有します。**注:** セッションは 15 分間操作がないとリセットされます。|
| ビュー | 15 か月 | ビューとは、ユーザーがセッション内で訪問する一意のページや画面のことです。ブラウザでは、ユーザーがページに訪問するたびに、新しいビューが生成されます。モバイルでは、ビューは画面または画面セグメントに対応します。ユーザーが表示している間に生成されたすべてのイベントは、同じ `view.id` 属性を共有します。|
| アクション | 15 か月 | アクションとは、クリック、タップ、スワイプ、スクロールなど、アプリケーション内でのユーザーアクティビティのことです。アクションは SDK に自動的に収集されます。各アクションは、一意の `action.id` と一緒に生成されたビューに付与されます。|
| ラベル付きアクション | 15 か月 | ラベル付きアクションは、[アクションの管理][1]を使用して自動キャプチャされたアクションに適用されるカスタム名です。ラベル付きアクションを使用すると、コードを記述することなく、特定のユーザーインタラクションを整理したり、分析したりすることができます。|

## デフォルト属性 {#default-attributes}

以下の属性は、デフォルトですべてのイベントに付与されます。

### 一般 {#general}

| 属性 | タイプ | 説明 |
|-----------|------|-------------|
| `date` | 数値 | イベントのタイムスタンプ。|
| `type` | 文字列 | イベントのタイプ (`view` や `action` など)。|
| `service` | 文字列 | ユーザーセッションを関連付けるために使用された、このアプリケーションの統合サービス名。|
| `application.id` | 文字列 | Datadog アプリケーション ID。|
| `application.name` | 文字列 | Datadog アプリケーション名。|

### デバイス {#device}

| 属性 | タイプ | 説明 |
|-----------|------|-------------|
| `device.brand` | 文字列 | デバイスによって報告されたデバイスブランド。|
| `device.model` | 文字列 | デバイスによって報告されたデバイスモデル。|
| `device.name` | 文字列 | デバイスによって報告されたデバイス名。|
| `device.type` | 文字列 | デバイスによって報告されたデバイスタイプ (`Mobile`、`Tablet` や`Desktop` など)。|

### オペレーティングシステム {#operating-system}

| 属性 | タイプ | 説明 |
|-----------|------|-------------|
| `os.name` | 文字列 | デバイスによって報告された OS 名。|
| `os.version` | 文字列 | デバイスによって報告された OS バージョン。|
| `os.version_major` | 文字列 | デバイスによって報告されたメジャー OS バージョン。|

### 位置情報 {#geolocation}

以下の属性は、セッションの IP アドレスから導出されます。

**注:** 位置情報属性の収集を停止するには、[アプリケーションの管理][2]で設定を変更してください。

| 属性 | タイプ | 説明 |
|-----------|------|-------------|
| `geo.country` | 文字列 | 国名。|
| `geo.country_iso_code` | 文字列 | 国の ISO コード (`US` や `FR` など)。|
| `geo.country_subdivision` | 文字列 | 国の最初の行政区画レベル名 (`California` や`Sarthe` など)。|
| `geo.continent_code` | 文字列 | 2 文字の大陸コード (ヨーロッパの場合は `EU`、北米の場合は `NA` など)。|
| `geo.continent` | 文字列 | 大陸名。|
| `geo.city` | 文字列 | 都市名 (`San Francisco` や `Paris` など)。|

### ユーザー属性 {#user-attributes}

[ユーザー情報の追跡][3]をグローバルに有効にして、ユーザー属性を収集しすべてのイベントに適用できます。

| 属性 | タイプ | 説明 |
|-----------|------|-------------|
| `usr.id` | 文字列 | ユーザーの識別子。|
| `usr.name` | 文字列 | ユーザーの名前。|
| `usr.email` | 文字列 | ユーザーのメールアドレス。|
| `usr.anonymous_id` | 文字列 | 認証されていないユーザーに割り当てられる、ランダムに生成された UUID。最大 1 年間保持されます。[認証されていないユーザーの追跡][4] を参照してください。|

## イベント固有の属性 {#event-specific-attributes}

以下の属性は、各イベントタイプに固有のものです。

### セッション属性 {#session-attributes}

| 属性 | タイプ | 説明 |
|-----------|------|-------------|
| `session.id` | 文字列 | セッションの一意の ID。|
| `session.type` | 文字列 | セッションのタイプ。Product Analytics の場合、値は `user` です。|
| `session.is_active` | Boolean | セッションがアクティブかどうかを示します。セッションは、4 時間のアクティビティまたは 15 分の非アクティブの後に終了します。|
| `session.time_spent` | 数値 (ナノ秒) | セッションで費やされた時間。|
| `session.view.count` | 数値 | このセッションで収集されたすべてのビューの数。|
| `session.action.count` | 数値 | このセッションで収集されたすべてのアクションの数。|
| `session.initial_view.url` | 文字列 | セッションの初期ビューの URL。|
| `session.initial_view.name` | 文字列 | セッションの初期ビューの名前。|
| `session.last_view.url` | 文字列 | セッションの最後のビューの URL。|
| `session.last_view.name` | 文字列 | セッションの最後のビューの名前。|
| `session.ip` | 文字列 | セッションの IP アドレス。この属性の収集を停止するには、[アプリケーションの管理][2]で設定を変更してください。|
| `session.useragent` | 文字列 | デバイスのタイプとバージョンを判断するために使用されるブラウザまたはデバイスの識別子。|
| `session.has_replay` | Boolean | セッションに Session Replay の記録が付与されているかどうかを示します。|

### ビューの属性 {#view-attributes}

| 属性 | タイプ | 説明 |
|-----------|------|-------------|
| `view.id` | 文字列 | ビューの一意の ID。|
| `view.url` | 文字列 | イベントに対応するページの URL または画面の正規名。|
| `view.name` | 文字列 | カスタマイズ可能なビューの名前。|
| `view.is_active` | Boolean | ビューがアクティブかどうかを示します。|
| `view.time_spent` | 数値 (ナノ秒) | このビューに費やされた時間。|
| `view.action.count` | 数値 | このビューについて収集されたすべてのアクションの数。|
| `view.loading_time` | 数値 (ナノ秒) | ビューの準備が整い、ネットワークリクエストや DOM の変更が発生しなくなるまでの時間。|
| `view.interaction_to_next_view_time` | 数値 (ナノ秒) | 前のビューで最後にユーザーが操作してから、次のビューが開始されるまでの時間。|

#### UTM 属性 {#utm-attributes}

**注:** UTM 属性はブラウザアプリケーションでのみ利用可能です。

| 属性 | タイプ | 説明 |
|-----------|------|-------------|
| `view.url_query.utm_source` | 文字列 | トラフィックのソースを追跡する URL のパラメーター。|
| `view.url_query.utm_medium` | 文字列 | トラフィックの発信元チャンネルを追跡する URL のパラメーター。|
| `view.url_query.utm_campaign` | 文字列 | そのビューに関連付けられた特定のマーケティングキャンペーンを識別する URL のパラメーター。|
| `view.url_query.utm_content` | 文字列 | マーケティングキャンペーン内でユーザーがクリックした特定の要素を特定する URL 内のパラメーター。|
| `view.url_query.utm_term` | 文字列 | ユーザーが特定のキャンペーンをトリガーするために検索したキーワードを追跡する URL のパラメーター。|

### アクション属性 {#action-attributes}

| 属性 | タイプ | 説明 |
|-----------|------|-------------|
| `action.id` | 文字列 | ユーザーアクションの一意の ID。|
| `action.type` | 文字列 | ユーザーアクションのタイプ (`click`、`tap`、や `application_start` など)。|
| `action.name` | 文字列 | ユーザーアクションの名前 (`Click on #checkout` など)。|
| `action.target.name` | 文字列 | ユーザーが操作した要素。自動的に収集されたアクションに対してのみ利用可能です。|
| `action.loading_time` | 数値 (ナノ秒) | アクションの読み込み時間。|

### フラストレーションシグナル {#frustration-signals}

**注:** フラストレーションシグナルは、ブラウザアプリケーションでのみ利用可能です。

#### 測定値 {#measurements}

| 属性 | タイプ | 説明 |
|-----------|------|-------------|
| `session.frustration.count` | 数値 | 1 つのセッションに関連するすべてのフラストレーションシグナルの数。|
| `view.frustration.count` | 数値 | 1 つのビューに関連するすべてのフラストレーションシグナルの数。|

#### 属性 {#attributes}

| 属性 | タイプ | 説明 |
|-----------|------|-------------|
| `action.frustration.type:dead_click` | 文字列 | RUM ブラウザ SDK で検出されたデッドクリック。|
| `action.frustration.type:rage_click` | 文字列 | RUM ブラウザ SDK で検出されたレイジークリック。|
| `action.frustration.type:error_click` | 文字列 | RUM ブラウザ SDK で検出されたエラークリック。|

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/product_analytics/guide/action_management/
[2]: https://app.datadoghq.com/rum/list
[3]: /ja/real_user_monitoring/application_monitoring/browser/advanced_configuration/#user-session
[4]: /ja/real_user_monitoring/application_monitoring/browser/advanced_configuration/#track-unauthenticated-users