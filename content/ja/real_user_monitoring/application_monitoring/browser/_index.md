---
aliases:
- /ja/real_user_monitoring/browser/
description: Datadog RUM Browser SDKを使用して、実際のユーザーデータとフロントエンドパフォーマンスを監視し、ウェブ体験を最適化し、スタック全体の問題を特定します。
further_reading:
- link: /real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM エクスプローラーについて
- link: /logs/log_collection/javascript/
  tag: ドキュメント
  text: Datadog Browser SDK for Logs について
- link: https://learn.datadoghq.com/courses/intro-to-rum
  tag: ラーニングセンター
  text: Real User Monitoring (RUM) の紹介
title: RUM ブラウザモニタリング
---
## 概要 {#overview}

Datadog Real User Monitoring (RUM) を使用すると、アプリケーションの個々のユーザーのリアルタイムパフォーマンスとユーザージャーニーを視覚化して分析できます。

## ブラウザアプリケーションのモニタリングを開始する {#start-monitoring-browser-applications}

ブラウザ向け RUM を使い始めるには、アプリケーションを作成し、ブラウザ SDK を構成します。

{{< whatsnext desc="このセクションには下記のトピックが含まれています。" >}}
  {{< nextlink href="real_user_monitoring/application_monitoring/browser/setup/client">}}<u>クライアントサイド</u>: 各ブラウザベースの Web アプリケーションをインスツルメントし、アプリケーションをデプロイして、追跡する初期化パラメーターを構成し、RUM が収集するデータとコンテキストをさらに管理するために高度な構成を使用します。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/setup/server">}}<u>自動インスツルメンテーション</u>: Web サーバーまたはプロキシを介して提供される Web アプリケーションの HTML レスポンスに RUM SDK の JavaScript スクリプトレットを注入します。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/agentic_onboarding/?tab=realusermonitoring">}}<u>エージェント的なオンボーディング</u>: (プレビュー) プロジェクトのフレームワークを検出し、単一のプロンプトで RUM SDK を追加する AI ガイド付きセットアップを実行します。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/advanced_configuration">}}<u>高度な構成</u>: RUM ブラウザ SDK を構成して、アプリケーションのニーズに対応できるよう、データ収集に変更を加え、ビュー名をオーバーライドし、ユーザーセッションを管理し、サンプリングを制御します。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins">}}<u>ビルドプラグイン</u>: Datadog ビルドプラグインを JavaScript バンドラーに統合して、ソースマップのアップロード、アクション名の難読化解除、およびその他の RUM タスクをビルド時に自動化します。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/data_collected">}}<u>収集データ</u>: ブラウザ SDK が収集するデータを確認します。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/monitoring_page_performance">}}<u>ページパフォーマンスの監視</u>: ビューのタイミングを監視して、ユーザーの視点からアプリケーションのパフォーマンスを把握します。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/optimizing_performance">}}<u>パフォーマンスの最適化</u>: RUM 最適化ページを使用して、Core Web Vitals 分析とユーザーエクスペリエンスの可視化を通じて、ブラウザのパフォーマンス問題を特定し、トラブルシューティングします。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/monitoring_resource_performance">}}<u>リソースパフォーマンスの監視</u>: ブラウザのリソースパフォーマンスを監視し、RUM データをバックエンドトレースとリンクさせて、完全なエンドツーエンドの可視性を実現します。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/collecting_browser_errors">}}<u>ブラウザエラーの収集</u>: RUM Browser SDK を使用して、手動エラー収集や React エラー境界を含む複数のソースからフロントエンドエラーを収集および追跡する方法を学びます。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/tracking_user_actions">}}<u>ユーザーアクションの追跡</u>: 自動クリック検出とアクションパフォーマンスのインサイトを使用して、ブラウザアプリケーション内のユーザーインタラクションを追跡および分析します。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/frustration_signals">}}<u>フラストレーションシグナル</u>: RUM フラストレーションシグナル (rage clicks、dead clicks、error clicks を含む) を使用して、ユーザーの摩擦ポイントを特定し、ユーザーエクスペリエンスを改善し、離脱を減らします。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/troubleshooting">}}<u>トラブルシューティング</u>: ブラウザ SDK の一般的なトラブルシューティング{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}