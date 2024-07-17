---
algolia:
  tags:
  - rum
  - リアルユーザーモニタリング
aliases:
- /ja/real_user_monitoring/installation
- /ja/real_user_monitoring/faq/
cascade:
  algolia:
    rank: 70
description: ユーザーから見たフロントエンドアプリケーションのパフォーマンスを視覚化、観察、分析します。
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Real%20User%20Monitoring
  tag: リリースノート
  text: Datadog RUM の最新リリースをチェック！ (アプリログインが必要です)
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: リアルユーザーモニタリングによるインサイトを得るためのインタラクティブなセッションに参加できます
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
  text: APMとRUMのデータを統合し、フルスタックの可視性を実現
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
- link: /real_user_monitoring/browser/data_collected/
  tag: ドキュメント
  text: 収集された RUM ブラウザデータ
kind: documentation
title: RUM & セッションリプレイ
---

{{< img src="real_user_monitoring/rum-performance-summary-2.png" alt="RUM ダッシュボード" >}}

## リアルユーザーモニタリングとは？

Datadog の*リアルユーザーモニタリング (RUM)* は、個々のユーザーのリアルタイムのアクティビティとエクスペリエンスをエンドツーエンドで可視化します。RUM は Web およびモバイルアプリケーションを監視するための 4 種類のユースケースを解決します。

* **Performance**: Web ページ、モバイルアプリケーション画面、ユーザーアクション、ネットワークリクエスト、フロントエンドコードのパフォーマンスを追跡します。
* **Error Management**: 進行中のバグと問題を監視し、時間とバージョンにわたってそれを追跡します。
* **Analytics / Usage**: アプリケーションを使用しているユーザーを理解し (国、デバイス、OS)、個々のユーザージャーニーを監視し、ユーザーによるアプリケーションの操作を分析します (アクセスされた最も一般的なページ、クリック、インタラクション、機能の使用)。
* **Support**: 1 つのユーザーセッションに関連するすべての情報を取得して、問題をトラブルシューティングします (セッションの継続時間、アクセスしたページ、インタラクション、読み込まれたリソース、エラー)。

ユーザーセッションとは、Web アプリケーションまたはモバイルアプリケーションでのユーザーの活動で、最長 4 時間続くものを指します。セッションには通常、ページビューと関連するテレメトリーが含まれます。ユーザーが 15 分間アプリケーションと対話しなかった場合、そのセッションは完了したとみなされます。ユーザーがアプリケーションと再び対話すると、新しいセッションが開始されます。

## セッションリプレイとは

Datadog の*セッションリプレイ*は、ユーザーの Web ブラウジング体験をキャプチャし、視覚的に再生することができます。

セッションリプレイを RUM パフォーマンスデータと組み合わせることで、エラーの特定、再現、解決に役立ち、Web アプリケーションの使用パターンや設計上の落とし穴を把握することができます。

## 詳細はこちら

アプリケーションタイプを選択して、RUM データの収集を開始します。

{{< partial name="rum/rum-getting-started.html" >}}

</br>

### 機能とプラットフォームのサポート

**注**: Datadog Flutter SDK は MacOS、Windows、Linux には対応していません。

次の表に、各プラットフォームでサポートされている RUM 機能を示します。

| 機能                               | ブラウザ | Android | iOS |   Flutter   | React Native | Roku | 注 |
| ------------------------------------- | --------|---------|---------|---------|--------------|------|-------|
| ログを Datadog に送信する方法  | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} |  |
| ネットワークリクエストの分散型トレーシング | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | **Datadog Roku SDK** は、一部の HTTP リクエストのみを追跡することができます。 |
| ビューとアクションの追跡 (RUM) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | - **Flutter Web** で追跡されるすべてのアクションは `custom` として記録されます <br> - **Roku** は手動アクション追跡のみをサポートしています。 |
| 機能フラグの追跡とリリースの追跡 | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  |  |
| エラー追跡とソースマッピング | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | **React Native** は部分的にサポートされています |
| クラッシュ追跡、シンボル化、難読化解除 | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} |  |
| セッションを停止 (Kiosk Monitoring) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  |  |
| WebView でイベントを追跡 |  | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  |  |
| プラットフォーム固有のバイタルを監視 | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  |  |
| ログのグローバルコンテキスト/属性追跡  | {{< X >}} |  |  |  |  |  |  |
| クライアント側のトレース |  | {{< X >}} |  {{< X >}}|  |  |  |  |  |
| セッションリプレイ | {{< X >}} | {{< X >}} | {{< X >}} |  |  |  | モバイルセッションリプレイは、ネイティブモバイルアプリ向けの公開ベータ版です。 |
| Frustration signals | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | Only partially supported for all **mobile** and **Roku** devices |

## Supported endpoints for SDK domains

All Datadog SDKs traffic is transmitted over SSL (default 443) to the following domains:

| Site | Site URL                                      |
|------|-----------------------------------------------|
| US1  | `https://browser-intake-datadoghq.com`        |
| US3  | `https://browser-intake-us3-datadoghq.com`    |
| US5  | `https://browser-intake-us5-datadoghq.com`    |
| EU1  | `https://browser-intake-datadoghq.eu`         |
| US1-FED  | `https://browser-intake-ddog-gov.com`     |
| AP1  | `https://browser-intake-ap1-datadoghq.com`    |

## Explore Datadog RUM

Access RUM by navigating to [**Digital Experience > Performance Summary**][1].

### Out-of-the-box dashboards

Analyze information about your user sessions, performance, mobile applications, frustration signals, network resources, and errors collected automatically with [out-of-the-box RUM dashboards][2].

{{< img src="real_user_monitoring/rum-out-of-the-box-dashboard.png" alt="RUM dashboard" >}}

### RUM Explorer and visualizations

View user sessions in segments, such as checking when latency impacts your premium customers, with [visualizations][3]. Explore data, save views, and create [monitors][4] on your customized searches.

{{< img src="real_user_monitoring/explorer/analytics/rum_analytics.mp4" alt="RUM Analytics" video=true >}}

### Integration with logs, APM, and profiler

View your [backend traces, logs, and infrastructure metrics][5] down to the exact line of code impacting your application performance, corresponding to user experiences and reported issues.

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_apm_logs.png" alt="RUM and APM" >}}

### Error tracking and crash reporting

[Error Tracking][6] を使用して、外れ値、エラー、タイムアウト、およびクラッシュのグループに関する自動アラートを取得し、MTTR を大幅に削減します。

{{< img src="real_user_monitoring/error_tracking/errors_rum.mp4" alt="RUM error tracking" video=true >}}

### Web and mobile vitals

View performance scores and telemetry for [browser applications][7] such as Core Web Vitals and Mobile Vitals for [iOS and tvOS][8] or [Android and Android TV applications][9].

### Web view tracking

Collect information from your native web applications and explore hybrid views with Web View Tracking for [iOS and tvOS][10] or [Android and Android TV][11].

{{< img src="real_user_monitoring/webview_tracking/webview_tracking_light.png" alt="Web Views captured in a user session in the RUM Explorer" >}}

## Explore Datadog Session Replay

### Session replays

Watch [browser recordings][12] of real users interacting with your website and set [privacy controls][13] for your organization.

### Developer tools

Access triggered logs, errors, and performance information when troubleshooting application issues using [Browser Dev Tools][14].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/performance-monitoring
[2]: /ja/real_user_monitoring/platform/dashboards/
[3]: /ja/real_user_monitoring/explorer/visualize/
[4]: /ja/monitors/types/real_user_monitoring/
[5]: /ja/real_user_monitoring/platform/connect_rum_and_traces/
[6]: /ja/real_user_monitoring/error_tracking/
[7]: /ja/real_user_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[8]: /ja/real_user_monitoring/ios/mobile_vitals/
[9]: /ja/real_user_monitoring/android/mobile_vitals/
[10]: /ja/real_user_monitoring/ios/web_view_tracking/
[11]: /ja/real_user_monitoring/android/web_view_tracking/
[12]: /ja/real_user_monitoring/session_replay/browser/
[13]: /ja/real_user_monitoring/session_replay/browser/privacy_options/
[14]: /ja/real_user_monitoring/session_replay/browser/developer_tools/