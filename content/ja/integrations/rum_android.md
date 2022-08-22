---
app_id: rum-android
app_uuid: a70b6926-49a8-4f90-8190-315170e97e4f
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- モニタリング
- ネットワーク
- 例外
- メトリクス
- アラート設定
- 問題追跡
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rum_android/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_android
integration_id: rum-android
integration_title: Android
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: rum_android
oauth: {}
public_title: Android
short_description: Datadog RUM を使用した Android アプリケーションの監視とメトリクス生成
supported_os:
- android
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Android
  - Category::Monitoring
  - Category::Network
  - Category::Exceptions
  - Category::Metrics
  - Category::Alerting
  - Category::Issue Tracking
  configuration: README.md#Setup
  description: Datadog RUM を使用した Android アプリケーションの監視とメトリクス生成
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Android
---



## 概要

Datadog [Android インテグレーション][1]を利用することで、問題のトリアージに費やす時間を減らし、より多くの時間を新機能のリリースに費やすことができるようになります。

- サードパーティライブラリ、ネットワークリクエスト、大容量メディアファイルにおけるパフォーマンス低下やアプリケーションクラッシュの根本的な原因をデバッグ
- アプリケーションの応答性向上、サービスレベルインジケータ (SLI) の設定、すぐに使えるダッシュボード、リアルタイムメトリクス、難読化されたクラッシュレポートによる問題の診断
- 大量のアプリケーションエラーを管理可能な固有の問題群にインテリジェントにグループ化

ユーザーエクスペリエンスがビジネスに与える影響を関連付けます。

- ビジネス KPI を達成するために、デモグラフィック、バージョンリリース、または任意のカスタム属性による画面エンゲージメントなど、重要なモバイルユーザーエクスペリエンスデータを分析
- すべてのユーザージャーニーを、ID、セルラーアクティビティ、リファーラル URL などのセッションイベントや属性のタイムラインと自動的に相関付け
- カスタマイズ可能なアナリティクスと地理的マップによりユーザー行動傾向を把握

アプリケーションのエンドツーエンドの健全性を監視します。

- ユーザーエクスペリエンスデータからバックエンドトレース、ランタイムメトリクス、ログに視点を移し、問題を調査する際の完全なコンテクストを提供
- クライアントサイドとサーバーサイドのメトリクス、トレース、ログを統合し、クラッシュのデバッグを高速化
- フロントエンドとバックエンドのチーム向けに、フルスタックモニタリングを単一プラットフォームで実現

## セットアップ

### RUM イベントの収集

アプリケーションからリアルユーザーモニタリングのイベント収集を開始するには、[Android および Android TV モニタリング][2]を参照してください。

### トレースの収集

Android アプリケーションのトレースを Datadog に送信し始めるには、[RUM とトレースの接続][3]をご覧ください。

### ログの収集

Android アプリケーションのログを Datadog に転送し始めるには、[Android ログ収集][4]をご覧ください。

## 収集データ

### メトリクス

Android インテグレーションには、メトリクスは含まれていません。RUM アプリケーションからカスタムメトリクスを生成するには、[メトリクスの生成][5]を参照してください。

### イベント

イベントや属性の詳細については、[RUM Android データ収集][6]を参照してください。

### サービスのチェック

Android インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Android および Android TV のモニタリング][8]

[1]: https://app.datadoghq.com/integrations/rum-android
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/android/?tabs=kotlin#setup
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/connect_rum_and_traces?tab=androidrum#setup-rum
[4]: https://docs.datadoghq.com/ja/logs/log_collection/android/?tab=kotlin
[5]: https://docs.datadoghq.com/ja/real_user_monitoring/generate_metrics
[6]: https://docs.datadoghq.com/ja/real_user_monitoring/android/data_collected/
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://docs.datadoghq.com/ja/real_user_monitoring/android/