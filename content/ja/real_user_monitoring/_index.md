---
title: リアルユーザーモニタリング
kind: documentation
description: ユーザーから見たフロントエンドアプリケーションのパフォーマンスを視覚化して分析します。
disable_sidebar: true
aliases:
  - /ja/real_user_monitoring/installation
further_reading:
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: ブログ
    text: Datadog リアルユーザーモニタリングのご紹介
  - link: 'https://www.datadoghq.com/blog/datadog-mobile-rum/'
    tag: ブログ
    text: Datadog Mobile Real User Monitoring で、モバイルでのユーザーエクスペリエンスを向上
  - link: 'https://www.datadoghq.com/blog/error-tracking/'
    tag: ブログ
    text: Datadog Error Tracking で、アプリケーションの問題を解明
  - link: 'https://www.datadoghq.com/blog/unify-apm-rum-datadog/'
    tag: ブログ
    text: スタック全体の可視性のために APM と RUM データを統合する
  - link: 'https://www.datadoghq.com/blog/datadog-geomaps/'
    tag: ブログ
    text: ジオマップを使用して、場所ごとにアプリデータを視覚化する
  - link: /real_user_monitoring/browser/data_collected/
    tag: Documentation
    text: 収集された RUM ブラウザデータ
---
{{< img src="real_user_monitoring/rum_full_dashboard.png" alt="RUM ダッシュボード"  >}}

## リアルユーザーモニタリングとは？


Datadog のリアルユーザーモニタリング (RUM) は、個々のユーザーのリアルタイムのアクティビティとエクスペリエンスをエンドツーエンドで可視化します。Web およびモバイルアプリケーションの 4 種類のユースケースを解決するように設計されています。

* **Performance**: Web ページ、モバイルアプリケーション画面、ユーザーアクション、ネットワークリクエスト、フロントエンドコードのパフォーマンスを追跡します。
* **Error Management**: 進行中のバグと問題を監視し、時間とバージョンにわたってそれを追跡します。
* **Analytics / Usage**: アプリケーションを使用しているユーザーを理解し (国、デバイス、OS)、個々のユーザージャーニーを監視し、ユーザーによるアプリケーションの操作を分析します (アクセスされた最も一般的なページ、クリック、インタラクション、機能の使用)。
* **Support**: 1 つのユーザーセッションに関連するすべての情報を取得して、問題をトラブルシューティングします (セッションの継続時間、アクセスしたページ、インタラクション、読み込まれたリソース、エラー)。



## はじめに

アプリケーションタイプを選択して、RUM データの収集を開始します。

{{< partial name="rum/rum-getting-started.html" >}}
</br>
## Datadog RUM を探索する

### すぐに使えるダッシュボード

[すぐに使えるダッシュボード][1]を使用して、ユーザージャーニー、パフォーマンス、ネットワークリクエスト、自動的に収集されたエラーに関する情報を分析します。

{{< img src="real_user_monitoring/dashboards/rum_dashboard.png" alt="RUM ダッシュボード" >}}

### RUM エクスプローラーと分析

[カスタマイズ可能な分析ウィジェット][2]を使用して、レイテンシーがプレミアム顧客に影響を与えるタイミングを確認するなど、ユーザーセッションをセグメントで表示します。カスタマイズした検索で、ビューを探索、保存し、モニターを作成します。

{{< img src="real_user_monitoring/explorer/analytics/rum_analytics.gif" alt="RUM 分析"  >}}

### ログ、APM、プロファイラーとのシームレスなインテグレーション

[バックエンドトレース、ログ、インフラストラクチャーメトリクス][1]を、ユーザーエクスペリエンスと報告された問題に対応して、アプリケーションのパフォーマンスに影響を与えるコードの正確な行まで表示します。

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_apm_logs.png" alt="RUM と APM">}}

### エラー追跡とクラッシュレポート

[エラー追跡][4]を使用して、外れ値およびエラー、タイムアウト、クラッシュのグループに関する自動アラートを取得し、MTTR を大幅に削減します。

{{< img src="real_user_monitoring/error_tracking/rum_errors.gif" alt="RUM エラー追跡">}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]:/ja/real_user_monitoring/dashboards
[2]:/ja/real_user_monitoring/explorer/analytics
[4]:/ja/real_user_monitoring/error_tracking
[1]: /ja/real_user_monitoring/connect_rum_and_traces