---
algolia:
  tags:
  - rum
  - リアルユーザーモニタリング
aliases:
- /ja/real_user_monitoring/installation
description: ユーザーから見たフロントエンドアプリケーションのパフォーマンスを視覚化、観察、分析します。
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Real%20User%20Monitoring
  tag: リリースノート
  text: Datadog RUM の最新リリースをチェック！ (アプリログインが必要です)
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
- link: /real_user_monitoring/browser/data_collected/
  tag: ドキュメント
  text: 収集された RUM ブラウザデータ
kind: documentation
title: RUM & セッションリプレイ
---

{{< img src="real_user_monitoring/RUM-perf-dashboard.jpeg" alt="RUM ダッシュボード" >}}

## リアルユーザーモニタリングとは？

Datadog の*リアルユーザーモニタリング (RUM)* は、個々のユーザーのリアルタイムのアクティビティとエクスペリエンスをエンドツーエンドで可視化します。RUM は Web およびモバイルアプリケーションを監視するための 4 種類のユースケースを解決します。

* **Performance**: Web ページ、モバイルアプリケーション画面、ユーザーアクション、ネットワークリクエスト、フロントエンドコードのパフォーマンスを追跡します。
* **Error Management**: 進行中のバグと問題を監視し、時間とバージョンにわたってそれを追跡します。
* **Analytics / Usage**: アプリケーションを使用しているユーザーを理解し (国、デバイス、OS)、個々のユーザージャーニーを監視し、ユーザーによるアプリケーションの操作を分析します (アクセスされた最も一般的なページ、クリック、インタラクション、機能の使用)。
* **Support**: 1 つのユーザーセッションに関連するすべての情報を取得して、問題をトラブルシューティングします (セッションの継続時間、アクセスしたページ、インタラクション、読み込まれたリソース、エラー)。

ユーザーセッションとは、Web アプリケーションまたはモバイルアプリケーションにおける最長 4 時間のユーザージャーニーのことです。セッションには通常、ページビューと関連するテレメトリーが含まれます。ユーザーが 15 分間アプリケーションと対話しなかった場合、そのセッションは完了したとみなされます。ユーザーがアプリケーションと再び対話すると、新しいセッションが開始されます。

## セッションリプレイとは

Datadog の*セッションリプレイ*は、ユーザーの Web ブラウジング体験をキャプチャし、視覚的に再生することができます。

セッションリプレイを RUM パフォーマンスデータと組み合わせることで、エラーの特定、再現、解決に役立ち、Web アプリケーションの使用パターンや設計上の落とし穴を把握することができます。

## 詳細はこちら

アプリケーションタイプを選択して、RUM データの収集を開始します。

{{< partial name="rum/rum-getting-started.html" >}}

</br>

## Datadog RUM を探索する

[**UX Monitoring > RUM Applications**][1] に移動して、RUM にアクセスします。

### すぐに使えるダッシュボード

[すぐに使える RUM ダッシュボード][2]で自動的に収集されたユーザーセッション、パフォーマンス、モバイルアプリケーション、フラストレーションシグナル、ネットワークリソース、エラーに関する情報を分析することができます。

{{< img src="real_user_monitoring/RUM-session-dashboard.jpeg" alt="RUM ダッシュボード" >}}

### RUM エクスプローラーと視覚化

[視覚化][3]を使用して、レイテンシーがプレミアム顧客に影響を与えるタイミングを確認するなど、ユーザーセッションをセグメントで表示します。カスタマイズした検索で、データを探索し、ビューを保存し、[モニター][4]を作成します。

{{< img src="real_user_monitoring/explorer/analytics/rum_analytics.mp4" alt="RUM 分析" video=true >}}

### ログ、APM、プロファイラーとのインテグレーション

[バックエンドトレース、ログ、インフラストラクチャーメトリクス][5]を、ユーザーエクスペリエンスと報告された問題に対応して、アプリケーションのパフォーマンスに影響を与えるコードの正確な行まで表示します。

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_apm_logs.png" alt="RUM と APM" >}}

### エラー追跡とクラッシュレポート

[エラー追跡][6]を使用して、外れ値およびエラー、タイムアウト、クラッシュのグループに関する自動アラートを取得し、MTTR を大幅に削減します。

{{< img src="real_user_monitoring/error_tracking/errors_rum.mp4" alt="RUM エラー追跡" video=true >}}

### Web とモバイルバイタル

[iOS および tvOS][8] または [Android および Android TV アプリケーション][9]の Core Web Vitals および Mobile Vitals などの[ブラウザアプリケーション][7]のパフォーマンススコアとメトリクスを表示します。

### Web ビュー追跡

[iOS と tvOS][10] または [Android と Android TV][11] 用の Web ビュー追跡を使用して、ネイティブ Web アプリケーションから情報を収集し、ハイブリッドビューを調査します。

{{< img src="real_user_monitoring/webview_tracking/webview_tracking_light.png" alt="RUM エクスプローラーのユーザーセッションで取得した Web ビュー" >}}

## Datadog のセッションリプレイを見る

### セッションリプレイ

Web サイトを利用する実際のユーザーの[ブラウザ記録][12]を見て、組織の[プライバシーコントロール][13]を設定します。

### 開発ツール

[ブラウザ開発ツール][14]を使用してアプリケーションの問題をトラブルシューティングする際に、トリガーされたログ、エラー、およびパフォーマンス情報にアクセスできます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/list
[2]: /ja/real_user_monitoring/dashboards/
[3]: /ja/real_user_monitoring/explorer/visualize/
[4]: /ja/monitors/types/real_user_monitoring/
[5]: /ja/real_user_monitoring/connect_rum_and_traces/
[6]: /ja/real_user_monitoring/error_tracking/
[7]: /ja/real_user_monitoring/browser/monitoring_page_performance/#core-web-vitals
[8]: /ja/real_user_monitoring/ios/mobile_vitals/
[9]: /ja/real_user_monitoring/android/mobile_vitals/
[10]: /ja/real_user_monitoring/ios/web_view_tracking/
[11]: /ja/real_user_monitoring/android/web_view_tracking/
[12]: /ja/real_user_monitoring/session_replay/
[13]: /ja/real_user_monitoring/session_replay/privacy_options/
[14]: /ja/real_user_monitoring/session_replay/developer_tools/