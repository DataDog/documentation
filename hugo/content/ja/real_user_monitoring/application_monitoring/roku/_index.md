---
aliases:
- /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/roku/
- /ja/real_user_monitoring/mobile_and_tv_monitoring/roku
description: Roku プロジェクトから RUM および Error Tracking データを収集します。
further_reading:
- link: /real_user_monitoring/application_monitoring/roku/advanced_configuration
  tag: ドキュメント
  text: RUM Roku の高度な設定
- link: https://github.com/DataDog/dd-sdk-roku
  tag: ソースコード
  text: dd-sdk-roku のソースコード
- link: /real_user_monitoring
  tag: ドキュメント
  text: Datadog RUM を探索する
site_support_id: rum_roku
title: Roku の監視
---
## 概要{#overview}

Datadog Real User Monitoring (RUM) を使用すると、アプリケーションの個々のユーザーのリアルタイムパフォーマンスとユーザー体験を可視化し、分析できます。

## Roku アプリケーションの監視を開始する{#start-monitoring-roku-applications}

Roku 向けの RUM を使い始めるには、アプリケーションを作成し、Roku SDK を設定します。

{{< whatsnext desc="このセクションには、次のトピックが含まれています。">}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/roku/setup">}}<u>セットアップ</u>: Roku SDK のセットアップ方法、バックグラウンドイベントの追跡、およびデバイスがオフラインの時のデータ送信方法について説明します。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/roku/error_tracking">}}<u>クラッシュレポート</u>: クラッシュレポートを追加し、難読化解除されたスタックトレースを取得し、実装をテストします。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/roku/advanced_configuration">}}<u>高度な設定</u>: ユーザーセッションの拡充、イベントとデータの管理、カスタムグローバル属性の追跡、初期化パラメーターの確認、RUM イベントの変更や破棄などを行います。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/roku/web_view_tracking">}}<u>Web ビューの追跡</u>: Web ビューを監視し、モバイルアプリケーションの監視の死角をなくします。{{< /nextlink >}}
{{< /whatsnext >}}