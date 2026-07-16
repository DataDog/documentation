---
description: iOS プロジェクトから RUM とエラートラッキングのデータを収集します。
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/ios/advanced_configuration
  tag: ドキュメント
  text: RUM iOS の高度なコンフィギュレーション
- link: https://github.com/DataDog/dd-sdk-ios
  tag: ソースコード
  text: dd-sdk-ios のソースコード
- link: /real_user_monitoring
  tag: ドキュメント
  text: Datadog RUM を探索する
title: iOS と tvOS のモニタリング
---
## 概要

Datadog Real User Monitoring (RUM) を使用すると、アプリケーションの個々のユーザーのリアルタイムパフォーマンスとユーザージャーニーを視覚化して分析できます。

## iOS アプリケーションのモニタリングを開始する

iOS 向け RUM を使い始めるには、アプリケーションを作成し、iOS SDK を構成します。

{{< whatsnext desc="このセクションには次のトピックが含まれます:">}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/ios/setup">}}<u>Setup</u>: iOS SDK のセットアップ方法、バックグラウンド イベントの追跡、デバイスがオフラインのときにデータを送信する方法を学びます。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/ios/error_tracking">}}<u>Crash Reporting</u>: クラッシュ レポートを追加し、難読化解除されたスタック トレースを取得してから、実装をテストします。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/ios/monitoring_app_performance">}}<u>Monitoring App Performance</u>: ビューのタイミングを監視し、ユーザー視点でアプリのパフォーマンスを把握します。 {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/ios/advanced_configuration">}}<u>Advanced Configuration</u>: ユーザー セッションの拡充、イベントとデータの管理、カスタム グローバル 属性の追跡、初期化パラメータの確認、RUM イベントの変更や削除など、さまざまな高度設定を行います。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/ios/mobile_vitals">}}<u>Data Collected</u>: RUM iOS SDK が収集するデータを確認します。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/ios/mobile_vitals">}}<u>Mobile Vitals</u>: モバイル バイタルを表示し、モバイル アプリケーションに関するインサイトの算出に役立てます。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/ios/web_view_tracking/?tab=ios">}}<u>Web View Tracking</u>: Web ビューを監視し、モバイル アプリケーションの盲点を解消します。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/ios/integrated_libraries">}}
  <u>Integrated Libraries</u>: iOS と osTV アプリケーションで使用できる統合ライブラリをインポートします。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/ios/troubleshooting">}}
  <u>Troubleshooting</u>: iOS SDK でよくある問題のトラブルシューティング。{{< /nextlink >}}
{{< /whatsnext >}}