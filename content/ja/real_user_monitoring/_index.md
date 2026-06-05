---
algolia:
  tags:
  - rum
  - real user monitoring
aliases:
- /ja/real_user_monitoring/installation
- /ja/real_user_monitoring/faq/
cascade:
  algolia:
    rank: 70
description: ユーザーから見たフロントエンドアプリケーションのパフォーマンスを視覚化、観察、分析します。
disable_sidebar: true
further_reading:
- link: /real_user_monitoring/application_monitoring/browser/data_collected/
  tag: ドキュメント
  text: 収集された RUM ブラウザデータ
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: 対話形式のセッションに参加して、Real User Monitoring による洞察を得る
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: ブログ
  text: Datadog リアルユーザーモニタリングのご紹介
- link: https://www.datadoghq.com/blog/datadog-mobile-rum/
  tag: ブログ
  text: Datadog Mobile Real User Monitoring で、モバイルでのユーザーエクスペリエンスを向上
- link: https://www.datadoghq.com/blog/mobile-monitoring-best-practices/
  tag: ブログ
  text: モバイルアプリのパフォーマンス監視のためのベストプラクティス
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: ブログ
  text: Datadog Error Tracking で、アプリケーションの問題を解明
- link: https://www.datadoghq.com/blog/unify-apm-rum-datadog/
  tag: ブログ
  text: スタック全体の可視性のために APM と RUM データを統合する
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: ブログ
  text: ジオマップを使用して、場所ごとにアプリデータを視覚化する
- link: https://www.datadoghq.com/blog/datadog-rum-react-components/#tune-up-your-react-data-collection
  tag: ブログ
  text: カスタム React コンポーネントでより良い RUM データを取得する
- link: https://www.datadoghq.com/blog/hybrid-app-monitoring/
  tag: ブログ
  text: Datadog でハイブリッドモバイルアプリケーションを監視する
- link: https://www.datadoghq.com/blog/how-datadogs-tech-solutions-team-rum-session-replay/
  tag: ブログ
  text: Datadog のテクニカルソリューションチームが RUM、セッションリプレイ、エラー追跡を使用して顧客の問題を解決する方法
- link: https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/
  tag: ブログ
  text: 静的 Web アプリケーションを監視するためのベストプラクティス
- link: https://www.datadoghq.com/blog/progressive-web-application-monitoring/
  tag: ブログ
  text: Best practices for monitoring progressive web applications
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: ブログ
  text: Datadog を使用して効果的なエグゼクティブ向けダッシュボードを設計する
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: ブログ
  text: 'パフォーマンスから影響へ: 有コンテキストを通じてフロントエンドチームをつなぐ'
- link: https://app.datadoghq.com/release-notes?category=Real%20User%20Monitoring
  tag: リリースノート
  text: Datadog RUM の最新リリースをチェック！(アプリログインが必要です)
- link: https://learn.datadoghq.com/courses/intro-to-rum
  tag: ラーニングセンター
  text: Real User Monitoring (RUM) の紹介
title: RUM およびセッションリプレイ
---
{{< learning-center-callout header="エンゲージメントウェビナーセッションに参加する" hide_image="true" btn_title="サインアップ" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=RUM">}}
  特定のビジネスニーズに合わせたカスタムユーザーアクションを作成する方法を発見し、ユーザーの行動を正確に追跡できるようにします。
{{< /learning-center-callout >}}

## Real User Monitoring とは？{#what-is-real-user-monitoring}

{{< img src="real_user_monitoring/performance-summary-browser.png" alt="RUM ダッシュボード" >}}

Datadog の*リアルユーザーモニタリング (RUM)* は、個々のユーザーのリアルタイムのアクティビティとエクスペリエンスをエンドツーエンドで可視化します。RUMは、Web およびモバイルアプリケーションの 4 種類のユースケースを解決するように設計されています。

* **パフォーマンス**: Web ページ、モバイルアプリケーション画面、ユーザーアクション、ネットワークリクエスト、フロントエンドコードのパフォーマンスを追跡します。
* **エラー管理**: 進行中のバグと問題を監視し、時間とバージョンにわたってそれを追跡します。
* **分析/使用**: アプリケーションを使用しているユーザーを理解し (国、デバイス、OS)、個々のユーザージャーニーを監視し、ユーザーによるアプリケーションの操作を分析します (アクセスされた最も一般的なページ、クリック、インタラクション、機能の使用)。
* **サポート**: 1 つのユーザーセッションに関連するすべての情報を取得して、問題をトラブルシューティングします (セッションの継続時間、アクセスしたページ、インタラクション、読み込まれたリソース、エラー)。

### セッション定義 {#session-definition}

ユーザーセッションは、Web またはモバイルアプリケーションについてのユーザージャーニーです。セッションには、関連するすべてのナビゲーションイベント (RUMビュー)、ユーザーアクション (RUM アクション)、ネットワークリクエスト (RUM リソース)、クラッシュとエラー (RUM エラー)、およびユーザー エクスペリエンスの忠実な表現を生成する他のイベントやシグナルが含まれます。

1 つの RUM セッションは最大 4 時間継続し、非アクティブ状態が 15 分間続くと期限切れになります。そのどちらかの制限を超えた後に、ユーザーがアプリケーションとやり取りすると、自動的に新しいセッションが開始されます。

### 技術的な制限 {#technical-limitations}

| プロパティ                                   | 制限               |
| ------------------------------------------ | ------------------------ |
| セッションの最大持続時間              | 4 時間                  |
| セッションのタイムアウト                       | 15 分の非アクティブ状態 |
| セッションあたりの最大イベント数       | 1,000 万              |
| 1 イベントあたりの最大属性数     | 1,000                    |
| 1 イベントあたりの最大属性深度          | 20                       |
| 最大イベントサイズ                         | 1MB                     |
| 最大インテークペイロードサイズ                | 5 MB                     |
| 最大ソースマップおよびマッピングファイルサイズ | ファイルあたり 500 MB          |
| 最大 dSYM ファイルサイズ                    | ファイルあたり 2 GB            |
| 取り込み時の最大遅延                 | 24 時間                 |

イベントが上記の技術的な制限を超える場合、Datadog のインテークによって拒否されます。

## セッションリプレイとは{#what-is-session-replay}

Datadog の*セッションリプレイ*は、ユーザーの Web ブラウジング体験をキャプチャし、視覚的に再生することができます。

セッションリプレイを RUM パフォーマンスデータと組み合わせることで、エラーの特定、再現、解決に役立ち、Web アプリケーションの使用パターンや設計上の落とし穴を把握することができます。

## 始める {#get-started}

アプリケーションタイプを選択して、RUM データの収集を開始します。

{{< partial name="rum/rum-getting-started.html" >}}

</br>

### 機能とプラットフォームのサポート {#capabilities-and-platform-support}

**注**: Datadog Flutter SDK は MacOS、Windows、Linux には対応していません。

次の表に、各プラットフォームでサポートされている RUM 機能を示します。

| 機能                               | ブラウザ | Android | iOS |   Flutter   | React Native | Roku | KMP | Unity |  備考 |
| ------------------------------------- | --------|---------|---------|---------|--------------|------|-----|-------|--------|
| Datadog へのログの送信  | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| ネットワークリクエストの分散型トレーシング | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | - **Roku** は、一部の HTTP リクエストのみを追跡することができます。<br>- **Unity** は、`UnityWebRequest` のラッパーを使用してリクエスト追跡を実行します。|
| ビューとアクションの追跡 (RUM) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | - **Flutter Web** で追跡したすべてのアクションは `custom` として記録されます。<br> - **Roku** と **Unity** でサポートされるのは手動アクション追跡だけです。|
| 機能フラグの追跡とリリースの追跡 | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |
| エラー追跡とソースマッピング | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | **React Native** は部分的にサポートされています。|
| クラッシュ追跡、シンボル化、難読化解除 | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |  |
| セッションを停止 (Kiosk Monitoring) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}}  |  |
| WebView でイベントを追跡 |  | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  |
| プラットフォーム固有のバイタルを監視 | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  |
| ログのグローバルコンテキスト/属性追跡  | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |
| クライアント側のトレース |  | {{< X >}} |  {{< X >}}|  |  |  |  |  |  |  |
| セッションリプレイ | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  | **Flutter** のセッションリプレイは Preview 中です。|
| フラストレーションシグナル | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | すべての**モバイル**および **Roku** デバイスは部分的にのみサポートされています。|

## SDK ドメインでサポートされるエンドポイント {#supported-endpoints-for-sdk-domains}

Datadog SDK のトラフィックはすべて SSL (デフォルト 443) で以下のドメインに送信されます。

| サイト | サイト URL                                      |
|------|-----------------------------------------------|
| US1  | `https://browser-intake-datadoghq.com`        |
| US3  | `https://browser-intake-us3-datadoghq.com`    |
| US5  | `https://browser-intake-us5-datadoghq.com`    |
| EU1  | `https://browser-intake-datadoghq.eu`         |
| US1-FED  | `https://browser-intake-ddog-gov.com`     |
| US2-FED  | `https://browser-intake-us2-ddog-gov.com` |
| AP1  | `https://browser-intake-ap1-datadoghq.com`    |
| AP2  | `https://browser-intake-ap2-datadoghq.com`    |

## Datadog RUM を詳しく見る {#explore-datadog-rum}

[**Digital Experience > Performance Summary**][1] に移動して、RUM にアクセスします。

上部ナビゲーションからアプリケーションを選択するか、[ブラウザ][15]または[モバイル][16]のセットアップ手順に従って、最初のアプリケーションを追加してください。

{{< img src="real_user_monitoring/rum-performance-application-selector.png" alt="RUM アプリケーションを選択します。" >}}

**ヒント**: Datadog のグローバル検索から RUM を開くには、<kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> を押して `real user monitoring` を検索します。

## パフォーマンスモニタリングの概要 {#performance-monitoring-summary}

| ブラウザパフォーマンスの概要 | モバイルのパフォーマンスの概要 |
|---------|---------|
| {{< img src="real_user_monitoring/performance-summary-browser.png" alt="ブラウザアプリケーションの RUM パフォーマンスモニタリングの概要ページ" >}} | {{< img src="real_user_monitoring/performance-summary-mobile-2.png" alt="モバイルアプリケーションの RUM パフォーマンスモニタリングの概要ページ" >}} | 

[RUM パフォーマンスモニタリング概要][1]ページは、Web およびモバイルアプリケーション双方に関連性が高く実用的なインサイトを提供します。また、各プラットフォームに合わせたエクスペリエンスによって、以下が可能となります。

プラットフォームごとの- **主要データポイントにフォーカス** (例: Web の UI レイテンシ、モバイル クラッシュ)
- **アプリケーションの健全性をモニタリング**: Core Web Vitals (Web アプリ) やハング率 (iOS) などの馴染みのある KPI により、アプリの信頼性を評価できます。
- **直接調査を開始**: ページを離れることなく、インタラクティブなウィジェットから直ちに問題の原因究明に取りかかれます。

**Web アプリ**の場合: 検索バーでデータをフィルタリングし、遅いページを特定したうえで UI ガイドに従い、[RUM Optimization Inspect][17] ページにアクセスできます。

**モバイルアプリ**の場合: ページ下部で最近のクラッシュを確認し、[Error Tracking][6] サイドパネルを活用してトラブルシューティングを行えます。

### すぐに使えるダッシュボード {#out-of-the-box-dashboards}

[すぐに使える RUM ダッシュボード][2]で自動的に収集されたユーザーセッション、パフォーマンス、モバイルアプリケーション、フラストレーションシグナル、ネットワークリソース、エラーに関する情報を分析することができます。

{{< img src="real_user_monitoring/rum-out-of-the-box-dashboard.png" alt="RUM ダッシュボード" >}}

### RUM エクスプローラーと視覚化 {#rum-explorer-and-visualizations}

[視覚化][3]を使用して、レイテンシーがプレミアム顧客に影響を与えるタイミングを確認するなど、ユーザーセッションをセグメントで表示します。カスタマイズした検索で、データを探索し、ビューを保存し、[モニター][4] を作成します。

{{< img src="real_user_monitoring/explorer/analytics/rum_analytics.mp4" alt="RUM 分析" video=true >}}

### ログ、APM、プロファイラーとのインテグレーション {#integration-with-logs-apm-and-profiler}

[バックエンドトレース、ログ、インフラストラクチャーメトリクス][5]を、ユーザーエクスペリエンスと報告された問題に対応して、アプリケーションのパフォーマンスに影響を与えるコードの正確な行まで表示します。

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_apm_logs-2.png" alt="RUM と APM" >}}

### エラー追跡とクラッシュレポート {#error-tracking-and-crash-reporting}

[Error Tracking][6] を使用して、外れ値、エラー、タイムアウト、およびクラッシュのグループに関する自動アラートを取得し、MTTR を大幅に削減します。

{{< img src="real_user_monitoring/error_tracking/errors_rum.mp4" alt="RUM エラー追跡" video=true >}}

### Web とモバイルバイタル {#web-and-mobile-vitals}

[iOS および tvOS][8] または [Android および Android TV アプリケーション][9]の Core Web Vitals および Mobile Vitals などの[ブラウザアプリケーション][7]のパフォーマンススコアとテレメトリーを表示します。

### Web ビュー追跡 {#web-view-tracking}

[iOS と tvOS][10] または [Android と Android TV][11] 用の Web ビュー追跡を使用して、ネイティブ Web アプリケーションから情報を収集し、ハイブリッドビューを調査します。

{{< img src="real_user_monitoring/webview_tracking/webview_tracking_light.png" alt="RUM エクスプローラーでユーザーセッション中にキャプチャされた Web ビュー" >}}

## Datadog のセッションリプレイを見る {#explore-datadog-session-replay}

### セッションリプレイ {#session-replays}

Web サイトを利用する実際のユーザーの[ブラウザ記録][12]を見て、組織の[プライバシーコントロール][13]を設定します。

### 開発ツール {#developer-tools}

[ブラウザ開発ツール][14]を使用してアプリケーションの問題をトラブルシューティングする際に、トリガーされたログ、エラー、およびパフォーマンス情報にアクセスできます。


## 権限 {#permissions}

デフォルトでは、すべてのユーザーがアプリケーションの RUM 構成を変更できます。

きめ細かなアクセス コントロールを使用して、特定のアプリケーションの RUM 構成を編集できる [ロール][18] を制限します:
1. アプリケーションの RUM 構成を表示している状態で、画面上部の **Edit application** ボタンをクリックします。ドロップダウンが表示されます。
1. **Manage App Permissions** を選択します。
1. **Restrict Access** をクリックします。
1. ダイアログボックスが更新され、組織のメンバーはデフォルトで **Viewer** アクセス権を付与されていることが表示されます。
1. ドロップダウンを使用して、ノートブックを編集できる 1 つまたは複数のロール、チーム、ユーザーを選択します。
1. **Add** をクリックします。
1. ダイアログボックスが更新され、選択したロールに **Editor** 権限があることが表示されます。
1. **Save**をクリックします。

**注:** 編集アクセスを維持するため、保存前に自分がメンバーであるロールを少なくとも 1 つ含める必要があります。

制限されたアプリケーションへの一般アクセスを復元するには、編集アクセスが必要です。以下のステップを完了します。
1. アプリケーションの RUM 構成を表示している状態で、画面上部の **Edit application** ボタンをクリックします。ドロップダウンが表示されます。
1. **Manage App Permissions** を選択します。
1. **Restore Full Access** をクリックします。
1. **Save**をクリックします。


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/performance-monitoring
[2]: /ja/real_user_monitoring/platform/dashboards/
[3]: /ja/real_user_monitoring/explorer/visualize/
[4]: /ja/monitors/types/real_user_monitoring/
[5]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm/
[6]: /ja/real_user_monitoring/error_tracking/
[7]: /ja/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[8]: /ja/real_user_monitoring/application_monitoring/ios/mobile_vitals/
[9]: /ja/real_user_monitoring/application_monitoring/android/mobile_vitals/
[10]: /ja/real_user_monitoring/application_monitoring/ios/web_view_tracking/
[11]: /ja/real_user_monitoring/application_monitoring/android/web_view_tracking/
[12]: /ja/session_replay/browser/
[13]: /ja/session_replay/browser/privacy_options/
[14]: /ja/session_replay/browser/dev_tools/
[15]: /ja/real_user_monitoring/application_monitoring/browser/setup/
[16]: /ja/real_user_monitoring/application_monitoring/
[17]: https://app.datadoghq.com/rum/optimization/inspect
[18]: /ja/account_management/rbac/