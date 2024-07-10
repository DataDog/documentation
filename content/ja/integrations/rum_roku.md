---
app_id: rum-roku
app_uuid: 0ab4b7a1-f017-4b3c-ab0f-eab5d476f132
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- メトリクス
- トレーシング
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rum_roku/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_roku
integration_id: rum-roku
integration_title: Roku
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: rum_roku
public_title: Roku
short_description: Datadog RUM を使用した Roku チャンネルの監視とメトリクス生成
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Tracing
  configuration: README.md#Setup
  description: Datadog RUM を使用した Roku チャンネルの監視とメトリクス生成
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Roku
---



## 概要

Datadog [Roku インテグレーション][1]を利用することで、問題のトリアージに費やす時間を減らし、より多くの時間を新機能のリリースに費やすことができるようになります。

- ネットワークリクエスト、大容量メディアファイルにおけるパフォーマンス低下やアプリケーションクラッシュの根本的な原因をデバッグ
- アプリケーションの応答性向上、サービスレベルインジケータ (SLI) の設定、すぐに使えるダッシュボード、リアルタイムメトリクスによる問題の診断
- 大量のアプリケーションエラーを管理可能な固有の問題群にインテリジェントにグループ化

ユーザーエクスペリエンスがビジネスに与える影響を関連付けます。

- ビジネス KPI を達成するために、デモグラフィック、バージョンリリース、または任意のカスタム属性による画面エンゲージメントなど、重要なユーザーエクスペリエンスデータを分析
- カスタマイズ可能なアナリティクスと地理的マップによりユーザー行動傾向を把握

アプリケーションのエンドツーエンドの健全性を監視します。

- ユーザーエクスペリエンスデータからバックエンドトレース、ランタイムメトリクス、ログに視点を移し、問題を調査する際の完全なコンテクストを提供
- クライアントサイドとサーバーサイドのメトリクス、トレース、ログを統合し、クラッシュのデバッグを高速化
- フロントエンドとバックエンドのチーム向けに、フルスタックモニタリングを単一プラットフォームで実現

## セットアップ

### RUM イベントの収集

アプリケーションからリアルユーザーモニタリングイベントの収集を開始するには、[Roku Monitoring][2] を参照してください。さらに、[RUM とトレースを接続する][3]ことができます。

### ログの収集

Roku アプリケーションのログを Datadog に転送し始めるには、[Roku ログ収集][4]をご覧ください。

## 収集データ

### メトリクス

Roku インテグレーションには、メトリクスは含まれていません。RUM アプリケーションからカスタムメトリクスを生成するには、[メトリクスの生成][5]を参照してください。

### イベント

イベントや属性の詳細については、[RUM Roku データ収集][6]を参照してください。

### サービスのチェック

Roku インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [RUM Roku チャンネルモニタリング][2]ドキュメント
- [Datadog RUM で Roku チャンネルを監視する][8]のブログ記事

[1]: https://app.datadoghq.com/integrations/rum-roku
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/roku/
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/connect_rum_and_traces/?tab=rokurum#setup-rum
[4]: https://docs.datadoghq.com/ja/logs/log_collection/roku/
[5]: https://docs.datadoghq.com/ja/real_user_monitoring/generate_metrics
[6]: https://docs.datadoghq.com/ja/real_user_monitoring/roku/data_collected/
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://www.datadoghq.com/blog/monitor-roku-with-rum/