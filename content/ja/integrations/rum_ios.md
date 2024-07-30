---
app_id: rum-ios
app_uuid: 53933f32-091c-4b8d-83a5-bd53ac9eacdb
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- メトリクス
- モバイル
- トレーシング
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rum_ios/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_ios
integration_id: rum-ios
integration_title: iOS
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: rum_ios
public_title: iOS
short_description: Datadog RUM を使用した iOS アプリケーションの監視とメトリクス生成
supported_os:
- ios
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Mobile
  - Category::Tracing
  - Supported OS::iOS
  configuration: README.md#Setup
  description: Datadog RUM を使用した iOS アプリケーションの監視とメトリクス生成
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: iOS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Datadog [iOS インテグレーション][1]を利用することで、問題のトリアージに費やす時間を減らし、より多くの時間を新機能のリリースに費やすことができるようになります。

- サードパーティライブラリ、ネットワークリクエスト、大容量メディアファイルにおけるパフォーマンス低下やアプリケーションクラッシュの根本的な原因をデバッグ
- アプリケーションの応答性向上、サービスレベルインジケータ (SLI) の設定、すぐに使えるダッシュボード、リアルタイムメトリクス、難読化されたクラッシュレポートによる問題の診断
- 大量のアプリケーションエラーを管理可能な固有の問題群にインテリジェントにグループ化

ユーザーエクスペリエンスがビジネスに与える影響を関連付けます。

- ビジネス KPI を達成するために、デモグラフィック、バージョンリリース、または任意のカスタム属性による画面エンゲージメントなど、重要なモバイルユーザーエクスペリエンスデータを分析
- すべてのユーザージャーニーを、ID、セルラーアクティビティ、リファーラル URL などのセッションイベントや属性のタイムラインと自動的に相関付け
- カスタマイズ可能なアナリティクスと地理的マップによりユーザー行動傾向を把握

iOS アプリケーションのエンドツーエンドの健全性を監視します。

- ユーザーエクスペリエンスデータからバックエンドトレース、ランタイムメトリクス、ログに視点を移し、問題を調査する際の完全なコンテクストを提供
- クライアントサイドとサーバーサイドのメトリクス、トレース、ログを統合し、クラッシュのデバッグを高速化
- フロントエンドとバックエンドのチーム向けに、フルスタックモニタリングを単一プラットフォームで実現

## 計画と使用

### RUM イベントの収集

アプリケーションからリアルユーザーモニタリングのイベント収集を開始するには、[iOS と tvOS のモニタリング][2]を参照してください。

### トレースの収集

iOS アプリケーションのトレースを Datadog に送信し始めるには、[iOS トレース収集][3]をご覧ください。また、[RUM とトレースの接続][4]することもできます。

### ログの収集

iOS アプリケーションのログを Datadog に転送し始めるには、[iOS ログ収集][5]をご覧ください。

## リアルユーザーモニタリング

### データセキュリティ

iOS インテグレーションには、メトリクスは含まれていません。RUM アプリケーションからカスタムメトリクスを生成するには、[メトリクスの生成][6]を参照してください。

### イベント

イベントや属性の詳細については、[RUM iOS データ収集][7]を参照してください。

### サービスチェック

iOS インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問い合わせください。

## その他の参考資料 

お役に立つドキュメント、リンクや記事:

- [iOS と tvOS のモニタリング][9]


[1]: https://app.datadoghq.com/integrations/rum-ios
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/ios/?tabs=swift#setup
[3]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ios/?tab=cocoapods
[4]: https://docs.datadoghq.com/ja/real_user_monitoring/connect_rum_and_traces/?tab=iosrum#setup-rum
[5]: https://docs.datadoghq.com/ja/logs/log_collection/ios/
[6]: https://docs.datadoghq.com/ja/real_user_monitoring/generate_metrics
[7]: https://docs.datadoghq.com/ja/real_user_monitoring/ios/data_collected/
[8]: https://docs.datadoghq.com/ja/help/
[9]: https://docs.datadoghq.com/ja/real_user_monitoring/ios/